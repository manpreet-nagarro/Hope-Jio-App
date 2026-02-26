import type { IFilters, IPlatformInfo } from "src/interfaces/Wireframes";

export type IProps = {
  onSearch: (filters: IFilters) => void;
  filterData?: {
    store: string[];
    platform: IPlatformInfo[];
    status: string[];
    userCohorts: string[];
  };
  onCreateClick?: () => void;
  createButtonText?: string;
  hideFilters?:string[],
  showCreateBtn?: boolean;
};