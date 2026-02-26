import type { CompactListPopoverItem } from "@components/common/CompactListPopover/CompactListPopover.types";
import type { IUrlManager } from "@interfaces/URLManager";

export const getModfiedCohorts = (row: IUrlManager): CompactListPopoverItem[] => {
  const cohorts = row.userCohorts;
  if (Array.isArray(cohorts) && cohorts.length > 0) {
    return (cohorts as { id: string; name: string }[]).map((c) => ({ id: c.id, name: c.name }));
  }
  return [];
};