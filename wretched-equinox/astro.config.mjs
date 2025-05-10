// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';

// https://astro.build/config
export default defineConfig({
	integrations: [
		starlight({
			title: 'Technical Writing',
			defaultLocale: 'en',
			locales: {
				fr: {
					label: 'Français',
					lang: 'fr',
					title: 'Rédaction technique',
					sidebar: [
						{
							label: 'À propos',
							items: [
								{ slug: 'fr/about-this-blog' },
								{ slug: 'fr/migrate-to-astro' },

							],
						},
					],
				},
				en: {
					label: 'English',
					lang: 'en',
					title: 'Technical Writing',
					sidebar: [
						{
							label: 'About',
							items: [
								{ slug: 'en/about-this-blog' },
								{ slug: 'en/migrate-to-astro' },
							],
						},
					],
				},
			},
			social: [
				{
					icon: 'github',
					label: 'GitHub',
					href: 'https://github.com/olivier-carrere/redaction-technique.org',
				},
			],
		}),
	],
});
