import { format } from "date-fns";
import type { IScheduleInfo } from "src/interfaces/URLManager";

export const getScheduleStatus = (schedule? :IScheduleInfo) => {
    if(!schedule?.scheduleStart || !schedule?.scheduleEnd) return null;
    
    const now = new Date();
    const endDate = new Date(schedule.scheduleEnd);

    return endDate < now ? "Expired" : "Scheduled";
}

export const formatScheduleRange = (start: string, end: string) => {
    return `${format(new Date(start),"dd MMM, hh:mma")} - ${format(new Date(end),"dd MMM, hh:mma")}`;
}