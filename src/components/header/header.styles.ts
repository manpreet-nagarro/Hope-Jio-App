import { styled } from "@mui/material/styles";
import { AppBar, Box, Avatar, Menu, MenuItem } from "@mui/material";
import { COLORS, FONTS } from "@constants/theme.constants";

export const StyledAppBar = styled(AppBar)(() => ({
  background: "transparent",
  boxShadow: "none",
}));

export const HeaderContainer = styled(Box)(() => ({
  height: "92px",
  boxSizing: "border-box",
  display: "flex",
  alignItems: "center",
  padding: "16px 24px",
}));

export const TitleGroup = styled(Box)(() => ({
  display: "flex",
  alignItems: "center",
  gap: 8,
  color: "#000000",
}));

export const RightGroup = styled(Box)(() => ({
  marginLeft: "auto",
  display: "flex",
  alignItems: "center",
  gap: 16,
}));

export const ProfileButton = styled(Box)(() => ({
  display: "flex",
  alignItems: "center",
  gap: 8,
  padding: "4px 8px",
  borderRadius: 10,
  cursor: "pointer",
}));

export const ProfileAvatar = styled(Avatar)(() => ({
  width: 40,
  height: 40,
  borderRadius: "50%",
  color: "#1E7B74",
  background: "#E8FAF7",
  fontSize: "1rem",
  fontFamily: FONTS.FONT_FAMILY
}));

export const ProfileContainer = styled(Box)(() => ({
  display: "flex",
  flexDirection: "column",
  width: "max-content",
  padding: "4px 8px",

  "&:hover": {
    background: "rgba(255, 255, 255, 0.54)",
    borderRadius: "10px",
  },
}));

export const ProfileName = styled(Box)(() => ({
  fontSize: "1rem",
  fontFamily: FONTS.FONT_FAMILY_BOLD,
  lineHeight: "24px",
  letterSpacing: "-0.31px",
  color: "#000000",
}));

export const TeamAndRole = styled(Box)(() => ({
  fontSize: "14px",
  lineHeight: "22px",
  letterSpacing: "-0.23px",
  color: COLORS.TEXT_SECONDARY,
}));

export const StyledMenu = styled(Menu)(() => ({
  "& .MuiPaper-root": {
    borderRadius: "8px",
    minWidth: "126px",
    marginTop: "8px",
    background: "#FFFFFF",
    boxShadow: "0px 4px 16px 0px rgba(0, 0, 0, 0.08)",
  },
  "& .MuiMenu-list": {
    padding: "0",
  },
}));

export const LogoutMenuItem = styled(MenuItem)(() => ({
  color: COLORS.TEXT_DANGER,
  backgroundColor: "#FFFFFF",
  fontSize: "0.875rem",
  lineHeight: "19.5px",
  letterSpacing: "-0.08px",
  fontWeight: 500,
  gap: 8,
  padding: "0.5rem",

  "&.Mui-focusVisible": {
    backgroundColor: "#FFFFFF",
  },
}));
