import { Checkbox, FormControlLabel } from "@mui/material";
import { Section } from "./URLModal.styles";
import { Controller } from "react-hook-form";
import { SchedulerDateTimePicker } from "@components/SchedulerDateTimePicker/SchedulerDateTimePicker";
import type { Control } from "react-hook-form";
import type { URLFormData } from "./URLData.schema";

interface URLSchedulerProps {
    control: Control<URLFormData> | null;
    setValue: (
        name: string,
        value: unknown,
        options?: { shouldValidate?: boolean },
      ) => void;
}

export const URLScheduler = (props: URLSchedulerProps) => {
  const { control, setValue } = props || {};
  if (!control) {
    console.warn('URLScheduler: control prop is required for react-hook-form Controller.');
  }

  return (
    <Section>
      {control ? (
        <Controller
          name="isScheduled"
          control={control}
          render={({ field }) => (
            <>
              <FormControlLabel
                control={
                  <Checkbox
                    size="small"
                    checked={!!field.value}
                    onChange={e => {
                        field.onChange(e.target.checked)
                        if(!e.target.checked) {
                            setValue("scheduleStart", null);
                            setValue("scheduleEnd", null);
                        }
                    }}
                  />
                }
                label="Apply Schedule"
              />
              {!!field.value && (
                <SchedulerDateTimePicker control={control} startName="scheduleStart" endName="scheduleEnd" setValue={setValue} />
              )}
            </>
          )}
        />
      ) : (
        <FormControlLabel
          control={<Checkbox size="small" disabled />}
          label="Apply Schedule (form not connected)"
        />
      )}
    </Section>
  );
};
