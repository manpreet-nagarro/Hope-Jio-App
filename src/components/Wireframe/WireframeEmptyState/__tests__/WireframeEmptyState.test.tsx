import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import WireframeEmptyState from "../WireframeEmptyState";
import type { ReactNode } from "react";
import type { IWireframeFilterData } from "@interfaces/Wireframes";

// Mocks
jest.mock("@assets/icons-svg/createNewPage/EmptyWireframeIcon", () => ({
  EmptyWireframeIcon: () => <div data-testid="empty-wireframe-icon" />,
}));
jest.mock("@assets/icons-svg/createNewPage/CreateNewPageIcon", () => ({
  CreateNewPageIcon: () => <span data-testid="create-new-page-icon" />,
}));

jest.mock("../WireframeEmptyState.styles", () => ({
  Container: ({ children }: { children: ReactNode }) => <div data-testid="container">{children}</div>,
  Title: ({ children }: { children: ReactNode }) => <div data-testid="title">{children}</div>,
  Subtitle: ({ children }: { children: ReactNode }) => <div data-testid="subtitle">{children}</div>,
  ActionsRow: ({ children }: { children: ReactNode }) => <div data-testid="actions-row">{children}</div>,
}));
jest.mock("@components/createPageModal/createPageModal", () => ({
  __esModule: true,
  default: ({ open, onClose, filterData, onCreate, isSaving }: {
    open : boolean;
    onClose: () => void;
    filterData: IWireframeFilterData;
    onCreate: (data: {test : string}) => void;
    isSaving: boolean;
  }) =>
    open ? (
      <div data-testid="create-modal">
        <button onClick={() => onCreate({ test: "payload" })}>Create</button>
        <button onClick={onClose}>Close</button>
        <div data-testid="modal-filter-data">{JSON.stringify(filterData)}</div>
        <div data-testid="modal-is-saving">{String(isSaving)}</div>
      </div>
    ) : null,
}));
jest.mock("@utils/messages", () => ({
  CREATE_NEW_PAGE: "Create New Page",
  NO_WIREFRAMES_YET_TITLE: "No Wireframes Yet",
  NO_WIREFRAMES_YET_SUBTITLE: "Start by creating a new wireframe.",
}));

describe("WireframeEmptyState", () => {
  const onCreateMock = jest.fn();
  const filterData = {
    store: ["store1"],
    platform: [{ id: "1", name: "Platform1", iconPath: "/web" }],
    status: ["active"],
    userCohorts: ["cohort1"],
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders empty state UI", () => {
    render(
      <WireframeEmptyState filterData={filterData} onCreate={onCreateMock} isSaving={false} showCreateBtn={true} />
    );
    expect(screen.getByTestId("container")).toBeInTheDocument();
    expect(screen.getByTestId("empty-wireframe-icon")).toBeInTheDocument();
    expect(screen.getByTestId("title")).toHaveTextContent("No Wireframes Yet");
    expect(screen.getByTestId("subtitle")).toHaveTextContent("Start by creating a new wireframe.");
    expect(screen.getByTestId("actions-row")).toBeInTheDocument();
    expect(screen.getByText("Create New Page")).toBeInTheDocument();
    expect(screen.getByTestId("create-new-page-icon")).toBeInTheDocument();
  });

  it("opens and closes the create modal", async () => {
    render(
      <WireframeEmptyState filterData={filterData} onCreate={onCreateMock} isSaving={false} showCreateBtn={true} />
    );
    // Open modal
    fireEvent.click(screen.getByText("Create New Page"));
    expect(await screen.findByTestId("create-modal")).toBeInTheDocument();
    // Close modal
    fireEvent.click(screen.getByText("Close"));
    await waitFor(() => {
      expect(screen.queryByTestId("create-modal")).not.toBeInTheDocument();
    });
  });

  it("calls onCreate and closes modal on create", async () => {
    render(
      <WireframeEmptyState filterData={filterData} onCreate={onCreateMock} isSaving={true} showCreateBtn={true} />
    );
    fireEvent.click(screen.getByText("Create New Page"));
    const createBtn = await screen.findByText("Create");
    fireEvent.click(createBtn);
    expect(onCreateMock).toHaveBeenCalledWith({ test: "payload" });
    await waitFor(() => {
      expect(screen.queryByTestId("create-modal")).not.toBeInTheDocument();
    });
  });

  it("passes filterData and isSaving to modal", async () => {
    render(
      <WireframeEmptyState filterData={filterData} onCreate={onCreateMock} isSaving={true} showCreateBtn={true} />
    );
    fireEvent.click(screen.getByText("Create New Page"));
    expect(await screen.findByTestId("modal-filter-data")).toHaveTextContent(
      JSON.stringify(filterData)
    );
    expect(screen.getByTestId("modal-is-saving")).toHaveTextContent("true");
  });
});
