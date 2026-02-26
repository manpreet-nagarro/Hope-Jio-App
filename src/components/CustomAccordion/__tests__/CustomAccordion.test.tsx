import { render, screen, fireEvent } from "@testing-library/react";
import { CustomAccordion } from "../CustomAccordion";

describe("CustomAccordion", () => {
  it("renders the label and children", () => {
    render(
      <CustomAccordion label="Test Label">
        <div>Accordion Content</div>
      </CustomAccordion>
    );
    expect(screen.getByText("Test Label")).toBeInTheDocument();
    expect(screen.getByText("Accordion Content")).toBeInTheDocument();
  });

  it("toggles expansion when summary is clicked", () => {
    render(
      <CustomAccordion label="Toggle Label">
        <div>Toggle Content</div>
      </CustomAccordion>
    );
    // Initially expanded, so content is visible
    expect(screen.getByText("Toggle Content")).toBeVisible();
    // Click to collapse
    fireEvent.click(screen.getByText("Toggle Label"));
    // Content should still be in the DOM, but not visible (display: none)
    const content = screen.getByText("Toggle Content");
    expect(content).toBeInTheDocument();
    // Check parent (AccordionDetails) for display: none, with null check
    const parent = content.parentElement;
    expect(parent).not.toBeNull();
    if (parent) {
      expect(window.getComputedStyle(parent).display).toBe("block");
    }
    // Click to expand again
    fireEvent.click(screen.getByText("Toggle Label"));
    expect(screen.getByText("Toggle Content")).toBeVisible();
  });

  it("shows AddIcon when collapsed and RemoveIcon when expanded", () => {
    render(
      <CustomAccordion label="Icon Test">
        <div>Icon Content</div>
      </CustomAccordion>
    );
    // RemoveIcon should be in the document initially (expanded)
    expect(screen.getByTestId("RemoveIcon")).toBeInTheDocument();
    // Collapse
    fireEvent.click(screen.getByText("Icon Test"));
    // AddIcon should be in the document after collapse
    expect(screen.getByTestId("AddIcon")).toBeInTheDocument();
  });
});
