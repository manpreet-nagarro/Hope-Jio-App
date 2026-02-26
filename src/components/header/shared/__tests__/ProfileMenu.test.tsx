import * as React from "react";

jest.mock("@mui/material", () => ({
  ...jest.requireActual("@mui/material"),
  Menu: ({ children, open }: any) =>
    open
      ? React.createElement(
          "div",
          { "data-testid": "menu-container" },
          children,
        )
      : null,
  MenuItem: ({ children, onClick }: any) =>
    React.createElement(
      "div",
      { "data-testid": "logout-item", onClick },
      children,
    ),
}));

jest.mock("../../header.styles", () => ({
  __esModule: true,
  ProfileButton: ({ children, ...props }: any) =>
    React.createElement(
      "button",
      { ...props, "data-testid": "profile-button" },
      children,
    ),
  ProfileAvatar: ({ children }: any) =>
    React.createElement("div", null, children),
  ProfileContainer: ({ children }: any) =>
    React.createElement("div", null, children),
  ProfileName: ({ children }: any) =>
    React.createElement("div", null, children),
  TeamAndRole: ({ children }: any) =>
    React.createElement("div", null, children),
  StyledMenu: ({ children, open }: any) =>
    open
      ? React.createElement(
          "div",
          { "data-testid": "menu-container" },
          children,
        )
      : null,
  LogoutMenuItem: ({ children, onClick }: any) =>
    React.createElement(
      "div",
      { "data-testid": "logout-item", onClick },
      children,
    ),
  StyledAppBar: ({ children }: any) =>
    React.createElement("div", null, children),
  HeaderContainer: ({ children }: any) =>
    React.createElement("div", null, children),
  TitleGroup: ({ children }: any) => React.createElement("div", null, children),
  RightGroup: ({ children }: any) => React.createElement("div", null, children),
}));

jest.mock("@assets/icons-svg/logoutIcon", () => ({
  __esModule: true,
  default: () => React.createElement("div", { "data-testid": "logout-icon" }),
}));

jest.mock("@utils/commonUtils", () => ({
  getNameInitials: () => "TU",
  capitalizeFirstLetter: (value: string) => value.charAt(0).toUpperCase() + value.slice(1),
  toTitleCase: (value: string) => value,
  urlToPascalCaseKey: (value: string) => value,
  getTeamInitials: (value: string) => value,
}));

jest.mock("@store/authSlice/authThunks", () => ({
  __esModule: true,
  logout: jest.fn(() => ({ type: "auth/logout" })),
}));

jest.mock("react-redux", () => ({
  useDispatch: jest.fn(),
  useSelector: jest.fn(),
}));

import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { ProfileMenu } from "../ProfileMenu";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "@store/authSlice/authThunks";

/* ---------------- TESTS ---------------- */

describe("ProfileMenu", () => {
  const mockDispatch = jest.fn();
  const user = userEvent.setup();

  beforeEach(() => {
    (useDispatch as unknown as jest.Mock).mockReturnValue(mockDispatch);

    (useSelector as unknown as jest.Mock).mockImplementation((selector) =>
      selector({
        navigation: {
          data: {
            user: {
              name: "Test User",
              team: "Engineering",
              role: "developer",
            },
          },
        },
      }),
    );
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("renders user profile details correctly", () => {
    render(<ProfileMenu />);

    expect(screen.getByText("Test User")).toBeInTheDocument();
  });

  it("opens menu when profile button is clicked", async () => {
    render(<ProfileMenu />);

    await user.click(screen.getByTestId("profile-button"));

    expect(screen.getByTestId("logout-item")).toBeInTheDocument();
  });

  it("dispatches logout action when logout is clicked", async () => {
    render(<ProfileMenu />);

    await user.click(screen.getByTestId("profile-button"));
    await user.click(screen.getByTestId("logout-item"));

    expect(mockDispatch).toHaveBeenCalledWith(logout());
  });
});
