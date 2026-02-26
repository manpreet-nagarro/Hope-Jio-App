import { useSelector } from "react-redux";
import type { RootState } from "@store/store";
import { ROLES } from "@constants/roles.constants";

export function useRoles() {
  const user = useSelector((state: RootState) => state.navigation?.data?.user);
  const role = user?.role;
  const team = user?.team;
  const userRoleKey = getUserRoleKey(role, team);

  const isSuperAdmin =
    userRoleKey === ROLES.SUPER_ADMIN || userRoleKey === ROLES.SYSTEM_ADMIN;
  const isCPAdminOrChecker =
    userRoleKey === ROLES.CP_ADMIN || userRoleKey === ROLES.CP_CHECKER;

  return {
    user,
    role,
    team,
    userRoleKey,
    isSuperAdmin,
    isTenantAdmin: userRoleKey === ROLES.TENANT_ADMIN,
    isCPAdmin: userRoleKey === ROLES.CP_ADMIN,
    isCPChecker: userRoleKey === ROLES.CP_CHECKER,
    isCPMaker: userRoleKey === ROLES.CP_MAKER,
    isBUAdmin: userRoleKey === ROLES.BU_ADMIN,
    isBUMaker: userRoleKey === ROLES.BU_MAKER,
    isBUChecker: userRoleKey === ROLES.BU_CHECKER,
    isCreativeAdmin: userRoleKey === ROLES.CREATIVE_ADMIN,
    isCreativeMaker: userRoleKey === ROLES.CREATIVE_MAKER,
    isCreativeChecker: userRoleKey === ROLES.CREATIVE_CHECKER,
    isQC: userRoleKey === ROLES.QC,
    isViewOnly: userRoleKey === ROLES.VIEW_ONLY,
    isCPAdminOrChecker,
  };
}

function getUserRoleKey(role?: string, team?: string) {
  return role && team ? `${team} ${role}` : role || "";
}
