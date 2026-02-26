import { styled } from "@mui/material/styles";
import { Box, Typography, Button, Paper } from "@mui/material";

export const Label = styled(Typography)(({ theme }) => ({
  fontSize: 12,
  color: "#8a8a8a",
  marginBottom: 4,
}));
export const LinkText = styled(Typography)(({ theme }) => ({
  color: "#1565C0",
  fontSize: 14,
  cursor: "pointer",
  display: "flex",
  alignItems: "center",
  gap: 6,
}));

export const UrlDropdown = styled(Paper)(({ theme }) => ({
  position: "absolute",
  top: "100%",
  left: 0,
  zIndex: 10,
  marginTop: 0,
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
  backgroundColor: "#3535F3",
}));
export const Value = styled(Typography)(({ theme }) => ({
  fontSize: 14,
  fontWeight: 500,
}));
export const FieldBlock = styled(Box)(({ theme }) => ({
  minWidth: 260,
  marginBottom: theme.spacing(2),
}));
export const DetailsGrid = styled(Box)(() => ({
  display: "grid",
  gridTemplateColumns: "1fr 1fr", // 2 per row
  gap: "20px 40px",
  marginTop: 12,
}));

export const DetailItem = styled(Box)(() => ({
  display: "flex",
  flexDirection: "column",
}));

export const DetailLabel = styled(Typography)(() => ({
  fontSize: 13,
  color: "#6b7280", // subtle gray
  marginBottom: 2,
  display: "flex",
  alignItems: "center",
  gap: 4,
}));

export const DetailValue = styled(Typography)(() => ({
  fontSize: 15,
  fontWeight: 600,
  color: "#111827",
  marginLeft: "22px",
}));
