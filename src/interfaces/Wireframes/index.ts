import type { Slot } from "@components/slotEditorCanvas/slotEditorCanvas.types";

export interface IWireframe {
  wireframeId: string;
  wireframeName: string;
  slug: string;
  store: string;
  platform: string;
  modifiedAt: string;
  modifiedBy?: string;
  createdAt: string;
  createdBy?: string;
  description?: string;
  status: string;
  slots: Slot[];
  seo?: ISeo;
  urlsMapped: IUrlMapping[];
};

export interface ISeo {
  title?: string | null;
  page_title?: string | null;
  description?: string | null;
  topDescription?: string | null;
  bottomDescription?: string | null;
  canonical_url?: string | null;
  canonical_url_domain?: string | null;
  breadcrumbs?: string[] | null;
  keywords?: string[] | null;
  sitemap?: ISitemap | null;
  metaTags?: Record<string, string> | null;
}

export interface ISitemap {
  priority?: number | null;
  frequency?: string | null;
}

export interface IPlatformInfo {
    id?: string;
    name: string;
    iconPath: string;
}

export interface IUrlMapping {
  pageUri?: string;
  slug?: string;
  wireframeId?: string | null;
  storeId?: string | null;
  predicate?: IPredicate;
  status?: string;
  modifiedAt?: string;
  userCohorts:string[]
}

export interface IPredicate {
  user: IUserPredicate;
  platform: IPlatformPredicate;
  schedule: ISchedulePredicate;
}

export interface IUserPredicate {
  user_type?: "user_group";
  user_groups?: IUserGroups;
}

export interface IUserGroups {
  l1?: IUserGroupRule;
  l2?: IUserGroupRule;
  [key: string]: IUserGroupRule | undefined;
}

export interface IUserGroupRule {
  includes?: string[];
  excludes?: string[];
}

export interface IPlatformPredicate {
  ios?: boolean;
  web?: boolean;
  android?: boolean;
}

export interface ISchedulePredicate {
  start: string;
  end: string;
}

export interface IFilters {
  searchText?: string;
  store?: string;
  platform?: string;
  status?: string;
  userCohorts?: string;
}


export interface IFilterApiResponse {
  data: IWireframeFilterData;
}

export interface IWireframeFilterData {
  store: string[];
  platform: IPlatformInfo[];
  status: string[];
  userCohorts: string[];
}

export interface IWireframesApiResponse {
  data: IWireframe[];
  pagination: {
    page: number;
    size: number;
    totalPages: number;
    last: boolean;
  };
}