export interface Hotspot {
  id: number;
  x: number | null;
  y: number | null;
  width: number | null;
  height: number | null;
  url: string;
  altText: string;
  placed: boolean;
}
