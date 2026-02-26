import { Alert, Snackbar } from "@mui/material";
import type { SnackbarProps } from "@mui/material";
import * as React from "react";
import { useMemo } from "react";
import * as ReactDOM from "react-dom";
import SnackbarWarningIcon from "@assets/icons-svg/snackbarWarningIcon";

interface AlertSnackbarProps extends Omit<SnackbarProps, "open"> {
  open: boolean;
  message: string | null;
  severity?: "error" | "warning" | "info" | "success";
  onClose: () => void;
  autoHideDuration?: number;
}

export const AlertSnackbar: React.FC<AlertSnackbarProps> = ({
  open,
  message,
  severity = "warning",
  onClose,
  autoHideDuration = 6000,
  anchorOrigin = { vertical: "top", horizontal: "center" },
  ...props
}) => {
  const portalRoot = useMemo(() => {
    let root = document.getElementById("snackbar-portal");
    if (!root) {
      root = document.createElement("div");
      root.id = "snackbar-portal";
      document.body.appendChild(root);
    }
    return root;
  }, []);

  const getIconColor = () => {
    switch (severity) {
      case "error":
        return "#D32F2F";
      case "warning":
        return "#F06D0F";
      case "success":
        return "#388E3C";
      case "info":
        return "#1976D2";
      default:
        return "#F06D0F";
    }
  };

  const snackbarContent = (
    <Snackbar
      open={open}
      onClose={onClose}
      anchorOrigin={anchorOrigin}
      autoHideDuration={autoHideDuration}
      sx={{
        position: "fixed",
        zIndex: 9999,
        maxWidth: "600px",
        width: "90%",
        left: "50%",
        transform: "translateX(-50%)",
      }}
      {...props}
    >
      <Alert
        severity={severity}
        onClose={onClose}
        icon={<SnackbarWarningIcon size={24} color={getIconColor()} />}
        sx={{
          backgroundColor: "#ffffff",
          color: "#141414",
          borderRadius: "24px",
          boxShadow: "0px 4px 16px 0px #00000014",
          display: "flex",
          alignItems: "center",
          gap: "12px",
          padding: "0px 16px",
          "& .MuiAlert-action": {
            padding: 0,
            marginRight: "-8px",
          },
        }}
      >
        {message}
      </Alert>
    </Snackbar>
  );

  return ReactDOM.createPortal(snackbarContent, portalRoot);
};
