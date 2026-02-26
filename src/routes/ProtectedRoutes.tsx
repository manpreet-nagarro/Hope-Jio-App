import { useUserContext } from "@hooks/useUserContext";
import type { RootState } from "@store/store";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = () => {
  const { isAuthenticated, initialized } = useSelector(
    (state: RootState) => state.auth,
  );
  useUserContext();

  return <Outlet />;

  if (!initialized) return null;

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
