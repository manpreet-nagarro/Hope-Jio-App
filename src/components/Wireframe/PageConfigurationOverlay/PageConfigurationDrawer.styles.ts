import { styled, Box, Drawer, Button } from "@mui/material";
import URLMapperDrawerBg from "@assets/images/url-mapper-drawer.png";

export const StyledDrawer = styled(Drawer)(() => ({
  "& .MuiDrawer-paper": {
    width: "38%",
    marginTop: 24,
    marginBottom: 24,
    marginRight: 24,
    height: "calc(100% - 48px)",
    borderRadius: 16,

    backgroundColor: "rgba(248, 249, 253, 1)",
    backgroundImage: `url(${URLMapperDrawerBg})`,
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",

    overflow: "hidden",

    "@media (max-width: 1280px)": {
      width: "32%",
    },
  },
}));

export const DrawerForm = styled("form")(() => ({
  height: "100%",
  display: "flex",
  flexDirection: "column",
  overflow: "hidden",
  minHeight: 0,
}));

export const DrawerContent = styled(Box)(() => ({
  height: "100%",
  display: "flex",
  flexDirection: "column",
  overflow: "hidden",
  minHeight: 0,
}));

export const DrawerHeader = styled(Box)(() => ({
  height: 60,
  padding: "16px",
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  borderBottom: "1px solid rgba(231, 231, 231, 1)",
  flexShrink: 0,
  background: "rgba(255, 255, 255, 0.4)",
}));

export const DrawerBody = styled(Box)(() => ({
  flex: 1,
  minHeight: 0,
  display: "flex",
  flexDirection: "column",
  gap: 16,

  overflowY: "auto",
  "&::-webkit-scrollbar": {
    display: "none",
  },
  "& *::-webkit-scrollbar": {
    display: "none",
  },
  scrollbarWidth: "none",
  "& *": {
    scrollbarWidth: "none",
  },
  msOverflowStyle: "none",
}));

export const DrawerFooter = styled(Box)(() => ({
  padding: 16,
  background: "#FBFBFE",
  borderTop: "1px solid #E7E7E7",
  display: "flex",
  justifyContent: "flex-end",
  gap: 16,
  flexShrink: 0,
}));  

export const FooterButton = styled(Button)(() => ({
  background: "rgba(53, 53, 243, 1)",
  borderRadius: 100,
  color: "#FFFFFF",
  fontWeight: 700,
  fontSize: 16,
  lineHeight: "24px",
  height: 48,
  gap: 8,
  textTransform: "none",

  "&.Mui-disabled": {
    opacity: 0.3,
    color: "#FFFFFF",
    cursor: "not-allowed",
  },
}));

