import { styled } from "@mui/material/styles";
import Drawer from "@mui/material/Drawer";
import Box from "@mui/material/Box";
import { Button } from "@mui/material";
import URLMapperDrawerBg from "@assets/images/url-mapper-drawer.png";

export const StyledDrawer = styled(Drawer)(() => ({
  "& .MuiDrawer-paper": {
    width: "38%",
    marginTop: 24,
    marginBottom: 24,
    marginRight: 24,
    height: "calc(100% - 48px)", // top + bottom margin
    borderRadius: 16,

    backgroundColor: "rgba(248, 249, 253, 1)",
    backgroundImage: `url(${URLMapperDrawerBg})`,
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",

    "@media (max-width: 1280px)": {
      width: "32%",
    },
  },
}));

export const OverlayContainer = styled(Box)(() => ({
  height: "100%",
  display: "flex",
  flexDirection: "column",
}));

export const OverlayHeader = styled(Box)(() => ({
  padding: "16px",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  borderBottom: "1px solid #E7E7E7",
  background: "rgba(255, 255, 255, 0.4)",
  height: 85,
}));

export const OverlayBody = styled(Box)(() => ({
  flex: 1,
  padding: "16px 24px",
  overflowY: "auto",
  display: "flex",
  flexDirection: "column",
  gap: 8,
}));

export const Footer = styled(Box)(() => ({
  padding: "16px 24px",
  borderTop: "1px solid #E7E7E7",
  display: "flex",
  justifyContent: "flex-end",
  background: "#FBFBFE",
  alignItems: "center",
  height: 81,
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
}));
