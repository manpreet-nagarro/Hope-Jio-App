export type CompactListPopoverItem = {
  id: string | number;
  name: string;
};

export type CompactListPopoverProps = {
  items?: CompactListPopoverItem[] | null;
  visibleCount?: number;
  className?: string;
};