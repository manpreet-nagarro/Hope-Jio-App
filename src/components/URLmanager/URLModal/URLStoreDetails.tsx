import { Label, Required, Section, StyledTextField } from "./URLModal.styles";
import type { UseFormRegister } from "react-hook-form";
import type { URLFormData } from "./URLData.schema";

export const URLStoreDetails = ({ register }: { register: UseFormRegister<URLFormData> }) => {
  return (
    <Section>
      <Label>
        Featured Store<Required>*</Required>
      </Label>
      <StyledTextField
        variant="standard"
        disabled
        {...register("store")}
        placeholder="store"
      />
    </Section>
  );
};
