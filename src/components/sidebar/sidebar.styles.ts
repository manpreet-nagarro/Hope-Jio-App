import { styled } from "@mui/material/styles";
import {
  Box,
  Drawer,
  List,
  ListItemButton,
  ListItemIcon,
  Select,
  Tooltip,
} from "@mui/material";

import salesLogo from "@assets/icons-svg/sales-logo.svg";
import salesLogoSmall from "@assets/icons-svg/sales-logo-small.svg";
import { COLORS, FONTS } from "@constants/theme.constants";

export const DrawerNav = styled(Drawer, {
  shouldForwardProp: (prop) => prop !== "isOpen",
})<{ isOpen: boolean }>(({ isOpen }) => ({
  width: isOpen ? "260px" : "112px",
  flexShrink: 0,

  "& .MuiDrawer-paper": {
    width: isOpen ? "260px" : "112px",
    background: "transparent",
    border: "none",
    overflow: "visible",
    transition: "width 0.3s ease",
  },

  "@media (min-width:1441px)": {
    width: isOpen ? "316px" : "112px",
    "& .MuiDrawer-paper": {
      width: isOpen ? "316px" : "112px",
    },
  },
}));

export const DrawerPaper = styled(Box)(() => ({
  background: "#FFFFFF",
  height: "100vh",
  display: "flex",
  flexDirection: "column",
  boxShadow: "4px 0 12px rgba(11, 60, 119, 0.12)",
  padding: 24,
  gap: 24,
  overflow: "hidden",
  borderTopRightRadius: 24,
  borderBottomRightRadius: 24,
}));

export const LogoBox = styled(Box, {
  shouldForwardProp: (prop) => prop !== "collapsed",
})<{ collapsed: boolean }>(({ collapsed }) => ({
  display: "flex",
  height: collapsed ? 60 : 56,
  width: "100%",

  background: `url(${collapsed ? salesLogoSmall : salesLogo}) no-repeat left center`,
  backgroundSize: collapsed ? "63px 60px" : "123px 52px",

  borderRadius: collapsed ? 8 : 0,
}));

export const ProductSelectWrapper = styled(Box)(() => ({
  display: "flex",
  flexDirection: "column",
  gap: 32,
}));

export const ProductSelect = styled(Select, {
  shouldForwardProp: (prop) => prop !== "collapsed",
})<{ collapsed: boolean }>(({ collapsed }) => ({
  height: 36,
  borderRadius: 8,
  fontSize: 16,
  width: collapsed ? "63px" : "full",

  "& .MuiSelect-select": {
    padding: "6px 12px",
  },
}));

export const NavWrapper = styled(Box)(() => ({
  flexGrow: 1,
  overflowY: "auto",
  "&::-webkit-scrollbar": {
    display: "none",
  },
}));

export const NavList = styled(List)(() => ({
  display: "flex",
  flexDirection: "column",
  gap: "12px",
}));

export const NavButton = styled(ListItemButton, {
  shouldForwardProp: (prop) =>
    prop !== "collapsed" && prop !== "active",
})<{
  collapsed: boolean;
  active: boolean;
}>(({ collapsed, active }) => ({
  fontSize: 16,
  letterSpacing: "-0.31px",
  fontFamily: FONTS.FONT_FAMILY_BOLD,
  lineHeight: "24px",
  height: 48,
  borderRadius: 50,
  gap: 4,
  whiteSpace: "nowrap",

  padding: collapsed ? 0 : "0 4 0 4",

  justifyContent: collapsed ? "center" : "flex-start",

  backgroundColor: active ? "#E7EBF8" : "transparent",
  border: active ? `1px solid ${COLORS.ACCENT_PRIMARY}` : "1px solid transparent",
  color: active ? COLORS.ACCENT_PRIMARY : "#000000",

  "& .MuiListItemIcon-root": {
    color: active ? COLORS.ACCENT_PRIMARY : "#000000",
  },

  "&:hover": {
    backgroundColor: "#E7EBF8",
  },
}));

export const NavIcon = styled(ListItemIcon, {
  shouldForwardProp: (prop) => prop !== "collapsed",
})<{ collapsed: boolean }>(({ collapsed }) => ({
  minWidth: 0,
  marginRight: collapsed ? 0 : 12,
  justifyContent: "center",
}));

export const DrawerFooter = styled(Box)(() => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

export const FooterTooltip = styled(Tooltip)(() => ({
  border: "1px solid #E8E8E8",
  boxShadow: "0px 3px 8px 0px rgba(0, 0, 0, 0.12)"
}));
