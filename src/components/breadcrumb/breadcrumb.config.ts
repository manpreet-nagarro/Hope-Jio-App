export type BreadcrumbRule = {
  match: (pathname: string) => boolean;
  label: string;
  path?: string;
};

export const BREADCRUMB_RULES: BreadcrumbRule[] = [
  {
    match: () => true,
    label: "Home",
    path: "/wireframe",
  },
  {
    match: (pathname) => pathname.startsWith("/wireframe"),
    label: "Wireframe Pages",
    path: "/wireframe",
  },
  {
    match: (pathname) => pathname.startsWith("/wireframe/editor"),
    label: "Wireframe Editor",
  },
  {
    match: (pathname) => pathname.startsWith("/urlmanager"),
    label: "URL Manager",
  },
];
