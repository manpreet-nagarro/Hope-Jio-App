jest.mock(
  "@components/header/header",
  () => ({
    __esModule: true,
    default: () => <div data-testid="header" />,
  }),
  { virtual: true },
);

jest.mock(
  "@components/sidebar/sidebar",
  () => ({
    __esModule: true,
    default: () => <div data-testid="sidebar" />,
  }),
  { virtual: true },
);

jest.mock(
  "@components/Toast/Toast",
  () => ({
    __esModule: true,
    default: () => <div data-testid="toast" />,
  }),
  { virtual: true },
);

jest.mock("react-router-dom", () => ({
  __esModule: true,
  Outlet: () => <div data-testid="outlet" />,
}));

import { render, screen } from "@testing-library/react";
import HomePage from "../homepage";

describe("HomePage", () => {
  it("renders correctly", () => {
    render(<HomePage />);
    expect(screen.getByTestId("sidebar")).toBeInTheDocument();
    expect(screen.getByTestId("header")).toBeInTheDocument();
    expect(screen.getByTestId("outlet")).toBeInTheDocument();
    expect(screen.getByTestId("toast")).toBeInTheDocument();
  });
});
