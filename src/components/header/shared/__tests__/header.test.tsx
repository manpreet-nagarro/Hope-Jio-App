import { render, screen } from "@testing-library/react";
import { useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import Header from "@components/header/header";

jest.mock("react-router-dom", () => ({
  __esModule: true,
  useLocation: jest.fn(),
}));

jest.mock("react-redux", () => ({
  __esModule: true,
  useSelector: jest.fn(),
}));

jest.mock("../../header.styles", () => ({
  __esModule: true,
  StyledAppBar: ({ children }: any) => <div>{children}</div>,
  HeaderContainer: ({ children }: any) => <div>{children}</div>,
  TitleGroup: ({ children }: any) => <div>{children}</div>,
  RightGroup: ({ children }: any) => <div>{children}</div>,
}));

jest.mock("@components/breadcrumb/breadcrumb", () => ({
  __esModule: true,
  default: () => <div data-testid="breadcrumb" />,
}));

jest.mock("../DeviceBadge", () => ({
  __esModule: true,
  DeviceBadge: ({ label }: any) => (
    <div data-testid="device-badge">{label}</div>
  ),
}));

jest.mock("../ProfileMenu", () => ({
  __esModule: true,
  ProfileMenu: () => <div data-testid="profile-menu" />,
}));

jest.mock("@constants/theme.constants", () => ({
  __esModule: true,
  COLORS: { TEXT_DARK: "black" },
  FONTS: { FONT_FAMILY_BOLD: "bold" },
}));

jest.mock("../../routeTitleMap", () => ({
  __esModule: true,
  routeTitleMap: {
    "/dashboard": "Dashboard",
    "/users": "Users",
  },
}));

const mockUseLocation = useLocation as unknown as jest.Mock;
const mockUseSelector = useSelector as unknown as jest.Mock;

describe("Header Component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders route title for normal route", () => {
    mockUseLocation.mockReturnValue({ pathname: "/dashboard" });

    mockUseSelector.mockImplementation((callback: any) =>
      callback({
        wireframe: { selectedWireframe: null },
      }),
    );

    render(<Header />);

    expect(screen.getByText("Dashboard")).toBeInTheDocument();
    expect(screen.queryByTestId("device-badge")).not.toBeInTheDocument();
  });

  it("renders wireframe name on editor page", () => {
    mockUseLocation.mockReturnValue({
      pathname: "/wireframe/editor/123",
    });

    mockUseSelector.mockImplementation((callback: any) =>
      callback({
        wireframe: {
          selectedWireframe: {
            wireframeName: "Homepage",
            platform: "Mobile",
          },
        },
      }),
    );

    render(<Header />);

    expect(screen.getByText("Homepage")).toBeInTheDocument();
    expect(screen.getByTestId("device-badge")).toHaveTextContent("Mobile");
  });

  it("renders breadcrumb and profile menu", () => {
    mockUseLocation.mockReturnValue({ pathname: "/dashboard" });

    mockUseSelector.mockImplementation((callback: any) =>
      callback({
        wireframe: { selectedWireframe: null },
      }),
    );

    render(<Header />);

    expect(screen.getByTestId("breadcrumb")).toBeInTheDocument();
    expect(screen.getByTestId("profile-menu")).toBeInTheDocument();
  });
});
