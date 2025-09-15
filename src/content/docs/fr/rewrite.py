import os
import re
from concurrent.futures import ThreadPoolExecutor, as_completed
from bs4 import BeautifulSoup
from openai import OpenAI

# --- CONFIGURATION ---
client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))
max_threads = 5

# --- IDENTIFY LINES TO COMMENT ---
def identify_lines_to_comment(text: str) -> str:
    """
    For each line, identify if it is unprofessional or outdated,
    and add an inline HTML comment in English explaining why.
    """
    prompt = f"""
Analyze the following text line by line.
For each line that is unprofessional (e.g., too informal tone)
or outdated in 2025 (e.g., references, wording),
add an inline HTML comment explaining the reason in English, like this:

line of text <!-- to revise: reason -->

Do NOT change anything else (no code blocks, no HTML tags, no line breaks, no Markdown formatting).
Do NOT merge lines.

Text to analyze:

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
        print(f"OpenAI API error: {e}")
        return text

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

# --- PROCESS A SINGLE FILE ---
def process_file(file_path: str):
    print(f"Processing file: {file_path}")
    with open(file_path, "r", encoding="utf-8") as f:
        content = f.read()

    if content.startswith("<!-- Analyzed by OpenAI"):
        print("File already analyzed, skipping.\n")
        return

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
            processed = identify_lines_to_comment(block_text)
            processed_blocks.append(processed)

    new_content = frontmatter + "<!-- Analyzed by OpenAI -->\n" + "".join(processed_blocks)

    with open(file_path, "w", encoding="utf-8") as f:
        f.write(new_content)

    print(f"File {file_path} updated.\n")

# --- MULTI-THREAD PROCESSING ---
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
                print(f"Error processing file: {e}")

# --- EXECUTION ---
if __name__ == "__main__":
    root_dir = os.getcwd()
    process_markdown_files(root_dir)
