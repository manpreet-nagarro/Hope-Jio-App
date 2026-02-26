import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import uiSliceReducer from "@store/UISlice/UISlice";
import { PageInfoTabs } from "../PageInfoTabs";

jest.mock("../SlotConfiguration/SlotConfiguration", () => ({
  SlotConfiguration: () => (
    <div data-testid="slot-configuration">Slot Configuration</div>
  ),
}));

jest.mock("../ComponentsConfiguration/ComponentsConfiguration", () => ({
  ComponentsConfiguration: () => (
    <div data-testid="components-configuration">Components Configuration</div>
  ),
}));

describe("PageInfoTabs", () => {
  const user = userEvent.setup();

  const createTestStore = (initialTab: 0 | 1 = 0) => {
    return configureStore({
      reducer: {
        ui: uiSliceReducer,
      },
      preloadedState: {
        ui: {
          isGlobalSidebarCollapsed: false,
          isComponentLibraryCollapsed: true,
          editorMode: "wireframe" as const,
          isConfigurationOpen: false,
          configurationActiveTab: initialTab,
        },
      },
    });
  };

  const renderWithRedux = (initialTab: 0 | 1 = 0) => {
    const store = createTestStore(initialTab);
    return {
      ...render(
        <Provider store={store}>
          <PageInfoTabs />
        </Provider>
      ),
      store,
    };
  };

  afterEach(() => {
    jest.clearAllMocks();
  });

  test("renders both tabs with correct labels", () => {
    renderWithRedux();

    expect(screen.getByRole("tab", { name: /slot/i })).toBeInTheDocument();
    expect(
      screen.getByRole("tab", { name: /components/i })
    ).toBeInTheDocument();
  });

  test("renders SlotConfiguration when tab 0 is active", () => {
    renderWithRedux(0);

    expect(screen.getByTestId("slot-configuration")).toBeInTheDocument();
    expect(screen.queryByTestId("components-configuration")).not.toBeInTheDocument();
  });

  test("renders ComponentsConfiguration when tab 1 is active", () => {
    renderWithRedux(1);

    expect(screen.getByTestId("components-configuration")).toBeInTheDocument();
    expect(screen.queryByTestId("slot-configuration")).not.toBeInTheDocument();
  });

  test("switches to slot tab when clicked", async () => {
    const { store } = renderWithRedux(1);

    const slotTab = screen.getByRole("tab", { name: /slot/i });
    await user.click(slotTab);

    expect(store.getState().ui.configurationActiveTab).toBe(0);
    expect(screen.getByTestId("slot-configuration")).toBeInTheDocument();
  });

  test("switches to components tab when clicked", async () => {
    const { store } = renderWithRedux(0);

    const componentsTab = screen.getByRole("tab", { name: /components/i });
    await user.click(componentsTab);

    expect(store.getState().ui.configurationActiveTab).toBe(1);
    expect(screen.getByTestId("components-configuration")).toBeInTheDocument();
  });

  test("dispatches setConfigurationActiveTab action on tab change", async () => {
    const { store } = renderWithRedux(0);

    const componentsTab = screen.getByRole("tab", { name: /components/i });
    await user.click(componentsTab);

    // Verify the store state was updated
    expect(store.getState().ui.configurationActiveTab).toBe(1);
  });

  test("maintains selected tab state after multiple clicks", async () => {
    renderWithRedux(0);

    const slotTab = screen.getByRole("tab", { name: /slot/i });
    const componentsTab = screen.getByRole("tab", { name: /components/i });

    // Click to components
    await user.click(componentsTab);
    expect(screen.getByTestId("components-configuration")).toBeInTheDocument();

    // Click back to slot
    await user.click(slotTab);
    expect(screen.getByTestId("slot-configuration")).toBeInTheDocument();

    // Click to components again
    await user.click(componentsTab);
    expect(screen.getByTestId("components-configuration")).toBeInTheDocument();
  });

  test("only one tab component should be visible at a time", async () => {
    const { rerender } = renderWithRedux(0);

    expect(screen.getByTestId("slot-configuration")).toBeInTheDocument();
    expect(screen.queryByTestId("components-configuration")).not.toBeInTheDocument();

    const store = createTestStore(1);
    rerender(
      <Provider store={store}>
        <PageInfoTabs />
      </Provider>
    );

    expect(screen.queryByTestId("slot-configuration")).not.toBeInTheDocument();
    expect(screen.getByTestId("components-configuration")).toBeInTheDocument();
  });

  test("handles rapid tab switching", async () => {
    const { store } = renderWithRedux(0);

    const slotTab = screen.getByRole("tab", { name: /slot/i });
    const componentsTab = screen.getByRole("tab", { name: /components/i });

    // Rapid clicking
    await user.click(componentsTab);
    await user.click(slotTab);
    await user.click(componentsTab);

    expect(store.getState().ui.configurationActiveTab).toBe(1);
    expect(screen.getByTestId("components-configuration")).toBeInTheDocument();
  });

  test("both tabs should be in the tab list", () => {
    renderWithRedux();

    const tabs = screen.getAllByRole("tab");
    expect(tabs).toHaveLength(2);
    expect(tabs[0]).toHaveTextContent("Slot");
    expect(tabs[1]).toHaveTextContent("Components");
  });
});
