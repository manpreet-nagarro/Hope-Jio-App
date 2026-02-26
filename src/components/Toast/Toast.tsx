import {
  Snackbar,
  IconButton,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import ErrorIcon from "@mui/icons-material/Error";
import { useToast } from "@hooks/useToast";
import { closeToast } from "@store/toastSlice/toastSlice";
import { StyledAlert } from "./Toast.styles";
import { useDispatch } from "react-redux";
import { COLORS } from "@constants/theme.constants";
export interface ToastProps {
  alertProps?: React.ComponentProps<typeof StyledAlert>;
}

const Toast = ({ alertProps }: ToastProps) => {
  const {
    open,
    message,
    severity,
    autoHideDuration,
    anchorOrigin,
  } = useToast();

  const dispatch = useDispatch();

  const handleClose = () => {
    dispatch(closeToast());
  };

  const icon =
    severity === "error"
      ? <ErrorIcon sx={{ color: COLORS.TEXT_DANGER }} />
      : <CheckCircleIcon />;

  return (
    <Snackbar
      open={open}
      autoHideDuration={autoHideDuration}
      onClose={handleClose}
      anchorOrigin={anchorOrigin ?? { vertical: "top", horizontal: "center" }}
    >
      <StyledAlert
        severity={severity}
        icon={icon}
        onClose={handleClose}
        action={
          <IconButton size="small" onClick={handleClose}>
            <CloseIcon fontSize="small" />
          </IconButton>
        }
        {...alertProps}
      >
        {message}
      </StyledAlert>
    </Snackbar>
  );
};

export default Toast;
