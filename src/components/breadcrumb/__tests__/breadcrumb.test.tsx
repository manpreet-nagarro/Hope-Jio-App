import { render, screen, fireEvent } from "@testing-library/react";
import * as Router from "react-router-dom";
import Breadcrumb from "../breadcrumb";

const mockNavigate = jest.fn();

jest.mock("react-router-dom", () => ({
  useLocation: jest.fn(),
  useNavigate: jest.fn(),
}));

jest.mock("../breadcrumb.config", () => ({
  BREADCRUMB_RULES: [
    {
      label: "Home",
      path: "/",
      match: (pathname: string) => pathname.startsWith("/dashboard"),
    },
    {
      label: "Dashboard",
      path: "/dashboard",
      match: (pathname: string) => pathname === "/dashboard",
    },
  ],
}));

jest.mock("../breadcrumb.styles", () => ({
  BreadcrumbWrapper: ({ children }: any) => (
    <nav data-testid="breadcrumb-wrapper">{children}</nav>
  ),
  BreadcrumbLink: ({ children, onClick }: any) => (
    <button onClick={onClick}>{children}</button>
  ),
  BreadcrumbCurrent: ({ children }: any) => <span>{children}</span>,
}));

describe("Breadcrumb", () => {
  beforeEach(() => {
    jest.clearAllMocks();

    (Router.useNavigate as jest.Mock).mockReturnValue(mockNavigate);
  });

  it("returns null on login page", () => {
    (Router.useLocation as jest.Mock).mockReturnValue({
      pathname: "/login",
    });

    const { container } = render(<Breadcrumb />);
    expect(container.firstChild).toBeNull();
  });

  it("returns null if no breadcrumb matches", () => {
    (Router.useLocation as jest.Mock).mockReturnValue({
      pathname: "/unknown",
    });

    const { container } = render(<Breadcrumb />);
    expect(container.firstChild).toBeNull();
  });

  it("renders breadcrumb links and current item", () => {
    (Router.useLocation as jest.Mock).mockReturnValue({
      pathname: "/dashboard",
    });

    render(<Breadcrumb />);

    expect(screen.getByText("Home")).toBeInTheDocument();
    expect(screen.getByText("Dashboard")).toBeInTheDocument();
  });

  it("navigates when breadcrumb link is clicked", () => {
    (Router.useLocation as jest.Mock).mockReturnValue({
      pathname: "/dashboard",
    });

    render(<Breadcrumb />);

    fireEvent.click(screen.getByText("Home"));

    expect(mockNavigate).toHaveBeenCalledWith("/");
  });

  it("does not navigate when clicking current breadcrumb", () => {
    (Router.useLocation as jest.Mock).mockReturnValue({
      pathname: "/dashboard",
    });

    render(<Breadcrumb />);

    fireEvent.click(screen.getByText("Dashboard"));

    expect(mockNavigate).not.toHaveBeenCalled();
  });
});
