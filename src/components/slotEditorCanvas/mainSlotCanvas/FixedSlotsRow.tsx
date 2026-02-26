import {
  GridWrapper,
  RoundedBoxItem,
  TypopraphyVariant1,
  BoxVariant1,
  TypopraphyVariant2,
  DisabledSlotWrapper,
} from "../slotEditorCanvas.styles";

interface FixedSlot {
  label: string;
}

interface FixedSlotsRowProps {
  slots: FixedSlot[];
  variant?: "variant1" | "variant2";
}

export const FixedSlotsRow = ({
  slots,
  variant = "variant1",
}: FixedSlotsRowProps) => {
  return (
    <DisabledSlotWrapper>
      {slots.map((slotItem, index) => (
        <GridWrapper key={`${variant}-${index}-${slotItem.label}`}>
          {variant === "variant1" ? (
            <>
              <RoundedBoxItem />
              <TypopraphyVariant1>{slotItem.label}</TypopraphyVariant1>
            </>
          ) : (
            <BoxVariant1>
              <TypopraphyVariant2>{slotItem.label}</TypopraphyVariant2>
            </BoxVariant1>
          )}
        </GridWrapper>
      ))}
    </DisabledSlotWrapper>
  );
};
