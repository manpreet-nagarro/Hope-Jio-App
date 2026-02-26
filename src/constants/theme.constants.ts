export const FONTS = {
  FONT_FAMILY:
    'JioType, system-ui, -apple-system, "Segoe UI", Roboto, Avenir, Helvetica, Arial, sans-serif',
  FONT_FAMILY_LIGHT:
    '"JioType-Light", JioType, system-ui, -apple-system, "Segoe UI", Roboto, Avenir, Helvetica, Arial, sans-serif',
  FONT_FAMILY_LIGHT_ITALIC:
    '"JioType-Light-Italic", JioType, system-ui, -apple-system, "Segoe UI", Roboto, Avenir, Helvetica, Arial, sans-serif',
  FONT_FAMILY_MEDIUM_ITALIC:
    '"JioType-Medium-Italic", JioType, system-ui, -apple-system, "Segoe UI", Roboto, Avenir, Helvetica, Arial, sans-serif',
  FONT_FAMILY_BOLD:
    '"JioType-Bold", JioType, system-ui, -apple-system, "Segoe UI", Roboto, Avenir, Helvetica, Arial, sans-serif !important',
};

// Color Palette
export const COLORS = {
  TEXT_BLACK: "#000000",
  TEXT_DARK_LIGHT: "#000000A6",
  PLACEHOLDER_TEXT: "#7B7B7B",
  BORDER_LIGHT: "#e0e0e0",
  BORDER_MEDIUM: "#c9c9c9",
  BORDER_DASHED: "#b5b5b5",
  BG_LIGHT: "#f5f5f5",
  BG_LIGHTER: "#f1f3fb",
  BG_LIGHTER_TRANSPARENT: "#f1f3fbb2",
  BG_COMPONENT_ID: "#e4e8f6",
  BG_SLOT: "#FAFAFA",
  BG_HOVER: "#f8f8f8",
  TEXT_PRIMARY: "#4b4b4b",
  TEXT_SECONDARY: "#595959",
  TEXT_DARK: "#141414",
  TEXT_MUTED: "#b5b5b5",
  LINK: "#1a73e8",
  TEXT_DANGER: "#F50031",
  TEXT_DANGER_SECONDARY: "#E53935",
  ACCENT_PRIMARY: "#3535F3",
  ACCENT_PRIMARY_HOVER: "#2525E3",
  ACCENT_PRIMARY_ACTIVE: "#1515D3",
  ACCENT_SECONDARY: "#1565C0",
  ACCENT_HOVER_BG: "#D0E0FF",
  STATUS_BG: "#C9C9C9",
  STATUS_TEXT: "#A8A8A8",
  DIVIDER: "#ebebeb",
  SHADOW_COLOR: "#00000014",
  SHADOW_COLOR_DARK: "#00000040",
  SHADOW_BUTTON: "rgba(0,0,0,0.08)",
  SHADOW_BUTTON_HOVER: "rgba(0,0,0,0.12)",
  WHITE: "#ffffff",
  TOOLTIP_BG: "#061951",
  TOOLTIP_TEXT: "#ffffff",
  BREADCRUMB_LINK_COLOR: "#3D3D3D8A",
  BORDER_LIGHTER: "#E7E7E7",
  BACKGROUND_LIGHTER: "#F8F9FD",
  ACCENT_PURPLE: "#F0E8FA",
  ACCENT_PURPLE_DARK: "#6D17CE",
  ACCENT_GREEN: "#E5F7EE",
  ACCENT_GREEN_DARK: "#03753C",
  ACCENT_ORANGE: "#FEF2E9",
  ACCENT_ORANGE_DARK: "#E65100",
  ACCENT_GREY: "#F5F5F5",
  ACCENT_GREY_DARK: "#595959",
  ACCENT_RED: "#F7E5E9",
  ACCENT_RED_DARK: "#AA0023",
} as const;

// Spacing
export const SPACING = {
  XXS: "0.125rem", // 2px
  XS: "0.25rem", // 4px
  SM: "0.5rem", // 8px
  MD: "1rem", // 16px
  LG: "1.5rem", // 24px
  XL: "2rem", // 32px
  XXL: "1.5rem", // 24px (duplicate of LG, consider using LG instead)
  CALC_FULL_MINUS_32: "calc(100% - 2rem)",
  CALC_FULL_MINUS_16: "calc(100% - 1rem)",
  WIDTH_FULL: "100%",
} as const;

// Border Radius
export const BORDER_RADIUS = {
  SMALL: "0.375rem", // 6px
  TINY: "0.25rem", // 4px
  MEDIUM: "0.625rem", // 10px
  MEDIUM_LARGE: "0.5rem", // 8px
  LARGE: SPACING.LG, // 1.5rem (24px)
  ROUND: "50%",
  PILL: "62.5rem", // 1000px
  BORDER_TOP_LEFT_MEDIUM: "0.5625rem", // 9px
  BORDER_BOTTOM_RIGHT_MEDIUM: "0.5rem", // 8px
  STATUS_BAR_BOTTOM: "1.25rem", // 20px
  STATUS_BAR_PILL: "6.25rem", // 100px
  DOT_SIZE: "0.0625rem", // 1px
} as const;

// Typography
export const TYPOGRAPHY = {
  VARIANT1: {
    fontWeight: 500,
    fontSize: "0.875rem",
    letterSpacing: "-0.08px",
  },
  VARIANT2: {
    fontFamily: FONTS.FONT_FAMILY,
    fontWeight: 400,
    fontSize: "0.8125rem",
    letterSpacing: "0px",
  },
  SMALL: {
    fontWeight: 500,
    fontSize: "0.75rem",
  },
} as const;

// Shadows
export const SHADOWS = {
  MENU: `0px 4px 16px 0px ${COLORS.SHADOW_COLOR}`,
  FRAME: `0px 25px 50px -12px ${COLORS.SHADOW_COLOR_DARK}`,
  HOVER: `0px 2px 8px 0px ${COLORS.SHADOW_COLOR}`,
  BUTTON: `0px 4px 12px ${COLORS.SHADOW_COLOR}`,
} as const;

// Sizes
export const SIZES = {
  DESKTOP_FRAME_WIDTH: "45.875rem", // 734px
  MOBILE_FRAME_WIDTH: "23.4375rem", // 375px
  MOBILE_FRAME_MIN_HEIGHT: "42.125rem", // 674px
  STATUS_BAR_WIDTH: "7.5rem", // 120px
  STATUS_BAR_HEIGHT: "1.75rem", // 28px
  ICON_SIZE_SMALL: BORDER_RADIUS.MEDIUM, // 10px
  ICON_SIZE_MEDIUM: SPACING.MD, // 16px
  SLOT_MIN_HEIGHT: "5rem", // 80px
  SLOT_BLANK_HEIGHT: "6.5625rem", // 105px
  ROUNDED_BOX_SIZE: "3rem", // 48px
  ROUNDED_BOX_INNER_SIZE: SPACING.LG, // 24px
  MIN_SLOT_WIDTH: "9.375rem", // 150px
  MIN_WIDTH_72: "4.5rem", // 72px
  STATUS_BAR_LINE_WIDTH: "3.75rem", // 60px
  STATUS_BAR_LINE_HEIGHT: "0.375rem", // 6px
  STATUS_BAR_POSITION: "0.125rem", // 2px
  BUTTON_SIZE_SMALL: "0.75rem", // 12px
  URL_HOVER_MAX_HEIGHT: "5.25rem",
  URL_HOVER_MAX_WIDTH: "16.625rem", // 266px
  CANVAS_BOTTOM: SPACING.LG, // 24px
  CANVAS_RIGHT: "2.5rem", // 40px
  MENU_TOP: "2.1875rem", // 35px
  INPUT_WIDTH: "10.75rem", // 172px
  BORDER_WIDTH_THICK: "0.125rem", // 2px
  BUTTON_MIN_WIDTH: "2.5rem", // 40px
  CANVAS_WIDTH: "93.75rem", // 1500px
  CANVAS_MAX_WIDTH: "100%",
  MIN_SLOT_HEIGHT: "105px",
} as const;

// Z-Index
export const Z_INDEX = {
  BASE: 1,
  DROPDOWN: 2,
  MODAL: 5,
  CANVAS_CONTROLS: 10,
} as const;

// Transitions
export const TRANSITIONS = {
  FAST: "all 0.2s",
  DEFAULT: "all 0.3s ease",
} as const;
