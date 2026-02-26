import { Tabs, Tab, TextField, Accordion, Box, IconButton, Divider } from "@mui/material";
import { styled } from "@mui/material/styles";

export const StyledTabs = styled(Tabs)(() => ({
  height: 60,
  minHeight: 60,
  paddingLeft: 16,
  paddingRight: 16,

  "& .MuiTabs-flexContainer": {
    height: "100%",
    alignItems: "center",
  },

  "& .MuiTabs-indicator": {
    height: 4,
    backgroundColor: "#3535F3",
    borderRadius: 2,
  },
}));

export const StyledTab = styled(Tab)(() => ({
  flex: 1,
  height: 60,
  minHeight: 60,
  paddingLeft: 16,
  paddingRight: 16,
  textTransform: "none",

  fontSize: 16,
  fontWeight: 500,
  lineHeight: "24px",
  letterSpacing: "-0.5%",
  color: "#141414",

  "&.Mui-selected": {
    color: "#141414",
  },
}));

export const StyledAccordion = styled(Accordion)(() => ({
  backgroundColor: "transparent",
  boxShadow: "none",

  "&.Mui-expanded": {
    backgroundColor: "rgba(251, 251, 254, 0.7)",
    margin: 0,
    borderRadius: 8,
  },

  "&::before": {
    display: "none", // remove default divider
  },
}));

export const StyledTextField = styled(TextField)(() => ({
  "& .MuiInputBase-root": {
    fontSize: 18,
    fontWeight: 500,
    lineHeight: "28px",
    color: "#141414",
  },

  "& .MuiInputLabel-root": {
    fontSize: 14,
    fontWeight: 500,
    color: "#6B6B6B",
  },

  "& .MuiInputLabel-root.Mui-focused": {
    color: "#6B6B6B",
  },

  "& .MuiInput-underline:before": {
    borderBottom: "2px solid #D0D0D0",
  },

  "& .MuiInput-underline:hover:before": {
    borderBottom: "2px solid #B0B0B0",
  },

  "& .MuiInput-underline:after": {
    borderBottom: "2px solid #3535F3",
  },

  "& .MuiFormHelperText-root": {
    fontSize: 14,
    marginLeft: 0,
    marginRight: 0,
    color: "#6B6B6B",
  },
}));

export const StatusContainer = styled(Box)(() => ({
  display: "flex",
  alignItems: "center",
  gap: "6px",
  height: 28,
}));

export const StatusText = styled(Box)(() => ({
  fontFamily: "JioType",
  fontWeight: 500,
  fontSize: "14px",
  lineHeight: "20px",
  letterSpacing: "-0.5%",
  color: "rgba(0, 0, 0, 0.65)",
}));

export const BadgeStatus = styled(Box)(() => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  height: 24,
  padding: "4px 8px",
  borderRadius: "8px",
  backgroundColor: "#FEF2E9",
}));

export const BadgeText = styled(Box)(() => ({
  fontFamily: "JioType",
  fontWeight: 700,
  fontSize: "12px",
  lineHeight: "16px",
  letterSpacing: "-0.5%",
  color: "#E65100",
  whiteSpace: "nowrap",
}));

export const AccordionTitle = styled(Box)(() => ({
  fontSize: 16,
  fontWeight: 500,
  lineHeight: "20px",
  color: "#141414",
}));

export const RowContainer = styled(Box)(() => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  padding: "12px 16px",
}));

export const LeftContent = styled(Box)(() => ({
  display: "flex",
  flexDirection: "column",
  gap: 4,
}));

export const RowLabel = styled(Box)(() => ({
  fontSize: 14,
  lineHeight: "18px",
  color: "#6B6B6B",
}));

export const FileName = styled(Box)(() => ({
  fontSize: 14,
  lineHeight: "18px",
  color: "#141414",
  display: "flex",
  alignItems: "center",
  gap: 8,
}));

export const UploadingText = styled(Box)(() => ({
  fontSize: 12,
  lineHeight: "16px",
  color: "#6B6B6B",
}));

export const RightActions = styled(Box)(() => ({
  display: "flex",
  alignItems: "center",
  gap: 8,
}));

export const ActionIconButton = styled(IconButton)(() => ({
  padding: 4,
  color: "#000093",
}));

export const HiddenInput = styled("input")(() => ({
  display: "none",
}));

export const RowDivider = styled(Divider)(() => ({
  marginRight:"16px",
  marginLeft:"16px",
  height: "2px",
  borderColor: "rgba(0, 0, 0, 0.65)",
}));
