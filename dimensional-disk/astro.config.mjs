// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import mdx from '@astrojs/mdx';
import astroExpressiveCode from 'astro-expressive-code';

// https://astro.build/config
export default defineConfig({
  integrations: [
    astroExpressiveCode(),
    mdx(),
    starlight({
      title: 'Kusens de Maître Kosen',
      defaultLocale: 'fr',
      locales: {
        fr: {
          label: 'Français',
          lang: 'fr',
          title: 'Kusens',
          sidebar: [
	  { slug: 'fr/enseignement-oral/2000/02-camp-hiver/' },
            {
              label: 'Constellations',
              collapsed: true,
              autogenerate: { directory: 'fr/enseignement-oral/2000/01-camp-ete' },
            },
          ],
        },
        es: {
          label: 'Español',
          lang: 'es',
          title: 'Mondos',
          sidebar: [
            {
              label: 'Constelaciones',
              collapsed: true,
              autogenerate: { directory: 'es/enseignement-oral' },
            },
          ],
        },
      },
    }),
  ],
});
