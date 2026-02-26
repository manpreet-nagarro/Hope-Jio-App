import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import { Button } from "@mui/material";

export const RowWrapper = styled(Box)(() => ({
  padding: "12px 0",
}));

export const MetaInfo = styled(Box)(() => ({
  marginTop: 4,
}));

export const MetaText = styled(Box)(() => ({
  fontSize: 14,
  fontWeight: 300,
  lineHeight: "18px",
  letterSpacing: 0,
  color: "#6E6E6E",
}));

export const Actions = styled(Box)(() => ({
  display: "flex",
  gap: 12,
  marginTop: 24,
}));

export const ActionButton = styled(Button)(() => ({
  height: 48,
  border: "1px solid #E0E0E0",
  borderRadius: 100,
  fontSize: 16,
  fontWeight: 700,
  lineHeight: "24px",
  letterSpacing: "-0.5px",
  color: "#000093",


  paddingTop: "12px",
  paddingRight: "16px",
  paddingBottom: "12px",
  paddingLeft: "16px",
}));
