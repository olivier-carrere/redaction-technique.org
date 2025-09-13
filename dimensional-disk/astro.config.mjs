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
	  { slug: 'fr/' },
            {
              label: 'Constellations',
              collapsed: true,
              autogenerate: { directory: 'fr/' },
            },
          ],
        },
});
