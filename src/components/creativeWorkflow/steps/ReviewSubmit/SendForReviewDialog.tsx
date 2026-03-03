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
  const [selectedUser, setSelectedUser] = useState("");

  const handleSend = () => {
    if (!selectedUser) return;
    onSend(selectedUser);
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="xs" fullWidth>
      <DialogTitle sx={{ fontWeight: 700, textAlign: "center" }}>
        Send Component for Review
        <IconButton
          onClick={onClose}
          sx={{ position: "absolute", right: 12, top: 12 }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <DialogContent>
        <Typography textAlign="center" mb={2}>
          ‘S1 / C3’
        </Typography>

        <Box mb={2}>
          <Typography fontSize={16} color="text.secondary">
            Department
          </Typography>
          <Typography fontSize={16} fontWeight={600}>
            Creative
          </Typography>
        </Box>

        <TextField
          select
          fullWidth
          label="User (Creative Checker)"
          value={selectedUser}
          onChange={(e) => setSelectedUser(e.target.value)}
          variant="standard"
          sx={{ mb: 4 }}
        >
          <MenuItem value="">Select</MenuItem>
          <MenuItem value="Avinash Gupta">Avinash Gupta</MenuItem>
          <MenuItem value="Rahul Mehta">Rahul Mehta</MenuItem>
        </TextField>

        <Box display="flex" justifyContent="flex-end" gap={2}>
          <Button
            variant="outlined"
            onClick={onClose}
            sx={{
              borderRadius: 20,
              textTransform: "none",
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
              backgroundColor: "#4F46E5",
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
