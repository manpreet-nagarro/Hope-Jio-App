
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { Slot } from "../../components/slotEditorCanvas/slotEditorCanvas.types";
import { generateFECustomDetectId } from "../../utils/commonUtils";
import {
  createEmptySlot,
  duplicateSlot,
  clearSlot,
  addComponentToSlot,
  reorderSlotComponents,
  duplicateComponent,
  removeComponent,
} from "../../components/slotEditorCanvas/utils/slotUtils";

type SlotsState = {
  slots: Slot[];
  activeSlotIndex: number | null;
  activeComponentIndex: number | null;
  dragStartFromSidebar: boolean;
};

const initialState: SlotsState = {
  slots: [
    { id: generateFECustomDetectId(), components: [], name: "" },
  ],
  activeSlotIndex: null,
  activeComponentIndex: null,
  dragStartFromSidebar: false
};

const slotsSlice = createSlice({
  name: "slots",
  initialState,
  reducers: {
    // Slot operations
    addSlot(state) {
      state.slots.push(createEmptySlot());
    },
    
    duplicateSlotAtIndex(state, action: PayloadAction<number>) {
      const index = action.payload;
      const slot = state.slots[index];
      if (slot) {
        const newSlot = duplicateSlot(slot);
        state.slots.splice(index + 1, 0, newSlot);
      }
    },
    
    deleteSlot(state, action: PayloadAction<number>) {
      const index = action.payload;
      if (state.slots.length === 1) {
        // If only 1 slot, clear it instead of deleting
        state.slots[index] = clearSlot(state.slots[index]);
      } else {
        // If multiple slots, delete this slot
        state.slots.splice(index, 1);
      }
    },
    
    updateSlotTitle(state, action: PayloadAction<{ index: number; name: string }>) {
      const { index, name } = action.payload;
      if (state.slots[index]) {
        state.slots[index].name = name;
      }
    },
    
    moveSlot(state, action: PayloadAction<{ from: number; to: number }>) {
      const { from, to } = action.payload;
      if (to < 0 || to >= state.slots.length) return;
      
      const [movedSlot] = state.slots.splice(from, 1);
      state.slots.splice(to, 0, movedSlot);
    },
    
    clearSlotAtIndex(state, action: PayloadAction<number>) {
      const index = action.payload;
      if (state.slots[index]) {
        state.slots[index] = clearSlot(state.slots[index]);
      }
    },
    
    // Component operations
    addComponentToSlotById(
      state,
      action: PayloadAction<{ slotId: string; componentType: string, componentData?: { children?: unknown[] } }>
    ) {
      const { slotId, componentType, componentData } = action.payload;
      const slot = state.slots.find((s) => s.id === slotId);
      if (slot) {
        const result = addComponentToSlot(slot, componentType, componentData);
        const index = state.slots.findIndex((s) => s.id === slotId);
        state.slots[index] = result.slot;
      }
    },
    
    duplicateComponentInSlot(
      state,
      action: PayloadAction<{ slotId: string; componentIndex: number }>
    ) {
      const { slotId, componentIndex } = action.payload;
      const slotIndex = state.slots.findIndex((s) => s.id === slotId);
      if (slotIndex !== -1) {
        state.slots[slotIndex] = duplicateComponent(
          state.slots[slotIndex],
          componentIndex
        );
      }
    },
    
    deleteComponentFromSlot(
      state,
      action: PayloadAction<{ slotId: string; componentIndex: number }>
    ) {
      const { slotId, componentIndex } = action.payload;
      const slotIndex = state.slots.findIndex((s) => s.id === slotId);
      if (slotIndex !== -1) {
        state.slots[slotIndex] = removeComponent(
          state.slots[slotIndex],
          componentIndex
        );
      }
    },
    
    reorderComponentsInSlot(
      state,
      action: PayloadAction<{ slotId: string; from: number; to: number }>
    ) {
      const { slotId, from, to } = action.payload;
      const slotIndex = state.slots.findIndex((s) => s.id === slotId);
      if (slotIndex !== -1) {
        state.slots[slotIndex] = reorderSlotComponents(
          state.slots[slotIndex],
          from,
          to
        );
      }
    },

    updateComponentDataInSlot(
      state,
      action: PayloadAction<{ slotId: string; componentIndex: number; data: unknown }>
    ) {
      const { slotId, componentIndex, data } = action.payload;
      const slotIndex = state.slots.findIndex((s) => s.id === slotId);
      if (slotIndex === -1) return;

      const slot = state.slots[slotIndex];
      const component = slot.components[componentIndex];
      if (!component) return;

      const currentData = component.data || {};
      slot.components[componentIndex] = {
        ...component,
        data: {
          ...currentData,
          ...(data || {}),
        },
      };
    },
    
    // Reset all slots
    resetSlots(state) {
      state.slots = [createEmptySlot()];
    },
    
    // Set slots (useful for loading saved state)
    setSlots(state, action: PayloadAction<Slot[]>) {
      state.slots = action.payload;
    },

    setActiveSlotIndex(state, action: PayloadAction<number | null>) {
      state.activeSlotIndex = action.payload;
    },

    setActiveComponentIndex(state, action: PayloadAction<number | null>) {
      state.activeComponentIndex = action.payload;
    },
    
    setDragStartFromSidebar(state, action: PayloadAction<boolean>) {
      state.dragStartFromSidebar = action.payload;
    },

    updateComponentTitle(state, action: PayloadAction<{ slotId: string; componentIndex: number; title: string }>) {
      const { slotId, componentIndex, title } = action.payload;
      const slotIndex = state.slots.findIndex((s) => s.id === slotId);
      if (slotIndex !== -1 && state.slots[slotIndex].components[componentIndex]) {
        state.slots[slotIndex].components[componentIndex].name = title;
      }
    },
  },
});

export const {
  addSlot,
  duplicateSlotAtIndex,
  deleteSlot,
  updateSlotTitle,
  updateComponentTitle,
  moveSlot,
  clearSlotAtIndex,
  addComponentToSlotById,
  duplicateComponentInSlot,
  deleteComponentFromSlot,
  reorderComponentsInSlot,
  updateComponentDataInSlot,
  resetSlots,
  setSlots,
  setActiveSlotIndex,
  setActiveComponentIndex,
  setDragStartFromSidebar
} = slotsSlice.actions;

export default slotsSlice.reducer;
