export interface IUrlManagerSavePayload {
    id: number | null,
    wireframeId: string;
    wireframeName: string;
    slug: string;
    store: string;
    platform: string;
    userCohorts?: {id:number}[];
    scheduleStart: string;
    scheduleEnd: string;
}

export interface IUrlManager {
    id: number | null,
    wireframeId: string;
    wireframeName: string;
    slug: string;
    store: string;
    platform: string;
    userCohorts?: {id:string, name: string}[];
    scheduleStart: string;
    scheduleEnd: string;
}

export interface IFilters {
  searchText?: string;
  store?: string;
  platform?: string;
  status?: string;
  userCohorts?: string;
}

export interface IScheduleInfo {
    scheduleStart: string;
    scheduleEnd: string;
}

export interface IURLApiResponse {
  data: IUrlManager[];
  pagination: {
    page: number;
    size: number;
    totalPages: number;
    last: boolean;
  };
}