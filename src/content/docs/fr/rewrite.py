import os
import re
from concurrent.futures import ThreadPoolExecutor, as_completed
from openai import OpenAI

# --- CONFIGURATION ---
client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))
chunk_size = 3000      # Approx tokens per request
max_threads = 5
min_block_paragraphs = 2  # Nombre minimum de paragraphes à regrouper pour former un bloc

# --- FONCTION DE RÉÉCRITURE ---
def rewrite_text(text: str) -> str:
    prompt = f"""
Réécris le texte suivant en français dans une tonalité plus professionnelle, en conservant le sens et les détails. 
Ne modifie pas le contenu du texte entre blocs de code (délimités par ```).

{text}
"""
    try:
        response = client.chat.completions.create(
            model="gpt-4",
            messages=[{"role": "user", "content": prompt}],
            temperature=0.5,
            max_tokens=chunk_size
        )
        return response.choices[0].message.content.strip()
    except Exception as e:
        print(f"Erreur API OpenAI : {e}")
        return text

# --- FONCTION POUR DÉCOUPER LE TEXTE EN BLOCS ---
def split_into_blocks(body: str):
    """
    Retourne une liste de tuples (is_code_block, text)
    """
    blocks = []
    pattern = r"(```.*?```)"
    last_index = 0
    for match in re.finditer(pattern, body, re.DOTALL):
        start, end = match.span()
        # texte avant le bloc code
        if start > last_index:
            text_block = body[last_index:start]
            # regrouper petits paragraphes en blocs
            paragraphs = [p for p in text_block.split("\n\n") if p.strip()]
            if paragraphs:
                # regroupe tous les paragraphes en un seul bloc
                blocks.append((False, "\n\n".join(paragraphs)))
        # bloc code
        blocks.append((True, match.group(1)))
        last_index = end

    # texte après le dernier bloc code
    if last_index < len(body):
        text_block = body[last_index:]
        paragraphs = [p for p in text_block.split("\n\n") if p.strip()]
        if paragraphs:
            blocks.append((False, "\n\n".join(paragraphs)))
    return blocks

# --- TRAITEMENT D’UN FICHIER ---
def process_file(file_path: str):
    print(f"Traitement du fichier : {file_path}")
    with open(file_path, "r", encoding="utf-8") as f:
        content = f.read()

    if content.startswith("<!-- Réécrit par OpenAI"):
        print("Ce fichier a déjà été réécrit, saut.\n")
        return

    # Sépare frontmatter et corps
    match = re.match(r"^(---\n.*?\n---\n)(.*)$", content, re.DOTALL)
    if match:
        frontmatter = match.group(1)
        body = match.group(2)
    else:
        frontmatter = ""
        body = content

    # Découpe en blocs et réécrit uniquement les blocs non-code
    blocks = split_into_blocks(body)
    rewritten_blocks = []
    for is_code, block_text in blocks:
        if is_code:
            rewritten_blocks.append(block_text)
        else:
            rewritten_blocks.append(rewrite_text(block_text))

    new_content = frontmatter + "<!-- Réécrit par OpenAI -->\n\n" + "\n\n".join(rewritten_blocks)

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
    root_dir = os.getcwd()  # utilise le répertoire courant
    process_markdown_files(root_dir)
