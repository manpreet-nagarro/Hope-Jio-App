import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import {
  AccordionDetails,
  AccordionSummary,
  Box,
  MenuItem,
  Stack,
  Typography,
} from "@mui/material";
import { useState, type ReactNode } from "react";
import { Controller, useFormContext } from "react-hook-form";

import { usePrivilege } from "@hooks/usePrivilege";
import type { SlotType } from "@store/cohortConfigSlice/cohortConfigSlice";
import type { RootState } from "@store/store";
import { useSelector } from "react-redux";
import { StyledAccordion, StyledTextField } from "../PageInfoTabs.styles";
import type { ConfigurationFormValues } from "../schema/configuration.schema";

type LabelProps = {
  label: string;
  required?: boolean;
};

export const BaseLabel = ({ label, required }: LabelProps) => (
  <Box
    component="span"
    sx={{
      display: "inline-flex",
      alignItems: "center",
      gap: "2px",
      fontWeight: 500,
      fontSize: "16px",
      lineHeight: "24px",
      letterSpacing: "-0.5%",
      color: "rgba(0, 0, 0, 0.65)",
    }}
  >
    {label}

    {required && (
      <Box component="span" sx={{ color: "error.main" }}>
        *
      </Box>
    )}
  </Box>
);

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

const SlotDetailsAccordion = () => {
  const { control } = useFormContext<ConfigurationFormValues>();
  const [expanded, setExpanded] = useState(true);
  const { canEditSlotConfiguration } = usePrivilege();
  const cohortConfigData = useSelector(
    (state: RootState) => state.cohortConfig.data,
  );

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
        <AccordionTitle>Slot Details</AccordionTitle>
      </AccordionSummary>

      <AccordionDetails>
        <Stack spacing={4}>
          <Controller
            name="slotsSchema.slotType"
            control={control}
            render={({ field, fieldState }) => {
              const { error } = fieldState;

              return (
                <StyledTextField
                  {...field}
                  select
                  variant="standard"
                  label={<BaseLabel label="Slot Type" required />}
                  error={!!error}
                  helperText={error?.message}
                  fullWidth
                  disabled={!canEditSlotConfiguration}
                  SelectProps={{
                    MenuProps: {
                      PaperProps: {
                        sx: {
                          maxHeight: "50vh",
                          width: "15vw",
                        },
                      },
                    },
                  }}
                >
                  {(cohortConfigData?.slotTypes ?? []).map((item: SlotType) => (
                    <MenuItem key={item.label} value={item.label}>
                      {item.label}
                    </MenuItem>
                  ))}
                </StyledTextField>
              );
            }}
          />
        </Stack>
      </AccordionDetails>
    </StyledAccordion>
  );
};

export default SlotDetailsAccordion;
