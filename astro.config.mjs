// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import mdx from '@astrojs/mdx';
import astroExpressiveCode from 'astro-expressive-code';
import sitemap from '@astrojs/sitemap';
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
    sitemap(),
    astroExpressiveCode(),
    mdx(),
    starlight({
      title: 'Redaction-technique.org',
      customCss: ['./src/styles/custom.css'],
      components: {
        Head: './src/components/Head.astro',
        PageTitle: './src/components/PageTitle.astro',
      },
      lastUpdated: true,
      defaultLocale: 'en',
      locales,
      sidebar: [
        {
          label: '✍ Blog — redaction-technique.org',
          link: 'https://redaction-technique.org/',
          attrs: { target: '_blank', rel: 'noopener' },
        },
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
