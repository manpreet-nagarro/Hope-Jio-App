import React from "react";
import { Paper, Typography, Box } from "@mui/material";

export default function TaskPreview() {
  return (
    <Paper
      elevation={0}
      sx={{
        p: 3,
        borderRadius: 3,
        border: "1px solid #e5e7eb",
      }}
    >
      <Typography variant="h6" fontWeight={600} gutterBottom>
        Template Preview
      </Typography>

      <Typography color="text.secondary">
        This is a placeholder for the template preview screen.
      </Typography>

      <Box
        sx={{
          mt: 3,
          height: 200,
          borderRadius: 2,
          background: "#f5f6f8",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Typography color="text.secondary">Preview Area</Typography>
      </Box>
    </Paper>
  );
}
