import { render, screen, fireEvent } from "@testing-library/react";
import ConfirmationDialog from "../confirmationDialog";

jest.mock("@mui/material", () => {
  const actual = jest.requireActual("@mui/material");

  return {
    __esModule: true,
    ...actual,
    Box: ({ children }: any) => <div>{children}</div>,
    IconButton: ({ children, onClick }: any) => (
      <button data-testid="close-btn" onClick={onClick}>
        {children}
      </button>
    ),
    Tooltip: ({ children, title }: any) => (
      <div data-testid="tooltip" data-title={title}>
        {children}
      </div>
    ),
  };
});

jest.mock("@mui/icons-material/Close", () => ({
  __esModule: true,
  default: () => <span data-testid="close-icon" />,
}));

jest.mock("../confirmationDialog.styles", () => ({
  __esModule: true,

  ConfirmDialog: ({ children, open }: any) =>
    open ? <div data-testid="dialog">{children}</div> : null,

  ConfirmDialogActions: ({ children }: any) => (
    <div data-testid="actions">{children}</div>
  ),

  DialogHeader: ({ children }: any) => (
    <div data-testid="header">{children}</div>
  ),

  PrimaryActionButton: ({ children, onClick, disabled }: any) => (
    <button data-testid="primary-btn" onClick={onClick} disabled={disabled}>
      {children}
    </button>
  ),

  SecondaryActionButton: ({ children, onClick }: any) => (
    <button data-testid="secondary-btn" onClick={onClick}>
      {children}
    </button>
  ),

  StyledDialogContent: ({ children }: any) => (
    <div data-testid="content">{children}</div>
  ),

  StyledDialogMessage: ({ children }: any) => (
    <div data-testid="message">{children}</div>
  ),

  StyledDialogTitle: ({ children }: any) => (
    <div data-testid="title">{children}</div>
  ),
}));

describe("ConfirmationDialog", () => {
  const mockPrimary = jest.fn();
  const mockSecondary = jest.fn();
  const mockClose = jest.fn();

  const defaultProps = {
    open: true,
    title: "Confirm",
    description: "Are you sure?",
    primaryActionLabel: "Yes",
    secondaryActionLabel: "No",
    onPrimaryAction: mockPrimary,
    onSecondaryAction: mockSecondary,
    onClose: mockClose,
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders dialog when open", () => {
    render(<ConfirmationDialog {...defaultProps} />);
    expect(screen.getByTestId("dialog")).toBeInTheDocument();
  });

  it("does not render when closed", () => {
    render(<ConfirmationDialog {...defaultProps} open={false} />);
    expect(screen.queryByTestId("dialog")).not.toBeInTheDocument();
  });

  it("renders title and description", () => {
    render(<ConfirmationDialog {...defaultProps} />);
    expect(screen.getByTestId("title")).toHaveTextContent("Confirm");
    expect(screen.getByTestId("message")).toHaveTextContent("Are you sure?");
  });

  it("calls primary action when clicked", () => {
    render(<ConfirmationDialog {...defaultProps} />);
    fireEvent.click(screen.getByTestId("primary-btn"));
    expect(mockPrimary).toHaveBeenCalledTimes(1);
  });

  it("calls secondary action when clicked", () => {
    render(<ConfirmationDialog {...defaultProps} />);
    fireEvent.click(screen.getByTestId("secondary-btn"));
    expect(mockSecondary).toHaveBeenCalledTimes(1);
  });

  it("calls onClose when close button clicked", () => {
    render(<ConfirmationDialog {...defaultProps} />);
    fireEvent.click(screen.getByTestId("close-btn"));
    expect(mockClose).toHaveBeenCalledTimes(1);
  });

  it("disables primary button when loading is true", () => {
    render(<ConfirmationDialog {...defaultProps} loading />);
    expect(screen.getByTestId("primary-btn")).toBeDisabled();
  });

  it("disables primary button when primaryActionDisabled is true", () => {
    render(<ConfirmationDialog {...defaultProps} primaryActionDisabled />);
    expect(screen.getByTestId("primary-btn")).toBeDisabled();
  });

  it("wraps primary button with tooltip when disabled", () => {
    render(
      <ConfirmationDialog
        {...defaultProps}
        primaryActionDisabled
        primaryActionTooltip="Not allowed"
      />,
    );

    expect(screen.getByTestId("tooltip")).toHaveAttribute(
      "data-title",
      "Not allowed",
    );
  });
});
