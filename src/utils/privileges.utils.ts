import { useSelector } from "react-redux";
import type { RootState } from "@store/store";
import { store } from "@store/store";

export function useHasPrivilege(privilege: string): boolean {
  const privileges = useSelector((state: RootState) => state.privileges.privileges);
  return privileges.includes(privilege);
}

export function useHasAnyPrivilege(privilegesToCheck: string[]): boolean {
  const privileges = useSelector((state: RootState) => state.privileges.privileges);
  return privilegesToCheck.some((priv) => privileges.includes(priv));
}

export function useHasAllPrivileges(privilegesToCheck: string[]): boolean {
  const privileges = useSelector((state: RootState) => state.privileges.privileges);
  return privilegesToCheck.every((priv) => privileges.includes(priv));
}

export function getHasPrivilege(privilege: string): boolean {
  const privileges = store.getState().privileges.privileges;
  return privileges.includes(privilege);
}

export function getHasAnyPrivilege(privilegesToCheck: string[]): boolean {
  const privileges = store.getState().privileges.privileges;
  return privilegesToCheck.some((priv) => privileges.includes(priv));
}

export function getHasAllPrivileges(privilegesToCheck: string[]): boolean {
  const privileges = store.getState().privileges.privileges;
  return privilegesToCheck.every((priv) => privileges.includes(priv));
}
