import { useState, type ReactNode } from "react";
import {
  AccordionSummary,
  AccordionDetails,
  Stack,
  Box,
  Typography,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { Controller, useFormContext } from "react-hook-form";

import type { ConfigurationFormValues } from "../schema/configuration.schema";
import { StyledAccordion, StyledTextField } from "../PageInfoTabs.styles";
import { BaseLabel } from "../SlotConfiguration";
import { usePrivilege } from "@hooks/usePrivilege";

const AccordionTitle = ({ children }: { children: ReactNode }) => (
  <Typography
    sx={{
      fontSize: 14,
      fontWeight: 500,
      lineHeight: "20px",
      letterSpacing: "-0.5%",
      color: "#141414",
    }}
  >
    {children}
  </Typography>
);

const RouteSettingsAccordion = () => {
  const { control } = useFormContext<ConfigurationFormValues>();
  const [expanded, setExpanded] = useState(true);
  const { canEditComponentConfiguration } = usePrivilege();

  return (
    <StyledAccordion
      expanded={expanded}
      onChange={() => setExpanded(!expanded)}
    >
      <AccordionSummary
        expandIcon={
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              color: "#000093",
            }}
          >
            {expanded ? <RemoveIcon /> : <AddIcon />}
          </Box>
        }
      >
        <AccordionTitle>Route Settings</AccordionTitle>
      </AccordionSummary>

      <AccordionDetails>
        <Stack spacing={4}>
          <Controller
            name="componentsSchema.ctaLink"
            control={control}
            render={({ field, fieldState }) => (
              <StyledTextField
                {...field}
                variant="standard"
                label={<BaseLabel label="CTA Link" />}
                error={!!fieldState.error}
                helperText={fieldState.error?.message}
                fullWidth
                disabled={!canEditComponentConfiguration}
              />
            )}
          />
        </Stack>
      </AccordionDetails>
    </StyledAccordion>
  );
};

export default RouteSettingsAccordion;
