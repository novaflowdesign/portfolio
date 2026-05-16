import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const projects = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/projects' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    date: z.coerce.date(),
    tags: z.array(z.string()).default([]),
    thumbnail: z.string().optional(),
    link: z.string().url().optional(),
    featured: z.boolean().default(false),
    deliverables: z.array(z.string()).default([]),
    gallery: z.array(z.string()).default([]),
  }),
});

export const collections = { projects };
