import { defineCollection, z } from 'astro:content';
import { docsLoader, i18nLoader } from '@astrojs/starlight/loaders';
import { docsSchema, i18nSchema } from '@astrojs/starlight/schema';

// The 7 goal-based entry points on the /learn, /process, /docs-as-code,
// /structured-authoring, /tools-and-formats, /toolkit, /reference landing pages.
export const GOALS = [
	'learn',
	'process',
	'docs-as-code',
	'structured-authoring',
	'tools-and-formats',
	'toolkit',
	'reference',
] as const;

export const collections = {
	docs: defineCollection({
		loader: docsLoader(),
		schema: docsSchema({
			extend: z.object({
				tags: z.array(
				z.string().transform(tag =>
					tag.toLowerCase().trim().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '')
				)
			).optional(),
				// Drives the goal-based landing pages (BrowseAll-style curation by
				// reader intent) without moving files between content folders.
				goal: z.array(z.enum(GOALS)).optional(),
				// Which section-set (src/components/content-sections/) a page uses.
				// Populated per-page during the content retrofit, not guessed in bulk.
				contentType: z.enum(['concept', 'task', 'reference']).optional(),
				// Only set where a page genuinely depends on a prior one having been read.
				prerequisites: z.array(z.string()).optional(),
			}),
		}),
	}),
	i18n: defineCollection({ loader: i18nLoader(), schema: i18nSchema() }),
};
