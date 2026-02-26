import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import {
  AccordionDetails,
  AccordionSummary,
  Box,
  Checkbox,
  FormControlLabel,
  Stack,
  Typography,
} from "@mui/material";
import { useState, type ReactNode } from "react";
import { Controller, useFormContext } from "react-hook-form";

import { usePrivilege } from "@hooks/usePrivilege";
import type { RootState } from "@store/store";
import { useSelector } from "react-redux";
import { StyledAccordion } from "../PageInfoTabs.styles";
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

const UserCohortAccordion = () => {
  const { control } = useFormContext<ConfigurationFormValues>();
  const [expanded, setExpanded] = useState(true);
  const { canEditComponentConfiguration } = usePrivilege();
  const cohortConfigData = useSelector(
    (state: RootState) => state.cohortConfig.data,
  );

  return (
    <StyledAccordion
      expanded={expanded}
      onChange={() => setExpanded((prev) => !prev)}
    >
      <AccordionSummary
        expandIcon={
          <Box sx={{ display: "flex", alignItems: "center", color: "#000093" }}>
            {expanded ? <RemoveIcon /> : <AddIcon />}
          </Box>
        }
      >
        <AccordionTitle>
          <BaseLabel label="User Cohort" required />
        </AccordionTitle>
      </AccordionSummary>

      <AccordionDetails>
        <Controller
          name="componentsSchema.userCohort"
          control={control}
          defaultValue={[]}
          render={({ field }) => {
            const selected: string[] = field.value ?? [];
            const userGroups = cohortConfigData?.userGroup ?? [];

            const handleChange = (option: string) => {
              const updated = selected.includes(option)
                ? selected.filter((v) => v !== option)
                : [...selected, option];

              field.onChange(updated);
            };

            return (
              <Stack spacing={1}>
                {userGroups.map(({ id, name }) => (
                  <FormControlLabel
                    key={id}
                    control={
                      <Checkbox
                        checked={selected.includes(name)}
                        onChange={() => handleChange(name)}
                        disabled={!canEditComponentConfiguration}
                      />
                    }
                    label={
                      <Typography fontSize={14} color="#141414">
                        {name}
                      </Typography>
                    }
                  />
                ))}
              </Stack>
            );
          }}
        />
      </AccordionDetails>
    </StyledAccordion>
  );
};

export default UserCohortAccordion;
