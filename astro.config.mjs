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
      title: 'Redaction-technique.org',
      defaultLocale: 'en',
      locales,
      sidebar: [
        {
          label: 'Technical writing: An industrial process',
          translations: {
            fr: 'Rédaction technique : un processus industriel',
          },
          autogenerate: { directory: 'tech-writing-process' },
        },
        {
          label: 'Technology watch',
          translations: {
            fr: 'Veille technologique',
          },
          autogenerate: { directory: 'veille' },
        },
        {
          label: 'Structured DITA XML format',
          translations: {
            fr: 'Format structuré DITA XML',
          },
          autogenerate: { directory: 'formats' },
        },
        {
          label: 'Reduce costs, increase customer satisfaction',
          translations: {
            fr: 'Diminuer les coûts, augmenter la satisfaction client',
          },
          autogenerate: { directory: 'costs' },
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
