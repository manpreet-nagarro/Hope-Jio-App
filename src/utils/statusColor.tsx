import { COLORS } from "@constants/theme.constants";

export type WireframeStatus =
  | "Pg. Draft"
  | "Pg. Approved"
  | "Pg. In Review"
  | "Pg. Archived"
  | "Pg. Published"
  | "Pg. Rejected"
  | "Sent to CMS";

export const STATUS_COLOR_MAP: Record<
  WireframeStatus,
  { bg: string; text: string }
> = {
  "Pg. Draft": {
    bg: COLORS.ACCENT_PURPLE,
    text: COLORS.ACCENT_PURPLE_DARK,
  },
  "Pg. Approved": {
    bg: COLORS.ACCENT_GREEN,
    text: COLORS.ACCENT_GREEN_DARK,
  },
  "Pg. In Review": {
    bg: COLORS.ACCENT_ORANGE,
    text: COLORS.ACCENT_ORANGE_DARK,
  },
  "Pg. Archived": {
    bg: COLORS.ACCENT_GREY,
    text: COLORS.ACCENT_GREY_DARK,
  },
  "Pg. Published": {
    bg: COLORS.ACCENT_GREEN,
    text: COLORS.ACCENT_GREEN_DARK,
  },
   "Pg. Rejected": {
    bg: COLORS.ACCENT_RED,
    text: COLORS.ACCENT_RED_DARK,
  },
  "Sent to CMS": {
   bg: COLORS.ACCENT_GREEN,
    text: COLORS.ACCENT_GREEN_DARK,
  },
};