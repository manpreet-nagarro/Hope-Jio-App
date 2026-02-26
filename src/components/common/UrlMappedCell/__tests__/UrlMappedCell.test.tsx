import { render, screen } from "@testing-library/react";
import { UrlMappedCell } from "../UrlMappedCell";

describe("UrlMappedCell", () => {
  it("renders empty placeholder when urls is empty", () => {
    render(<UrlMappedCell urls={[]} />);
    expect(screen.getByText("—")).toBeInTheDocument();
  });

  it("renders correct count label for single url", () => {
    render(<UrlMappedCell urls={["https://example.com"]} />);
    expect(screen.getByText("1 URL")).toBeInTheDocument();
  });

  it("renders correct count label for multiple urls", () => {
    render(<UrlMappedCell urls={["https://a.com", "https://b.com"]} />);
    expect(screen.getByText("2 URLs")).toBeInTheDocument();
  });

  it("renders url items in hover box", () => {
    const urls = [
      "https://a.com",
      { pageUri: "https://b.com", userCohorts: [] }
    ];
    render(<UrlMappedCell urls={urls} />);
    // The hover box is always rendered, so check for url text
    expect(screen.getByText("https://a.com")).toBeInTheDocument();
    expect(screen.getByText("https://b.com")).toBeInTheDocument();
    // Check that links have correct href
    expect(screen.getAllByRole("link", { hidden: true })[0]).toHaveAttribute("href", "https://a.com");
    expect(screen.getAllByRole("link", { hidden: true })[1]).toHaveAttribute("href", "https://b.com");
  });

  it("renders with custom className and placeholder", () => {
    render(<UrlMappedCell urls={[]} className="custom-class" emptyPlaceholder="No URLs" />);
    expect(screen.getByText("No URLs")).toHaveClass("custom-class");
  });
});
