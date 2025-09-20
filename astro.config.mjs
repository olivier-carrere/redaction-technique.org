// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import mdx from '@astrojs/mdx';
import astroExpressiveCode from 'astro-expressive-code';
import vercel from '@astrojs/vercel';

const site = 'https://docs.redaction-technique.org/';

export const locales = {
  en: { label: 'English', lang: 'en' },
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
          label: 'Technical writing: An industrial process',
          translations: {
            fr: 'Rédaction technique : un processus industriel',
          },
          autogenerate: { directory: 'process' },
        },
        {
          label: 'Technology watch',
          translations: {
            fr: 'Veille technologique',
          },
          autogenerate: { directory: 'veille' },
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
