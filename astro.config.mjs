import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import icon from "astro-icon";
import yaml from "@rollup/plugin-yaml";
import vercel from "@astrojs/vercel";
import pagefind from "astro-pagefind";
import { visit } from "unist-util-visit";

// Rehype plugin: Shiki highlights mermaid blocks before rehype-mermaid can see them.
// This plugin runs after Shiki, finds <pre data-language="mermaid"> elements,
// extracts their text content, and replaces them with a data-chart wrapper div
// for client-side rendering by the mermaid npm bundle.
function rehypeMermaidClientSide() {
  return (tree) => {
    visit(tree, "element", (node, index, parent) => {
      if (
        node.tagName === "pre" &&
        node.properties?.dataLanguage === "mermaid"
      ) {
        const text = extractText(node).trim();
        parent.children[index] = {
          type: "element",
          tagName: "div",
          properties: { className: ["mermaid-diagram"], dataChart: text },
          children: [],
        };
      }
    });
  };
}

function extractText(node) {
  if (node.type === "text") return node.value;
  if (node.children) return node.children.map(extractText).join("");
  return "";
}

// https://astro.build/config
export default defineConfig({
  site: "https://redaction-technique.org",
  output: "server",          // required for serverless API routes
  adapter: vercel(),         // Vercel serverless adapter
  integrations: [
    pagefind(),
    mdx(),
    sitemap(),
    icon()
  ],
  markdown: {
    rehypePlugins: [rehypeMermaidClientSide],
  },
  vite: {
    plugins: [
      yaml(),                // enable YAML imports
      tailwindcss()
    ],
    resolve: {
      alias: {
        "@data": "/data"     // optional: import YAML like '@data/oil-types.yaml'
      }
    }
  }
});
