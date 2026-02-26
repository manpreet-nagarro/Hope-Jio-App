import {
  CloseButton,
  CloseLabel,
  EditorActionsWrapper,
  HeaderContainer,
  RightBox,
  SaveButton,
  StyledTabs,
} from "./editorHeader.styles";
import { ToggleButton, Tooltip } from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import {
  CLOSE_EDITOR,
  EDITOR_CLOSE_DISCARD_BUTTON,
  EDITOR_CLOSE_MESSAGE,
  EDITOR_CLOSE_SAVE_BUTTON,
  EDITOR_CLOSE_TITLE,
  SAVE_EDITOR,
} from "@utils/messages";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "@store/store";
import { setEditorMode, type EditorMode } from "@store/UISlice/UISlice";
import CloseEditorIcon from "@assets/icons-svg/wireframeEditor/close-editor.svg";
import { useState, lazy, Suspense } from "react";
const ConfirmationDialog = lazy(
  () => import("@components/confirmationDialog/confirmationDialog"),
);
import { useNavigate } from "react-router-dom";
import { usePrivilege } from "@hooks/usePrivilege";
import ActionMenu, {
  type ActionItem,
} from "@components/Wireframe/WireframeActionMenu/ActionMenu";
import SendForReviewIcon from "@assets/icons-svg/AssignIcon";
import SendAllReviewIcon from "@assets/icons-svg/SendForReviewIcon";
import RejectPageIcon from "@assets/icons-svg/RejectPageIcon";
import { COLORS } from "@constants/theme.constants";
import { setModalState } from "@store/assign/scAssignmentStatusFlowSlice";
import { UI_TEXTS } from "@constants/text.constants";
import { MODAL_TYPES, STATUS_ACTION_TYPE } from "@constants/assignModal.constants";
import Loader from "@components/loader/Loader";

type IProps = {
  onSave: () => void;
  // onOpenSettings: () => void;
  isSaveInProgress: boolean;
};

const EditorHeader = ({ onSave, isSaveInProgress }: IProps) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { canSaveWireframe, canAssignWireframe, canApproveWireframe, canRejectWireframe, canSendComponentForReview } = usePrivilege();
  const slots = useSelector((state: RootState) => state.slots.slots);
    const selectedWireframe = useSelector(
      (state: RootState) => state.wireframe.selectedWireframe,
    );
  const mode = useSelector((state: RootState) => state.ui.editorMode);

  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleDiscardChanges = () => {
    setIsDialogOpen(false);
    navigate("/wireframe");
  };

  const handleSaveAndClose = () => {
    setIsDialogOpen(false);
    onSave();
    navigate("/wireframe");
  };

  const handleModeChange = (
    _: React.MouseEvent<HTMLElement>,
    newMode: EditorMode | null,
  ) => {
    if (newMode) {
      dispatch(setEditorMode(newMode));
    }
  };

  const onAssign = () => {};
  const onApprove = () => {};
  const onReject = () => {};
  const onSendAllSlotsReview = () => {
    dispatch(setModalState({
          open: true,
          title: UI_TEXTS.SLOT.SEND_ALL_SLOTS_FOR_REVIEW,
          subtitle: `(${slots.length} Slots /${slots.reduce((total, slot) => total + slot.components.length, 0)} Components)`,
          type: MODAL_TYPES.SEND_ALL_SLOTS_REVIEW_MODAL,
          statusActionType: STATUS_ACTION_TYPE.Send
        }));
  };

  const actionItems: ActionItem[] = [
    {
      id: "assign",
      label: "Assign Page",
      icon: <SendForReviewIcon />,
      onClick: onAssign,
      showDivider: false,
      disabled: !canAssignWireframe,
      disabledTooltip: canAssignWireframe ? undefined : "You don't have permission to assign",
      show: canAssignWireframe
    },
    {
      id: "approve",
      label: "Approve Page",
      icon: <CheckCircleIcon sx={{color: "#141414", width: 16, height: 16}} />,
      onClick: onApprove,
      showDivider: false,
      disabled: !canApproveWireframe,
      disabledTooltip: canApproveWireframe ? undefined : "You don't have permission to approve",
      show: canApproveWireframe
    },
    {
      id: "reject",
      label: "Reject Page",
      icon: <RejectPageIcon />,
      onClick: onReject,
      showDivider: false,
      disabled: !canRejectWireframe,
      disabledTooltip: canRejectWireframe ? undefined : "You don't have permission to reject",
      show: canRejectWireframe
    },
    {
      id: "send",
      label: "Send all Slots for Review",
      icon: <SendAllReviewIcon width={16} color={COLORS.TEXT_DARK} />,
      onClick: onSendAllSlotsReview,
      showDivider: false,
      disabled: !canSendComponentForReview,
      disabledTooltip: canSendComponentForReview ? undefined : "You don't have permission to send components for review",
      show: canSendComponentForReview
    },
  ];

  const filteredActionItems = actionItems.filter(item => item.show);

  const checkToEnableConfirmDialog = () => {
    if (selectedWireframe && slots?.length && selectedWireframe?.slots) {
        const slotsString = JSON.stringify(slots);
        const wireframeSlotsString = JSON.stringify(selectedWireframe.slots);
        if (slotsString === wireframeSlotsString) {
          handleDiscardChanges();
        }else{
          setIsDialogOpen(true);
        }
      }
  }

  return (
    <>
      {isSaveInProgress && <Loader open={isSaveInProgress} />}
      {isDialogOpen && (
        <Suspense fallback={null}>
          <ConfirmationDialog
            open={isDialogOpen}
            title={EDITOR_CLOSE_TITLE}
            description={EDITOR_CLOSE_MESSAGE}
            color="primary"
            onSecondaryAction={handleDiscardChanges}
            onPrimaryAction={handleSaveAndClose}
            primaryActionLabel={EDITOR_CLOSE_SAVE_BUTTON}
            secondaryActionLabel={EDITOR_CLOSE_DISCARD_BUTTON}
            onClose={() => setIsDialogOpen(false)}
            primaryActionDisabled={!canSaveWireframe}
            primaryActionTooltip={undefined}
          />
        </Suspense>
      )}
      <HeaderContainer>
        <CloseButton onClick={checkToEnableConfirmDialog} variant="text">
          <img
            src={CloseEditorIcon}
            alt="close-editor"
            width={18}
            height={18}
          />
          <CloseLabel>{CLOSE_EDITOR}</CloseLabel>
        </CloseButton>

        <StyledTabs value={mode} exclusive onChange={handleModeChange}>
          <ToggleButton value="wireframe">Wireframe</ToggleButton>
          <ToggleButton value="list">List View</ToggleButton>
        </StyledTabs>

        <RightBox>
          {canSaveWireframe ? (
            <SaveButton
              variant="outlined"
              startIcon={<CheckCircleIcon />}
              onClick={onSave}
            >
              {SAVE_EDITOR}
            </SaveButton>
          ) : (
            <Tooltip title="You don't have permission to save" arrow>
              <span>
                <SaveButton
                  variant="outlined"
                  startIcon={<CheckIcon />}
                  onClick={onSave}
                  disabled
                  style={{ pointerEvents: "none", opacity: 0.5 }}
                >
                  {SAVE_EDITOR}
                </SaveButton>
              </span>
            </Tooltip>
          )}
          <EditorActionsWrapper>
            {filteredActionItems?.length > 0 && <ActionMenu items={filteredActionItems} />}
          </EditorActionsWrapper>
        </RightBox>
      </HeaderContainer>
    </>
  );
};

export default EditorHeader;
