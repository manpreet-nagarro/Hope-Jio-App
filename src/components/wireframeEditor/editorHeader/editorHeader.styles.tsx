import { styled as MuiStyled} from "@mui/material/styles";
import { Box, Button, ToggleButtonGroup, Typography } from "@mui/material";
import { COLORS, FONTS } from "@constants/theme.constants";

export const HeaderContainer = MuiStyled(Box)(() => ({
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    borderBottom: "1px solid #E6E8EC",
    backgroundColor: "#FFFFFF",
    flexShrink: 0,
    height: "80px",
    padding: "0 24px",
}))

export const StyledTabs = MuiStyled(ToggleButtonGroup)(() => ({
    backgroundColor: "#F1F3F6",
    borderRadius: "1000px",
    padding: "4px",

    "& .MuiToggleButton-root": {
        border: "none",
        borderRadius: "1000px",
        px: 2.5,
        textTransform: "none",
        color: "#6B7280",
        padding: "6px 20px",
        fontFamily: FONTS.FONT_FAMILY,
        fontSize: "1rem",
        lineHeight: "1.5rem",
    },
    "& .MuiToggleButton-root.Mui-selected": {
        backgroundColor: "#3535F3 !important",
        color: "#FFFFFF !important",
    },
    "& .MuiToggleButton-root.Mui-selected:hover": {
        backgroundColor: "#3535F3 !important",
    },
    "& .MuiToggleButton-root[value='list']:not(.Mui-selected)":{
        color: "#000093",
    },
    "& .MuiToggleButton-root[value='preview']:not(.Mui-selected)":{
        border: "none",
    }
}))

export const RightBox = MuiStyled(Box)(() => ({
    display: "flex",
    alignItems: "center",
    gap: "8px",
}))

export const CloseButton = MuiStyled(Button)(() => ({
    textTransform: "none",
    padding: "0px",
}))

export const CloseLabel = MuiStyled(Typography)(() => ({
    fontFamily: FONTS.FONT_FAMILY,
    fontSize: "12px",
    lineHeight: "20px",
    gap: "4px",
    paddingLeft:"4px",
    paddingTop: "4px",
    color: "#000000"
}))

export const SaveButton = MuiStyled(Button)(() => ({
    textTransform: "none",
    borderRadius: "1000px",
    px: 2.5,
    padding: "6px 0.75rem",
    fontFamily: FONTS.FONT_FAMILY_BOLD,
    fontSize: "1rem",
    lineHeight: "1.5rem",
    color: "#000093",
    border: "1px solid #E0E0E0",
}))

export const EditorActionsWrapper = MuiStyled(Box)(() => ({
    display: "flex",
    alignItems: "center",
    borderRadius: "10px",
    border: `1px solid ${COLORS.BORDER_LIGHT}`,
}));