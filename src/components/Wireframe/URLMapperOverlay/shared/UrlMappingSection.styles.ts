import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";

export const SectionWrapper = styled(Box)(() => ({
  background: "#FFFFFF",
  borderRadius: 10,
  gap: 24,
  paddingLeft: 8,
  paddingRight: 8,
  paddingBottom: 16,
}));

export const SectionHeader = styled(Box)(() => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  paddingTop: 8,
  paddingBottom: 4,
}));

export const HeaderLeft = styled(Box)(() => ({
  display: "flex",
  alignItems: "center",
  gap: 8,
}));

export const SectionBody = styled(Box)(() => ({
  paddingTop: 4,
}));
