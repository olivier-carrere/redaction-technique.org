// Expressive Code plugin: show the leading "$ " shell prompt on terminal
// command lines, but keep it out of the copied / selected text.
//
// preprocessCode strips "$ " from the code itself (so the copy button's
// data-code and manual selection both omit it), and records which lines had a
// prompt. postprocessRenderedLine re-adds the "$ " as a non-selectable span
// purely in the rendered HTML.

const TERMINAL_LANGUAGES = new Set([
  'bash', 'sh', 'shell', 'shellscript', 'zsh',
  'console', 'ansi', 'powershell', 'ps', 'ps1',
  'cmd', 'bat', 'batch',
]);

const promptLinesByBlock = new WeakMap();

export function pluginShellPrompt() {
  return {
    name: 'shell-prompt',
    hooks: {
      preprocessCode({ codeBlock }) {
        if (!TERMINAL_LANGUAGES.has(codeBlock.language)) return;
        const promptLines = new Set();
        codeBlock.getLines().forEach((line, index) => {
          if (line.text.startsWith('$ ')) {
            line.editText(0, 2, '');
            promptLines.add(index);
          }
        });
        if (promptLines.size) promptLinesByBlock.set(codeBlock, promptLines);
      },
      postprocessRenderedLine({ codeBlock, lineIndex, renderData }) {
        const promptLines = promptLinesByBlock.get(codeBlock);
        if (!promptLines || !promptLines.has(lineIndex)) return;
        renderData.lineAst.children.unshift({
          type: 'element',
          tagName: 'span',
          properties: { className: ['shell-prompt'], 'aria-hidden': 'true' },
          children: [{ type: 'text', value: '$ ' }],
        });
      },
    },
  };
}
