import { useLocation, useNavigate } from "react-router-dom";
import { useMemo, useCallback } from "react";
import {
  BreadcrumbCurrent,
  BreadcrumbLink,
  BreadcrumbWrapper,
} from "./breadcrumb.styles";
import { BREADCRUMB_RULES } from "./breadcrumb.config";

type Crumb = {
  label: string;
  path?: string;
};

const Breadcrumb = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const isLoginPage = pathname === "/login";

  const crumbs = useMemo<Crumb[]>(() => {
    if (isLoginPage) return [];

    return BREADCRUMB_RULES.filter(({ match }) => match(pathname)).map(
      ({ label, path }) => ({ label, path }),
    );
  }, [pathname, isLoginPage]);

  const handleNavigate = useCallback(
    (path?: string) => {
      if (path) navigate(path);
    },
    [navigate],
  );

  if (isLoginPage || crumbs.length === 0) return null;

  return (
    <BreadcrumbWrapper aria-label="breadcrumb">
      {crumbs.map(({ label, path }, index) => {
        const isLast = index === crumbs.length - 1;

        return isLast ? (
          <BreadcrumbCurrent key={label}>{label}</BreadcrumbCurrent>
        ) : (
          <BreadcrumbLink
            key={label}
            underline="none"
            onClick={() => handleNavigate(path)}
          >
            {label}
          </BreadcrumbLink>
        );
      })}
    </BreadcrumbWrapper>
  );
};

export default Breadcrumb;
