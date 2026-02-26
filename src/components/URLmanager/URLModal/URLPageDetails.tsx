import { UI_TEXTS } from "@constants/text.constants";
import {
  Label,
  Required,
  Section,
  SlugHelperText,
  StyledTextField,
} from "./URLModal.styles";
import type { UseFormRegister } from "react-hook-form";
import type { URLFormData } from "./URLData.schema";
interface URLPageDetailsProps {
  watch: (name: string) => void;
  errors: Record<string, unknown>;
  register: UseFormRegister<URLFormData>;
}

export const URLPageDetails = ({ register }: URLPageDetailsProps) => {
  return (
    <Section>
      <Label style={{ marginTop: 16 }}>{UI_TEXTS.platform}</Label>
      <StyledTextField
        variant="standard"
        disabled
        {...register("platform")}
        placeholder="platform"
      />

      <Label style={{ marginTop: 16 }}>
        {UI_TEXTS.URL_MODAL_TEXT.URl_SLUG}<Required>*</Required>
      </Label>
      <StyledTextField
        variant="standard"
        disabled
        {...register("slug")}
        placeholder="/page-slug"
      />
      <SlugHelperText>{UI_TEXTS.DESCRIPTION.UNIQUE_PER_STORE_AND_PLATFORM}</SlugHelperText>
    </Section>
  );
};
