import { IconButtonNoPadding } from "@components/slotEditorCanvas/slotEditorCanvas.styles";
import CloseIcon from "@mui/icons-material/Close";
import {
  StyledHeaderWrapper,
  StyledDialogSubtitleTitleText,
  StyledDialogTitleHeader,
} from "./AssignModal.styles";

export const AssignModalHeader = ({
  title,
  subtitle,
  onClose
}: {
  title: string;
  subtitle?: string;
  onClose?: () => void;
}) => {
  return (
    <StyledHeaderWrapper>
      {onClose && <IconButtonNoPadding
        sx={{ display: "flex", justifyContent: "flex-end", color: "#7B7B7B" }}
        onClick={onClose}
      >
        <CloseIcon />
      </IconButtonNoPadding>}

      <StyledDialogTitleHeader>{title}</StyledDialogTitleHeader>
      <StyledDialogSubtitleTitleText>{subtitle}</StyledDialogSubtitleTitleText>
    </StyledHeaderWrapper>
  );
};
