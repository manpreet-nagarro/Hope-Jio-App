import { useCallback, useState, lazy, Suspense, useEffect } from "react";
import OpenInNewOutlinedIcon from "@mui/icons-material/OpenInNewOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/Settings";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

import { ActionIcon, SvgNormalize } from "./WireframeActionMenu.styles";
const ConfirmationDialog = lazy(() => import("@components/confirmationDialog/confirmationDialog"));
import { UI_TEXTS } from "@constants/text.constants";
import { CANCEL_BUTTON } from "@utils/messages";
import type { IWireframe } from "src/interfaces/Wireframes";
import ActionMenu from "./ActionMenu";
import type { ActionItem } from "./ActionMenu";
import { COLORS } from "@constants/theme.constants";
import CopyPageIcon from "@assets/icons-svg/CopyPageIcon";
import AssignIcon from "@assets/icons-svg/AssignIcon";
import SendForReviewIcon from "@assets/icons-svg/SendForReviewIcon";
import RejectPageIcon from "@assets/icons-svg/RejectPageIcon";
import ArchivePageIcon from "@assets/icons-svg/ArchivePageIcon";
import { API_STATUSES } from "@constants/commonConstants";
import { usePrivilege } from "@hooks/usePrivilege";

type Props = {
  wireframeId: string;
  wireframe: IWireframe;
  onConfigure?: () => void;
  onApprove?: () => void;
  onAssign?: () => void;
  onDuplicate?: () => void;
  onOpenEditor: (wireframeId: string, wireframe: IWireframe) => void;
  isWireframePageCopyingStatus?:string,
  onArchiveWireframe: (wireframeId: string) => void;
  archivingWireframeStatus?:string
};

const WireframeActionsMenu = ({
  wireframeId,
  wireframe,
  onOpenEditor,
  onConfigure,
  onApprove,
  onAssign,
  onDuplicate,
  onArchiveWireframe,
  archivingWireframeStatus
}: Props) => {
  const {canCopyWireframe, canAssignWireframe, canSendWireframeForReview, canApproveWireframe, canRejectWireframe, canArchiveWireframe} = usePrivilege();
  const [openConfirm, setOpenConfirm] = useState(false);

  const handleConfirmDelete = useCallback(() => {
    onArchiveWireframe(wireframeId);
  }, [onArchiveWireframe, wireframeId]);

  const isDeletePending = archivingWireframeStatus === API_STATUSES.PENDING;

  useEffect(()=>{
    if(archivingWireframeStatus === API_STATUSES.SUCCESS){
      setTimeout(() => setOpenConfirm(false), 0);
    }
  }, [archivingWireframeStatus]);

  const handleOpenEditor = useCallback(() => onOpenEditor(wireframeId, wireframe), [onOpenEditor, wireframeId, wireframe]);

  const items: ActionItem[] = [
    {
      id: "open",
      label: UI_TEXTS.ACTIONS.OPEN_IN_EDITOR,
      icon: <OpenInNewOutlinedIcon fontSize="small" htmlColor={COLORS.TEXT_DARK} />,
      onClick: handleOpenEditor,
      show: true,
    },
    {
      id: "config",
      label: UI_TEXTS.ACTIONS.PAGE_CONFIGURATION,
      icon: <SettingsOutlinedIcon fontSize="small" htmlColor={COLORS.TEXT_DARK} />,
      onClick: onConfigure,
      show: true,
    },
    {
      id: "duplicate",
      label: UI_TEXTS.ACTIONS.COPY_PAGE,
      icon: (
        <SvgNormalize>
          <ActionIcon>
            <CopyPageIcon />
          </ActionIcon>
        </SvgNormalize>
      ),
      onClick: () => {
        onDuplicate?.();
      },
      className: "duplicate",
      show: canCopyWireframe,
    },
    {
      id: "assign",
      label: UI_TEXTS.ACTIONS.ASSIGN_PAGE,
      icon: (
        <SvgNormalize>
          <ActionIcon>
            <AssignIcon />
          </ActionIcon>
        </SvgNormalize>
      ),
      onClick: onAssign,
      showDivider: true,
      show: canAssignWireframe,
    },
    {
      id: "review",
      label: UI_TEXTS.ACTIONS.SEND_PAGE_FOR_REVIEW,
      icon: (
        <SvgNormalize>
          <ActionIcon>
            <SendForReviewIcon />
          </ActionIcon>
        </SvgNormalize>
      ),
      onClick: onApprove,
      show: canSendWireframeForReview,
    },
    {
      id: "approve",
      label: UI_TEXTS.ACTIONS.APPROVE_PAGE,
      icon: <CheckCircleIcon fontSize="small" htmlColor={COLORS.TEXT_DARK} />,
      onClick: onApprove,
      show: canApproveWireframe,
    },
    {
      id: "reject",
      label: UI_TEXTS.ACTIONS.REJECT_PAGE,
      icon: (
        <RejectPageIcon />
      ),
      onClick: onApprove,
      show: canRejectWireframe,
    },
    {
      id: "archive",
      label: UI_TEXTS.ACTIONS.ARCHIVE_PAGE,
      icon: (
        <ArchivePageIcon />
      ),
      onClick: () => {
        setOpenConfirm(true);
      },
      className: "delete",
      showDivider:true,
      show: canArchiveWireframe,
    },
  ];
  const filteredItems = items.filter(item => item.show);

  return (
    <>
      <ActionMenu
        items={filteredItems}
      />

      <Suspense fallback={null}>
        <ConfirmationDialog
          open={openConfirm}
          loading={isDeletePending}
          title={UI_TEXTS.LABEL.ARCHIVE_TITLE_LABEL}
          onSecondaryAction={() => setOpenConfirm(false)}
          onPrimaryAction={handleConfirmDelete}
          secondaryActionLabel={CANCEL_BUTTON}
          primaryActionLabel={UI_TEXTS.ACTIONS.ARCHIEVE}
          onClose={() => setOpenConfirm(false)}
          color="error"
        />
      </Suspense>
    </>
  );
};

export default WireframeActionsMenu;

