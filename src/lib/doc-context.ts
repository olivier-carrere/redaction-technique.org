/**
 * Validation for the Ask assistant's `?doc=` context parameter.
 *
 * The parameter becomes the `href` of the "Read document" link, so it must
 * only ever resolve to a documentation page on this site. Links to the Ask
 * page pass either a site path (`/en/costs/`, from page pagination) or the
 * page's canonical URL (`https://docs.redaction-technique.org/en/costs/`,
 * from the documentation explorer).
 *
 * Rather than filtering URL schemes, the value must match the site's own
 * documentation path format after an optional same-site origin is removed.
 * Anything else (other schemes, protocol-relative or external URLs, queries,
 * fragments, encoded or dotted segments) is rejected.
 */

export const SITE_ORIGIN = 'https://docs.redaction-technique.org';

// "/en/" or "/fr/", then lowercase slug segments; trailing slash optional.
const DOC_PATH = /^\/(?:en|fr)\/(?:[a-z0-9]+(?:-[a-z0-9]+)*\/)*(?:[a-z0-9]+(?:-[a-z0-9]+)*)?$/;

/**
 * Return the internal documentation path for a `?doc=` value, or null if the
 * value is not a documentation page on this site.
 *
 * @param value          raw parameter value
 * @param currentOrigin  the page's own origin (e.g. a preview deployment),
 *                       accepted in addition to the production origin
 */
export function safeDocPath(value: string | null | undefined, currentOrigin?: string): string | null {
  if (typeof value !== 'string') return null;
  let path = value.trim();

  for (const origin of [SITE_ORIGIN, currentOrigin]) {
    // Require "/" right after the origin, so "https://site.org.evil.com" or
    // "https://site.org@evil.com" never match.
    if (origin && path.startsWith(`${origin}/`)) {
      path = path.slice(origin.length);
      break;
    }
  }

  return DOC_PATH.test(path) ? path : null;
}
