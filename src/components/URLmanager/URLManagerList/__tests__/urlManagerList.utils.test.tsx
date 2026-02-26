import { getModfiedCohorts } from "../urlManagerList.utils";

describe("getModfiedCohorts", () => {
  test("returns mapped cohorts when valid cohorts exist", () => {
    const row = {
      userCohorts: [
        { id: "1", name: "VIP" },
        { id: "2", name: "Premium" },
      ],
    } as any;

    const result = getModfiedCohorts(row);

    expect(result).toEqual([
      { id: "1", name: "VIP" },
      { id: "2", name: "Premium" },
    ]);
  });

  test("returns empty array when cohorts is empty", () => {
    const row = {
      userCohorts: [],
    } as any;

    const result = getModfiedCohorts(row);

    expect(result).toEqual([]);
  });

  test("returns empty array when cohorts is undefined", () => {
    const row = {} as any;

    const result = getModfiedCohorts(row);

    expect(result).toEqual([]);
  });

  test("returns empty array when cohorts is null", () => {
    const row = {
      userCohorts: null,
    } as any;

    const result = getModfiedCohorts(row);

    expect(result).toEqual([]);
  });

  test("returns empty array when cohorts is not an array", () => {
    const row = {
      userCohorts: "VIP",
    } as any;

    const result = getModfiedCohorts(row);

    expect(result).toEqual([]);
  });

  test("handles objects missing id or name safely", () => {
    const row = {
      userCohorts: [{ id: "1" }, { name: "VIP" }],
    } as any;

    const result = getModfiedCohorts(row);

    expect(result).toEqual([
      { id: "1", name: undefined },
      { id: undefined, name: "VIP" },
    ]);
  });
});
