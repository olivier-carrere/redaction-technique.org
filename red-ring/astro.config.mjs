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
					label: 'Rédaction technique',
					items: [
						{ slug: 'techwriting/diminuer-les-couts-ameliorer-la-satisfaction-client' },					
						{ slug: 'techwriting/de-la-redaction-a-la-communication-technique' },
						{ slug: 'techwriting/les-trois-niveaux-de-la-documentation-technique' },
						{ slug: 'techwriting/principe-de-simplicite-kiss' },
						{ slug: 'techwriting/formats-et-outils' },
					],
				},
			
				{
					label: 'Formats structurés',
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
