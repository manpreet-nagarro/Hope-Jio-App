import { COLORS } from "@constants/theme.constants";
import { Box, Breadcrumbs, Link, styled } from "@mui/material";

export const BreadcrumbWrapper = styled(Breadcrumbs)(() => ({
  fontSize: "14px",
  fontWeight: 500,
  color: "rgba(61, 61, 61, 0.54)",
}));

export const BreadcrumbLink = styled(Link)(() => ({
  color: COLORS.BREADCRUMB_LINK_COLOR,
  cursor: "pointer",
  "&:hover": {
    textDecoration: "underline",
  },
}));

export const BreadcrumbCurrent = styled(Box)(() => ({
  color: "#3D3D3D",
  fontWeight: 500,
}));
