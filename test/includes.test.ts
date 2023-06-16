import ArabicString from "../src/index";

test("returns true", () => {
  expect(ArabicString("كتب").includes("كتب")).toBe(true);
});

test("returns true", () => {
  expect(ArabicString("السَّلَامُ عَلَيْكُمُ").includes("السلام")).toBe(true);
});

test("returns true", () => {
  expect(ArabicString("السَّلَامُ عَلَيْكُمُ").includes("السلام عليكم")).toBe(
    true
  );
});

test("returns true", () => {
  expect(ArabicString("السَّلَامُ عَلَيْكُمُ").includes("كتب")).toBe(false);
});
