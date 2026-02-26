import { PRIVILEGES } from "@constants/priviledges.constants";
import { useHasPrivilege } from "@utils/privileges.utils";

export const usePrivilege = () => {
    const canLoginSSO = useHasPrivilege(PRIVILEGES.LOGIN_SSO);
    const canViewWireframeList = useHasPrivilege(PRIVILEGES.VIEW_WIREFRAME_LIST);
    const canCreateWireframe = useHasPrivilege(PRIVILEGES.CREATE_WIREFRAME);
    const canCopyWireframe = useHasPrivilege(PRIVILEGES.COPY_WIREFRAME);
    const canAssignWireframe = useHasPrivilege(PRIVILEGES.ASSIGN_WIREFRAME);
    const canSaveWireframe = useHasPrivilege(PRIVILEGES.SAVE_WIREFRAME);
    const canSendWireframeForReview = useHasPrivilege(PRIVILEGES.SEND_WIREFRAME_FOR_REVIEW);
    const canApproveWireframe = useHasPrivilege(PRIVILEGES.APPROVE_WIREFRAME);
    const canRejectWireframe = useHasPrivilege(PRIVILEGES.REJECT_WIREFRAME);
    const canArchiveWireframe = useHasPrivilege(PRIVILEGES.ARCHIVE_WIREFRAME);
    const canEditWireframeConfiguration = useHasPrivilege(PRIVILEGES.EDIT_WIREFRAME_CONFIGURATION);
    const canViewComponentConfiguration = useHasPrivilege(PRIVILEGES.VIEW_COMPONENT_CONFIGURATION);
    const canEditComponentConfiguration = useHasPrivilege(PRIVILEGES.EDIT_COMPONENT_CONFIGURATION);
    const canEditSlotConfiguration = useHasPrivilege(PRIVILEGES.EDIT_SLOT_CONFIGURATION);
    const canViewSlotConfiguration = useHasPrivilege(PRIVILEGES.VIEW_SLOT_CONFIGURATION);
    const canDuplicateSlot = useHasPrivilege(PRIVILEGES.DUPLICATE_SLOT);
    const canMoveSlot = useHasPrivilege(PRIVILEGES.MOVE_SLOT);
    const canAssignSlot = useHasPrivilege(PRIVILEGES.ASSIGN_SLOT);
    const canSendSlotForReview = useHasPrivilege(PRIVILEGES.SEND_SLOT_FOR_REVIEW);
    const canApproveSlot = useHasPrivilege(PRIVILEGES.APPROVE_SLOT);
    const canRejectSlot = useHasPrivilege(PRIVILEGES.REJECT_SLOT);
    const canDeleteSlot = useHasPrivilege(PRIVILEGES.DELETE_SLOT);
    const canDragDropSlot = useHasPrivilege(PRIVILEGES.DRAG_DROP_SLOT);
    const canAddSlot = useHasPrivilege(PRIVILEGES.ADD_SLOT);
    const canEditSlotLabel = useHasPrivilege(PRIVILEGES.EDIT_SLOT_LABEL);
    const canDuplicateComponent = useHasPrivilege(PRIVILEGES.DUPLICATE_COMPONENT);
    const canAssignComponent = useHasPrivilege(PRIVILEGES.ASSIGN_COMPONENT);
    const canSendComponentForReview = useHasPrivilege(PRIVILEGES.SEND_COMPONENT_FOR_REVIEW);
    const canApproveComponent = useHasPrivilege(PRIVILEGES.APPROVE_COMPONENT);
    const canRejectComponent = useHasPrivilege(PRIVILEGES.REJECT_COMPONENT);
    const canDeleteComponent = useHasPrivilege(PRIVILEGES.DELETE_COMPONENT);
    const canDragDropComponent = useHasPrivilege(PRIVILEGES.DRAG_DROP_COMPONENT);
    const canEditComponentName = useHasPrivilege(PRIVILEGES.EDIT_COMPONENT_NAME);
    const canViewUrlList = useHasPrivilege(PRIVILEGES.VIEW_URL_LIST);
    const canCreateEditUrl = useHasPrivilege(PRIVILEGES.CREATE_EDIT_URL);
    const canViewComponentLibrary = useHasPrivilege(PRIVILEGES.VIEW_COMPONENT_LIBRARY);
    const canComponentLibraryActionsEnabled = useHasPrivilege(PRIVILEGES.COMPONENT_LIBRARY_ACTIONS);

    return {
        canLoginSSO,
        canViewWireframeList,
        canCreateWireframe,
        canCopyWireframe,
        canAssignWireframe,
        canSaveWireframe,
        canSendWireframeForReview,
        canApproveWireframe,
        canRejectWireframe,
        canArchiveWireframe,
        canEditWireframeConfiguration,
        canViewComponentConfiguration,
        canEditComponentConfiguration,
        canEditSlotConfiguration,
        canViewSlotConfiguration,
        canDuplicateSlot,
        canMoveSlot,
        canAssignSlot,
        canSendSlotForReview,
        canApproveSlot,
        canRejectSlot,
        canDeleteSlot,
        canDragDropSlot,
        canAddSlot,
        canEditSlotLabel,
        canDuplicateComponent,
        canAssignComponent,
        canSendComponentForReview,
        canApproveComponent,
        canRejectComponent,
        canDeleteComponent,
        canDragDropComponent,
        canEditComponentName,
        canViewUrlList,
        canCreateEditUrl,
        canViewComponentLibrary,
        canComponentLibraryActionsEnabled
    }
}