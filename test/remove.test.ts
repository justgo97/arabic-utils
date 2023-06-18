import ArabicString from "../src/index";

test("returns true", () => {
  expect(ArabicString("كتب").remove("كتب") === "").toBe(true);
});

test("returns true", () => {
  const expression = ArabicString("السَّلَامُ عَلَيْكُمُ").remove("السلام");
  expect(expression === " عَلَيْكُمُ").toBe(true);
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

test("returns true", () => {
  const input = "بِسْمِ اللَّهِ الرَّحْمَـٰنِ الرَّحِيمِ";
  const token = "الرحمن";
  const expected = "بِسْمِ اللَّهِ  الرَّحِيمِ";
  expect(ArabicString(input).remove(token)).toBe(expected);
});
