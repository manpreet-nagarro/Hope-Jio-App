import { AccordionSummary, AccordionDetails, Stack, Box } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { Controller, useFormContext } from "react-hook-form";
import type { PageInfoFormValues } from "../schema/pageInfo.schema";
import { StyledAccordion, StyledTextField } from "../PageInfoTabs.styles";
import { useState } from "react";
import { BaseLabel } from "../GeneralInformation";
import { usePrivilege } from "@hooks/usePrivilege";

export const SEOTitleAccordion = () => {
  const { control } = useFormContext<PageInfoFormValues>();
  const [expanded, setExpanded] = useState(false);
  const { canEditWireframeConfiguration } = usePrivilege();

  const handleChange = () => {
    setExpanded((prev) => !prev);
  };

  return (
    <StyledAccordion expanded={expanded} onChange={handleChange}>
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
        <Box
          sx={{
            fontSize: 16,
            fontWeight: 500,
            lineHeight: "20px",
            letterSpacing: "-0.5%",
            color: "#141414",
          }}
        >
          SEO Title
        </Box>
      </AccordionSummary>

      <AccordionDetails>
        <Stack spacing={4}>
          <Controller
            name="seo.seoTitle"
            control={control}
            render={({ field, fieldState }) => (
              <StyledTextField
                {...field}
                variant="standard"
                label={<BaseLabel label="Title" />}
                error={!!fieldState.error}
                fullWidth
                disabled={!canEditWireframeConfiguration}
                slotProps={{
                  htmlInput: {
                    maxLength: 60,
                  },
                }}
              />
            )}
          />
        </Stack>
      </AccordionDetails>
    </StyledAccordion>
  );
};
