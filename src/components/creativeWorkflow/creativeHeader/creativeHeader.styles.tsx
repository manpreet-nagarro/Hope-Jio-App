import { styled } from "@mui/material/styles";
import { Button, Typography, Stepper } from "@mui/material";
import { FONTS } from "@constants/theme.constants";

export const CloseButton = styled(Button)(({ theme }) => ({
  textTransform: "none",
  padding: "0px",
  whiteSpace: "nowrap",
}));

export const CloseLabel = styled(Typography)(() => ({
  fontFamily: FONTS.FONT_FAMILY,
  fontSize: "12px",
  lineHeight: "20px",
  gap: "4px",
  paddingLeft: "4px",
  paddingTop: "4px",
  color: "#000000",
}));

export const SaveButton = styled(Button)(() => ({
  textTransform: "none",
  borderRadius: "1000px",
  px: 2.5,
  padding: "6px 0.75rem",
  fontFamily: FONTS.FONT_FAMILY_BOLD,
  fontSize: "1rem",
  lineHeight: "1.5rem",
  color: "#000093",
  border: "1px solid #E0E0E0",
}));
