import { useState, useEffect, useRef } from "react";
import { Tooltip } from "@mui/material";
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import {
  SlotComponentIdBox,
  SlotComponentItemWrapper,
  ComponentCloseButton,
  ComponentAddButton,
  ComponentMenuWrapper,
  BannerTextLabel
} from "../slotEditorCanvas.styles";
import AddPlusIcon from "@assets/icons-svg/addPlusIcon";
import DuplicateSlotIcon from "@assets/icons-svg/duplicateSlotIcon";
import DeleteSlotIcon from "@assets/icons-svg/deleteSlotIcon";
import CloseCircleIcon from "@assets/icons-svg/closeCircleIcon";
import { COLORS, SIZES } from "@constants/theme.constants";
import { UI_TEXTS } from "@constants/text.constants";
import { SlotConfigurationMenu } from "../slotConfigurationMenu/slotConfigurationMenu";
import SliderSettingsIcon from "@assets/icons-svg/sliderSettingsIcon";
import ProfileAssignedIcon from "@assets/icons-svg/profileAssignedIcon";
import { useDispatch } from "react-redux";
import { openConfigurationDrawer, setConfigurationActiveTab } from "@store/UISlice/UISlice";
import { usePrivilege } from "@hooks/usePrivilege";
import SendForReviewIcon from "@assets/icons-svg/SendForReviewIcon";
import RejectPageIcon from "@assets/icons-svg/RejectPageIcon";
import { setModalState } from "@store/assign/scAssignmentStatusFlowSlice";
import { MODAL_TYPES, STATUS_ACTION_TYPE } from "@constants/assignModal.constants";
import PickHandIcon from "@assets/icons-svg/PickHandIcon";
import { useRoles } from "@hooks/useRoles";
import { updateComponentTitle } from "@store/slotsSlice/slotsSlice";
import type { CanvasComponent } from "../slotEditorCanvas.types";

export const SlotComponentItem = ({
  type,
  index,
  isMenuOpen,
  onOpenMenu,
  onCloseMenu,
  onDuplicate,
  onDelete,
  itemRef,
  isTooltipOpen,
  onHoverEnter,
  onHoverLeave,
  comp,
  bannerText,
  onBannerTextSave,
  handleComponentSelection,
  slotIndex,
  slotId
}: {
  type: string;
  index: number;
  isMenuOpen: boolean;
  onOpenMenu: () => void;
  onCloseMenu: () => void;
  onDuplicate: () => void;
  onDelete: () => void;
  itemRef?: (el: HTMLDivElement | null) => void;
  isTooltipOpen?: boolean;
  onHoverEnter?: () => void;
  onHoverLeave?: () => void;
  comp: CanvasComponent;
  bannerText: string;
  onBannerTextSave?: (text: string) => void;
  handleComponentSelection: () => void;
  slotIndex: number;
  slotId: string;
}) => {
  const dispatch = useDispatch();
  const {canEditComponentName, canDeleteComponent, canDuplicateComponent, canAssignComponent, canViewComponentConfiguration, canSendComponentForReview, canApproveComponent, canRejectComponent} = usePrivilege();
  const {isCreativeMaker} = useRoles();

  // Helper to handle menu item clicks
  const handleMenuItemClick = (actions: (() => void)[]) => {
    actions.forEach(action => action());
    setIsHovered(false);
    onCloseMenu();
    onHoverLeave?.()
  };

  // Helper to calculate showDivider
  const getShowDivider = (permissions: boolean[], current: boolean) => {
    return permissions.every(p => !p) && current;
  };
  const [isHovered, setIsHovered] = useState(false);
  const [isEditingBanner, setIsEditingBanner] = useState(false);
  const [bannerDraft, setBannerDraft] = useState(comp.name || bannerText);
  const [isOverflowing, setIsOverflowing] = useState(false);
  const componentRef = useRef<HTMLDivElement>(null);

  // Check if component overflows from CanvasInnerFrame
  useEffect(() => {
    const checkOverflow = () => {
      if (!componentRef.current) return;

      const componentRect = componentRef.current.getBoundingClientRect();
      const canvasFrame = componentRef.current.closest('[class*="canvas_inner_frame"]');
      
      if (!canvasFrame) {
        setIsOverflowing(false);
        return;
      }

      const canvasRect = canvasFrame.getBoundingClientRect();

      // Check if component overflows from canvas boundaries
      const overflows =
        componentRect.right > canvasRect.right ||
        componentRect.left < canvasRect.left ||
        componentRect.bottom > canvasRect.bottom ||
        componentRect.top < canvasRect.top;

      setIsOverflowing(overflows);
    };

    checkOverflow();
    window.addEventListener('resize', checkOverflow);
    const resizeObserver = new ResizeObserver(checkOverflow);
    if (componentRef.current) {
      resizeObserver.observe(componentRef.current);
    }

    return () => {
      window.removeEventListener('resize', checkOverflow);
      resizeObserver.disconnect();
    };
  }, []);

  const handleContextMenu = (e: React.MouseEvent) => {
    e.preventDefault();
    // Open the configuration menu on right-click, close others via parent
    onOpenMenu();
  };

  const onAssign = () =>{
    dispatch(setModalState({
      open: true,
      title: UI_TEXTS.SLOT.ASSIGN_COMPONENT_LABEL,
      subtitle: `‘S${slotIndex + 1}/C${index+1}’`,
      type: MODAL_TYPES.ASSIGN_SLOT_COMPONENT_CP,
      statusActionType: STATUS_ACTION_TYPE.Assign
    }));
  }

  // Handler for reject modal
  const onReject = () => {
    dispatch(setModalState({
      open: true,
      title: UI_TEXTS.SLOT.REJECT_COMPONENT,
      subtitle: `‘S${slotIndex + 1}/C${index+1}’` ,
      type: MODAL_TYPES.REJECT_MODAL,
      statusActionType: STATUS_ACTION_TYPE.Reject
    }));
  }

  const onApprove = () => {
    dispatch(setModalState({
      open: true,
      title: UI_TEXTS.COMPONENT.APPROVE_COMPONENT,
      subtitle: `‘S${slotIndex + 1}/C${index+1}’` ,
      type: MODAL_TYPES.APPROVE_MODAL,
      statusActionType: STATUS_ACTION_TYPE.Approve
    }));
  }

  const onSentReview = () => {
    dispatch(setModalState({
      open: true,
      title: UI_TEXTS.COMPONENT.SEND_COMPONENT_FOR_REVIEW,
      subtitle: `‘S${slotIndex + 1}/C${index+1}’` ,
      type: MODAL_TYPES.SEND_FOR_REVIEW_MODAL,
      statusActionType: STATUS_ACTION_TYPE.Send
    }));
  }

  const onPickStartWork = () => {

  }

  const componentMenuOptions = {
    headerItem: {
      icon: <SliderSettingsIcon size={14} color={COLORS.TEXT_DARK} />,
      label: UI_TEXTS.COMPONENT.CONFIGURATION_LABEL,
      onClick: () => handleMenuItemClick([
        handleComponentSelection,
        () => dispatch(setConfigurationActiveTab(1)),
        () => dispatch(openConfigurationDrawer())
      ]),
      disabled: !canViewComponentConfiguration,
      disabledTooltip: canViewComponentConfiguration ? undefined : "You don't have permission to view this component's configuration.",
      show: canViewComponentConfiguration
    },
    actionItems: [
      {
        icon: <ProfileAssignedIcon size={14} color={COLORS.TEXT_DARK} />,
        label: UI_TEXTS.COMPONENT.ASSIGN_LABEL,
        onClick: () => handleMenuItemClick([onAssign]),
        disabled: !canAssignComponent,
        disabledTooltip: canAssignComponent ? undefined : "You don't have permission to assign this component.",
        show: canAssignComponent,
        showDivider: canAssignComponent
      },
      {
        icon: <SendForReviewIcon width={16} color={COLORS.TEXT_DARK} />,
        label: UI_TEXTS.COMPONENT.SEND_COMPONENT_FOR_REVIEW,
        onClick: () => handleMenuItemClick([onSentReview]),
        disabled: !canSendComponentForReview,
        disabledTooltip: canSendComponentForReview ? undefined : "You don't have permission to send this component for review.",
        show: canSendComponentForReview,
        showDivider: getShowDivider([canAssignComponent], canSendComponentForReview)
      },
      {
        icon: <DuplicateSlotIcon size={14} color={COLORS.TEXT_DARK} />,
        label: UI_TEXTS.COMPONENT.DUPLICATE_LABEL,
        onClick: () => handleMenuItemClick([onDuplicate]),
        disabled: !canDuplicateComponent,
        disabledTooltip: canDuplicateComponent ? undefined : "You don't have permission to duplicate this component.",
        show: canDuplicateComponent,
        showDivider: getShowDivider([canAssignComponent, canSendComponentForReview], canDuplicateComponent)
      },
      {
        icon: <CheckCircleIcon sx={{color: "#141414", width: 16, height: 16}} />,
        label: UI_TEXTS.COMPONENT.APPROVE_COMPONENT,
        onClick: () => handleMenuItemClick([onApprove]),
        disabled: !canApproveComponent,
        disabledTooltip: canApproveComponent ? undefined : "You don't have permission to approve this component. ",
        show: canApproveComponent,
        showDivider: getShowDivider([canAssignComponent, canSendComponentForReview, canDuplicateComponent], canApproveComponent)
      },
      {
        icon: <RejectPageIcon />,
        label: UI_TEXTS.COMPONENT.REJECT_COMPONENT,
        onClick: () => handleMenuItemClick([onReject]),
        disabled: !canRejectComponent,
        disabledTooltip: canRejectComponent ? undefined : "You don't have permission to reject this component.",
        show: canRejectComponent,
        showDivider: getShowDivider([canAssignComponent, canSendComponentForReview, canDuplicateComponent, canApproveComponent], canRejectComponent)
      },
      {
        icon: <PickHandIcon />,
        label: UI_TEXTS.COMPONENT.PICK_START_WORK,
        onClick: () => handleMenuItemClick([onPickStartWork]),
        disabled: !isCreativeMaker,
        disabledTooltip: isCreativeMaker ? undefined : "You don't have permission to pick and start work on this component.",
        show: isCreativeMaker,
        showDivider: getShowDivider([canAssignComponent, canSendComponentForReview, canDuplicateComponent, canApproveComponent], isCreativeMaker)
      },
    ],
    dangerItems: [
      {
        icon: <DeleteSlotIcon size={14} color={COLORS.TEXT_DANGER} />,
        label: UI_TEXTS.COMPONENT.DELETE_LABEL,
        onClick: () => handleMenuItemClick([onDelete]),
        disabled: !canDeleteComponent,
        disabledTooltip: canDeleteComponent ? undefined : "You don't have permission to delete this component.",
        show: canDeleteComponent,
        showDivider: canDeleteComponent
      },
    ],
  };

  return (
    
      <Tooltip
      title={`${type}`}
      open={!!isTooltipOpen || isMenuOpen}
      placement="top"
      arrow
      slotProps={{
        tooltip: {
          sx: {
            backgroundColor: "#061951",
            color: "#ffffff",
            opacity: 1,
          },
        },
        arrow: {
          sx: {
            color: "#061951",
          },
        },
      }}
    >
      <SlotComponentItemWrapper
        ref={(el : HTMLDivElement | null) => {
          componentRef.current = el;
          itemRef?.(el);
        }}
        onMouseEnter={() => {
          setIsHovered(true);
          onHoverEnter?.();
        }}
        onMouseLeave={() => {
          if(!isMenuOpen){
            setIsHovered(false);
            onHoverLeave?.();
          }
        }}
        onContextMenu={handleContextMenu}
        style={{
          backgroundColor: isHovered && canDuplicateComponent ? COLORS.BG_LIGHT : undefined,
          border: isHovered && canDuplicateComponent ? `1px solid ${COLORS.ACCENT_PRIMARY}` : undefined,
          boxShadow: isOverflowing ? "0px 25px 50px -12px #00000040" : undefined,
          transition: "all 0.2s ease",
          width: comp?.data?.width ?? SIZES.MIN_SLOT_WIDTH,
          height: comp?.data?.height ?? SIZES.MIN_SLOT_HEIGHT
        }}
        onDoubleClick={(e : React.MouseEvent<HTMLDivElement>) => {
              e.stopPropagation();
              setBannerDraft(comp?.name || bannerText);
              setIsEditingBanner(true);
            }}
      >
        <SlotComponentIdBox>C{index + 1}</SlotComponentIdBox>

        {canDeleteComponent && <ComponentCloseButton
          onClick={(e : React.MouseEvent<HTMLButtonElement>) => {
            e.stopPropagation();
            onDelete();
          }}
        >
          <CloseCircleIcon size={16} color="#B5B5B5" />
        </ComponentCloseButton>}
        {isEditingBanner && canEditComponentName ? (
          <input
            className="banner__text-input"
            type="text"
            value={bannerDraft}
            autoFocus
            onChange={(e : React.ChangeEvent<HTMLInputElement>) => setBannerDraft(e.target.value)}
            onKeyDown={(e : React.KeyboardEvent<HTMLInputElement>) => {
              if (e.key === "Enter") {
                if (onBannerTextSave) {
                  dispatch(updateComponentTitle({slotId, componentIndex :index, title: bannerDraft}));
                }
                setIsEditingBanner(false);
              } else if (e.key === "Escape") {
                setBannerDraft(bannerText);
                setIsEditingBanner(false);
              }
            }}
            onBlur={() => {
              // Cancel on blur (do not save changes)
              setBannerDraft(bannerText);
              setIsEditingBanner(false);
            }}
            onClick={(e) => e.stopPropagation()}
            style={{
              border: `1px solid ${COLORS.BORDER_DASHED}`,
              backgroundColor: COLORS.BACKGROUND_LIGHTER,
              borderRadius: "6px",
              padding: "8px",
              maxWidth: "80%"
            }}
          />
        ) : (
          <BannerTextLabel
            className="banner__text"

          >
            {comp?.name || bannerText || UI_TEXTS.COMPONENT.BANNER_CALL_OUT}
          </BannerTextLabel>
        )}

        {isHovered && canDuplicateComponent && (
          <ComponentAddButton
            onClick={(e : React.MouseEvent<HTMLButtonElement>) => {
              e.stopPropagation();
              onDuplicate();
              setIsHovered(false);
              onCloseMenu();
            }}
          >
            <AddPlusIcon size={16} color={COLORS.WHITE} />
          </ComponentAddButton>
        )}

        {isMenuOpen && (
          <ComponentMenuWrapper
            onClick={(e : React.MouseEvent<HTMLDivElement>) => e.stopPropagation()}
          >
            <SlotConfigurationMenu
              headerItem={componentMenuOptions.headerItem}
              actionItems={componentMenuOptions.actionItems.filter(item => item.show)}
              dangerItems={componentMenuOptions.dangerItems.filter(item => item.show)}
            />
          </ComponentMenuWrapper>
        )}
      </SlotComponentItemWrapper>
    </Tooltip>
    
  );
};
