import type { URLFormData } from "./URLData.schema";

export const getModifiedUserCohorts = (updatedCohorts: (string| number)[]) : {id: number}[] => {
    return updatedCohorts.map((c) => ({id : Number(c) + 1}))
}

export const getModifiedId = (data: { id: string | number | null | undefined }) => {
    let id: number | null = null;
    if (data?.id !== null && data?.id !== undefined) {
      if (typeof data.id === "string" && data.id !== "") {
        const parsed = Number(data.id);
        id = Number.isNaN(parsed) ? null : parsed;
      } else if (typeof data.id === "number") {
        id = data.id;
      }
    }
    return id;
}

export const getModifiedScheduleStartDate = (data : URLFormData) => {
    let date = "";
    if (data?.scheduleStart) {
      if (typeof data.scheduleStart === "string") {
        date = data.scheduleStart;
      } else if (data.scheduleStart instanceof Date) {
        date = data.scheduleStart.toISOString();
      }
    }
    return date;
}

export const getModifiedScheduleEndDate = (data : URLFormData) => {
    let date = "";
    if (data?.scheduleEnd) {
      if (typeof data.scheduleEnd === "string") {
        date = data.scheduleEnd;
      } else if (data.scheduleEnd instanceof Date) {
        date = data.scheduleEnd.toISOString();
      }
    }
    return date;
}