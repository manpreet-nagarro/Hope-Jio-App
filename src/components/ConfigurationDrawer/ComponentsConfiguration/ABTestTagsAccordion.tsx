import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import {
  AccordionDetails,
  AccordionSummary,
  Box,
  Checkbox,
  ListItemText,
  MenuItem,
  Stack,
  Typography,
} from "@mui/material";
import { useState, type ReactNode } from "react";
import { Controller, useFormContext } from "react-hook-form";

import { usePrivilege } from "@hooks/usePrivilege";
import type { RootState } from "@store/store";
import { useSelector } from "react-redux";
import { StyledAccordion, StyledTextField } from "../PageInfoTabs.styles";
import type { ConfigurationFormValues } from "../schema/configuration.schema";
import { BaseLabel } from "../SlotConfiguration";

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

const ABTestTagsAccordion = () => {
  const { control } = useFormContext<ConfigurationFormValues>();
  const [expanded, setExpanded] = useState(true);

  const { canEditComponentConfiguration } = usePrivilege();

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
          <Box sx={{ display: "flex", alignItems: "center", color: "#000093" }}>
            {expanded ? <RemoveIcon /> : <AddIcon />}
          </Box>
        }
      >
        <AccordionTitle>A/B Test Tags</AccordionTitle>
      </AccordionSummary>

      <AccordionDetails>
        <Stack spacing={4}>
          <Controller
            name="componentsSchema.abTestTags"
            control={control}
            defaultValue={[]}
            render={({ field }) => (
              <StyledTextField
                {...field}
                select
                variant="standard"
                label={<BaseLabel label="Select" />}
                fullWidth
                slotProps={{
                  select: {
                    multiple: true,
                    value: field.value || [],
                    onChange: field.onChange,
                    renderValue: (value) => {
                      const selected = value as string[];

                      if (!selected.length) return "";

                      if (selected.length <= 2) {
                        return selected.join(", ");
                      }

                      return `${selected[0]}, ${selected[1]} +${selected.length - 2}`;
                    },
                    MenuProps: {
                      PaperProps: {
                        sx: {
                          maxHeight: 320,
                          borderRadius: 2,
                        },
                      },
                    },
                  },
                }}
                disabled={!canEditComponentConfiguration}
              >
                {cohortConfigData?.experiments.map((option) => (
                  <MenuItem key={option} value={option}>
                    <Checkbox checked={field.value?.includes(option)} />
                    <ListItemText primary={option} />
                  </MenuItem>
                ))}
              </StyledTextField>
            )}
          />
        </Stack>
      </AccordionDetails>
    </StyledAccordion>
  );
};

export default ABTestTagsAccordion;
