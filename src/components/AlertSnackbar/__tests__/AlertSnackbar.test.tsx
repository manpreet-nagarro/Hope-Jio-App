import { render, screen, fireEvent } from "@testing-library/react";
import { AlertSnackbar } from "../AlertSnackbar";


jest.mock("@assets/icons-svg/snackbarWarningIcon", () => ({
  __esModule: true,
  default: ({ color }: any) => (
    <div data-testid="snackbar-icon" data-color={color} />
  ),
}));


jest.mock("@mui/material", () => {
  const actual = jest.requireActual("@mui/material");
  return {
    ...actual,
    Snackbar: ({ open, children }: any) =>
      open ? <div data-testid="snackbar">{children}</div> : null,
    Alert: ({ children, onClose, icon }: any) => (
      <div data-testid="alert">
        {icon}
        <span>{children}</span>
        <button data-testid="close-btn" onClick={onClose}>
          Close
        </button>
      </div>
    ),
  };
});

describe("AlertSnackbar", () => {
  const mockOnClose = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();

    // ✅ Clean up portal before each test
    const existingPortal = document.getElementById("snackbar-portal");
    if (existingPortal) {
      existingPortal.remove();
    }
  });

  it("renders message when open", () => {
    render(
      <AlertSnackbar
        open={true}
        message="Test message"
        onClose={mockOnClose}
      />,
    );

    expect(screen.getByTestId("snackbar")).toBeInTheDocument();
    expect(screen.getByText("Test message")).toBeInTheDocument();
  });

  it("does not render when closed", () => {
    render(
      <AlertSnackbar
        open={false}
        message="Hidden message"
        onClose={mockOnClose}
      />,
    );

    expect(screen.queryByTestId("snackbar")).not.toBeInTheDocument();
  });

  it("calls onClose when close button clicked", () => {
    render(
      <AlertSnackbar
        open={true}
        message="Closable message"
        onClose={mockOnClose}
      />,
    );

    fireEvent.click(screen.getByTestId("close-btn"));
    expect(mockOnClose).toHaveBeenCalled();
  });

  it("renders correct icon color for error severity", () => {
    render(
      <AlertSnackbar
        open={true}
        message="Error message"
        severity="error"
        onClose={mockOnClose}
      />,
    );

    const icon = screen.getByTestId("snackbar-icon");
    expect(icon).toHaveAttribute("data-color", "#D32F2F");
  });

  it("renders success color correctly", () => {
    render(
      <AlertSnackbar
        open={true}
        message="Success message"
        severity="success"
        onClose={mockOnClose}
      />,
    );

    const icon = screen.getByTestId("snackbar-icon");
    expect(icon).toHaveAttribute("data-color", "#388E3C");
  });

  it("creates portal root if not exists", () => {
    // Before render → portal should not exist
    expect(document.getElementById("snackbar-portal")).toBeNull();

    render(
      <AlertSnackbar open={true} message="Portal test" onClose={mockOnClose} />,
    );

    // After render → portal should exist
    expect(document.getElementById("snackbar-portal")).toBeInTheDocument();
  });
});
