import os
import re
from concurrent.futures import ThreadPoolExecutor, as_completed
from bs4 import BeautifulSoup
from openai import OpenAI

# --- CONFIGURATION ---
client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))
chunk_size = 3000
max_threads = 5

# --- FONCTION DE RÉÉCRITURE ---
def rewrite_text(text: str) -> str:
    """
    Réécrit un texte en français ton professionnel,
    en conservant la mise en forme, tous les sauts de ligne et balises HTML.
    """
    prompt = f"""
Réécris le texte suivant en français dans une tonalité professionnelle.
- Ne modifie **aucune mise en forme**, ni les sauts de ligne.
- Ne modifie **jamais** les blocs de code (``` … ```).
- Conserve toutes les balises HTML intactes, notamment <abbr>.
- Ne tente pas d’expliciter ou de remplacer les abréviations (<abbr>).
- Ne modifie pas le texte entre `<` et `>` qui n'est pas une balise HTML.

Texte à réécrire :

{text}
"""
    try:
        response = client.chat.completions.create(
            model="gpt-4",
            messages=[{"role": "user", "content": prompt}],
            temperature=0.5,
            max_tokens=chunk_size
        )
        return response.choices[0].message.content
    except Exception as e:
        print(f"Erreur API OpenAI : {e}")
        return text

# --- DÉCOUPAGE EN BLOCS ---
def split_into_blocks(body: str):
    """
    Retourne une liste de tuples (is_code_block, text)
    en conservant les sauts de ligne exacts autour des blocs de code.
    """
    blocks = []
    pattern = r"(```.*?```)"
    last_index = 0
    for match in re.finditer(pattern, body, re.DOTALL):
        start, end = match.span()
        if start > last_index:
            text_block = body[last_index:start]
            blocks.append((False, text_block))
        blocks.append((True, match.group(1)))
        last_index = end
    if last_index < len(body):
        text_block = body[last_index:]
        blocks.append((False, text_block))
    return blocks

# --- PRÉSERVATION DES BALISES HTML ---
def preserve_html(text: str) -> str:
    """
    Utilise BeautifulSoup pour s'assurer que toutes les balises HTML valides restent intactes
    """
    soup = BeautifulSoup(text, "html.parser")
    return str(soup)

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

    # Découpe en blocs
    blocks = split_into_blocks(body)
    rewritten_blocks = []

    for is_code, block_text in blocks:
        if is_code:
            rewritten_blocks.append(block_text)  # bloc code intact
        else:
            # préserve HTML avant réécriture
            block_text = preserve_html(block_text)
            rewritten = rewrite_text(block_text)
            # conserve exactement les lignes vides avant et après le bloc
            if block_text.startswith("\n") and not rewritten.startswith("\n"):
                rewritten = "\n" + rewritten
            if block_text.endswith("\n") and not rewritten.endswith("\n"):
                rewritten = rewritten + "\n"
            rewritten_blocks.append(rewritten)

    # Concatène tous les blocs sans modifier la mise en forme
    new_content = frontmatter + "<!-- Réécrit par OpenAI -->\n" + "".join(rewritten_blocks)

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
