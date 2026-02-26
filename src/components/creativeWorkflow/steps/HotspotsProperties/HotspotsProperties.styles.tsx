import { styled } from "@mui/material/styles";
import { Button } from "@mui/material";

export const CTAButton = styled(Button)(({ theme }) => ({
  borderRadius: 24,
  padding: "10px 24px",
  textTransform: "none",
  fontWeight: 600,
}));
