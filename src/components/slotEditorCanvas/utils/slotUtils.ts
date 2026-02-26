import type { Slot } from "../slotEditorCanvas.types";
import {
  generateFECustomDetectId,
  safeClone,
} from "../../../utils/commonUtils";

/**
 * Create a new empty slot
 */
export const createEmptySlot = (): Slot => ({
  id: generateFECustomDetectId(),
  components: [],
  name: "",
});

/**
 * Duplicate a slot with a new ID
 */
export const duplicateSlot = (slot: Slot): Slot => ({
  ...slot,
  id: generateFECustomDetectId(),
});

/**
 * Clear slot components and title
 */
export const clearSlot = (slot: Slot): Slot => ({
  ...slot,
  components: [],
  name: "",
});

/**
 * Add component to slot with validation
 */
export const addComponentToSlot = (
  slot: Slot,
  type: string,
  componentData?: { children?: unknown[] },
): { slot: Slot; error?: string } => {
  // Check if slot already has components of different type
  if (slot.components.length > 0) {
    const firstComponentType = slot.components[0].type;
    if (type !== firstComponentType) {
      return {
        slot,
        error: "Component type must be same in a slot",
      };
    }
  }

  const droppedComponents: Array<{ id: string; type: string; data: unknown }> = [];

  (safeClone(componentData?.children || []) as unknown[]).forEach((comp) => {
    droppedComponents.push({
      id: generateFECustomDetectId(),
      type,
      data: { ...(comp as object) },
    });
  });

  return {
    slot: {
      ...slot,
      components: [...slot.components, ...droppedComponents],
    },
  };
};

/**
 * Reorder components within a slot
 */
export const reorderSlotComponents = (
  slot: Slot,
  fromIndex: number,
  toIndex: number,
): Slot => {
  const items = [...slot.components];
  const [moved] = items.splice(fromIndex, 1);
  items.splice(toIndex, 0, moved);

  return { ...slot, components: items };
};

/**
 * Duplicate a component within a slot at the specified position
 */
export const duplicateComponent = (
  slot: Slot,
  componentIndex: number,
): Slot => {
  const component = slot.components[componentIndex];
  if (!component) return slot;

  const newComponent = {
    id: generateFECustomDetectId(),
    type: component.type,
    data: { ...component.data, bannerText: "" },
  };

  const items = [...slot.components];
  items.splice(componentIndex + 1, 0, newComponent);

  return { ...slot, components: items };
};

/**
 * Remove a component from a slot
 */
export const removeComponent = (slot: Slot, componentIndex: number): Slot => {
  const items = [...slot.components];
  items.splice(componentIndex, 1);

  return { ...slot, components: items };
};

/**
 * Update slot components so width/height are inside data
 */
export function updateSlotComponentsWithDimensions(slots: Slot[]): Slot[] {
  return (slots || []).map((slot) => ({
    ...slot,
    components: (slot.components || []).map(
      (component: {
        id: string;
        type: string;
        width?: number;
        height?: number;
        data?: unknown;
        name?:string;
      }) => {
        const { width, height, data, name, ...rest } = component;
        return {
          ...rest,
          width,
          height,
          name,
          data: {
            ...(typeof data === "object" && data !== null ? data : {}),
            ...(width ? { width } : {}),
            ...(height ? { height } : {}),
          },
          
        };
      },
    ),
  }));
}
