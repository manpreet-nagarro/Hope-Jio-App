import { useState, type ReactNode } from "react";
import {
  AccordionSummary,
  AccordionDetails,
  Stack,
  Box,
  Typography,
  InputAdornment,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { Controller, useFormContext, useWatch } from "react-hook-form";

import type { PageInfoFormValues } from "../schema/pageInfo.schema";
import { StyledAccordion, StyledTextField } from "../PageInfoTabs.styles";
import { usePrivilege } from "@hooks/usePrivilege";

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
      fontSize: 16,
      fontWeight: 500,
      lineHeight: "20px",
      letterSpacing: "-0.5%",
      color: "#141414",
    }}
  >
    {children}
  </Typography>
);

const PageDetailsAccordion = () => {
  const { control } = useFormContext<PageInfoFormValues>();
  const { canEditWireframeConfiguration } = usePrivilege();

  const description = useWatch({
    control,
    name: "pageDetails.description",
  });

  const descriptionLength = description?.length ?? 0;

  const [expanded, setExpanded] = useState(false);

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
        <AccordionTitle>Page Details</AccordionTitle>
      </AccordionSummary>

      <AccordionDetails>
        <Stack spacing={4}>
          <Controller
            name="pageDetails.pageName"
            control={control}
            render={({ field, fieldState }) => (
              <StyledTextField
                {...field}
                variant="standard"
                label={<BaseLabel label="Page Name" required />}
                error={!!fieldState.error}
                helperText={fieldState.error?.message}
                fullWidth
                disabled={!canEditWireframeConfiguration}
              />
            )}
          />

          <Controller
            name="pageDetails.slug"
            control={control}
            render={({ field, fieldState }) => (
              <StyledTextField
                {...field}
                variant="standard"
                label={<BaseLabel label="Slug" required />}
                error={!!fieldState.error}
                helperText={fieldState.error?.message}
                fullWidth
                disabled={!canEditWireframeConfiguration}
                InputProps={{
                  startAdornment: (
                    <InputAdornment
                      position="start"
                      sx={{ mr: 0.5 }} // reduce spacing if needed
                    >
                      /sections/
                    </InputAdornment>
                  ),
                }}
              />
            )}
          />

          <Controller
            name="pageDetails.description"
            control={control}
            render={({ field }) => (
              <StyledTextField
                {...field}
                variant="standard"
                label={<BaseLabel label="Description" />}
                multiline
                rows={3}
                fullWidth
                disabled={!canEditWireframeConfiguration}
                slotProps={{
                  htmlInput: {
                    maxLength: 600,
                  },
                }}
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
                        descriptionLength >= 600 ? "error" : "text.secondary"
                      }
                    >
                      {descriptionLength} characters
                    </Typography>
                    <Typography component="span">Recommended: 600</Typography>
                  </Box>
                }
              />
            )}
          />
        </Stack>
      </AccordionDetails>
    </StyledAccordion>
  );
};

export default PageDetailsAccordion;
