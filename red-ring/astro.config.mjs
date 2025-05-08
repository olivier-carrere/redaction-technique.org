// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';

// https://astro.build/config
export default defineConfig({
	integrations: [
		starlight({
			title: 'Rédaction technique',
			social: [{ icon: 'github', label: 'GitHub', href: 'https://github.com/withastro/starlight' }],
			sidebar: [
				{
					label: 'Guides',
					items: [
						// Each item here is one entry in the navigation menu.
						{ slug: 'guides/diminuer-les-couts-ameliorer-la-satisfaction-client' },
						{ slug: 'guides/redaction-technique-un-processus-industriel' },
						{ slug: 'guides/format-structure-dita-xml' },
						{ slug: 'guides/mener-un-projet-de-bout-en-bout' },
						{ slug: 'guides/le-coin-du-geek' },
						{ slug: 'guides/a-propos-de-ce-blog' },
						{ slug: 'guides/contact' },
					],
				},
				{
					label: 'Reference',
					autogenerate: { directory: 'reference' },
				},
			],
		}),
	],
});
