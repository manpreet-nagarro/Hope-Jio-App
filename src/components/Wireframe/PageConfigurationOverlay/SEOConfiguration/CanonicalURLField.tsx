import {
  AccordionDetails,
  AccordionSummary,
  Box,
  Typography,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { useState } from "react";
import { Controller, useFormContext, useWatch } from "react-hook-form";
import { StyledAccordion, StyledTextField } from "../PageInfoTabs.styles";
import type { PageInfoFormValues } from "../schema/pageInfo.schema";
import { BaseLabel } from "../GeneralInformation";
import { usePrivilege } from "@hooks/usePrivilege";

export const CanonicalURLField = () => {
  const { control } = useFormContext<PageInfoFormValues>();
  const [expanded, setExpanded] = useState(false);
  const { canEditWireframeConfiguration } = usePrivilege();

  const seoCanonicalPath = useWatch({
    control,
    name: "seo.canonicalPath",
  });

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
          Canonical URL
        </Box>
      </AccordionSummary>
      <AccordionDetails>
        <Controller
          name="seo.canonicalPath"
          control={control}
          render={({ field }) => (
            <StyledTextField
              {...field}
              variant="standard"
              label={<BaseLabel label="Enter canonical url path" />}
              slotProps={{
                htmlInput: {
                  maxLength: 100,
                },
              }}
              fullWidth
              disabled={!canEditWireframeConfiguration}
              helperText={
                <Box
                  component="span"
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    width: "100%",
                  }}
                >
                  <Typography
                    component="span"
                    color={
                      (seoCanonicalPath?.length ?? 0) >= 100
                        ? "error"
                        : "text.secondary"
                    }
                  >
                    {seoCanonicalPath?.length ?? 0} characters
                  </Typography>
                  <Typography component="span">Recommended: 100</Typography>
                </Box>
              }
            />
          )}
        />
      </AccordionDetails>
    </StyledAccordion>
  );
};
