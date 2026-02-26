import { useState } from "react";
import {
  AccordionSummary,
  AccordionDetails,
  Stack,
  Box,
  Typography,
  IconButton,
  TextField,
  Button,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { Controller, useFieldArray, useFormContext } from "react-hook-form";
import { DateTimePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";

import type { ConfigurationFormValues } from "../schema/configuration.schema";
import { AccordionTitle, StyledAccordion } from "../PageInfoTabs.styles";
import CloseCircleIcon from "@assets/icons-svg/closeCircleIcon";
import { MAX_SCHEDULES, MIN_GAP_MINUTES } from "@constants/commonConstants";
import { usePrivilege } from "@hooks/usePrivilege";

const SlotScheduler = () => {
  const { control, watch } = useFormContext<ConfigurationFormValues>();
  const { canEditSlotConfiguration } = usePrivilege();

  const { fields, append, remove } = useFieldArray({
    control,
    name: "slotsSchema.schedules",
  });

  const schedules = watch("slotsSchema.schedules") || [];

  const [expanded, setExpanded] = useState(true);

  const hasOverlap = (index: number) => {
    const current = schedules[index];

    if (!current?.startDateTime || !current?.endDateTime) {
      return false;
    }

    const currentStart = current.startDateTime;
    const currentEnd = current.endDateTime;

    return schedules.some((sch, i) => {
      if (i === index) return false;
      if (!sch?.startDateTime || !sch?.endDateTime) return false;

      const otherStart = sch.startDateTime;
      const otherEnd = sch.endDateTime;

      return currentStart < otherEnd && currentEnd > otherStart;
    });
  };

  return (
    <StyledAccordion
      expanded={expanded}
      onChange={() => setExpanded(!expanded)}
    >
      <AccordionSummary
        expandIcon={
          <Box sx={{ color: "#000093" }}>
            {expanded ? <RemoveIcon /> : <AddIcon />}
          </Box>
        }
      >
        <AccordionTitle>Scheduling</AccordionTitle>
      </AccordionSummary>

      <AccordionDetails>
        {fields.length === 0 ? (
          <Button
            startIcon={<AddIcon fontSize="small" />}
            disabled={!canEditSlotConfiguration}
            onClick={() => {
              if (fields.length < MAX_SCHEDULES) {
                append({
                  startDateTime: undefined,
                  endDateTime: undefined,
                });
              }
            }}
            sx={{
              textTransform: "none",
              color: "#000093",
              fontWeight: 500,
            }}
          >
            Add
          </Button>
        ) : (
          <Stack spacing={4}>
            {fields.map((field, index) => {
              const schedule = schedules[index];
              const start = schedule?.startDateTime;
              const end = schedule?.endDateTime;

              const lessThanMinGap =
                start &&
                end &&
                end.getTime() - start.getTime() < MIN_GAP_MINUTES * 60 * 1000;

              const overlap = hasOverlap(index);

              return (
                <Box key={field.id}>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      mb: 2,
                    }}
                  >
                    <Box
                      sx={{
                        fontSize: "14px",
                        fontWeight: 500,
                        color: "#141414",
                      }}
                    >
                      Schedule {index + 1}
                    </Box>

                    <IconButton size="small" onClick={() => remove(index)}>
                      <CloseCircleIcon color="#3535F3" />
                    </IconButton>
                  </Box>

                  <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <Stack spacing={2}>
                      <Controller
                        name={`slotsSchema.schedules.${index}.startDateTime`}
                        control={control}
                        render={({ field }) => (
                          <DateTimePicker
                            label="Start Date & Time"
                            value={field.value ?? null}
                            minDateTime={new Date()}
                            onChange={(val) => field.onChange(val ?? undefined)}
                            format="dd/MM/yyyy HH:mm"
                            enableAccessibleFieldDOMStructure={false}
                            slots={{ textField: TextField }}
                            slotProps={{
                              textField: {
                                variant: "standard",
                                fullWidth: true,
                                inputProps: { readOnly: true },
                              },
                            }}
                            disabled={!canEditSlotConfiguration}
                          />
                        )}
                      />

                      <Controller
                        name={`slotsSchema.schedules.${index}.endDateTime`}
                        control={control}
                        render={({ field }) => {
                          let minEndTime = new Date();

                          if (start) {
                            const gapTime = new Date(
                              start.getTime() + MIN_GAP_MINUTES * 60 * 1000,
                            );

                            minEndTime =
                              gapTime > new Date() ? gapTime : new Date();
                          }

                          return (
                            <DateTimePicker
                              label="End Date & Time"
                              value={field.value ?? null}
                              minDateTime={minEndTime}
                              onChange={(val) =>
                                field.onChange(val ?? undefined)
                              }
                              format="dd/MM/yyyy HH:mm"
                              enableAccessibleFieldDOMStructure={false}
                              slots={{ textField: TextField }}
                              slotProps={{
                                textField: {
                                  variant: "standard",
                                  fullWidth: true,
                                  inputProps: { readOnly: true },
                                },
                              }}
                              disabled={!canEditSlotConfiguration}
                            />
                          );
                        }}
                      />
                    </Stack>
                  </LocalizationProvider>

                  {lessThanMinGap && (
                    <Typography sx={{ color: "#FF6B00", mt: 1, fontSize: 13 }}>
                      Start & End values are same
                    </Typography>
                  )}

                  {overlap && (
                    <Typography sx={{ color: "#FF6B00", mt: 1, fontSize: 13 }}>
                      ● Overlaps with another schedule
                    </Typography>
                  )}
                </Box>
              );
            })}

            {fields.length < MAX_SCHEDULES && (
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 1,
                  cursor: "pointer",
                  color: "#000093",
                  fontWeight: 500,
                }}
                onClick={() =>
                  append({
                    startDateTime: undefined,
                    endDateTime: undefined,
                  })
                }
              >
                <AddIcon fontSize="small" />
                <Typography>Add More</Typography>
              </Box>
            )}

            {fields.length >= MAX_SCHEDULES && (
              <Typography sx={{ fontSize: 13, color: "#999" }}>
                Maximum of 10 schedules can be configured
              </Typography>
            )}
          </Stack>
        )}
      </AccordionDetails>
    </StyledAccordion>
  );
};

export default SlotScheduler;
