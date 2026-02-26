import * as React from "react";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Button from "@mui/material/Button";

export interface AssignModalProps {
	open: boolean;
	onClose: () => void;
	onAssign: () => void;
	isAssignDisabled?: boolean;
	isAssignLoading?: boolean;
	renderTitle?: () => React.ReactNode;
	renderContent: () => React.ReactNode;
	renderActions?: () => React.ReactNode;
	renderCloseIcon?: () => React.ReactNode;
}

const AssignModal: React.FC<AssignModalProps> = ({
	open,
	onClose,
	onAssign,
	isAssignDisabled = false,
	isAssignLoading = false,
	renderTitle,
	renderContent,
	renderActions,
	renderCloseIcon,
}) => {
	return (
		<Dialog open={open} onClose={onClose} maxWidth="xs" fullWidth>
			<DialogTitle sx={{ m: 0, p: 2 }}>
				{renderTitle ? renderTitle() : "Assign Page"}
				<IconButton
					aria-label="close"
					onClick={onClose}
					sx={{
						position: "absolute",
						right: 8,
						top: 8,
						color: (theme) => theme.palette.grey[500],
					}}
				>
					{renderCloseIcon ? renderCloseIcon() : <CloseIcon />}
				</IconButton>
			</DialogTitle>
			<DialogContent dividers>
				{renderContent()}
			</DialogContent>
			<DialogActions>
				{renderActions ? (
					renderActions()
				) : (
					<>
						<Button onClick={onClose} color="primary" variant="outlined">Cancel</Button>
						<Button
							onClick={onAssign}
							color="primary"
							variant="contained"
							disabled={isAssignDisabled || isAssignLoading}
						>
							{isAssignLoading ? "Assigning..." : "Assign"}
						</Button>
					</>
				)}
			</DialogActions>
		</Dialog>
	);
};

export default AssignModal;
