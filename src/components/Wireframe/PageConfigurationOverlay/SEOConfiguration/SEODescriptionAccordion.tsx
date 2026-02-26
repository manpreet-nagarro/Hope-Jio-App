import {
  AccordionSummary,
  AccordionDetails,
  Box,
  Typography,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { Controller, useFormContext, useWatch } from "react-hook-form";
import type { PageInfoFormValues } from "../schema/pageInfo.schema";
import { StyledAccordion, StyledTextField } from "../PageInfoTabs.styles";
import { useState } from "react";
import { BaseLabel } from "../GeneralInformation";
import { usePrivilege } from "@hooks/usePrivilege";

export const SEODescriptionAccordion = () => {
  const { control } = useFormContext<PageInfoFormValues>();
  const [expanded, setExpanded] = useState(false);
  const { canEditWireframeConfiguration } = usePrivilege();

  const seoTopDescription = useWatch({
      control,
      name: "seo.seoTopDescription",
    });

  const seoBottomDescription = useWatch({
      control,
      name: "seo.seoBottomDescription",
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
          Descriptions
        </Box>
      </AccordionSummary>

      <AccordionDetails>
        <Controller
          name="seo.seoTopDescription"
          control={control}
          render={({ field }) => (
            <StyledTextField
              {...field}
              variant="standard"
              label={<BaseLabel label="Top Description" />}
              multiline
              rows={3}
              slotProps={{
                  htmlInput: {
                    maxLength: 160,
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
                        (seoTopDescription?.length ?? 0) >= 160 ? "error" : "text.secondary"
                      }
                    >
                      {seoTopDescription?.length ?? 0} characters
                    </Typography>
                    <Typography component="span">Recommended: 120-160</Typography>
                  </Box>
                }
            />
          )}
        />
        <Controller
          name="seo.seoBottomDescription"
          control={control}
          render={({ field }) => (
            <StyledTextField
              {...field}
              variant="standard"
              label={<BaseLabel label="Bottom Description" />}
              multiline
              rows={3}
              slotProps={{
                  htmlInput: {
                    maxLength: 160,
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
                        (seoBottomDescription?.length ?? 0) >= 160 ? "error" : "text.secondary"
                      }
                    >
                      {seoBottomDescription?.length ?? 0} characters
                    </Typography>
                    <Typography component="span">Recommended: 120-160</Typography>
                  </Box>
                }
            />
          )}
        />
      </AccordionDetails>
    </StyledAccordion>
  );
};
