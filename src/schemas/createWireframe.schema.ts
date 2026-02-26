import { z } from "zod";

export const createWireframeSchema = z
  .object({
    pageName: z
      .string()
      .min(0, "Page name is required"),

    slug: z
      .string()
      .min(0, "Slug is required"),
    platformName: z.string().optional(),

    store: z.string().optional(),

    actionType: z.enum(["NEW", "COPY"]),

    sourceWireframe: z.object({
      wireframeId: z.string(),
      wireframeName: z.string(),
      status: z.string().optional(),
      slug: z.string().optional(),
      platform: z.string().optional(),
      store: z.string().optional(),
    }).nullable().optional(),

    sourceWireframeId: z.string().optional(),
  })
  .superRefine((data, ctx) => {
    if ( data.actionType === "NEW" ) {
      if ( !data.pageName ) {
        ctx.addIssue({
          path: ["pageName"],
          message: "Page name is required for New Page",
          code: z.ZodIssueCode.custom,
        })
      }

      if ( !data.slug ) {
        ctx.addIssue({
          path: ["slug"],
          message: "Slug is required for New Page",
          code: z.ZodIssueCode.custom,
        })
      }

      if ( !data.platformName ) {
        ctx.addIssue({
          path: ["platformName"],
          message: "Platform is required for New Page",
          code: z.ZodIssueCode.custom,
        })
      }

      if ( !data.store ) {
        ctx.addIssue({
          path: ["store"],
          message: "Store is required for New Page",
          code: z.ZodIssueCode.custom,
        })
      }
    }

    if ( data.actionType === "COPY" ) {
      if ( !data.sourceWireframe) {
        ctx.addIssue({
          path: ["sourceWireframe"],
          message: "Please select a page to copy",
          code: z.ZodIssueCode.custom,
        })
      }
    }
  })

export type CreateWireframeFormData = z.infer<
  typeof createWireframeSchema
>;
