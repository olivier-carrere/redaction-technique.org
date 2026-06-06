import { defineCollection, z } from 'astro:content';
import { docsLoader } from '@astrojs/starlight/loaders';
import { docsSchema } from '@astrojs/starlight/schema';

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
			}),
		}),
	}),
};
