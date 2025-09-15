import os
import re
from bs4 import BeautifulSoup
from openai import OpenAI

# --- CONFIGURATION ---
client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))

# --- IDENTIFY LINES TO COMMENT (ALL FILES IN ONE BATCH) ---
def identify_lines_to_comment_all_files(file_texts: dict[str, str]) -> dict[str, str]:
    """
    Analyze all files in a single API call to minimize cost.
    Each file receives comments on separate lines before and after lines as needed.
    """
    # Combine all files into one prompt with markers
    combined_text = "\n\n".join([f"---FILE:{path}---\n{text}" for path, text in file_texts.items()])

    prompt = f"""
Analyze the following text line by line, file by file.
For each line that is unprofessional (e.g., too informal tone)
or outdated in 2025 (e.g., references, wording),
add a comment on a separate line before and after, like this:

<!-- to revise: reason -->
line of text
<!-- end comment -->

Maintain the separation of files: each file starts after '---FILE:<filename>---'.
Do NOT change anything else (no code blocks, no HTML tags, no Markdown formatting).

Text to analyze:

{combined_text}
"""
    try:
        response = client.chat.completions.create(
            model="gpt-3.5-turbo",
            messages=[{"role": "user", "content": prompt}],
            temperature=0,
        )
        processed_text = response.choices[0].message.content
        # Split by file markers
        result = {}
        file_splits = re.split(r"---FILE:(.*?)---", processed_text)
        # re.split produces: ['', filename1, content1, filename2, content2, ...]
        for i in range(1, len(file_splits), 2):
            filename = file_splits[i].strip()
            content = file_splits[i + 1].strip()
            result[filename] = content
        return result
    except Exception as e:
        print(f"OpenAI API error: {e}")
        return file_texts  # fallback: return original texts

# --- SPLIT INTO BLOCKS ---
def split_into_blocks(body: str):
    """Separate code blocks and other text"""
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
    """Preserve HTML tags intact"""
    soup = BeautifulSoup(text, "html.parser")
    return str(soup)

# --- COLLECT FILES ---
def collect_markdown_files(root_dir: str) -> list[str]:
    md_files = []
    for subdir, _, files in os.walk(root_dir):
        for file in files:
            if file.endswith(".md"):
                md_files.append(os.path.join(subdir, file))
    return md_files

# --- PROCESS ALL FILES IN SINGLE BATCH ---
def process_markdown_files_all_in_one(root_dir: str):
    all_files = collect_markdown_files(root_dir)
    file_texts = {}

    for file_path in all_files:
        with open(file_path, "r", encoding="utf-8") as f:
            content = f.read()

        if content.startswith("<!-- Analyzed by OpenAI"):
            continue

        match = re.match(r"^(---\n.*?\n---\n)(.*)$", content, re.DOTALL)
        if match:
            frontmatter = match.group(1)
            body = match.group(2)
        else:
            frontmatter = ""
            body = content

        blocks = split_into_blocks(body)
        non_code_blocks = []
        for is_code, block_text in blocks:
            if not is_code and block_text.strip():
                block_text = preserve_html(block_text)
                non_code_blocks.append(block_text)

        combined_blocks_text = "\n\n---BLOCK---\n\n".join(non_code_blocks)
        file_texts[file_path] = frontmatter + combined_blocks_text

    if not file_texts:
        return

    # Single API call for all files
    processed_files = identify_lines_to_comment_all_files(file_texts)

    # write back
    for path, processed_content in processed_files.items():
        with open(path, "w", encoding="utf-8") as f:
            f.write("<!-- Analyzed by OpenAI -->\n" + processed_content)

# --- EXECUTION ---
if __name__ == "__main__":
    root_dir = os.getcwd()
    process_markdown_files_all_in_one(root_dir)
