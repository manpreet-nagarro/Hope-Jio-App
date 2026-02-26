import { z } from "zod";

export const singleScheduleSchema = z.object({
  startDateTime: z.date().optional(),
  endDateTime: z.date().optional(),
});

export const slotsSchema = z.object({
  slotType: z.string().min(1, "Slot type is required"),
  schedules: z
    .array(singleScheduleSchema)
    .max(10, "Maximum of 10 schedules allowed")
    .optional(),
});

export const componentsSchema = z.object({
  userCohort: z.array(z.string()).optional(),
  schedules: z
    .array(singleScheduleSchema)
    .max(10, "Maximum of 10 schedules allowed")
    .optional(),
  abTestTags: z.array(z.string()).optional(),
  ctaLink: z.string().optional(),

  __isActive: z.boolean().optional(),
});

export const configurationSchema = z
  .object({
    slotsSchema,
    componentsSchema,
  })
  .superRefine((data, ctx) => {
    if (data.componentsSchema?.__isActive) {
      if (!data.componentsSchema.userCohort?.length) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "User cohort is required",
          path: ["componentsSchema", "userCohort"],
        });
      }
    }
  });

export type ConfigurationFormValues = z.infer<typeof configurationSchema>;
