import os
import re
from concurrent.futures import ThreadPoolExecutor, as_completed
from bs4 import BeautifulSoup
from openai import OpenAI

# --- CONFIGURATION ---
client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))
max_threads = 5

# --- FONCTION D'IDENTIFICATION DE TEXTE À MARQUER ---
def identify_unprofessional(text: str) -> str:
    """
    Envoie le texte à l'API OpenAI pour identifier uniquement les passages
    obsolètes ou non professionnels. Renvoie le texte avec ces parties
    entourées de commentaires HTML.
    """
    prompt = f"""
Analyse le texte suivant. Identifie uniquement les passages
qui sont non professionnels, trop familiers ou obsolètes en 2025.
Ne modifie **rien d'autre** (ni code, ni HTML, ni sauts de ligne).
Entoure ces passages avec des commentaires HTML comme ceci :
<!-- à réviser -->[texte à réviser]<!-- /à réviser -->

Ne change rien d'autre, préserve exactement la mise en forme.

Texte à analyser :

{text}
"""
    try:
        response = client.chat.completions.create(
            model="gpt-4",
            messages=[{"role": "user", "content": prompt}],
            temperature=0,
        )
        return response.choices[0].message.content
    except Exception as e:
        print(f"Erreur API OpenAI : {e}")
        return text

# --- DÉCOUPAGE EN BLOCS ---
def split_into_blocks(body: str):
    pattern = r"(```.*?```)"
    blocks = []
    last_index = 0
    for match in re.finditer(pattern, body, re.DOTALL):
        start, end = match.span()
        if start > last_index:
            blocks.append((False, body[last_index:start]))
        blocks.append((True, match.group(1)))
        last_index = end
    if last_index < len(body):
        blocks.append((False, body[last_index:]))
    return blocks

def preserve_html(text: str) -> str:
    """Préserve toutes les balises HTML intactes"""
    soup = BeautifulSoup(text, "html.parser")
    return str(soup)

# --- TRAITEMENT D’UN FICHIER ---
def process_file(file_path: str):
    print(f"Traitement du fichier : {file_path}")
    with open(file_path, "r", encoding="utf-8") as f:
        content = f.read()

    if content.startswith("<!-- Analyse par OpenAI"):
        print("Ce fichier a déjà été analysé, saut.\n")
        return

    # Séparer frontmatter et corps
    match = re.match(r"^(---\n.*?\n---\n)(.*)$", content, re.DOTALL)
    if match:
        frontmatter = match.group(1)
        body = match.group(2)
    else:
        frontmatter = ""
        body = content

    blocks = split_into_blocks(body)
    processed_blocks = []

    for is_code, block_text in blocks:
        if is_code:
            processed_blocks.append(block_text)
        else:
            block_text = preserve_html(block_text)
            processed = identify_unprofessional(block_text)
            processed_blocks.append(processed)

    new_content = frontmatter + "<!-- Analyse par OpenAI -->\n" + "".join(processed_blocks)

    with open(file_path, "w", encoding="utf-8") as f:
        f.write(new_content)

    print(f"Fichier {file_path} mis à jour.\n")

# --- PARCOURS MULTI-THREAD ---
def process_markdown_files(root_dir: str):
    md_files = [
        os.path.join(subdir, file)
        for subdir, _, files in os.walk(root_dir)
        for file in files
        if file.endswith(".md")
    ]

    with ThreadPoolExecutor(max_workers=max_threads) as executor:
        futures = [executor.submit(process_file, file) for file in md_files]
        for future in as_completed(futures):
            try:
                future.result()
            except Exception as e:
                print(f"Erreur lors du traitement : {e}")

# --- EXECUTION ---
if __name__ == "__main__":
    root_dir = os.getcwd()
    process_markdown_files(root_dir)
