import { render, screen } from "@testing-library/react";
import { DeviceBadge } from "../DeviceBadge";

describe("DeviceBadge Component", () => {
  it("renders the label text", () => {
    render(<DeviceBadge label="Mobile" />);

    expect(screen.getByText("Mobile")).toBeInTheDocument();
  });

  it("renders without crashing when label is empty", () => {
    const { container } = render(<DeviceBadge label="" />);

    const badge = container.querySelector(".MuiBox-root");
    expect(badge).toBeInTheDocument();
    expect(badge).toHaveTextContent("");
  });

  it("renders as a div (MUI Box default)", () => {
    render(<DeviceBadge label="Tablet" />);

    const element = screen.getByText("Tablet");
    expect(element.tagName.toLowerCase()).toBe("div");
  });
});
