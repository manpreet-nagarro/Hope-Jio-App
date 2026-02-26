import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MuiButton from "@mui/material/Button";

import loginBackground from "@assets/images/login-background.jpg";
import salesLogo from "@assets/icons-svg/sales-logo.svg"
import { FONTS } from "@constants/theme.constants";

export const LoginContainer = styled(Box)(() => ({
  minHeight: "100vh",
  width: "100%",
  display: "flex",
}));

export const PageWrapper = styled(Box)(() => ({
  position: "relative",
  minHeight: "100vh",
  width: "100%",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  background: `url(${loginBackground}) center / cover no-repeat`,

  "&::before": {
    content: '""',
    position: "absolute",
    inset: 0,
    background: "rgba(15, 60, 201, 0.7)",
  },
}));

export const Card = styled(Box)(() => ({
  display: "flex",
  flexDirection: "column",
  position: "relative",
  zIndex: 1,
  width: "31.6%",
  background: "#ffffff",
  borderRadius: 20,
  padding: "32px",
  textAlign: "center",
  gap: "40px",

  "@media (min-width:1441px)": {
    padding: "40px 80px",
    gap: "96px"
  },
}));

export const Logo = styled(Box)(() => ({
  alignSelf: "center",
  background: `url(${salesLogo}) no-repeat center`,
  backgroundSize: "contain",
  width: "152px",
  height: "48px",
  top: 12,
}));

export const Title = styled(Box)(() => ({
  fontSize: "1.5rem",
  lineHeight: "100%",
  color: "#000000",
  fontFamily: FONTS.FONT_FAMILY
}));

export const Highlight = styled(Box)(() => ({
  fontSize: "2rem",
  fontFamily: FONTS.FONT_FAMILY_BOLD,
  lineHeight: "36px",
  letterSpacing: "0%",
  color: "#0F3CC9",
  marginTop: "1rem",
  marginBottom: "1rem",

  "@media (min-width:1441px)": {
    fontSize: "2.5rem",
    marginBottom: 0,
  },
}));

export const BoxContainer = styled(Box)(() => ({
  display: "flex",
  flexDirection: "column",
  gap: "40px"
}));

export const Message = styled(Box)(() => ({
  fontSize: "1rem",
  fontFamily: FONTS.FONT_FAMILY_LIGHT,
  lineHeight: "100%",
  color: "#373737",

  "@media (min-width:1441px)": {
    fontSize: "20px"
  },
  
}));

export const Button = styled(MuiButton)(() => ({
  width: "100%",
  padding: "1rem 0",
  background: "#3535F3",
  color: "#ffffff",
  borderRadius: 100,
  lineHeight: "1.5rem",
  fontSize: "1rem",
  fontFamily: FONTS.FONT_FAMILY_BOLD
}));

export const RenderedFontInfo = styled(Box)(() => ({
  display: "inline-block",
  background: "#f5f7ff",
  border: "1px solid #e6edff",
  padding: "8px 12px",
  borderRadius: 8,
  fontSize: "0.875rem",
  color: "#0F3CC9",
  textAlign: "left",
  lineHeight: 1.2,
  width: "100%",
  maxWidth: 360,
  "& .rf-label": {
    display: "block",
    fontWeight: 700,
    color: "#0B2A66",
    marginBottom: 4,
    fontSize: "0.75rem",
  },
  "& .rf-value": {
    display: "block",
    fontWeight: 500,
    color: "#0B2A66",
  },

  "@media (min-width:1441px)": {
    fontSize: "1rem"
  },
}));