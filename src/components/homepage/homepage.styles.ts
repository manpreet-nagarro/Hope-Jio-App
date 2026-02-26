import styled from "styled-components";
import Box from "@mui/material/Box";

export const LayoutContainer = styled(Box)(() => ({
  minHeight: "100vh",
  display: "flex",
  background: "transparent"
}));

export const ContentWrapper = styled(Box)(() => ({
  flexGrow: 1,
  display: "flex",
  flexDirection: "column",
}));
