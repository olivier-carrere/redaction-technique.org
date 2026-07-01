// Post-build fix: make Astro's generated Vercel redirect routes tolerate a
// trailing slash.
//
// With `trailingSlash: 'always'`, Astro emits redirect routes whose `src`
// omits the trailing slash (e.g. `^/en/costs/formats-et-outils$`), while a
// generic 308 route rewrites slash-less URLs to their slash form *first*. The
// canonical slash form then matches no redirect and 404s. Appending `/?$` to
// each literal redirect `src` lets it match both forms.
//
// Only routes with a literal `Location` (no `$n` capture placeholder) are
// touched, so the framework's own slash-enforcement routes are left intact.

import { readFileSync, writeFileSync } from 'node:fs';

const CONFIG = new URL('../.vercel/output/config.json', import.meta.url);

const config = JSON.parse(readFileSync(CONFIG, 'utf8'));
let patched = 0;

for (const route of config.routes ?? []) {
  const location = route.headers?.Location;
  const isLiteralRedirect =
    typeof location === 'string' && !location.includes('$');
  const src = route.src;
  if (!isLiteralRedirect || typeof src !== 'string') continue;
  // Already ends with a slash before `$`, or already tolerant — skip.
  if (src.endsWith('/$') || src.endsWith('/?$')) continue;
  if (!src.endsWith('$')) continue;
  route.src = src.slice(0, -1) + '/?$';
  patched++;
}

writeFileSync(CONFIG, JSON.stringify(config, null, 2) + '\n');
console.log(`[fix-redirect-trailing-slash] patched ${patched} redirect route(s)`);
