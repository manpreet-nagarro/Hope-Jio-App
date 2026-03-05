import {
  Dialog,
  DialogContent,
  DialogTitle,
  Box,
  Typography,
  Button,
  IconButton,
  TextField,
  MenuItem,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useState } from "react";

interface Props {
  open: boolean;
  onClose: () => void;
  onSend: (user: string) => void;
}

export default function SendForReviewDialog({ open, onClose, onSend }: Props) {
  const [selectedUser, setSelectedUser] = useState("Avinash Gupta");

  const handleSend = () => {
    if (!selectedUser) return;
    onSend(selectedUser);
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="xs" fullWidth>
      <Box sx={{ position: "relative", padding: "24px 24px 0" }}>
        <IconButton
          onClick={onClose}
          sx={{
            position: "absolute",
            top: 12,
            right: 12,
            color: "#6B7280",
          }}
        >
          <CloseIcon />
        </IconButton>

        <Typography textAlign="center" fontSize={20} fontWeight={700} mb={1}>
          Send Component for Review
        </Typography>

        <Typography textAlign="center" mb={2}>
          ‘S1 / C3’
        </Typography>
      </Box>

      <DialogContent>
        <Box mb={2}>
          <Typography fontSize={14} color="#141414" mb={0.5}>
            Department
          </Typography>

          <Box
            sx={{
              borderBottom: "1px solid #E5E7EB",
              borderRadius: "6px",
              padding: "10px 12px",
              paddingLeft: "0",
              background: "#fff",
              fontSize: "14px",
              fontWeight: 500,
              color: "#000000A6",
              opacity: "0.65",
            }}
          >
            Creative
          </Box>
        </Box>

        <Box mb={3}>
          <Typography fontSize={14} color="#6B7280" fontWeight={500} mb={0.5}>
            User (Creative Checker)
          </Typography>

          <TextField
            select
            fullWidth
            value={selectedUser}
            onChange={(e) => setSelectedUser(e.target.value)}
            variant="standard"
          >
            <MenuItem value="">Select</MenuItem>
            <MenuItem value="Avinash Gupta">Avinash Gupta</MenuItem>
            <MenuItem value="Ajit Giri">Ajit Giri</MenuItem>
          </TextField>
        </Box>

        <Box display="flex" justifyContent="flex-end" gap={2}>
          <Button
            variant="outlined"
            onClick={onClose}
            sx={{
              borderRadius: 20,
              textTransform: "none",
              color: "#000093",
              borderColor: "#E0E0E0",
            }}
          >
            Cancel
          </Button>

          <Button
            variant="contained"
            disabled={!selectedUser}
            onClick={handleSend}
            sx={{
              borderRadius: 20,
              textTransform: "none",
              px: 3,
              backgroundColor: "#3535F3",
              "&:hover": { backgroundColor: "#4338CA" },
            }}
          >
            Send
          </Button>
        </Box>
      </DialogContent>
    </Dialog>
  );
}
