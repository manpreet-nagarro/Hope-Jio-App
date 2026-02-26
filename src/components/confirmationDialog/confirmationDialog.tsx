import {
  Box,
  IconButton,
  Tooltip,
  type ButtonProps,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import {
  ConfirmDialog,
  ConfirmDialogActions,
  DialogHeader,
  PrimaryActionButton,
  SecondaryActionButton,
  StyledDialogContent,
  StyledDialogMessage,
  StyledDialogTitle,
} from "./confirmationDialog.styles";

interface ConfirmationDialogProps {
  open: boolean;
  title?: string;
  description?: string;
  loading?: boolean;
  color?: ButtonProps["color"];
  onPrimaryAction: () => void;
  onSecondaryAction: () => void;
  onClose: () => void;
  primaryActionLabel: string;
  secondaryActionLabel: string;
  primaryActionDisabled?: boolean;
  primaryActionTooltip?: string;
}

const ConfirmationDialog = ({
  open,
  title,
  description,
  color,
  loading = false,
  onPrimaryAction,
  onSecondaryAction,
  onClose,
  primaryActionLabel,
  secondaryActionLabel,
  primaryActionTooltip,
  primaryActionDisabled = false,
}: ConfirmationDialogProps) => {
  const primaryButton = (
    <PrimaryActionButton
      variant="contained"
      color={color}
      onClick={onPrimaryAction}
      disabled={loading || primaryActionDisabled}
    >
      {primaryActionLabel}
    </PrimaryActionButton>
  );

  return (
    <ConfirmDialog open={open} onClose={onClose} maxWidth="xs" fullWidth>
      <DialogHeader>
        <IconButton onClick={onClose}>
          <CloseIcon />
        </IconButton>
      </DialogHeader>
      <StyledDialogContent>
        {title && <Box mb={2}>
          <StyledDialogTitle>{title}</StyledDialogTitle>
        </Box>}
        {description && <Box>
          <StyledDialogMessage>{description}</StyledDialogMessage>
        </Box>}
      </StyledDialogContent>

      <ConfirmDialogActions>
        <SecondaryActionButton variant="outlined" onClick={onSecondaryAction}>
          {secondaryActionLabel}
        </SecondaryActionButton>
        {primaryActionDisabled ? (
          <Tooltip title={primaryActionTooltip} arrow>
            <span>{primaryButton}</span>
          </Tooltip>
        ) : (
          primaryButton
        )}
      </ConfirmDialogActions>
    </ConfirmDialog>
  );
};

export default ConfirmationDialog;
