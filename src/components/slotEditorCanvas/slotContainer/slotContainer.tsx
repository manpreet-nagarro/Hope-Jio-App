import {
  useEffect,
  useRef,
  useState,
  useCallback,
  lazy,
  Suspense,
} from "react";
import { useDispatch, useSelector } from "react-redux";

import { SlotIdBox, SlotWrapper } from "../slotEditorCanvas.styles";
import { SlotDropIndicator } from "./slotDropIndicator.styles";
import type { Slot } from "../slotEditorCanvas.types";
import { useClickOutsideMultiple } from "@hooks/useClickOutside";
import { AlertSnackbar } from "@components/AlertSnackbar/AlertSnackbar";
import { UI_TEXTS } from "@constants/text.constants";

import { SlotHeader } from "../slotHeader/slotHeader";
import { SlotComponents } from "../slotComponents/slotComponents";
import { AddSlotBar } from "../addSlotBar/addSlotBar";
import { BuildSlotConfigMenuOptions } from "../utils/slotConfigBuilder";
const ConfirmationDialog = lazy(
  () => import("@components/confirmationDialog/confirmationDialog"),
);

import {
  addSlot,
  duplicateSlotAtIndex,
  deleteSlot,
  updateSlotTitle,
  addComponentToSlotById,
  duplicateComponentInSlot,
  deleteComponentFromSlot,
  reorderComponentsInSlot,
  updateComponentDataInSlot,
  setActiveSlotIndex,
  setActiveComponentIndex,
} from "../../../store/slotsSlice/slotsSlice";
import type { RootState } from "@store/store";
import { usePrivilege } from "@hooks/usePrivilege";
import { MAX_COMPONENTS_PER_SLOT, MAX_SLOTS } from "@constants/commonConstants";

const SCAssignmentStatusFlowModal = lazy(
  () => import("@components/AssignModal/slots/SCAssignmentStatusFlowModal"),
);

// Helpers to keep slot drag handler simple and reduce cognitive complexity
const scrollSlotIntoViewOnDrag = (
  slots: Slot[],
  slotRefs: Map<string, HTMLDivElement>,
  draggedCenter: number,
  lastScrolledSlotId: string | null,
): string | null => {
  let updatedLastId = lastScrolledSlotId;

  for (const slot of slots) {
    const slotRef = slotRefs.get(slot.id);
    if (!slotRef) continue;

    const rect = slotRef.getBoundingClientRect();
    if (draggedCenter >= rect.top && draggedCenter <= rect.bottom) {
      const isVisible = rect.top >= 0 && rect.bottom <= window.innerHeight;
      if (!isVisible && updatedLastId !== slot.id) {
        updatedLastId = slot.id;
        try {
          slotRef.scrollIntoView({ behavior: "auto", block: "center" });
        } catch (err) {
          console.error("Error scrolling slot into view during drag", err);
        }
      }
      break;
    }
  }

  return updatedLastId;
};

const findSlotIndexByCenter = (
  slots: Slot[],
  slotRefs: Map<string, HTMLDivElement>,
  draggedCenter: number,
  fallbackIndex: number,
): number => {
  let newIndex = fallbackIndex;

  for (let i = 0; i < slots.length; i++) {
    const slot = slots[i];
    const slotRef = slotRefs.get(slot.id);
    if (!slotRef) continue;

    const rect = slotRef.getBoundingClientRect();
    if (draggedCenter >= rect.top && draggedCenter <= rect.bottom) {
      newIndex = i;
      break;
    }
  }

  return newIndex;
};

interface Props {
  slots: Slot[];
  onMoveSlot: (from: number, to: number) => void;
  onSidebarDrop?: (slotId: string) => void;
  onSidebarDrag?: (slotId: string, e: React.DragEvent) => void;
}

export const SlotContainer = ({
  slots,
  onMoveSlot,
  onSidebarDrop,
  onSidebarDrag,
}: Props) => {
  const dispatch = useDispatch();
  const {
    canAddSlot,
    canDuplicateSlot,
    canDeleteSlot,
    canMoveSlot,
    canAssignSlot,
    canDragDropSlot,
    canEditSlotLabel,
    canViewSlotConfiguration,
    canSendSlotForReview,
    canApproveSlot,
    canRejectSlot,
  } = usePrivilege();
  const [configMenuIndex, setConfigMenuIndex] = useState<number | null>(null);
  const [alertMessage, setAlertMessage] = useState<string | null>(null);
  const [openConfirm, setOpenConfirm] = useState(false);
  const [deleteIndex, setDeleteIndex] = useState<number | null>(null);

  // For drop indicator
  const [dropSlotIndex, setDropSlotIndex] = useState<number | null>(null);

  const itemRefs = useRef<HTMLButtonElement[]>([]);
  const slotRefs = useRef<Map<string, HTMLDivElement>>(new Map());
  const lastScrolledSlotId = useRef<string | null>(null);
  const startY = useRef(0);

  const configurationOpen = useSelector(
    (state: RootState) => state.ui.isConfigurationOpen,
  );

  // Refs management
  useEffect(() => {
    itemRefs.current = [];
  });

  useClickOutsideMultiple(
    itemRefs,
    () => {
      setConfigMenuIndex(null);
      if (!configurationOpen) {
        dispatch(setActiveSlotIndex(null));
        dispatch(setActiveComponentIndex(null));
      }
    },
    true,
  );

  const handleComponentSelection = useCallback(
    (slotIndex: number, componentIndex: number) => {
      dispatch(setActiveSlotIndex(slotIndex));
      dispatch(setActiveComponentIndex(componentIndex));
    },
    [dispatch],
  );

  const handleActiveSlotIndex = useCallback(
    (index: number | null) => {
      dispatch(setActiveSlotIndex(index));
      dispatch(setActiveComponentIndex(null));
      setConfigMenuIndex(null);
    },
    [dispatch],
  );

  // Slot operations
  const handleAddSlot = useCallback(() => {
    if (slots.length >= MAX_SLOTS) {
      setAlertMessage(UI_TEXTS.MESSAGES.CANNOT_ADD_MORE_SLOTS);
      return;
    }
    dispatch(addSlot());
  }, [dispatch, slots.length]);

  const handleDuplicateSlot = useCallback(
    (slotIndex: number) => {
      if (slots.length >= MAX_SLOTS) {
        setAlertMessage(UI_TEXTS.MESSAGES.CANNOT_ADD_MORE_SLOTS);
        setConfigMenuIndex(null);
        return;
      }
      dispatch(duplicateSlotAtIndex(slotIndex));
      setConfigMenuIndex(null);
    },
    [dispatch, slots.length],
  );

  const handleMoveSlotUp = useCallback(
    (slotIndex: number) => {
      if (slotIndex > 0) {
        onMoveSlot(slotIndex, slotIndex - 1);
      }
      setConfigMenuIndex(null);
    },
    [onMoveSlot],
  );

  const handleMoveSlotDown = useCallback(
    (slotIndex: number) => {
      if (slotIndex < slots.length - 1) {
        onMoveSlot(slotIndex, slotIndex + 1);
      }
      setConfigMenuIndex(null);
    },
    [onMoveSlot, slots.length],
  );

  const handleAssignSlot = useCallback((slotIndex: number) => {
    console.info("slotIndex", { slotIndex });
    setConfigMenuIndex(null);
  }, []);

  const handleSaveTitle = useCallback(
    (slotIndex: number, newTitle: string) => {
      dispatch(updateSlotTitle({ index: slotIndex, name: newTitle }));
    },
    [dispatch],
  );

  const handleDeleteSlot = useCallback(
    (slotIndex: number) => {
      if (slots.length === 1) {
        setAlertMessage(UI_TEXTS.MESSAGES.AT_LEAST_ONE_SLOT_REQUIRED);
        setConfigMenuIndex(null);
        return;
      }
      setDeleteIndex(slotIndex);
      setOpenConfirm(true);
      setConfigMenuIndex(null);
    },
    [slots.length],
  );

  const handleConfirmDelete = useCallback(() => {
    if (deleteIndex === null) return;
    dispatch(deleteSlot(deleteIndex));
    setOpenConfirm(false);
    setDeleteIndex(null);
  }, [deleteIndex, dispatch]);

  const getConfigMenuOptions = useCallback(
    (slotIndex: number) =>
      BuildSlotConfigMenuOptions({
        slotIndex,
        handleDuplicateSlot,
        handleMoveSlotUp,
        handleMoveSlotDown,
        handleAssignSlot,
        handleDeleteSlot,
        handleActiveSlotIndex,
        canDuplicateSlot,
        canDeleteSlot,
        canMoveSlot,
        canAssignSlot,
        canViewSlotConfiguration,
        dispatch,
        canSendSlotForReview,
        canApproveSlot,
        canRejectSlot,
      }),
    [
      handleDuplicateSlot,
      handleMoveSlotUp,
      handleMoveSlotDown,
      handleAssignSlot,
      handleDeleteSlot,
      handleActiveSlotIndex,
      canSendSlotForReview,
      canApproveSlot,
      canRejectSlot,
      canAssignSlot,
      canDuplicateSlot,
      canDeleteSlot,
      canMoveSlot,
      canViewSlotConfiguration,
      dispatch,
    ],
  );

  // Drag and drop operations
  const dropFromSidebar = useCallback(
    (e: React.DragEvent, slotId: string, componentData: { children?: unknown[] }) => {
      const type = e.dataTransfer.getData("component");

      if (!type) return;

      const slot = slots.find((s) => s.id === slotId);
      if (slot && slot.components.length >= MAX_COMPONENTS_PER_SLOT) {
        setAlertMessage(UI_TEXTS.MESSAGES.CANNOT_ADD_MORE_COMPONENTS);
        return;
      }

      dispatch(
        addComponentToSlotById({ slotId, componentType: type, componentData }),
      );
      if (typeof onSidebarDrop === "function") onSidebarDrop(slotId);
      // Check if component type mismatch
      if (slot && slot.components.length > 0) {
        const firstComponentType = slot.components[0].type;
        if (type !== firstComponentType) {
          setAlertMessage(UI_TEXTS.ERRORS.COMPONENT_TYPE_MISMATCH);
        }
      }
    },
    [dispatch, slots, onSidebarDrop],
  );

  const reorder = useCallback(
    (slotId: string, from: number, to: number) => {
      dispatch(reorderComponentsInSlot({ slotId, from, to }));
    },
    [dispatch],
  );

  // Component operations
  const handleDuplicateComponent = useCallback(
    (slotId: string, componentIndex: number) => {
      const slot = slots.find((s) => s.id === slotId);
      if (slot && slot.components.length >= MAX_COMPONENTS_PER_SLOT) {
        setAlertMessage(UI_TEXTS.MESSAGES.CANNOT_ADD_MORE_COMPONENTS);
        return;
      }
      dispatch(duplicateComponentInSlot({ slotId, componentIndex }));
    },
    [dispatch, slots],
  );

  const handleDeleteComponent = useCallback(
    (slotId: string, componentIndex: number) => {
      dispatch(deleteComponentFromSlot({ slotId, componentIndex }));
    },
    [dispatch],
  );

  const handleUpdateComponentData = useCallback(
    (slotId: string, componentIndex: number, data: { children?: unknown[] }) => {
      dispatch(updateComponentDataInSlot({ slotId, componentIndex, data }));
    },
    [dispatch],
  );

  // Slot drag handle
  const onHandleDown = useCallback(
    (e: React.PointerEvent, index: number, slotId: string) => {
      startY.current = e.clientY;

      const draggedRef = slotRefs.current.get(slotId);
      if (!draggedRef) return;

      let lastScrolledSlotIdLocal: string | null = null;

      const onMove = (ev: PointerEvent) => {
        if (!draggedRef) return;
        draggedRef.style.transform = `translateY(${ev.clientY - startY.current}px)`;

        const draggedRect = draggedRef.getBoundingClientRect();
        const draggedCenter = draggedRect.top + draggedRect.height / 2;

        // Find the slot index where the drop would occur
        const newIndex = findSlotIndexByCenter(
          slots,
          slotRefs.current,
          draggedCenter,
          index,
        );
        setDropSlotIndex(newIndex);

        lastScrolledSlotIdLocal = scrollSlotIntoViewOnDrag(
          slots,
          slotRefs.current,
          draggedCenter,
          lastScrolledSlotIdLocal,
        );
      };

      const onUp = () => {
        document.removeEventListener("pointermove", onMove);
        document.removeEventListener("pointerup", onUp);

        if (!draggedRef) return;

        const draggedRect = draggedRef.getBoundingClientRect();
        const draggedCenter = draggedRect.top + draggedRect.height / 2;
        draggedRef.style.transform = "";

        const newIndex = findSlotIndexByCenter(
          slots,
          slotRefs.current,
          draggedCenter,
          index,
        );

        setDropSlotIndex(null);

        if (newIndex !== index) {
          onMoveSlot(index, newIndex);
        }
      };

      document.addEventListener("pointermove", onMove);
      document.addEventListener("pointerup", onUp);
    },
    [slots, onMoveSlot],
  );

  return (
    <div>
      <AlertSnackbar
        open={!!alertMessage}
        message={alertMessage}
        severity="warning"
        onClose={() => setAlertMessage(null)}
      />
      <Suspense fallback={null}>
        <ConfirmationDialog
          open={openConfirm}
          title={UI_TEXTS.SLOT.DELETE_SLOT}
          description={UI_TEXTS.SLOT.DELETE_SLOT_MESSAGE}
          onSecondaryAction={() => {
            setOpenConfirm(false);
            setDeleteIndex(null);
          }}
          secondaryActionLabel="Close"
          onPrimaryAction={handleConfirmDelete}
          primaryActionLabel="Delete"
          color="error"
          onClose={() => {
            setOpenConfirm(false);
            setDeleteIndex(null);
          }}
        />
      </Suspense>
      <div>
        {slots.map((slot, index) => (
          <div key={slot.id} style={{ position: "relative" }}>
            {dropSlotIndex === index && <SlotDropIndicator />}
            <SlotWrapper
              ref={(el: HTMLDivElement | null) => {
                if (el) slotRefs.current.set(slot.id, el);
              }}
            >
              <SlotIdBox>S{index + 1}</SlotIdBox>
              <SlotHeader
                isConfigMenuOpen={configMenuIndex === index}
                onDragHandleDown={(e) => onHandleDown(e, index, slot.id)}
                onMoreVertClick={() => {
                  setConfigMenuIndex(configMenuIndex === index ? null : index);
                }}
                configMenuOptions={getConfigMenuOptions(index)}
                itemRef={(el) => {
                  if (el) itemRefs.current.push(el);
                }}
                slotTitle={slot.name}
                onTitleSave={(newTitle) => handleSaveTitle(index, newTitle)}
                canDragDropSlot={canDragDropSlot}
                canEditSlotLabel={canEditSlotLabel}
              />
              <SlotComponents
                slot={slot}
                onDragOver={(e) => {
                  e.preventDefault();
                  const slotRef = slotRefs.current.get(slot.id);
                  if (slotRef) {
                    const rect = slotRef.getBoundingClientRect();
                    const isVisible =
                      rect.top >= 0 && rect.bottom <= window.innerHeight;
                    if (!isVisible && lastScrolledSlotId.current !== slot.id) {
                      lastScrolledSlotId.current = slot.id;
                      try {
                        slotRef.scrollIntoView({
                          behavior: "auto",
                          block: "center",
                        });
                      } catch (err) {
                        console.error(
                          "Error scrolling slot into view during drag",
                          err,
                        );
                      }
                    }
                  }
                  if (typeof onSidebarDrag === "function")
                    onSidebarDrag(slot.id, e);
                }}
                onDrop={(e, componentData : { children?: unknown[] }) => {
                  lastScrolledSlotId.current = null;
                  dropFromSidebar(e, slot.id, componentData);
                }}
                onComponentDragStart={() => {
                  // Track drag start if needed
                }}
                onComponentDrop={(dragIndex, dropIndex) =>
                  reorder(slot.id, dragIndex, dropIndex)
                }
                onDuplicateComponent={(componentIndex) =>
                  handleDuplicateComponent(slot.id, componentIndex)
                }
                onDeleteComponent={(componentIndex) =>
                  handleDeleteComponent(slot.id, componentIndex)
                }
                onUpdateComponentData={(componentIndex, data) =>
                  handleUpdateComponentData(slot.id, componentIndex, data)
                }
                handleComponentSelection={(componentIndex) =>
                  handleComponentSelection(index, componentIndex)
                }
                slotIndex={index}
              />
            </SlotWrapper>
          </div>
        ))}
      </div>

      {canAddSlot && <AddSlotBar onClick={handleAddSlot} />}

      <Suspense fallback={null}>
        <SCAssignmentStatusFlowModal />
      </Suspense>
    </div>
  );
};
