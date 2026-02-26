jest.mock("@components/loader/Loader", () => ({
  __esModule: true,
  default: ({ open }: any) =>
    open
      ? React.createElement("div", { "data-testid": "loader" }, "Loading...")
      : null,
}));

jest.mock("@components/common/CompactListPopover/CompactListPopover", () => ({
  __esModule: true,
  default: ({ items }: any) =>
    React.createElement(
      "div",
      { "data-testid": "cohort-popover" },
      items.length,
    ),
}));

jest.mock("@utils/scheduleUtils", () => ({
  getScheduleStatus: jest.fn(),
  formatScheduleRange: jest.fn(() => "Jan 1 - Jan 10"),
}));

jest.mock("@utils/commonUtils", () => ({
  urlToPascalCaseKey: () => "MockIcon",
}));

jest.mock("@assets/icons-svg/wireframeList", () => ({
  MockIcon: () =>
    React.createElement("div", { "data-testid": "platform-icon" }),
}));

jest.mock("../urlManagerList.utils", () => ({
  getModfiedCohorts: () => [{ label: "VIP" }],
}));

import * as React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import URLManagerList from "../URLManagerList";
import { getScheduleStatus } from "@utils/scheduleUtils";

const rowData = [
  {
    id: "1",
    wireframeName: "Homepage",
    wireframeId: "WF-001",
    slug: "https://example.com/home",
    store: "US",
    platform: "Web",
    userCohorts: ["VIP"],
    scheduleStart: "2026-01-01",
    scheduleEnd: "2026-01-10",
  },
] as any;

const filterData = {
  store: ["US"],
  platform: [{ name: "Web", iconPath: "web" }],
  status: [],
  userCohorts: [],
};

const defaultProps = {
  data: rowData,
  filterData,
  isLoading: false,
  page: 1,
  pageSize: 10,
  totalPages: 3,
  onPageChange: jest.fn(),
  onPageSizeChange: jest.fn(),
  onEditRow: jest.fn(),
  showEditBtn: true,
};

describe("URLManagerList", () => {
  const user = userEvent.setup();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("renders table row data", () => {
    (getScheduleStatus as jest.Mock).mockReturnValue(null);

    render(<URLManagerList {...defaultProps} />);

    expect(screen.getByText("Homepage")).toBeInTheDocument();
    expect(screen.getByText("WF-001")).toBeInTheDocument();
    expect(screen.getByText("US")).toBeInTheDocument();
    expect(screen.getByText("Web")).toBeInTheDocument();
  });

  test("shows loader when loading", () => {
    render(<URLManagerList {...defaultProps} isLoading />);

    expect(screen.getByTestId("loader")).toBeInTheDocument();
  });

  test("shows empty state", () => {
    render(<URLManagerList {...defaultProps} data={[]} />);

    expect(screen.getByText(/no urls found/i)).toBeInTheDocument();
  });

  test("renders platform icon", () => {
    (getScheduleStatus as jest.Mock).mockReturnValue(null);

    render(<URLManagerList {...defaultProps} />);

    expect(screen.getByTestId("platform-icon")).toBeInTheDocument();
  });

  test("renders cohort popover", () => {
    (getScheduleStatus as jest.Mock).mockReturnValue(null);

    render(<URLManagerList {...defaultProps} />);

    expect(screen.getByTestId("cohort-popover")).toBeInTheDocument();
  });

  test("renders scheduled status", () => {
    (getScheduleStatus as jest.Mock).mockReturnValue("Scheduled");

    render(<URLManagerList {...defaultProps} />);

    expect(screen.getByText("Scheduled")).toBeInTheDocument();
    expect(screen.getByText("Jan 1 - Jan 10")).toBeInTheDocument();
  });

  test("renders expired status", () => {
    (getScheduleStatus as jest.Mock).mockReturnValue("Expired");

    render(<URLManagerList {...defaultProps} />);

    expect(screen.getByText(/expired/i)).toBeInTheDocument();
  });

  test("edit button triggers callback", async () => {
    (getScheduleStatus as jest.Mock).mockReturnValue(null);

    render(<URLManagerList {...defaultProps} />);

    const editButton = screen.getAllByRole("button")[0];

    await user.click(editButton);

    expect(defaultProps.onEditRow).toHaveBeenCalledWith(rowData[0]);
  });

  test("edit button disabled when showEditBtn is false", () => {
    render(<URLManagerList {...defaultProps} showEditBtn={false} />);

    const editButton = screen.getAllByRole("button")[0];

    expect(editButton).toBeDisabled();
  });

  test("next & previous pagination", async () => {
    const mockOnPageChange = jest.fn();
    render(
      <URLManagerList
        {...defaultProps}
        onPageChange={mockOnPageChange}
        page={2}
      />,
    );

    await user.click(screen.getByText("Next"));
    expect(mockOnPageChange).toHaveBeenCalledWith(3);

    await user.click(screen.getByText("Previous"));
    expect(mockOnPageChange).toHaveBeenCalledWith(1);
  });

  test("disables previous on first page", () => {
    render(<URLManagerList {...defaultProps} page={1} />);

    expect(screen.getByText("Previous")).toBeDisabled();
  });

  test("disables next on last page", () => {
    render(<URLManagerList {...defaultProps} page={3} totalPages={3} />);

    expect(screen.getByText("Next")).toBeDisabled();
  });
});
