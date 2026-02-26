export const ROLES = {
  SYSTEM_ADMIN: 'System Admin',
  SUPER_ADMIN: 'Super Admin',
  TENANT_ADMIN: 'Tenant Admin',
  CP_ADMIN: 'CP Admin',
  CP_CHECKER: 'CP Checker',
  CP_MAKER: 'CP Maker',
  BU_ADMIN: 'BU Admin',
  BU_MAKER: 'BU Maker',
  BU_CHECKER: 'BU Checker',
  CREATIVE_ADMIN: 'Creative Admin',
  CREATIVE_MAKER: 'Creative Maker',
  CREATIVE_CHECKER: 'Creative Checker',
  QC: 'QC',
  VIEW_ONLY: 'View Only',
} as const;

export type Role = typeof ROLES[keyof typeof ROLES];
