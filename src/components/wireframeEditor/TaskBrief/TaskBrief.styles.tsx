import { styled } from "@mui/material/styles";
import { Box, Typography, Button, Paper } from "@mui/material";

export const Container = styled(Paper)(({ theme }) => ({
  borderRadius: 12,
  padding: theme.spacing(3),
  boxShadow: "0 1px 3px rgba(0,0,0,0.08)",
}));

export const Section = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "space-between",
  flexWrap: "wrap",
  marginBottom: theme.spacing(2),
}));

export const FieldBlock = styled(Box)(({ theme }) => ({
  minWidth: 260,
  marginBottom: theme.spacing(2),
}));

export const Label = styled(Typography)(({ theme }) => ({
  fontSize: 12,
  color: "#8a8a8a",
  marginBottom: 4,
}));

export const Value = styled(Typography)(({ theme }) => ({
  fontSize: 14,
  fontWeight: 500,
}));

export const DividerLine = styled("div")(({ theme }) => ({
  height: 1,
  background: "#e6e6e6",
  margin: `${theme.spacing(2)} 0`,
}));

export const LinkText = styled(Typography)(({ theme }) => ({
  color: theme.palette.primary.main,
  fontSize: 14,
  cursor: "pointer",
  display: "flex",
  alignItems: "center",
  gap: 6,
}));

export const UrlDropdown = styled(Paper)(({ theme }) => ({
  marginTop: 8,
  padding: theme.spacing(1),
  borderRadius: 8,
  width: 280,
  boxShadow: "0 2px 8px rgba(0,0,0,0.12)",
}));

export const CTAButton = styled(Button)(({ theme }) => ({
  borderRadius: 24,
  padding: "10px 24px",
  textTransform: "none",
  fontWeight: 600,
}));
