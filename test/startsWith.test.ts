import ArabicString from "../src/index";

test("returns true", () => {
  expect(ArabicString("كتب").startsWith("كتب")).toBe(true);
});

test("returns true", () => {
  expect(ArabicString("كَتب").startsWith("كتب")).toBe(true);
});

test("returns true", () => {
  expect(ArabicString("كَتبو").startsWith("كتب")).toBe(true);
});

test("returns false", () => {
  expect(ArabicString("كاتب").startsWith("كتب")).toBe(false);
});

test("returns true", () => {
  expect(ArabicString("هذا كتاب").startsWith("كتاب", 4)).toBe(true);
});
