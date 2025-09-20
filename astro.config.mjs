// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import mdx from '@astrojs/mdx';
import astroExpressiveCode from 'astro-expressive-code';
import vercel from '@astrojs/vercel';

const site = 'https://docs.redaction-technique.org/';

export const locales = {
  root: { label: 'English', lang: 'en' },
  fr: { label: 'Français', lang: 'fr' },
};

export default defineConfig({
  site,
  trailingSlash: 'always',
  integrations: [
    astroExpressiveCode(),
    mdx(),
    starlight({
      title: 'Markdown & AI-Aided Rapid Documentation Development',
      defaultLocale: 'fr',
      locales,
      sidebar: [
        {
          label: 'Resources',
          translations: {
            fr: 'Ressources',
          },
          autogenerate: { directory: 'Rédaction technique : un processus industriel' },
        },
      ],
    }),
    vercel({
      webAnalytics: {
        enabled: true,
      },
    }),
  ],
});
