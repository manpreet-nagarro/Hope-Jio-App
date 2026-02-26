import { z } from "zod";

export const pageDetailsSchema = z.object({
  pageName: z.string().min(1, "Page name is required"),
  slug: z.string().min(1, "Slug is required"),
  description: z.string().max(600).optional(),
});

export const seoSchema = z.object({
  seoTitle: z
    .string()
    .max(60, "SEO title must be at most 60 characters")
    .optional(),
  seoPageTitle: z
    .string()
    .max(60, "SEO page title must be at most 60 characters")
    .optional(),
  seoMetaDescription: z.string().max(160).optional(),
  seoTopDescription: z.string().max(160).optional(),
  seoBottomDescription: z.string().max(160).optional(),
  seoMetaKeywords: z.array(z.string().max(50)).optional(),
  canonicalPath: z
    .string()
    .max(100, "Canonical path must be at most 100 characters")
    .optional(),
});

export const pageInfoSchema = z.object({
  pageDetails: pageDetailsSchema,
  seo: seoSchema,
});

export type PageInfoFormValues = z.infer<typeof pageInfoSchema>;
