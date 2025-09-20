import os
import requests

# Set your DeepL Free API key here
DEEPL_API_KEY = "39d97c04-f3bf-48cc-b662-424087954e0c:fx"

# Base URL for DeepL Free API
DEEPL_API_URL = "https://api-free.deepl.com/v2/translate"

def translate_text(text, source_lang="FR", target_lang="EN"):
    """Translate text using DeepL Free API."""
    response = requests.post(
        DEEPL_API_URL,
        data={
            "auth_key": DEEPL_API_KEY,
            "text": text,
            "source_lang": source_lang,
            "target_lang": target_lang
        },
    )
    response.raise_for_status()
    result = response.json()
    return result["translations"][0]["text"]

def translate_markdown_files():
    """Translate all .md files in current directory from French to English."""
    for filename in os.listdir("."):
        if filename.endswith(".md") and not filename.endswith("-en.md"):
            print(f"Translating {filename}...")
            with open(filename, "r", encoding="utf-8") as f:
                content = f.read()

            translated = translate_text(content, "FR", "EN")

            new_filename = filename[:-3] + "-en.md"
            with open(new_filename, "w", encoding="utf-8") as f:
                f.write(translated)

            print(f"Created {new_filename}")

if __name__ == "__main__":
    translate_markdown_files()
