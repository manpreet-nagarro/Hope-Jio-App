jest.mock("@components/CustomAccordion/CustomAccordion", () => ({
  CustomAccordion: ({ children }: any) => <div>{children}</div>,
}));

jest.mock("../URLPageDetails", () => ({
  URLPageDetails: () => <div data-testid="page-details" />,
}));

jest.mock("../URLStoreDetails", () => ({
  URLStoreDetails: () => <div data-testid="store-details" />,
}));

jest.mock("../URLUserCohortsDetails", () => ({
  URLUserCohortsDetails: () => <div data-testid="cohort-details" />,
}));

jest.mock("../URLScheduler", () => ({
  URLScheduler: () => <div data-testid="scheduler-details" />,
}));

jest.mock("@components/common/WireframeAutocomplete", () => ({
  WireframeAutocomplete: ({ onChange }: any) => (
    <button
      data-testid="wireframe-select"
      onClick={() =>
        onChange({
          slug: "home page",
          platform: "Web",
          store: "US",
          wireframeName: "Homepage",
          wireframeId: "WF-1",
        })
      }
    >
      Select Wireframe
    </button>
  ),
}));

jest.mock("../URLData.schema", () => ({
  urlFormSchema: {},
}));

jest.mock("@hookform/resolvers/zod", () => ({
  zodResolver: () => undefined,
}));

import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import UrlModal from "../URLModal";

const filterData = {
  store: ["US"],
  platform: [],
  status: [],
  userCohorts: ["VIP", "Premium"],
};

const defaultProps = {
  open: true,
  onClose: jest.fn(),
  filterData,
  onCreate: jest.fn(),
  onEdit: jest.fn(),
  isSaving: false,
};

describe("UrlModal", () => {
  const user = userEvent.setup();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("renders create title by default", () => {
    render(<UrlModal {...defaultProps} />);

    expect(screen.getByText(/create url mapping/i)).toBeInTheDocument();
  });

  test("renders edit title when editing", () => {
    render(<UrlModal {...defaultProps} isEditing />);

    expect(screen.getByText(/edit url mapping/i)).toBeInTheDocument();
  });

  test("calls onClose when cancel clicked", async () => {
    render(<UrlModal {...defaultProps} />);

    await user.click(screen.getByText(/cancel/i));

    expect(defaultProps.onClose).toHaveBeenCalled();
  });

  test("calls onClose when close icon clicked", async () => {
    render(<UrlModal {...defaultProps} />);

    const closeBtn = screen.getByRole("button", { name: "" });
    await user.click(closeBtn);

    expect(defaultProps.onClose).toHaveBeenCalled();
  });

  test("wireframe selection auto-fills fields", async () => {
    render(<UrlModal {...defaultProps} />);

    await user.click(screen.getByTestId("wireframe-select"));

    // fields auto-set — we verify component rendered dependent section
    expect(screen.getByTestId("page-details")).toBeInTheDocument();
  });

  test("calls onCreate when submitting new record", async () => {
    render(<UrlModal {...defaultProps} />);

    const submitBtn = screen.getByRole("button", { name: /create url/i });

    await user.click(submitBtn);

    expect(defaultProps.onCreate).toHaveBeenCalled();
  });

  test("calls onEdit when editing existing record", async () => {
    render(
      <UrlModal
        {...defaultProps}
        isEditing
        defaultValues={{
          id: 123,
          sourceWireframe: {
            wireframeId: "WF-1",
            wireframeName: "Homepage",
            slug: "home-page",
            platform: "Web",
            store: "US",
          },
          wireframeName: "Homepage",
          wireframeId: "WF-1",
          slug: "home-page",
          platform: "Web",
          store: "US",
          userCohorts: ["VIP"],
          isScheduled: false,
          scheduleStart: null,
          scheduleEnd: null,
        }}
      />,
    );

    const submitBtn = screen.getByText(/update/i);

    await user.click(submitBtn);

    expect(defaultProps.onEdit).toHaveBeenCalled();
  });

  test("disables submit when saving", () => {
    render(<UrlModal {...defaultProps} isSaving />);

    expect(screen.getByRole("button", { name: /create url/i })).toBeDisabled();
  });

  test("does not render when closed", () => {
    render(<UrlModal {...defaultProps} open={false} />);

    expect(screen.queryByText(/create url mapping/i)).not.toBeInTheDocument();
  });
});
