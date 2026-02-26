import { Box, Button } from "@mui/material";
import styled from "styled-components";
import {
  COLORS,
  SPACING,
  BORDER_RADIUS,
  TYPOGRAPHY,
  SHADOWS,
  SIZES,
  TRANSITIONS,
  Z_INDEX,
  FONTS,
} from "../../constants/theme.constants";
import { PLATFORMS } from "@constants/commonConstants";

export const CanvasWrapper = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  padding: ${SPACING.LG};
  width: 100%;
`;

export const MobileSlotsContentWrapper = styled.div`
  padding: ${SPACING.XS} ${SPACING.MD};
  width: ${SPACING.WIDTH_FULL};

  > *:not(:first-child) {
    margin-top: ${SPACING.SM};
  }
`;

export const DisabledSlotWrapper = styled.div`
  border: 1px solid ${COLORS.BORDER_LIGHT};
  padding: ${SPACING.SM} ${SPACING.MD};
  border-radius: ${BORDER_RADIUS.MEDIUM};
  display: flex;
  justify-content: space-between;
  overflow: auto;
  gap: ${SPACING.SM};
  scrollbar-width: none;

  &::-webkit-scrollbar {
    display: none;
  }
`;

export const GridWrapper = styled.div`
  display: grid;
  gap: ${BORDER_RADIUS.SMALL};
  width: 100%;
  justify-content: center;
  text-align: center;
`;

// Deprecated: This component appears to be unused. Consider removing.
export const FixedTypeSot1 = styled.div`
  border: 1px solid ${COLORS.BORDER_LIGHT};
  padding: ${SPACING.SM} ${SPACING.MD};
  border-radius: ${BORDER_RADIUS.MEDIUM};
  width: 100%;
`;

export const RoundedBoxItem = styled.div`
  width: ${SIZES.ROUNDED_BOX_SIZE};
  height: ${SIZES.ROUNDED_BOX_SIZE};
  border: 1px solid ${COLORS.BORDER_LIGHT};
  background: ${COLORS.BG_LIGHT};
  border-radius: ${BORDER_RADIUS.ROUND};
  position: relative;

  &::before {
    content: "";
    position: absolute;
    width: ${SIZES.ROUNDED_BOX_INNER_SIZE};
    height: ${SIZES.ROUNDED_BOX_INNER_SIZE};
    background: ${COLORS.BORDER_MEDIUM};
    border-radius: ${BORDER_RADIUS.ROUND};
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
`;

export const TypographyVariant1 = styled.span`
  font-family: ${FONTS.FONT_FAMILY};
  font-size: ${TYPOGRAPHY.VARIANT1.fontSize};
  letter-spacing: ${TYPOGRAPHY.VARIANT1.letterSpacing};
  color: ${COLORS.TEXT_PRIMARY};
`;

// Deprecated: use TypographyVariant1 instead
export const TypopraphyVariant1 = TypographyVariant1;

export const BoxVariant1 = styled.div`
  border: 1px solid ${COLORS.BORDER_LIGHT};
  background: ${COLORS.BG_LIGHT};
  padding: 13px ${SPACING.SM};
  border-radius: ${BORDER_RADIUS.MEDIUM};
  width: max-content;
  display: flex;
  min-width: ${SIZES.MIN_WIDTH_72};
  align-items: center;
  justify-content: center;
`;

export const TypographyVariant2 = styled.span`
  font-family: ${FONTS.FONT_FAMILY};
  font-size: ${TYPOGRAPHY.VARIANT2.fontSize};
  letter-spacing: ${TYPOGRAPHY.VARIANT2.letterSpacing};
  color: ${COLORS.TEXT_PRIMARY};
  width: max-content;
`;

// Deprecated: use TypographyVariant2 instead
export const TypopraphyVariant2 = TypographyVariant2;

export const SlotWrapper = styled(Box)({
  border: `1px solid ${COLORS.BORDER_MEDIUM}`,
  borderRadius: BORDER_RADIUS.MEDIUM_LARGE,
  padding: SPACING.SM,
  marginBottom: SPACING.MD,
  backgroundColor: COLORS.BG_SLOT,
  position: "relative",
});

export const SlotComponentWrapper = styled(Box)({
  borderRadius: BORDER_RADIUS.MEDIUM_LARGE,
  padding: SPACING.SM,
  backgroundColor: COLORS.BG_SLOT,
  position: "relative",
  display: "flex",
  overflow: "visible",
  gap: SPACING.SM,
  alignItems: "stretch",
});

export const DragHandle = styled(Box)({
  cursor: "grab",
  userSelect: "none",
  fontWeight: 600,
  marginBottom: SPACING.SM,
  display: "flex",
  alignItems: "center",
  gap: SPACING.SM,
  width: "max-content",
});

export const ItemsRow = styled(Box)({
  display: "flex",
  gap: SPACING.SM,
});

export const ItemBox = styled(Box)({
  padding: `0.75rem ${SPACING.MD}`,
  backgroundColor: COLORS.BORDER_LIGHT,
  borderRadius: BORDER_RADIUS.SMALL,
  cursor: "grab",
  userSelect: "none",
  height: "max-content",
});

export const SlotIdBox = styled(Box)({
  position: "absolute",
  top: 0,
  left: 0,
  background: COLORS.BG_LIGHT,
  borderTopLeftRadius: BORDER_RADIUS.BORDER_TOP_LEFT_MEDIUM,
  borderBottomRightRadius: BORDER_RADIUS.MEDIUM_LARGE,
  padding: `${SPACING.XXS} ${BORDER_RADIUS.SMALL}`,
  fontFamily: FONTS.FONT_FAMILY,
  fontSize: TYPOGRAPHY.SMALL.fontSize,
  color: COLORS.TEXT_SECONDARY
});

export const SlotItemTitleBox = styled(Box)({
  padding: `${SPACING.XXS} 0 ${SPACING.XXS} 1.375rem`,
  display: "flex",
  justifyContent: "space-between",
});

export const IconButtonNoPadding = styled(Button)({
  minWidth: "0 !important",

  padding: 0,

  width: "auto",

  height: "auto",

  lineHeight: 0,

  borderRadius: 0,

  textTransform: "capitalize",
});

export const AddSlotButton = styled(Button)({
  "&&": {
    minWidth: 0,
    padding: `${SPACING.XS} ${SPACING.MD}`,
    width: "auto",
    height: "auto",
    borderRadius: BORDER_RADIUS.PILL,
    background: COLORS.ACCENT_PRIMARY,
    display: "flex",
    justifySelf: "center",
    gap: SPACING.SM,
    fontFamily: FONTS.FONT_FAMILY_BOLD,
    fontSize: "1rem",
    color: COLORS.WHITE,
    textTransform: "capitalize",
    transition: TRANSITIONS.DEFAULT,
    marginBottom: "1.5rem",
    "&:hover": {
      background: COLORS.ACCENT_PRIMARY,
      opacity: 0.9,
    },
    "&:focus": {
      outline: `2px solid ${COLORS.ACCENT_PRIMARY}`,
      outlineOffset: "2px",
    },
  },
});

export const SlotBox = styled.div`
  min-height: ${SIZES.SLOT_MIN_HEIGHT};
  background: ${COLORS.WHITE};
  border-radius: ${BORDER_RADIUS.MEDIUM};
  padding: ${SPACING.SM};
  display: flex;
  gap: ${SPACING.SM};
`;

export const BlankSlotBox = styled.div`
  flex: 1;
  minHeight: ${SIZES.SLOT_BLANK_HEIGHT};
  background: ${COLORS.BG_LIGHTER_TRANSPARENT};
  border: 1px dashed ${COLORS.BORDER_DASHED};
  border-radius: ${BORDER_RADIUS.MEDIUM};
  padding: ${SPACING.SM};
  display: flex;
  gap: ${SPACING.SM};
  align-items: center;
  justify-content: center;
  font-weight: 500;
  font-size: ${TYPOGRAPHY.SMALL.fontSize};
  color: ${COLORS.TEXT_MUTED};
  width: ${SPACING.CALC_FULL_MINUS_16};
`;

export const TitleChangeWrapper = styled.div`
  margin-top: ${SPACING.SM};
  font-weight: 500;
  font-size: ${TYPOGRAPHY.VARIANT1.fontSize};
  cursor: pointer;
  margin-left: ${SPACING.MD};
  margin-right: ${SPACING.MD};
  text-align: center;
`;

export const SlotComponentItemWrapper = styled.div`
  border: 1px solid ${COLORS.BORDER_LIGHT};
  background: ${COLORS.BG_LIGHTER};
  border-radius: ${BORDER_RADIUS.MEDIUM};
  position: relative;
  padding: ${SPACING.MD};
  min-width: ${SIZES.MIN_SLOT_WIDTH};
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
`;

export const SlotComponentIdBox = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  background: ${COLORS.BG_COMPONENT_ID};
  padding: ${SPACING.XXS} ${BORDER_RADIUS.SMALL};
  border-top-left-radius: ${BORDER_RADIUS.BORDER_TOP_LEFT_MEDIUM};
  border-bottom-right-radius: ${BORDER_RADIUS.MEDIUM_LARGE};
  font-size: ${TYPOGRAPHY.SMALL.fontSize};
  font-family: ${FONTS.FONT_FAMILY_LIGHT};
  color: ${COLORS.TEXT_DARK};
`;

export const ComponentCloseButton = styled.button`
  position: absolute;
  right: ${SPACING.XS};
  top: ${SPACING.XS};
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  z-index: 1;
  background: transparent;
  border: none;
  padding: 0;
  outline: none;
  transition: ${TRANSITIONS.FAST};

  &:hover {
    opacity: 0.7;
  }

  &:active {
    opacity: 0.5;
  }
`;

export const ComponentAddButton = styled.button`
  position: absolute;
  right: 0;
  padding: ${SPACING.XS};
  top: 50%;
  transform: translate(50%, -50%);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  background: ${COLORS.ACCENT_PRIMARY};
  border-radius: ${BORDER_RADIUS.ROUND};
  border: 1px solid ${COLORS.BORDER_LIGHT};
  width: ${SPACING.MD};
  height: ${SPACING.MD};
  box-shadow: 0 0.125rem 0.375rem ${COLORS.SHADOW_BUTTON};
  color: ${COLORS.WHITE};
  transition: ${TRANSITIONS.FAST};

  &:hover {
    background: ${COLORS.ACCENT_PRIMARY_HOVER};
    box-shadow: 0 0.1875rem 0.5rem ${COLORS.SHADOW_BUTTON_HOVER};
  }

  &:active {
    background: ${COLORS.ACCENT_PRIMARY_ACTIVE};
  }
`;

export const ComponentMenuWrapper = styled.div`
  position: absolute;
  right: 0;
  top: 10%;
  z-index: ${Z_INDEX.MODAL};
`;

export const SlotConfigurationMenuWrapper = styled.div`
  box-shadow: ${SHADOWS.MENU};
  background: ${COLORS.WHITE};
  border-radius: ${SPACING.MD};
  padding: ${SPACING.SM};
  position: absolute;
  left: 90%;
  width: max-content;
  z-index: 2;
  top: ${SIZES.MENU_TOP};
  display: grid;
  gap: ${SPACING.SM};
`;

const baseMenuItemStyles = {
  minWidth: 0,
  padding: SPACING.SM,
  width: "auto",
  height: "auto",
  borderRadius: BORDER_RADIUS.MEDIUM,
  display: "flex",
  gap: SPACING.SM,
  fontWeight: 500,
  fontSize: TYPOGRAPHY.VARIANT1.fontSize,
  justifyContent: "flex-start",
  textTransform: "capitalize" as const,
};

export const SlotConfigurationMenuItemType1 = styled(Button)({
  "&&": {
    ...baseMenuItemStyles,
    background: COLORS.BG_LIGHT,
    color: COLORS.TEXT_SECONDARY,
    "&:hover": {
      background: COLORS.BG_LIGHT,
    },
  },
});

export const UnderlinedBox = styled.div`
  background: ${COLORS.DIVIDER};
  width: 100%;
  height: 1px;
`;

export const SlotConfigurationMenuItemType2 = styled(Button)({
  "&&": {
    ...baseMenuItemStyles,
    background: COLORS.WHITE,
    color: COLORS.TEXT_SECONDARY,
    "&:hover": {
      background: COLORS.WHITE,
    },
  },
});

export const GridWrapper3 = styled.div`
  display: grid;
  gap: ${SPACING.XS};
`;

export const SlotConfigurationMenuItemTypeDanger = styled(Button)({
  "&&": {
    ...baseMenuItemStyles,
    background: COLORS.WHITE,
    color: COLORS.TEXT_DANGER,
    "&:hover": {
      background: COLORS.WHITE,
    },
  },
});

// Deprecated: use SlotConfigurationMenuItemTypeDanger instead
export const SlotConfigurationMenuItemTypeDanger1 = SlotConfigurationMenuItemTypeDanger;

export const FigmaButton = styled(Button)(() => ({
  "&&": {
    minWidth: 0,
    padding: SPACING.XS,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    cursor: "pointer",
    transition: TRANSITIONS.FAST,
    fontSize: TYPOGRAPHY.VARIANT1.fontSize,
    "&:hover": {
      background: "transparent",
      borderColor: "transparent",
    },
    "&:focus": {
      outline: `${SIZES.BORDER_WIDTH_THICK} solid ${COLORS.ACCENT_PRIMARY}`,
      outlineOffset: SIZES.BORDER_WIDTH_THICK,
    },
    "&:active": {
      background: "transparent",
    },
    "& svg": {
      fontSize: TYPOGRAPHY.VARIANT1.fontSize,
      color: "initial",
    },
  },
}));

export const TransformWrapper = styled(Box)({
  transformOrigin: "0 0",
  willChange: "transform",
});

export const CanvasActionsBox = styled(Box)({
  position: "fixed",
  bottom: SPACING.MD,
  right: SPACING.LG,
  display: "flex",
  gap: SPACING.XS,
  zIndex: Z_INDEX.CANVAS_CONTROLS,
  border: `1px solid ${COLORS.BORDER_LIGHT}`,
  borderRadius: BORDER_RADIUS.MEDIUM,
  background: COLORS.WHITE,
  alignItems: "center",
  padding: SPACING.XS,
});

export const MobileFrame = styled(Box)(() => ({
  width: SIZES.MOBILE_FRAME_WIDTH,
  background: COLORS.WHITE,
  borderRadius: "3rem",
  border: `0.1875rem solid ${COLORS.BORDER_MEDIUM}`,
  justifyItems: "center",
  position: "relative",
  minHeight: SIZES.MOBILE_FRAME_MIN_HEIGHT,
  boxShadow: "0px 25px 50px -12px #00000040",
}));

// Accept platformName as a transient prop for styled-components
export const CanvasInnerFrame = styled(Box)<{ $platformName?: string }>(
  ({ $platformName }) => ({
    width: $platformName === PLATFORMS.MOBILE ? SIZES.MOBILE_FRAME_WIDTH : SIZES.DESKTOP_FRAME_WIDTH,
    background: COLORS.WHITE,
    borderRadius: "3rem",
    border: `0.1875rem solid ${COLORS.BORDER_MEDIUM}`,
    justifyItems: "center",
    position: "relative",
    minHeight: SIZES.MOBILE_FRAME_MIN_HEIGHT,
    boxShadow: "0px 25px 50px -12px #00000040",
  })
);

export const StatuBar = styled(Box)(() => ({
  width: SIZES.STATUS_BAR_WIDTH,
  height: SIZES.STATUS_BAR_HEIGHT,
  background: COLORS.STATUS_BG,
  borderBottomLeftRadius: BORDER_RADIUS.STATUS_BAR_BOTTOM,
  borderBottomRightRadius: BORDER_RADIUS.STATUS_BAR_BOTTOM,
  position: "relative",
  "&::before": {
    content: '""',
    position: "absolute",
    width: "3.75rem",
    height: "0.375rem",
    background: COLORS.STATUS_TEXT,
    top: "50%",
    left: "1.4375rem",
    transform: "translateY(-55%)",
    borderRadius: BORDER_RADIUS.STATUS_BAR_PILL,
  },
  "&::after": {
    content: '""',
    position: "absolute",
    width: SIZES.ICON_SIZE_SMALL,
    height: SIZES.ICON_SIZE_SMALL,
    background: COLORS.STATUS_TEXT,
    top: "50%",
    right: "1.4375rem",
    transform: "translateY(-55%)",
    borderRadius: BORDER_RADIUS.ROUND,
  },
}));
export const TitleInput = styled.input`
  border: 1px solid ${COLORS.BORDER_DASHED};
  padding: ${BORDER_RADIUS.SMALL};
  border-radius: ${BORDER_RADIUS.SMALL};
  color: ${COLORS.TEXT_DARK};
  font-size: ${TYPOGRAPHY.VARIANT1.fontSize};
  font-weight: 500;
  font-family: inherit;
  width: 9.375rem;
  cursor: pointer;
  
  &:focus {
    outline: none;
    border-color: ${COLORS.ACCENT_PRIMARY};
    box-shadow: 0 0 ${SPACING.XS} ${COLORS.BG_LIGHTER_TRANSPARENT};
  }
`;

export const BannerTextLabel = styled.span`
  font-family: ${FONTS.FONT_FAMILY};
  font-size: ${TYPOGRAPHY.VARIANT1.fontSize};
  color: ${COLORS.TEXT_SECONDARY};
`

export const TruncatedText = styled.span`
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: normal;
  word-break: break-word;
  overflow-wrap: anywhere;
`;

export const StyledComponentItemButton = styled.div`
  flex: 1;
  min-height: 100%;
  outline: none;
  border: none;
  background: none;
  display: flex;
`