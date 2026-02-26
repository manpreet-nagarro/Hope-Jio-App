import { styled } from "@mui/material/styles";
import { Alert } from "@mui/material";

export const StyledAlert = styled(Alert)(({ theme }) => ({
  backgroundColor: "#FFFFFF",
  color: "#1C1C1C",
  borderRadius: 24,
  padding: "4px 16px",
  minHeight: 40,
  alignItems: "center",
  border: "1px solid #E6E6E6",
  boxShadow: "0px 4px 12px rgba(0,0,0,0.12)",

  "& .MuiAlert-icon": {
    color: "#2E7D32",
    marginRight: theme.spacing(1),
  },

  "& .MuiAlert-message": {
    fontSize: 14,
    fontWeight: 500,
    lineHeight: "20px",
    padding: 0,
  },

  "& .MuiAlert-action": {
    marginLeft: theme.spacing(1),
    paddingTop: 0,
  },
}));
