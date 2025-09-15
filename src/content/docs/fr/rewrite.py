import os
import openai
from concurrent.futures import ThreadPoolExecutor, as_completed

# --- CONFIGURATION ---
openai.api_key = "VOTRE_CLE_API_OPENAI"
chunk_size = 3000     # Approx tokens per request
max_threads = 5       # Nombre maximum de threads simultanés

# --- FONCTION DE RÉÉCRITURE ---
def rewrite_text(text: str) -> str:
    prompt = f"""
Réécris le texte suivant en français dans une tonalité plus professionnelle, en conservant le sens et les détails :

{text}
"""
    try:
        response = openai.ChatCompletion.create(
            model="gpt-4",
            messages=[{"role": "user", "content": prompt}],
            temperature=0.5,
            max_tokens=chunk_size
        )
        return response.choices[0].message.content.strip()
    except Exception as e:
        print(f"Erreur API OpenAI : {e}")
        return text  # retourne le texte original en cas d'erreur

# --- TRAITEMENT D’UN FICHIER PAR PARAGRAPHES ---
def process_file(file_path: str):
    print(f"Traitement du fichier : {file_path}")
    with open(file_path, "r", encoding="utf-8") as f:
        content = f.read()

    # Vérifie si le fichier a déjà été réécrit
    if content.startswith("<!-- Réécrit par OpenAI"):
        print("Ce fichier a déjà été réécrit, saut.\n")
        return

    # Découpe le texte en paragraphes
    paragraphs = [p for p in content.split("\n\n") if p.strip()]
    rewritten_paragraphs = [rewrite_text(p) for p in paragraphs]

    new_content = "<!-- Réécrit par OpenAI -->\n\n" + "\n\n".join(rewritten_paragraphs)

    with open(file_path, "w", encoding="utf-8") as f:
        f.write(new_content)

    print(f"Fichier {file_path} mis à jour.\n")

# --- PARCOURS DES FICHIERS EN MULTI-THREAD ---
def process_markdown_files(root_dir: str):
    # Collecte tous les fichiers .md
    md_files = [
        os.path.join(subdir, file)
        for subdir, _, files in os.walk(root_dir)
        for file in files
        if file.endswith(".md")
    ]

    # Traite les fichiers en parallèle
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
