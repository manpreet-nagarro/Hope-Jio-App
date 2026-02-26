import styled from "styled-components";
import Box from "@mui/material/Box";

export const LayoutContainer = styled(Box)(() => ({
  minHeight: "100vh",
  display: "grid",
  gridTemplateColumns: "auto 1fr",
  gridTemplateRows: "92px 80px 1fr", 
  background: "linear-gradient(180deg, #E7ECFF 0%, #F8F9FD 100%)",
}));

export const SidebarSlot = styled(Box)(() => ({
  gridColumn: "1 / 2",
  gridRow: "1 / 4",
}));

export const ContentWrapper = styled(Box)(() => ({
  gridColumn: "2 / 3",
  gridRow: "1 / 4",

  display: "flex",
  flexDirection: "column",
  overflow: "hidden",
}));
  
