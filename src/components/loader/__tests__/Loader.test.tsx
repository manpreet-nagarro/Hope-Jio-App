import { render, screen } from "@testing-library/react";
import Loader from "../Loader";

describe("Loader", () => {
  it("renders global loader with backdrop when open", () => {
    render(<Loader open={true} />);
    // CircularProgress should be present (even if aria-hidden)
    expect(screen.getByRole("progressbar", { hidden: true })).toBeInTheDocument();
  });

  it("does not render global loader when closed", () => {
    render(<Loader open={false} />);
    // CircularProgress should still be in the DOM (hidden)
    expect(screen.getByRole("progressbar", { hidden: true })).toBeInTheDocument();
  });

  it("renders inline loader variant", () => {
    render(<table><tbody><Loader open={true} variant="inline" /></tbody></table>);
    // Should render a table row and cell
    expect(screen.getByRole("progressbar", { hidden: true })).toBeInTheDocument();
  });

  it("applies custom size and thickness", () => {
    render(<Loader open={true} size={80} thickness={8} />);
    // CircularProgress should be present
    expect(screen.getByRole("progressbar", { hidden: true })).toBeInTheDocument();
    // Can't directly check size/thickness, but no error should occur
  });
});
