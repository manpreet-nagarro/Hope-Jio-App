import { styled } from "@mui/material/styles";
import { stepConnectorClasses } from "@mui/material/StepConnector";
import StepConnector from "@mui/material/StepConnector";
import StepLabel from "@mui/material/StepLabel";

/**
 * Connector line styling
 */
export const StyledConnector = styled(StepConnector)(({ theme }) => ({
  [`&.${stepConnectorClasses.alternativeLabel}`]: {
    top: 12,
  },
  [`& .${stepConnectorClasses.line}`]: {
    height: 2,
    border: 0,
    backgroundColor: "#d9d9d9",
    borderRadius: 1,
  },
  [theme.breakpoints.down("sm")]: {
    [`&.${stepConnectorClasses.alternativeLabel}`]: {
      top: 8,
    },
    [`& .${stepConnectorClasses.line}`]: {
      height: 1,
    },
  },
}));

/**
 * Step label styling
 */
export const StyledStepLabel = styled(StepLabel)(({ theme }) => ({
  "& .MuiStepLabel-label": {
    marginTop: 8,
    fontSize: 14,
    fontWeight: 500,
    color: "#6b6b6b",
  },

  "& .Mui-active": {
    color: "#1976d2 !important",
    fontWeight: 600,
  },

  "& .Mui-completed": {
    color: "#1976d2 !important",
  },

  [theme.breakpoints.down("sm")]: {
    "& .MuiStepLabel-label": {
      marginTop: 4,
      fontSize: 12,
    },
  },

  [theme.breakpoints.down("xs")]: {
    "& .MuiStepLabel-label": {
      fontSize: 11,
      marginTop: 2,
    },
  },
}));
