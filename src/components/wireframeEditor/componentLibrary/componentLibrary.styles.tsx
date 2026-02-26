import { COLORS, FONTS } from "@constants/theme.constants";
import { Accordion, AccordionDetails, AccordionSummary, Box, Drawer, Typography } from "@mui/material";
import { styled as MuiStyled } from "@mui/material/styles";

export const SIDEBAR_EXPANDED_WIDTH = 290;
export const SIDEBAR_COLLAPSED_WIDTH = 64;

export const ComponentDrawer = MuiStyled(Drawer, {
  shouldForwardProp: (prop) => prop !== "isCollapsed",
})<{ isCollapsed: boolean; }>(({ isCollapsed }) => ({
  flexShrink: 0,
  whiteSpace: "nowrap",
  height: "100%",

  "& .MuiDrawer-paper": {
    width: isCollapsed ? SIDEBAR_COLLAPSED_WIDTH : "inherit",
    transition: "width 0.25s ease",
    height: "100%",
    overflowX: "hidden",
    borderRight: "1px solid #E0E0E0",
    position: "relative",
    backgroundColor: "transparent",
    boxShadow: "none",
    background: "transparent",
  },
}));

export const DrawerHeader = MuiStyled(Box, {
  shouldForwardProp: (prop) => prop !== "isCollapsed",
})<{ isCollapsed: boolean }>(({ isCollapsed }) => ({
  height: 90,
  padding: "0 16px",
  display: "flex",
  alignItems: "center",
  justifyContent: isCollapsed ? "center" : "space-between",

  "& .MuiSvgIcon-root": {
    color: "#141414",
  }
}));

export const CollapsedLabel = MuiStyled(Box)(() => ({
  writingMode: "vertical-rl",
  transform: "rotate(180deg)",
  fontSize: 14,
  letterSpacing: "0.08em",
  color: COLORS.TEXT_SECONDARY,
  fontFamily: FONTS.FONT_FAMILY,
}));

export const CollapsedContainer = MuiStyled(Box)(() => ({
  height: "100vh",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  gap: 12,
}));

export const IconBox = MuiStyled(Box)(() => ({
  position: "absolute",
  top: 8,
  left: 8,

  "& .MuiSvgIcon-root": {
    color: "#141414",
  }
}));

export const SearchWrapper = MuiStyled(Box)(() => ({
  padding: "16px 16px 16px",
  borderRadius: "10px",
  color: "E0E0E0",

  "& .MuiOutlinedInput-root": {
    background: COLORS.WHITE,
    borderRadius: "10px",
    color: COLORS.PLACEHOLDER_TEXT,
    fontSize: "0.875rem",
    border: "none",

    "& .MuiOutlinedInput-notchedOutline": {
      borderColor: COLORS.BORDER_LIGHT,
    },

    "&:hover .MuiOutlinedInput-notchedOutline": {
      borderColor: COLORS.BORDER_LIGHT,
    },

    "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
      borderColor: COLORS.ACCENT_PRIMARY,
      borderWidth: "1.5px",
    },
  }
}));

export const ScrollContainer = MuiStyled(Box)(() => ({
  flex: 1,
  overflowY: "auto",
  maxHeight: "calc(100vh - 170px)",
}));

export const StyledAccordion = MuiStyled(Accordion)(() => ({
  boxShadow: "none",
  backgroundColor: "transparent",
  "&::before": {
    display: "none",
  },
}));

export const StyledAccordionSummary = MuiStyled(AccordionSummary)(
  () => ({
    padding: "0 16px",
    fontWeight: 600,
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    minHeight: "40px !important",

    "& svg":{
      color: COLORS.ACCENT_PRIMARY
    },


    "& .MuiAccordionSummary-content": {
      margin: "0 !important",
      display: "flex",
      alignItems: "center",
      gap: 8,
    },

    "& .MuiAccordionSummary-content.Mui-expanded": {
      margin: "0 !important",
    },
  })
);

export const StyledAccordionDetails = MuiStyled(AccordionDetails)(
  () => ({
    padding: "8px 16px 16px",
  })
);

export const GroupHeader = MuiStyled(Box)(() => ({
  display: "flex",
  alignItems: "center",
  gap: 8,
  padding: "12px 16px 8px 0",
}));

export const GroupGrid = MuiStyled(Box)(() => ({
    display: "grid",
    gap: 8,
    gridTemplateColumns: "repeat(2, 1fr)",
    gridAutoRows: "120px",
}));

export const CardContent = MuiStyled(Box)(() => ({
    display: "flex",
    gap: 8,
    flexDirection: "column",
    alignItems: "center",
    height: "100%",
    justifyContent: "center",
}));

export const ComponentCard = MuiStyled(Box, {
  shouldForwardProp: (prop) => prop !== "canDrag",
})<{
  canDrag?: boolean;
}>(({ canDrag }) => ({
  padding: "8px 12px",
  borderRadius: 8,
  border: "1px solid #E6E8EC",
  fontSize: 14,
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  gap: 8,
  backgroundColor: "#FFFFFF",
  justifyContent: "space-between",
  width: 113,
  overflow: "hidden",
  cursor: canDrag ? "grab" : "default",
  ...(canDrag && {
    '&:hover': {
      backgroundColor: '#F1F3F6',
    },
  }),
}));

export const ComponentIcon = MuiStyled("img")(()=>({
  objectFit: "contain",
  flexShrink: 0,
  margin: "auto"
}))

export const ComponentLabel = MuiStyled(Typography)(()=>({
  fontSize: 12,
  textAlign: "left",
  color: COLORS.TEXT_DARK,
  lineHeight: "16px",
  display: "-webkit-box",
  WebkitLineClamp: 2,
  WebkitBoxOrient: "vertical",
  overflow: "hidden",
  textOverflow: "ellipsis",
  wordBreak: "break-word",
  overflowWrap: "break-word",
  whiteSpace: "normal",
  boxSizing: "border-box",
  maxHeight: "32px",
  width: "100%",
  margin: 0,
}))

export const CategoryTitle = MuiStyled(Typography)(()=>({
  fontFamily: FONTS.FONT_FAMILY,
  fontSize: "16px",
  lineHeight: "24px",
  letterSpacing: "-0.31px",
  color: "#3535F3",
}))
