// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';

// https://astro.build/config
export default defineConfig({
	integrations: [
		starlight({
			title: 'Rédaction technique',
      defaultLocale: 'root',
      locales: {
        root: {
          label: 'French',
          lang: 'fr',
        },
      },
			social: [{ icon: 'github', label: 'GitHub', href: 'https://github.com/olivier-carrere/redaction-technique.org' }],
			sidebar: [
				{
					label: 'À propos',
					items: [
						{ slug: 'guides/diminuer-les-couts-ameliorer-la-satisfaction-client' },
					],
				},
				{
					label: 'Processus',
					items: [
						{ slug: 'guides/redaction-technique-un-processus-industriel' },
					],
				},
			
				{
					label: 'Formats',
					items: [
						{ slug: 'guides/format-structure-dita-xml' },
						{ slug: 'guides/mener-un-projet-de-bout-en-bout' },
						{ slug: 'guides/le-coin-du-geek' },
						{ slug: 'guides/a-propos-de-ce-blog' },
						{ slug: 'guides/contact' },
					],
				},
				
			],
		}),
	],
});
