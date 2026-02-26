export interface NavigationPermissions {
  read: boolean;
  write: boolean;
  approve: boolean;
}

export interface NavigationItem {
  title: string;
  description: string;
  iconUrl: string;
  pageUrl: string;
  priority: number;
  permissions: NavigationPermissions;
}

export interface IUser {
  tenant: string;
  team: string;
  role: string;
  email: string;
  name: string;
}

export interface TenantRoleAccess {
  user: IUser;
  privileges: string[];
  navigation: NavigationItem[];
}

export interface INavigationDataResponse {
  data: TenantRoleAccess;
  detailed_message: string;
  status_message: string;
  status_code: number;
  status: string;
}
