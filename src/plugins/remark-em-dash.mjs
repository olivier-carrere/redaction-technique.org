// Rewrites em dashes (U+2014) to a plain hyphen in body prose across every page
// at build time. Runs on the mdast tree, where fenced code (`code`) and inline
// code (`inlineCode`) are their own node types — so touching only `text` nodes
// leaves all code samples and inline commands untouched.
// Not covered: frontmatter title/description (Starlight reads those from the
// content-collection data before remark runs, so they're fixed at source) and
// em dashes hardcoded inside .astro component UI strings.
export function remarkEmDash() {
  return (tree) => {
    walk(tree);
  };
}

function walk(node) {
  if (node.type === "text" && node.value.includes("—")) {
    node.value = node.value.replace(/—/g, "-");
  }
  if (node.children) for (const child of node.children) walk(child);
}
