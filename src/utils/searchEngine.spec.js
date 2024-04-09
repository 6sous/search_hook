import {
  includeFn,
  insensitiveSearch,
  filterValuesByKeys,
  searchEngine,
} from "./searchEngine";

describe("includeFn", () => {
  it("includes everything if both arrays are empty", () => {
    const include = includeFn([], []);
    expect(include("firstname", "Bob")).toBe(true);
    expect(include("fhueizhf", "hhfz")).toBe(true);
  });

  it("excludes keys if the key is excluded", () => {
    const include = includeFn([], ["color"]);
    expect(include("color", "red")).toBe(false);
    expect(include("colora", "yellow")).toBe(true);
    expect(include("color", {})).toBe(false);
  });

  it("includes keys if the key is included or if the value is an object", () => {
    const include = includeFn(["color"], []);
    expect(include("color", "red")).toBe(true);
    expect(include("colora", "yellow")).toBe(false);
    expect(include("color", {})).toBe(true);
    expect(include("colora", {})).toBe(true);
  });
});

describe("insensitiveSearch", () => {
  it("searches if a string includes a value without case sensitivity", () => {
    expect(insensitiveSearch("Apple", "Appl")).toBe(true);
    expect(insensitiveSearch("Apple", "app")).toBe(true);
    expect(insensitiveSearch("apple", "ApPle")).toBe(true);
    expect(insensitiveSearch("app", "ApPle")).toBe(false);
    expect(insensitiveSearch(2, "2")).toBe(true);
  });
});

describe("filteredValuesByKeys", () => {
  const obj = {
    name: "Apple",
    details: { type: "fruit", color: "red", size: 2.5 },
    other: null,
  };
  it("should check if the value is not included", () => {
    expect(filterValuesByKeys(obj, "green", [], ["color"])).toBe(false);
    expect(filterValuesByKeys(obj, "fruit", [], ["color"])).toBe(true);
    expect(filterValuesByKeys(obj, "fruit", ["color"], [])).toBe(false);
    expect(filterValuesByKeys(obj, "2", ["size"], [])).toBe(true);
  });

  it("should return false if the value is not a string or a number", () => {
    expect(filterValuesByKeys(obj, "", ["other"], [])).toBe(false);
  });
});

describe("searchEngine", () => {
  const array = [
    {
      name: "Banana",
      details: { type: "fruit", color: "green" },
      other: { color: "yellow" },
    },
    {
      name: "Apple",
      details: { type: "fruit", color: "red" },
      other: { color: "green" },
    },
  ];

  it("filter elements based on included keys", () => {
    const value = "apple";
    const excludedKeys = [];
    const includedKeys = ["name"];
    const sortOptions = [];
    const { sortedArray } = searchEngine(
      value,
      array,
      includedKeys,
      excludedKeys,
      sortOptions
    );

    expect(sortedArray).toStrictEqual([
      {
        name: "Apple",
        details: { type: "fruit", color: "red" },
        other: { color: "green" },
      },
    ]);
  });

  it("filter elements based on excluded keys", () => {
    const value = "red";
    const includedKeys = [];
    const excludedKeys = ["color"];
    const sortOptions = [];
    const { sortedArray } = searchEngine(
      value,
      array,
      includedKeys,
      excludedKeys,
      sortOptions
    );

    expect(sortedArray).toStrictEqual([]);
  });

  it("sort the array based on sort options", () => {
    const value = "";
    const includedKeys = [];
    const excludedKeys = [];
    const sortOptions = ["name"];
    const { sortedArray } = searchEngine(
      value,
      array,
      includedKeys,
      excludedKeys,
      sortOptions
    );

    expect(sortedArray).toStrictEqual([
      {
        name: "Apple",
        details: { type: "fruit", color: "red" },
        other: { color: "green" },
      },
      {
        name: "Banana",
        details: { type: "fruit", color: "green" },
        other: { color: "yellow" },
      },
    ]);
  });

  it("handle nested objects in the array", () => {
    const value = "red";
    const includedKeys = ["color"];
    const excludedKeys = [];
    const sortOptions = [];
    const { sortedArray } = searchEngine(
      value,
      array,
      includedKeys,
      excludedKeys,
      sortOptions
    );

    expect(sortedArray).toEqual([
      {
        name: "Apple",
        details: { type: "fruit", color: "red" },
        other: { color: "green" },
      },
    ]);
  });

  it("search in nested objects which have same keys by excluding one of them", () => {
    const value = "green";
    const includedKeys = ["color"];
    const excludedKeys = ["details"];
    const sortOptions = [];
    const { sortedArray } = searchEngine(
      value,
      array,
      includedKeys,
      excludedKeys,
      sortOptions
    );

    expect(sortedArray).toEqual([
      {
        name: "Apple",
        details: { type: "fruit", color: "red" },
        other: { color: "green" },
      },
    ]);
  });

  it("check included keys", () => {
    const value = "yellow";
    const array = [
      {
        name: "Banana",
        details: { type: "fruit", color: "green" },
        more: { type: "fruit", color: "yellow" },
      },
      {
        name: "Apple",
        details: { type: "fruit", color: "yellow" },
        more: { type: "fruit", color: "green" },
      },
    ];
    const includedKeys = ["color"];
    const excludedKeys = [];
    const sortOptions = [];
    const { sortedArray } = searchEngine(
      value,
      array,
      includedKeys,
      excludedKeys,
      sortOptions
    );

    expect(sortedArray.length).toBe(2);
  });
});
