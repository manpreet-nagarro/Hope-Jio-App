export type ComponentType = "IMAGE_BANNER" | "IMAGE_MANNER" | "PROMO_TILE";

export interface ISlotComponentData {
  name?: string;
  width?: number;
  height?: number;
  bannerText?: string;
  [key: string]: unknown;
  data?:{
    width?: number;
    height?: number;
    bannerText?: string;
    [key: string]: unknown;
  }
}

export interface CanvasComponent {
  id: string;
  type: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data?: any;
  name?: string;
}

export interface Slot {
  id: string;
  components: CanvasComponent[];
  name: string;
}
