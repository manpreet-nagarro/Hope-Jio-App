import { styled } from "@mui/material/styles";
import {
  Button,
  Typography,
  Stepper,
  AppBar,
  Toolbar,
  Box,
} from "@mui/material";
import { FONTS } from "@constants/theme.constants";

/* AppBar */
export const StyledAppBar = styled(AppBar)(() => ({
  backgroundColor: "#fff",
  boxShadow: "none",
  flexShrink: 0,
  height: "96px",
  padding: "0 24px",
}));

/* Toolbar */
export const StyledToolbar = styled(Toolbar)(() => ({
  flexDirection: "column",
  alignItems: "stretch",
}));

/* Header Layout */
export const HeaderRow = styled(Box)(() => ({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  width: "100%",
}));

/* Stepper */
export const StyledStepper = styled(Stepper)(() => ({
  marginTop: 16,
  width: "100%",
  cursor: "pointer",

  "& .MuiStepIcon-root": {
    color: "#fff",
    border: "1px solid #B5B5B5",
    borderRadius: "50%",
    width: 32,
    height: 32,
  },

  "& .MuiStepIcon-text": {
    fill: "#B5B5B5",
    fontWeight: 700,
  },

  "& .MuiStepIcon-root.Mui-active": {
    color: "#3535F3",
    border: "1px solid #3535F3",
  },

  "& .MuiStepIcon-root.Mui-active .MuiStepIcon-text": {
    fill: "#ffffff",
  },

  "& .MuiStepLabel-label": {
    color: "#000",
    fontFamily: FONTS.FONT_FAMILY,
  },

  "& .MuiStepLabel-label.Mui-active": {
    fontWeight: 600,
  },
}));

/* Completed Icon Wrapper */
export const CompletedIconWrapper = styled(Box)(() => ({
  border: "2px solid #1ECCB0",
  borderRadius: "50%",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  width: 32,
  height: 32,
  boxSizing: "border-box",
  background: "#E8FAF7",
}));

/* Buttons */

export const CloseButton = styled(Button)(() => ({
  textTransform: "none",
  padding: "0px",
  whiteSpace: "nowrap",
}));

export const CloseLabel = styled(Typography)(() => ({
  fontFamily: FONTS.FONT_FAMILY,
  fontSize: "12px",
  lineHeight: "20px",
  paddingLeft: "4px",
  paddingTop: "4px",
  color: "#000000",
}));

export const SaveButton = styled(Button)(() => ({
  textTransform: "none",
  borderRadius: "1000px",
  padding: "6px 0.75rem",
  fontFamily: FONTS.FONT_FAMILY_BOLD,
  fontSize: "1rem",
  lineHeight: "1.5rem",
  color: "#000093",
  border: "1px solid #E0E0E0",
}));
