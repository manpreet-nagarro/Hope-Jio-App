import { Box } from "@mui/material";

interface DeviceBadgeProps {
  label: string;
}

export const DeviceBadge = ({ label }: DeviceBadgeProps) => (
  <Box
    sx={{
      fontSize: "14px",
      fontWeight: 500,
      padding: "4px 8px",
      borderRadius: "4px",
      background: "#F8F8F8",
      lineHeight: "18px",
      border: "1px solid #D8D8D8",
    }}
  >
    {label}
  </Box>
);
