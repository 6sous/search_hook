import { searchEngine } from "./searchEngine";

test("filter elements based on included keys", () => {
  const value = "apple";
  const array = [
    { name: "Apple", color: "red" },
    { name: "Banana", color: "yellow" },
  ];
  const includedKeys = ["name"];
  const excludedKeys = [];
  const sortOptions = [];
  const { sortedArray } = searchEngine(
    value,
    array,
    includedKeys,
    excludedKeys,
    sortOptions
  );

  expect(sortedArray).toEqual([{ name: "Apple", color: "red" }]);
});

test("filter elements based on excluded keys", () => {
  const value = "apple";
  const array = [
    { name: "Apple", color: "red" },
    { name: "Banana", color: "yellow" },
  ];
  const includedKeys = [];
  const excludedKeys = ["name"];
  const sortOptions = [];
  const { sortedArray } = searchEngine(
    value,
    array,
    includedKeys,
    excludedKeys,
    sortOptions
  );

  expect(sortedArray).toEqual([]);
});

test("sort the array based on sort options", () => {
  const value = "";
  const array = [
    { name: "Banana", color: "yellow" },
    { name: "Apple", color: "red" },
  ];
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

  expect(sortedArray).toEqual([
    { name: "Apple", color: "red" },
    { name: "Banana", color: "yellow" },
  ]);
});

test("search is case insensitive", () => {
  const value = "apple";
  const array = [
    { name: "Apple", color: "red" },
    { name: "Banana", color: "yellow" },
  ];
  const includedKeys = ["name"];
  const excludedKeys = [];
  const sortOptions = [];
  const { sortedArray } = searchEngine(
    value,
    array,
    includedKeys,
    excludedKeys,
    sortOptions
  );

  expect(sortedArray).toEqual([{ name: "Apple", color: "red" }]);
});

test("handle nested objects in the array", () => {
  const value = "apple";
  const array = [
    { name: "Banana", details: { type: "fruit", color: "yellow" } },
    { name: "Apple", details: { type: "fruit", color: "red" } },
  ];
  const includedKeys = ["name", "details"];
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
    { name: "Apple", details: { type: "fruit", color: "red" } },
  ]);
});

test("search in nested objects which have same keys by excluding one of them", () => {
  const value = "green";
  const array = [
    {
      name: "Banana",
      details: { type: "fruit", color: "green" },
      more: { type: "fruit", color: "yellow" },
    },
    {
      name: "Apple",
      details: { type: "fruit", color: "red" },
      more: { type: "fruit", color: "green" },
    },
  ];
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
      more: { type: "fruit", color: "green" },
    },
  ]);
});

test("search in nested objects which have same keys by including one of them", () => {
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
  const includedKeys = ["more", "color"];
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
      name: "Banana",
      details: { type: "fruit", color: "green" },
      more: { type: "fruit", color: "yellow" },
    },
  ]);
});
