import * as React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { CustomSelectField } from "../CustomSelectField";

jest.mock("@mui/material", () => {
  const actual = jest.requireActual("@mui/material");

  return {
    __esModule: true,
    ...actual,
    Select: ({ children, open, value }: any) => (
      <div data-testid="select">
        <div data-testid="selected-value">{value}</div>
        {open && <div data-testid="menu">{children}</div>}
      </div>
    ),
    OutlinedInput: () => <div />,
    ListItemIcon: ({ children }: any) => <div>{children}</div>,
    Radio: ({ checked }: any) => (
      <input type="radio" checked={checked} readOnly />
    ),
  };
});

// ✅ Mock Icons
jest.mock("@mui/icons-material/ExpandMore", () => ({
  __esModule: true,
  default: () => <span />,
}));

jest.mock("@assets/icons-svg/radioUnchecked", () => ({
  __esModule: true,
  default: () => <span />,
}));

jest.mock("@assets/icons-svg/radioChecked", () => ({
  __esModule: true,
  default: () => <span />,
}));

// ✅ SIMPLE styles mock (NO forwardRef needed)
jest.mock("../CustomSelectField.styles", () => ({
  __esModule: true,
  SelectControlWrapper: ({ children }: any) => (
    <div data-testid="wrapper">{children}</div>
  ),
  FilterFormControl: ({ children }: any) => (
    <div data-testid="form-control">{children}</div>
  ),
  SelectOverlay: ({ onMouseDown }: any) => (
    <div data-testid="overlay" onMouseDown={onMouseDown} />
  ),
  FilterMenuItem: ({ children, value }: any) => (
    <div data-testid={`option-${value}`}>{children}</div>
  ),
}));

// ✅ Mock constants
jest.mock("@constants/text.constants", () => ({
  __esModule: true,
  UI_TEXTS: {
    SELECT: {
      ALL: "All",
    },
  },
}));

describe("CustomSelectField", () => {
  const mockChange = jest.fn();

  const defaultProps = {
    controlRef: React.createRef<HTMLDivElement>(),
    selected: false,
    ariaLabel: "custom-select",
    value: "",
    onChangeValue: mockChange,
    options: ["One", "Two"],
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders component", () => {
    render(<CustomSelectField {...defaultProps} />);
    expect(screen.getByTestId("wrapper")).toBeInTheDocument();
  });

  it("opens menu when overlay clicked", () => {
    render(<CustomSelectField {...defaultProps} />);
    fireEvent.mouseDown(screen.getByTestId("overlay"));
    expect(screen.getByTestId("menu")).toBeInTheDocument();
  });

  it("renders default option", () => {
    render(<CustomSelectField {...defaultProps} />);
    fireEvent.mouseDown(screen.getByTestId("overlay"));
    expect(screen.getByTestId("option-")).toBeInTheDocument();
  });

  it("renders options correctly", () => {
    render(<CustomSelectField {...defaultProps} />);
    fireEvent.mouseDown(screen.getByTestId("overlay"));
    expect(screen.getByTestId("option-One")).toBeInTheDocument();
    expect(screen.getByTestId("option-Two")).toBeInTheDocument();
  });

  it("renders selected value", () => {
    render(<CustomSelectField {...defaultProps} value="One" />);
    expect(screen.getByTestId("selected-value")).toHaveTextContent("One");
  });
});
