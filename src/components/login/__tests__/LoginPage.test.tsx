
import { render, screen } from "@testing-library/react";
import LoginPage from "../LoginPage";
import { store } from "@store/store";
import { Provider } from "react-redux";
jest.mock('@auth/keycloak', () => ({ default: {} }));
describe("LoginPage", () => {
  it("renders the login page UI", () => {
    render(
      <Provider store={store}>
        <LoginPage />
      </Provider>
    );
    expect(
      screen.getByText((content, node) => {
        const hasWelcome = content.includes("Welcome to");
        const hasSales = (node?.textContent || "").includes("Sales Planning System");
        return Boolean(hasWelcome && hasSales);
      })
    ).toBeInTheDocument();
    expect(screen.getByText(/helps to manage/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /login with sso/i })).toBeInTheDocument();
  });
});
