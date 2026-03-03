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
  padding: theme.spacing(2),
  borderRadius: 12,
  border: "1px solid #E5E7EB",
  backgroundColor: "#F3F4F6",
}));
export const PreviewInner = styled(Box)(() => ({
  height: 250,
  borderRadius: 10,
  backgroundColor: "#fff",
  border: "1px solid #D1D5DB",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  textAlign: "center",
  position: "relative",
  overflow: "hidden",
}));

export const PlaceholderBox = styled(Box)(() => ({
  textAlign: "center",
  color: "#9E9E9E",
}));

export const StyledImage = styled("img")({
  width: "100%",
  height: "100%",
  // objectFit: "cover",
});

export const Footer = styled(Box)(({ theme }) => ({
  marginTop: theme.spacing(3),
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
}));
export const ChecklistContainer = styled(Box)({
  background: "#F5F7FC",
  borderRadius: 10,
  padding: 16,
  marginBottom: 20,
  marginTop: 24,
});

export const ChecklistItem = styled(Box)({
  display: "flex",
  alignItems: "center",
  gap: 8,
  marginBottom: 8,

  "& svg": {
    color: "#16a34a",
  },
});
