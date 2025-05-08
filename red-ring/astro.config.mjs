// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';

// https://astro.build/config
export default defineConfig({
	integrations: [
		starlight({
			title: 'My Docs',
			social: [{ icon: 'github', label: 'GitHub', href: 'https://github.com/withastro/starlight' }],
			sidebar: [
				{
					label: 'Guides',
					items: [
						// Each item here is one entry in the navigation menu.
						{ label: 'Example Guide', slug: 'guides/example' },
						{ label: 'Example aGuide', slug: 'guides/diminuer-les-couts-ameliorer-la-satisfaction-client' },
						{ label: 'Example Gcuide', slug: 'guides/redaction-technique-un-processus-industriel' },
						{ label: 'Example Guide', slug: 'guides/format-structure-dita-xml' },
						{ label: 'Example Guide', slug: 'guides/mener-un-projet-de-bout-en-bout' },
						{ label: 'Example Guide', slug: 'guides/le-coin-du-geek' },
						{ label: 'Example Guide', slug: 'guides/a-propos-de-ce-blog' },
						{ label: 'Example Guidsse', slug: 'guides/contact' },
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
