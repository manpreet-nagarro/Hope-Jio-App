import type { IWireframe } from "@interfaces/Wireframes";

export const getModifiedCohorts = (
  row: IWireframe,
): { id: string; name: string }[] | string[] => {
  let cohorts: { id: string; name: string }[] | string[] = Array.from(
    new Set((row.urlsMapped || []).flatMap((url) => url.userCohorts || [])),
  );
  if (typeof cohorts[0] === "string") {
    cohorts = cohorts.map((c) => ({
      id: c,
      name: c,
    }));
  }
  
  return cohorts;
};
