import { formatLastUpdated } from "../formatDate";

describe("formatLastUpdated", () => {
  it("should return '-' when dateStr is undefined", () => {
    const result = formatLastUpdated(undefined);
    expect(result).toBe("-");
  });

  it("should return '-' when dateStr is not provided", () => {
    const result = formatLastUpdated();
    expect(result).toBe("-");
  });

  it("should return '-' when dateStr is an empty string", () => {
    const result = formatLastUpdated("");
    expect(result).toBe("-");
  });

  it("should format a valid ISO date string correctly", () => {
    const result = formatLastUpdated("2026-02-25");
    expect(result).toBe("Feb 25, 2026");
  });

  it("should format a valid ISO datetime string correctly", () => {
    const result = formatLastUpdated("2026-02-25T10:30:00Z");
    expect(result).toBe("Feb 25, 2026");
  });

  it("should format dates in January correctly", () => {
    const result = formatLastUpdated("2026-01-15");
    expect(result).toBe("Jan 15, 2026");
  });

  it("should format dates in December correctly", () => {
    const result = formatLastUpdated("2025-12-31");
    expect(result).toBe("Dec 31, 2025");
  });

  it("should handle single digit dates with leading zero", () => {
    const result = formatLastUpdated("2026-03-05");
    expect(result).toBe("Mar 05, 2026");
  });

  it("should handle dates with different year values", () => {
    const result = formatLastUpdated("2020-06-15");
    expect(result).toBe("Jun 15, 2020");
  });

  it("should handle dates with timezone information", () => {
    const result = formatLastUpdated("2026-02-25T14:30:00+05:30");
    expect(result).toBe("Feb 25, 2026");
  });

  it("should format dates with different month-day combinations", () => {
    const result = formatLastUpdated("1999-09-09");
    expect(result).toBe("Sep 09, 1999");
  });
});
