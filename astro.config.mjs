// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import mdx from '@astrojs/mdx';
import astroExpressiveCode from 'astro-expressive-code';
import vercel from '@astrojs/vercel';

// https://astro.build/config
export default defineConfig({
  integrations: [
    astroExpressiveCode(),
    mdx(),
    starlight({
      title: 'Markdown and AI-Based Documentation',
      defaultLocale: 'en',
      locales: {
        en: {
          label: 'English',
          lang: 'en',
          title: 'Markdown and AI-Based Documentation',
          sidebar: [
            {
              label: 'An industrial process',
              items: [
                {
                  label: 'Source Format',
                  link: '/en/rédaction-technique--un-processusindustriel/format-source/',
                },
              ],
            },
          ],
        },
        fr: {
          label: 'Français',
          lang: 'fr',
          title: 'Documentation Markdown et IA',
          sidebar: [
            {
              label: 'Un processus industriel',
              items: [
                {
                  label: 'Format source',
                  link: '/fr/rédaction-technique--un-processusindustriel/format-source/',
                },
              ],
            },
          ],
        },
      },
    }),
    vercel({
      webAnalytics: {
        enabled: true,
      },
    }),
  ],
});
