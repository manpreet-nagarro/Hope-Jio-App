import { styled } from "@mui/material/styles";
import { Paper, Box } from "@mui/material";

export const Wrapper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  borderRadius: 12,
  border: "1px solid #E6E6E6",
  backgroundColor: "#FFFFFF",
}));

export const PreviewContainer = styled(Box)(({ theme }) => ({
  marginTop: theme.spacing(2),
  borderRadius: 16,
  border: "1px solid #E6E6E6",
  backgroundColor: "#F8F8F8",
  height: 300,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  overflow: "hidden",
  cursor: "pointer",
}));

export const PlaceholderBox = styled(Box)(() => ({
  textAlign: "center",
  color: "#9E9E9E",
}));

export const StyledImage = styled("img")({
  width: "100%",
  height: "100%",
  objectFit: "cover",
});

export const Footer = styled(Box)(({ theme }) => ({
  marginTop: theme.spacing(3),
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
}));
