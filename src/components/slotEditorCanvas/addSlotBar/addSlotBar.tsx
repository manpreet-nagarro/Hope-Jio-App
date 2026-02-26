import { AddSlotButton } from "../slotEditorCanvas.styles";
import { UI_TEXTS } from "@constants/text.constants";
import { COLORS } from "@constants/theme.constants";
import AddPlusIcon from "@assets/icons-svg/addPlusIcon";
import * as React from "react";

interface AddSlotBarProps {
  onClick: () => void;
}

export const AddSlotBar: React.FC<AddSlotBarProps> = ({ onClick }) => {
  return (
    <AddSlotButton onClick={onClick}>
      <AddPlusIcon size={12} color={COLORS.WHITE} />
      {UI_TEXTS.BUTTONS.ADD_SLOT}
    </AddSlotButton>
  );
};
