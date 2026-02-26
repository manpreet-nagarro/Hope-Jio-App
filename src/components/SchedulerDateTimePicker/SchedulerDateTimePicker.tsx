import { TextField } from "@mui/material";
import { DateTimePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import CalendarIcon from "@assets/icons-svg/calendarIcon";

import { Controller, useWatch } from "react-hook-form";
import type { Control, UseFormSetValue, FieldValues, Path } from "react-hook-form";


type SchedulerDateTimePickerProps<T extends FieldValues = Record<string, unknown>> = {
  control: Control<T>;
  startName: Path<T>;
  endName: Path<T>;
  startLabel?: string;
  endLabel?: string;
  minDate?: Date;
  setValue?: UseFormSetValue<T>;
  format?: string;
};

export function SchedulerDateTimePicker<T extends FieldValues = Record<string, unknown>>({
  control,
  startName,
  endName,
  startLabel = "Start Date & Time",
  endLabel = "End Date & Time",
  minDate,
  setValue,
  format = "dd/MM/yyyy HH:mm",
}: Readonly<SchedulerDateTimePickerProps<T>>) {
  // Use useWatch to reactively get the start date value
  const startValue = useWatch({ control, name: startName });
  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <div style={{ width: "100%", display: "flex", flexDirection: "column", gap: 16 }}>
        <Controller
          name={startName}
          control={control}
          render={({ field: startField }) => (
            <DateTimePicker
              label={startLabel}
              value={startField.value}
              minDateTime={minDate || new Date()}
              onChange={val => {
                startField.onChange(val);
                if (setValue && control?._formValues?.[endName] && val && control._formValues[endName] < val) {
                  setValue(endName, null as unknown as T[typeof endName]);
                }
              }}
              enableAccessibleFieldDOMStructure={false}
              slots={{ textField: TextField, openPickerIcon: CalendarIcon }}
              slotProps={{
                textField: {
                  variant: "standard",
                  fullWidth: true,
                  inputProps: { readOnly: true },
                },
              }}
              format={format}
            />
          )}
        />
        <Controller
          name={endName}
          control={control}
          render={({ field: endField }) => {
            // Calculate min end date as 5 minutes after startValue (if present)
            let minEndDate: Date = minDate || new Date();
            if (
              startValue && (
                typeof startValue === 'string' ||
                typeof startValue === 'number' ||
                (typeof startValue === 'object' && startValue !== null && Object.prototype.toString.call(startValue) === '[object Date]')
              )
            ) {
              minEndDate = new Date(new Date(startValue as string | number | Date).getTime() + 5 * 60 * 1000);
            }
            return (
              <DateTimePicker
                label={endLabel}
                value={endField.value}
                minDateTime={minEndDate}
                onChange={val => {
                  if (val && startValue && val < minEndDate) {
                    endField.onChange(minEndDate);
                  } else {
                    endField.onChange(val);
                  }
                }}
                enableAccessibleFieldDOMStructure={false}
                slots={{ textField: TextField, openPickerIcon: CalendarIcon }}
                slotProps={{
                  textField: {
                    variant: "standard",
                    fullWidth: true,
                    inputProps: { readOnly: true },
                  },
                }}
                format={format}
              />
            );
          }}
        />
      </div>
    </LocalizationProvider>
  );
};