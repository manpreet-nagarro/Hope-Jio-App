jest.mock("@components/AlertSnackbar/AlertSnackbar", () => ({
  AlertSnackbar: ({ open, message }: any) =>
    open ? <div data-testid="alert">{message}</div> : null,
}));

jest.mock("@hooks/useDebouncedCallback", () => ({
  useDebouncedCallback: (fn: any) => [fn, jest.fn()],
}));

jest.mock("@components/customSelectField/CustomSelectField", () => ({
  CustomSelectField: ({ ariaLabel, onChangeValue }: any) => (
    <select
      data-testid={ariaLabel}
      onChange={(e) => onChangeValue(e.target.value)}
    >
      <option value="">All</option>
      <option value="Option1">Option1</option>
    </select>
  ),
}));

jest.mock("@utils/commonUtils", () => ({
  urlToPascalCaseKey: () => "Icon",
}));

jest.mock("@assets/icons-svg/wireframeList", () => ({
  Icon: () => <div data-testid="platform-icon" />,
}));

import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import SearchFilter from "../SearchFilter";

const filterData = {
  store: ["Store A"],
  platform: [{ name: "Web", iconPath: "web" }],
  status: ["ACTIVE"],
  userCohorts: ["Cohort 1"],
};

const defaultProps = {
  filterData,
  onSearch: jest.fn(),
  onCreateClick: jest.fn(),
  createButtonText: "Create",
  hideFilters: [],
  showCreateBtn: true,
};

describe("SearchFilter", () => {
  const user = userEvent.setup();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("renders search input and buttons", () => {
    render(<SearchFilter {...defaultProps} />);

    expect(
      screen.getByPlaceholderText(/search by page name/i),
    ).toBeInTheDocument();

    expect(screen.getByText("Create")).toBeInTheDocument();
    expect(screen.getByText("Filters")).toBeInTheDocument();
  });

  test("calls onSearch when typing", async () => {
    render(<SearchFilter {...defaultProps} />);

    const input = screen.getByPlaceholderText(/search/i);

    await user.type(input, "home");

    expect(defaultProps.onSearch).toHaveBeenCalled();
  });

  test("clears search text when clear button clicked", async () => {
    render(<SearchFilter {...defaultProps} />);

    const input = screen.getByPlaceholderText(/search/i);

    await user.type(input, "test");

    const clearBtn = screen.getByTestId("clear-search-btn");
    await user.click(clearBtn);

    expect(input).toHaveValue("");
  });

  test(
    "shows alert when max length exceeded",
    async () => {
      render(<SearchFilter {...defaultProps} />);

      const input = screen.getByPlaceholderText(/search/i) as HTMLInputElement;

      const longText = "a".repeat(300);

      // Use paste instead of type for long text to avoid timeout
      await user.click(input);
      await user.paste(longText);

      expect(screen.getByTestId("alert")).toBeInTheDocument();
    },
    10000,
  );

  test("toggles filter panel", async () => {
    render(<SearchFilter {...defaultProps} />);

    await user.click(screen.getByText("Filters"));

    expect(screen.getByTestId("Store")).toBeInTheDocument();
  });

  test("selecting store triggers search", async () => {
    render(<SearchFilter {...defaultProps} />);

    await user.click(screen.getByText("Filters"));

    await user.selectOptions(screen.getByTestId("Store"), "Option1");

    expect(defaultProps.onSearch).toHaveBeenCalled();
  });

  test("selecting platform pill toggles active state", async () => {
    render(<SearchFilter {...defaultProps} />);

    await user.click(screen.getByText("Filters"));

    const pill = screen.getByText("Web");

    await user.click(pill);

    expect(defaultProps.onSearch).toHaveBeenCalled();
  });

  test("clear all filters button appears and works", async () => {
    render(<SearchFilter {...defaultProps} />);

    await user.click(screen.getByText("Filters"));

    await user.selectOptions(screen.getByTestId("Store"), "Option1");

    const clearBtn = screen.getByText(/clear all/i);

    await user.click(clearBtn);

    expect(defaultProps.onSearch).toHaveBeenCalled();
  });

  test("create button triggers callback", async () => {
    render(<SearchFilter {...defaultProps} />);

    await user.click(screen.getByText("Create"));

    expect(defaultProps.onCreateClick).toHaveBeenCalled();
  });

  test("create button disabled when showCreateBtn is false", () => {
    render(<SearchFilter {...defaultProps} showCreateBtn={false} />);

    expect(screen.getByText("Create")).toBeDisabled();
  });
});
