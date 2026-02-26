import { useState } from "react";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import CustomDropdown, { type CustomDropdownOption } from "./CustomDropdown";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { AssignModalHeader } from "../AssignModalHeader";
import type { RootState } from "@store/store";
import { useDispatch, useSelector } from "react-redux";
import { MODAL_TYPES } from "@constants/assignModal.constants";
import { closeModal } from "@store/assign/assignSlice";

const initialOptions: CustomDropdownOption[] = [
  {
    key: "alok",
    label: "Alok Jain (CP Maker)",
    checked: true,
    disabled: false,
    type: "radio",
  },
  {
    key: "rahul",
    label: "Rahul Sharma (CP Admin)",
    checked: false,
    disabled: false,
    type: "radio",
    customNode: <Box><Typography variant="caption" color="text.secondary">Hello Admin users have view-only access</Typography></Box>,
  },
];

const SlotAssignModalDemo = () => {

  const assignStatus = useSelector((state: RootState) => state.assignStatus);
  const { open, type, title, subtitle } = assignStatus;
  const [options, setOptions] = useState(initialOptions);
  const [assignLoading, setAssignLoading] = useState(false);
  const dispatch = useDispatch();

  const handleAssign = async () => {
    setAssignLoading(true);
    await new Promise((res) => setTimeout(res, 1500));
    setAssignLoading(false);
  };

  const closeResetModal = () => {
dispatch(closeModal());
  }

  return (
    <Dialog open={open && type === MODAL_TYPES.ASSIGN_SLOT_MODAL} onClose={closeResetModal} maxWidth="xs" fullWidth>
      <AssignModalHeader onClose={closeResetModal} title={title} subtitle={subtitle} />
      <DialogContent sx={{borderBottom:"1px solid grey"}} >
        <Box mb={2}  pb={1}>
          <Typography variant="body2" color="text.secondary">Department</Typography>
          <Typography variant="body1">Central Planning</Typography>
        </Box>
        <Box  pb={1}>
          <Typography variant="body2" color="text.secondary">User (CP Maker)</Typography>
          <CustomDropdown
            options={options}
            disabled={false}
            onChange={(key) => {
              setOptions((prev) =>
                prev.map((opt) => ({
                  ...opt,
                  checked: opt.key === key,
                }))
              );
            }}
            label="Select User"
            multiple={false}
          />
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={closeResetModal} color="primary" variant="outlined">
          Cancel
        </Button>
        <Button
          onClick={handleAssign}
          color="primary"
          variant="contained"
          disabled={assignLoading}
          startIcon={assignLoading ? <CircularProgress size={18} /> : null}
        >
          {assignLoading ? "Assigning..." : "Assign"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default SlotAssignModalDemo;
