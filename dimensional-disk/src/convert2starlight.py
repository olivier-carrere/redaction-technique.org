import os
from pathlib import Path
from openai import OpenAI

# Initialize OpenAI client (make sure OPENAI_API_KEY is set in your environment)
client = OpenAI()

PROMPT = """
You are a documentation converter.
Convert the following Markdown file into a Starlight "How-to" documentation page.

Requirements:
- Add frontmatter with: title, description (short, from first paragraph), slug (from heading id), sidebar (label: How-to, order: 1), prev, next.
- Remove the first Markdown heading (since title goes in frontmatter).
- Replace `.interpreted-text role="file"` and `.interpreted-text role="ref"` with plain inline code.
- Replace "::: seealso" blocks with ":::tip[Voir aussi]".
- Preserve code fences, anchors, and links.
- Return ONLY valid Markdown/MDX.

Markdown content:
"""

def convert_markdown(content: str) -> str:
    """Send markdown content to OpenAI for conversion."""
    response = client.chat.completions.create(
        model="gpt-5",  # or "gpt-4.1" if that's what you have access to
        messages=[
            {"role": "system", "content": "You are an expert in documentation formatting for Starlight Astro."},
            {"role": "user", "content": PROMPT + "\n\n" + content},
        ]
    )
    return response.choices[0].message.content.strip()

def main():
    # Grab all .md files, excluding hidden and temp/editor files
    md_files = [
        f for f in Path(".").glob("*.md")
        if not f.name.startswith(".")   # skip hidden files
        and not f.name.startswith(".#") # skip editor temp files
        and not f.name.startswith("~")  # skip backup files
    ]

    if not md_files:
        print("⚠️ No .md files found in current directory.")
        return

    for filepath in md_files:
        print(f"📄 Converting: {filepath}")
        try:
            content = filepath.read_text(encoding="utf-8")
        except FileNotFoundError:
            print(f"⚠️ Skipping missing file: {filepath}")
            continue
        except Exception as e:
            print(f"⚠️ Error reading {filepath}: {e}")
            continue

        try:
            converted = convert_markdown(content)
        except Exception as e:
            print(f"⚠️ Error converting {filepath}: {e}")
            continue

        try:
            filepath.write_text(converted, encoding="utf-8")
            print(f"✅ Overwritten: {filepath}")
        except Exception as e:
            print(f"⚠️ Error writing {filepath}: {e}")

if __name__ == "__main__":
    main()
