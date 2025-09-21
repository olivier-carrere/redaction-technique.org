import os
import re
from openai import OpenAI

# --- Initialize client ---
client = OpenAI()

def find_first_md_file(root="."):
    """Return path of the first .md file without proofreading: IA."""
    for dirpath, _, filenames in os.walk(root):
        for f in filenames:
            if f.endswith(".md"):
                path = os.path.join(dirpath, f)
                with open(path, "r", encoding="utf-8") as fh:
                    text = fh.read()
                if "proofreading: IA" not in text:
                    return path
    return None

def split_frontmatter(text):
    """Split YAML frontmatter and body."""
    match = re.match(r"^---\n(.*?)\n---\n(.*)$", text, re.DOTALL)
    if match:
        return match.group(1), match.group(2)
    return "", text

def ensure_proofreading(frontmatter):
    """Ensure 'proofreading: IA' is last line of frontmatter."""
    lines = [line for line in frontmatter.splitlines() if line.strip()]
    if not any(line.strip().startswith("proofreading:") for line in lines):
        lines.append("proofreading: IA")
    return "\n".join(lines)

def clean_output(text):
    """Remove unwanted intros or summaries from GPT output."""
    lines = text.splitlines()

    # Remove leading commentary
    while lines and (
        lines[0].lower().startswith(("here is", "corrected", "fixed", "edited"))
        or lines[0].strip().endswith(":")
    ):
        lines.pop(0)

    # Remove trailing "Summary of changes" or similar
    forbidden_starts = ("summary", "changes:", "edits:", "note:")
    while lines and lines[-1].lower().startswith(forbidden_starts):
        lines.pop()

    return "\n".join(lines).strip()

def proofread_with_gpt(content):
    """Send content to GPT-4o for proofreading with safeguard."""
    response = client.chat.completions.create(
        model="gpt-4o",
        messages=[
            {
                "role": "system",
                "content": (
                    "You are an expert technical writing editor. "
                    "The text is about technical writing, DITA, structured authoring. "
                    "Fix inconsistencies, unprofessional style, and poor French-to-English translations. "
                    "Keep Markdown formatting intact. "
                    "Return only the corrected text, without explanations, comments, or summary of changes."
                ),
            },
            {"role": "user", "content": content},
        ],
    )
    raw_output = response.choices[0].message.content.strip()
    return clean_output(raw_output)

def main():
    file_path = find_first_md_file(".")
    if not file_path:
        print("No .md file found without proofreading: IA.")
        return

    print(f"Processing: {file_path}")

    with open(file_path, "r", encoding="utf-8") as f:
        text = f.read()

    frontmatter, body = split_frontmatter(text)

    # Proofread body
    corrected_body = proofread_with_gpt(body)

    # Fix frontmatter
    corrected_frontmatter = ensure_proofreading(frontmatter)

    # Rebuild file
    new_text = f"---\n{corrected_frontmatter}\n---\n{corrected_body}\n"

    with open(file_path, "w", encoding="utf-8") as f:
        f.write(new_text)

    print("✅ File updated and proofreading note added.")

if __name__ == "__main__":
    main()
