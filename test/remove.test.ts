import ArabicString from "../src/index";

test("returns true", () => {
  expect(ArabicString("كتب").remove("كتب") === "").toBe(true);
});

test("returns true", () => {
  expect(
    ArabicString("السَّلَامُ عَلَيْكُمُ").remove("السلام") === " عَلَيْكُمُ"
  ).toBe(true);
});

test("returns true", () => {
  expect(
    ArabicString("السَّلَامُ عَلَيْكُمُ").remove("السلام عليكم") === ""
  ).toBe(true);
});

test("returns true", () => {
  expect(
    ArabicString("السَّلَامُ عَلَيْكُمُ").remove("كتب") ===
      "السَّلَامُ عَلَيْكُمُ"
  ).toBe(true);
});
