import { UI_TEXTS } from "@constants/text.constants";
import { z } from "zod";

const isoDateString = z
  .string()
  .refine((val) => !val || !Number.isNaN(Date.parse(val)), {
    message: UI_TEXTS.URL_MODAL_TEXT.INVALID_DATE_FORMAT,
  });

export const urlFormSchema = z
  .object({
    id: z.union([z.string(), z.number()]).nullable(),
    wireframeName: z.string().min(1, UI_TEXTS.URL_MODAL_TEXT.PAGE_NAME_REQUIRED),
    wireframeId: z.string().min(1, UI_TEXTS.URL_MODAL_TEXT.PAGE_ID_REQUIRED),
    slug: z.string().min(1, UI_TEXTS.URL_MODAL_TEXT.SLUG_REQUIRED),
    platform: z.string().min(1, UI_TEXTS.URL_MODAL_TEXT.PLATFORM_REQUIRED),
    store: z.string().min(1, UI_TEXTS.URL_MODAL_TEXT.STORE_REQUIRED),
    userCohorts: z.array(z.string()).optional(),
    isScheduled: z.boolean().optional(),
    scheduleStart: z
      .union([z.date(), isoDateString.or(z.literal("")).nullable()])
      .nullable()
      .optional(),
    scheduleEnd: z
      .union([z.date(), isoDateString.or(z.literal("")).nullable()])
      .nullable()
      .optional(),
  })
  .superRefine((data, ctx) => {
    if (data.isScheduled) {
      if (!data.scheduleStart) {
        ctx.addIssue({
          code: "custom",
          path: ["scheduleStart"],
          message: UI_TEXTS.URL_MODAL_TEXT.START_REQUIRED_WHEN_SCHEDULED,
        });
      }
      if (!data.scheduleEnd) {
        ctx.addIssue({
          code: "custom",
          path: ["scheduleEnd"],
          message: UI_TEXTS.URL_MODAL_TEXT.END_REQUIRED_WHEN_SCHEDULED,
        });
      }
    }
  });

export type URLFormData = z.infer<typeof urlFormSchema>;
