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
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "@store/store";
import { closeModal } from "@store/assign/scAssignmentStatusFlowSlice";
import {
  MODAL_TYPES,
  STATUS_ACTION_TYPE,
} from "@constants/assignModal.constants";
import { TextField } from "@mui/material";
import { COLORS, FONTS } from "@constants/theme.constants";

interface ReusableActionModalProps {
  open: boolean;
  title: string;
  subtitle?: string;
  primaryCtaLabel: string;
  secondaryCtaLabel: string;
  onPrimaryCta: () => Promise<void> | void;
  onSecondaryCta: () => void;
  loading?: boolean;
  children?: React.ReactNode;
  primaryCtaColor?: string;
}

const initialOptions: CustomDropdownOption[] = [
  {
    key: "alok",
    label: "Alok Jain",
    checked: true,
    disabled: false,
    type: "radio",
  },
  {
    key: "rahul",
    label: "Rahul Sharma",
    checked: false,
    disabled: false,
    type: "radio",
    customNode: (
      <Box>
        <Typography variant="caption">
          2 slots
        </Typography>
      </Box>
    ),
  },
];

export const ReusableActionModal = ({
  open,
  title,
  subtitle,
  primaryCtaLabel,
  secondaryCtaLabel,
  onPrimaryCta,
  onSecondaryCta,
  loading = false,
  children,
  primaryCtaColor,
}: ReusableActionModalProps & { primaryCtaColor?: string }) => {
  return (
    <Dialog
      open={open}
      onClose={onSecondaryCta}
      maxWidth="xs"
      fullWidth
      slotProps={{
        paper: {
          sx: {
            borderRadius: "10px",
          },
          elevation: 0,
        },
      }}
    >
      <AssignModalHeader
        onClose={onSecondaryCta}
        title={title}
        subtitle={subtitle}
      />
      <DialogContent sx={{ borderBottom: `1px solid ${COLORS.BORDER_LIGHTER}`, padding : "0px", marginLeft: "1rem", marginRight: "1rem" }}>
        {children}
      </DialogContent>
      <DialogActions sx={{ p: 2 }}>
        <Button onClick={onSecondaryCta} color="primary" variant="outlined" sx={{ borderRadius: "1000px", borderColor: COLORS.BORDER_LIGHTER, color: "#000093", fontFamily :FONTS.FONT_FAMILY_BOLD, fontSize : "1rem" }}>
          {secondaryCtaLabel}
        </Button>
        <Button
          onClick={onPrimaryCta}
          color="primary"
          variant="contained"
          disabled={loading}
          startIcon={loading ? <CircularProgress size={18} /> : null}
          sx={{ ...(primaryCtaColor ? { backgroundColor: primaryCtaColor, '&:hover': { backgroundColor: primaryCtaColor } } : {}), borderRadius:" 1000px",  fontFamily :FONTS.FONT_FAMILY_BOLD, fontSize : "1rem", boxShadow:"none" }}
        >
          {loading ? `${primaryCtaLabel}...` : primaryCtaLabel}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

const SCAssignmentStatusFlowModal = () => {
  const dispatch = useDispatch();
  const [rejectionMessage, setRejectionMessage] = useState("");
  const [options, setOptions] = useState(initialOptions);
  const [assignLoading, setAssignLoading] = useState(false);
  const scAssignmentStatusFlow = useSelector(
    (state: RootState) => state.scAssignmentStatusFlow,
  );
  const {
    open: assignOpen,
    type,
    title,
    subtitle,
    statusActionType,
  } = scAssignmentStatusFlow;
  const handleAssign = async () => {
    setAssignLoading(true);
    await new Promise((res) => setTimeout(res, 1500));
    setAssignLoading(false);
    dispatch(closeModal());
  };

  const handleCancel = () => {
    dispatch(closeModal());
  };

  return (
    <ReusableActionModal
      open={assignOpen && false}
      title={title}
      subtitle={subtitle}
      primaryCtaLabel={
        STATUS_ACTION_TYPE[
          statusActionType as keyof typeof STATUS_ACTION_TYPE
        ] || STATUS_ACTION_TYPE.Assign
      }
      secondaryCtaLabel="Cancel"
      onPrimaryCta={handleAssign}
      onSecondaryCta={handleCancel}
      loading={assignLoading}
      primaryCtaColor={statusActionType === STATUS_ACTION_TYPE.Reject ? COLORS.TEXT_DANGER : undefined}
    >
      {type === MODAL_TYPES.ASSIGN_SLOT_COMPONENT_CP && (
        <>
          <Box mb={1} pb={1}>
            <Typography sx={{fontFamily :FONTS.FONT_FAMILY, fontSize:"0.875rem", color: COLORS.TEXT_DARK_LIGHT}}>
              Department
            </Typography>
            <Typography variant="body1">Central Planning</Typography>
          </Box>
          <Box pb={4}>
            <Typography sx={{fontFamily :FONTS.FONT_FAMILY, fontSize:"0.875rem", color: COLORS.TEXT_DARK_LIGHT}}>
              User (CP Maker)
            </Typography>
            <CustomDropdown
              options={options}
              disabled={false}
              onChange={(key) => {
                setOptions((prev) =>
                  prev.map((opt) => ({
                    ...opt,
                    checked: opt.key === key,
                  })),
                );
              }}
              label="Select User"
              multiple={false}
            />
          </Box>
        </>
      )}
      {type === MODAL_TYPES.REJECT_MODAL && (
        <TextField
          fullWidth
          multiline
          minRows={2}
          placeholder="This Slot is not required anymore."
          value={rejectionMessage}
          onChange={(e) => setRejectionMessage(e.target.value)}
        />
      )}
    </ReusableActionModal>
  );
};

export default SCAssignmentStatusFlowModal;
