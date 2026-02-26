import { Checkbox, FormControlLabel, FormGroup } from "@mui/material";
import { Controller, type UseControllerProps, type ControllerRenderProps } from "react-hook-form";

import type { URLFormData } from "./URLData.schema";

  function handleCheckboxChange(
    field: ControllerRenderProps<URLFormData, "userCohorts">,
    cohort: string,
    event: React.ChangeEvent<HTMLInputElement>,
    allOptions: string[]
  ) {
    const checked = event.target.checked;
    let newValue: string[] = Array.isArray(field.value) ? [...field.value] : [];

    if (cohort === "All") {
      newValue = checked ? [...allOptions, "All"] : [];
      field.onChange(newValue);
      return;
    }

    if (checked) {
      if (!newValue.includes(cohort)) {
        newValue.push(cohort);
      }
    } else {
      newValue = newValue.filter((c) => c !== cohort);
    }

    const allSelected = allOptions.every(opt => newValue.includes(opt));
    if (allSelected) {
      if (!newValue.includes("All")) {
        newValue.push("All");
      }
    } else {
      newValue = newValue.filter((c) => c !== "All");
    }

    field.onChange(newValue);
  }

interface URLUserCohortsDetailsProps {
  control: UseControllerProps<URLFormData>["control"];
  userCohorts: string[];
}

export const URLUserCohortsDetails = (props: URLUserCohortsDetailsProps) => {
  const { control, userCohorts } = props;
  if (!control) {
    console.warn(
      "URLScheduler: control prop is required for react-hook-form Controller."
    );
  }

  return (
    <Controller
      name="userCohorts"
      control={control}
      defaultValue={[]}
      render={({ field }) => {
        const allOptions = (userCohorts || []).filter((opt : string) => opt !== "All");
        const optionsWithAll = ["All", ...allOptions];
        return (
          <FormGroup>
            {optionsWithAll.map((cohort: string) => (
              <FormControlLabel
                key={cohort}
                control={
                  <Checkbox
                    size="small"
                    checked={(() => {
                      if (cohort === "All") {
                        return Array.isArray(field.value) && field.value.includes("All");
                      }
                      return Array.isArray(field.value) && field.value.includes(cohort);
                    })()}
                    onChange={e => handleCheckboxChange(field, cohort, e, allOptions)}
                    value={cohort}
                  />
                }
                label={cohort}
              />
            ))}
          </FormGroup>
        );
      }}
    />
  );
};
