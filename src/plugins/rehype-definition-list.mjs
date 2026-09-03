/**
 * Rehype plugin to transform Markdown definition list syntax:
 *
 * Term
 * : Definition
 *
 * or
 *
 * **Term**
 * : Definition
 *
 * into semantic HTML <dl class="def-list"><dt>...</dt><dd>...</dd></dl>
 */

export function rehypeDefinitionList() {
  return (tree) => {
    transformTree(tree);
  };
}

function transformTree(parent) {
  if (!parent || !parent.children) return;

  // Recursively process block containers (div, section, article, blockquote, etc.)
  for (const child of parent.children) {
    if (child.type === 'element' && child.children && child.children.length > 0) {
      if (['div', 'section', 'article', 'blockquote', 'main'].includes(child.tagName)) {
        transformTree(child);
      }
    }
  }

  const newChildren = [];
  let currentDl = null;

  for (let i = 0; i < parent.children.length; i++) {
    const node = parent.children[i];

    if (node.type === 'element' && node.tagName === 'p') {
      // 1. Check if this paragraph contains inline definition list item(s):
      //    Term\n: Definition
      const defItems = parseDefListParagraph(node);
      if (defItems && defItems.length > 0) {
        if (!currentDl) {
          currentDl = {
            type: 'element',
            tagName: 'dl',
            properties: { className: ['def-list'] },
            children: []
          };
          newChildren.push(currentDl);
        }

        for (const item of defItems) {
          currentDl.children.push({
            type: 'element',
            tagName: 'dt',
            properties: {},
            children: item.terms
          });
          currentDl.children.push({
            type: 'element',
            tagName: 'dd',
            properties: {},
            children: item.definitions
          });
        }
        continue;
      }

      // 2. Check if this paragraph is a loose term followed by a paragraph starting with :
      //    <p>Term</p>
      //    <p>: Definition</p>
      let nextIdx = i + 1;
      while (
        nextIdx < parent.children.length &&
        parent.children[nextIdx].type === 'text' &&
        parent.children[nextIdx].value.trim() === ''
      ) {
        nextIdx++;
      }

      if (nextIdx < parent.children.length) {
        const nextNode = parent.children[nextIdx];
        if (nextNode.type === 'element' && nextNode.tagName === 'p' && startsDefMarker(nextNode)) {
          const terms = trimNodes(node.children);
          const defChildren = trimNodes(stripLeadingDefMarker(nextNode.children));

          if (!currentDl) {
            currentDl = {
              type: 'element',
              tagName: 'dl',
              properties: { className: ['def-list'] },
              children: []
            };
            newChildren.push(currentDl);
          }

          currentDl.children.push({
            type: 'element',
            tagName: 'dt',
            properties: {},
            children: terms
          });
          currentDl.children.push({
            type: 'element',
            tagName: 'dd',
            properties: {},
            children: defChildren
          });

          i = nextIdx;
          continue;
        }
      }
    }

    // Preserve open <dl> across blank/whitespace nodes if next element is also a def list item
    if (currentDl && node.type === 'text' && node.value.trim() === '') {
      let nextElement = null;
      for (let j = i + 1; j < parent.children.length; j++) {
        if (parent.children[j].type === 'element') {
          nextElement = parent.children[j];
          break;
        }
        if (parent.children[j].type === 'text' && parent.children[j].value.trim() !== '') {
          break;
        }
      }
      if (
        nextElement &&
        nextElement.tagName === 'p' &&
        (parseDefListParagraph(nextElement) || startsDefMarker(nextElement))
      ) {
        // Skip whitespace and keep currentDl active
        continue;
      }
    }

    // Any other node closes current <dl>
    currentDl = null;
    newChildren.push(node);
  }

  parent.children = newChildren;
}

function startsDefMarker(pNode) {
  if (!pNode.children || pNode.children.length === 0) return false;
  const first = pNode.children[0];
  if (first.type !== 'text') return false;
  return /^[ \t]*:[ \t]+/.test(first.value);
}

function stripLeadingDefMarker(children) {
  if (!children || children.length === 0) return [];
  const res = children.map((n) => ({ ...n }));
  if (res[0]?.type === 'text') {
    res[0].value = res[0].value.replace(/^[ \t]*:[ \t]+/, '');
  }
  return res;
}

function parseDefListParagraph(pNode) {
  const children = pNode.children;
  if (!children || children.length === 0) return null;

  const hasDefMarker = children.some((c) => {
    return c.type === 'text' && /(?:^|\n)[ \t]*:[ \t]+/.test(c.value);
  });

  if (!hasDefMarker) return null;

  const items = [];
  let currentTerms = [];
  let currentDefs = [];
  let inDef = false;

  for (let cIdx = 0; cIdx < children.length; cIdx++) {
    const child = children[cIdx];

    if (child.type !== 'text') {
      if (!inDef) {
        currentTerms.push(child);
      } else {
        currentDefs.push(child);
      }
      continue;
    }

    const text = child.value;
    const regex = /(^|\n)[ \t]*:[ \t]+/g;
    let lastIndex = 0;
    let match;
    let matchedInText = false;

    while ((match = regex.exec(text)) !== null) {
      matchedInText = true;
      const matchStart = match.index;
      const matchLength = match[0].length;
      const textBefore = text.slice(lastIndex, matchStart);

      if (!inDef) {
        if (textBefore) {
          currentTerms.push({ type: 'text', value: textBefore });
        }
        inDef = true;
      } else {
        const lastNl = textBefore.lastIndexOf('\n');
        if (lastNl !== -1) {
          const defPart = textBefore.slice(0, lastNl);
          const termPart = textBefore.slice(lastNl + 1);
          if (defPart) currentDefs.push({ type: 'text', value: defPart });
          items.push({
            terms: trimNodes(currentTerms),
            definitions: trimNodes(currentDefs)
          });
          currentTerms = termPart ? [{ type: 'text', value: termPart }] : [];
          currentDefs = [];
        } else {
          items.push({
            terms: trimNodes(currentTerms),
            definitions: trimNodes(currentDefs)
          });
          currentTerms = textBefore ? [{ type: 'text', value: textBefore }] : [];
          currentDefs = [];
        }
        inDef = true;
      }

      lastIndex = matchStart + matchLength;
    }

    if (!matchedInText) {
      if (!inDef) {
        currentTerms.push(child);
      } else {
        currentDefs.push(child);
      }
    } else {
      const remainder = text.slice(lastIndex);
      if (remainder) {
        currentDefs.push({ type: 'text', value: remainder });
      }
    }
  }

  if (inDef) {
    items.push({
      terms: trimNodes(currentTerms),
      definitions: trimNodes(currentDefs)
    });
  }

  return items.length > 0 ? items : null;
}

function trimNodes(nodes) {
  if (!nodes || nodes.length === 0) return [];
  const res = nodes.map((n) => ({ ...n }));
  if (res[0]?.type === 'text') {
    res[0].value = res[0].value.replace(/^\s+/, '');
    if (!res[0].value) res.shift();
  }
  if (res.length > 0) {
    const last = res[res.length - 1];
    if (last?.type === 'text') {
      last.value = last.value.replace(/\s+$/, '');
      if (!last.value) res.pop();
    }
  }
  return res;
}
