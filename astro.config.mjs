// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import mdx from '@astrojs/mdx';
import astroExpressiveCode from 'astro-expressive-code';
import vercel from '@astrojs/vercel/serverless';

// https://astro.build/config
export default defineConfig({
  integrations: [
    astroExpressiveCode(),
    mdx(),
    starlight({
      title: 'Rédaction technique',
      defaultLocale: 'fr', // required by Starlight
      locales: {
        fr: {
          label: 'Français',
          lang: 'fr',
          title: 'Rédaction technique',
          sidebar: [
            {
              label: 'Constellations',
              collapsed: true, // folders start collapsed
              autogenerate: {
                directory: 'src/content/docs', // your content folder
                collapse: true, // subfolders collapsible
                sort: 'files-first', // folders first, then files
              },
            },
          ],
        },
      },
    }),
  ],
  output: 'server',
  adapter: vercel({
    webAnalytics: {
      enabled: true,
    },
  }),
});
