import { UI_TEXTS } from "@constants/text.constants";
import { COLORS } from "@constants/theme.constants";
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import SliderSettingsIcon from "@assets/icons-svg/sliderSettingsIcon";
import DuplicateSlotIcon from "@assets/icons-svg/duplicateSlotIcon";
import MoveSlotUpIcon from "@assets/icons-svg/moveSlotUpIcon";
import MoveSlotDownIcon from "@assets/icons-svg/moveSlotDownIcon";
import AssignSlotIcon from "@assets/icons-svg/assignSlotIcon";
import DeleteSlotIcon from "@assets/icons-svg/deleteSlotIcon";
import * as React from "react";
import { openConfigurationDrawer, setConfigurationActiveTab } from "@store/UISlice/UISlice";
import { setModalState } from "@store/assign/scAssignmentStatusFlowSlice";
import { MODAL_TYPES, STATUS_ACTION_TYPE } from "@constants/assignModal.constants";
import SendReviewIcon from "@assets/icons-svg/SendReviewIcon";
import RejectPageIcon from "@assets/icons-svg/RejectPageIcon";
import type { AppDispatch } from "@store/store";

interface ConfigMenuOptions {
  headerItem: {
    icon: React.ReactNode;
    label: string;
    onClick: () => void;
    disabled?: boolean;
    disabledTooltip?: string;
    show?: boolean;
    showDivider?: boolean;
  };
  actionItems: Array<{
    icon: React.ReactNode;
    label: string;
    onClick: () => void;
    disabled?: boolean;
    disabledTooltip?: string;
    show?: boolean;
    showDivider?: boolean;
  }>;
  dangerItems: Array<{
    icon: React.ReactNode;
    label: string;
    onClick: () => void;
    disabled?: boolean;
    disabledTooltip?: string;
    show?: boolean;
    showDivider?: boolean;
  }>;
}

interface IBuildSlotConfigMenuOptionsProps{
  slotIndex: number;
  handleDuplicateSlot: (index: number) => void;
  handleMoveSlotUp: (index: number) => void;
  handleMoveSlotDown: (index: number) => void;
  handleAssignSlot: (index: number) => void;
  handleDeleteSlot: (index: number) => void;
  handleActiveSlotIndex: (index: number | null) => void;
  canDuplicateSlot: boolean;
  canDeleteSlot: boolean;
  canMoveSlot: boolean;
  canAssignSlot: boolean;
  canViewSlotConfiguration: boolean;
  dispatch: AppDispatch;
  canSendSlotForReview: boolean;
  canApproveSlot: boolean;
  canRejectSlot: boolean;
}

/**
 * Build slot configuration menu options
 */
export const BuildSlotConfigMenuOptions = (
  {
    slotIndex,
    handleDuplicateSlot : onDuplicate,
    handleMoveSlotUp : onMoveUp,
    handleMoveSlotDown : onMoveDown,
    handleAssignSlot : onAssign,
    handleDeleteSlot : onDelete,
    handleActiveSlotIndex,
    canDuplicateSlot,
    canDeleteSlot,
    canMoveSlot,
    canAssignSlot,
    canViewSlotConfiguration,
    dispatch,
    canSendSlotForReview,
    canApproveSlot,
    canRejectSlot
  }: IBuildSlotConfigMenuOptionsProps
): ConfigMenuOptions => {
  return ({
  headerItem: {
    icon: <SliderSettingsIcon size={16} color={COLORS.TEXT_DARK} />,
    label: UI_TEXTS.SLOT.CONFIGURATION_LABEL,
    onClick: () => {
      handleActiveSlotIndex(slotIndex);
      dispatch(setConfigurationActiveTab(0));
      dispatch(openConfigurationDrawer());
    },
    disabled: !canViewSlotConfiguration,
    disabledTooltip: canViewSlotConfiguration ? undefined : "You don't have permission to view this slot's configuration.",
    show: canViewSlotConfiguration
  },
  actionItems: [
    {
      icon: <DuplicateSlotIcon size={16} color={COLORS.TEXT_DARK} />,
      label: UI_TEXTS.SLOT.DUPLICATE_LABEL,
      onClick: () => onDuplicate(slotIndex),
      disabled: !canDuplicateSlot,
      disabledTooltip: "You don't have permission to duplicate this slot.",
      show: canDuplicateSlot,
      showDivider: canDuplicateSlot
    },
    {
      icon: <MoveSlotUpIcon size={16} color={COLORS.TEXT_DARK} />,
      label: UI_TEXTS.SLOT.MOVE_UP_LABEL,
      onClick: () => onMoveUp(slotIndex),
      disabled: !canMoveSlot,
      disabledTooltip: "You don't have permission to move this slot.",
      show: canMoveSlot,
      showDivider: !canDuplicateSlot && canMoveSlot
    },
    {
      icon: <MoveSlotDownIcon size={16} color={COLORS.TEXT_DARK} />,
      label: UI_TEXTS.SLOT.MOVE_DOWN_LABEL,
      onClick: () => onMoveDown(slotIndex),
      disabled: !canMoveSlot,
      disabledTooltip: "You don't have permission to move this slot.",
      show: canMoveSlot,
    },
    {
      icon: <AssignSlotIcon size={16} color={COLORS.TEXT_DARK} />,
      label: UI_TEXTS.SLOT.ASSIGN_SLOT_LABEL,
      onClick: () => {
        dispatch(setModalState({
          open: true,
          title: UI_TEXTS.SLOT.ASSIGN_SLOT_LABEL,
          subtitle: `‘S${slotIndex + 1}’  (All Components)`,
          type: MODAL_TYPES.ASSIGN_SLOT_COMPONENT_CP,
          statusActionType: STATUS_ACTION_TYPE.Assign
        }));
        onAssign(slotIndex);
      },
      disabled: !canAssignSlot,
      disabledTooltip: "You don't have permission to assign this slot.",
      show: canAssignSlot,
      showDivider: !canDuplicateSlot && !canMoveSlot && canAssignSlot
    },
    {
      icon: <SendReviewIcon size={16} color={COLORS.TEXT_DARK} />,
      label: UI_TEXTS.SLOT.SEND_SLOT_FOR_REVIEW,
      onClick: () => {
        dispatch(setModalState({
          open: true,
          title: UI_TEXTS.SLOT.SEND_SLOT_FOR_REVIEW,
          subtitle: `‘S${slotIndex + 1}’  (All Components)`,
          type: MODAL_TYPES.REVIEW_MODAL,
          statusActionType: STATUS_ACTION_TYPE.Send
        }));
        onAssign(slotIndex);
      },
      disabled: !canSendSlotForReview,
      disabledTooltip: "You don't have permission to send this slot for review.",
      show: canSendSlotForReview,
      showDivider: (!canDuplicateSlot && !canMoveSlot && !canAssignSlot && canSendSlotForReview)
    },
    {
      icon: <CheckCircleIcon sx={{color: "#141414", width: 16, height: 16}} />,
      label: UI_TEXTS.SLOT.APPROVE_SLOT,
      onClick: () => {
        dispatch(setModalState({
          open: true,
          title: UI_TEXTS.SLOT.APPROVE_SLOT,
          subtitle: `‘S${slotIndex + 1}’  (All Components)`,
          type: MODAL_TYPES.APPROVE_MODAL,
          statusActionType: STATUS_ACTION_TYPE.Approve
        }));
        onAssign(slotIndex);
      },
      disabled: !canApproveSlot,
      disabledTooltip: "You don't have permission to approve this slot.",
      show: canApproveSlot,
      showDivider: (!canDuplicateSlot && !canMoveSlot && !canAssignSlot && !canSendSlotForReview && canApproveSlot)
    },
    {
      icon: <RejectPageIcon width={16} color={COLORS.TEXT_DARK} />,
      label: UI_TEXTS.SLOT.REJECT_SLOT,
      onClick: () => {
        dispatch(setModalState({
          open: true,
          title: UI_TEXTS.SLOT.REJECT_SLOT,
          subtitle: `‘S${slotIndex + 1}’  (All Components)`,
          type: MODAL_TYPES.REJECT_MODAL,
          statusActionType: STATUS_ACTION_TYPE.Reject
        }));
        onAssign(slotIndex);
      },
      disabled: !canRejectSlot,
      disabledTooltip: "You don't have permission to reject this slot.",
      show: canRejectSlot,
      showDivider: (!canDuplicateSlot && !canMoveSlot && !canAssignSlot && !canSendSlotForReview && !canApproveSlot && canRejectSlot)
    },
  ],
  dangerItems: [
    {
      icon: <DeleteSlotIcon size={16} color={COLORS.TEXT_DANGER} />,
      label: UI_TEXTS.SLOT.DELETE_SLOT,
      onClick: () => onDelete(slotIndex),
      disabled: !canDeleteSlot,
      disabledTooltip: "You don't have permission to delete this slot.",
      show: canDeleteSlot,
      showDivider: canDeleteSlot
    },
  ],
})};
