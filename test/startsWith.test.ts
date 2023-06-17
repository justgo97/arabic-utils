import ArabicString, { ArabicClass } from "../src/index";

test("returns true", () => {
  expect(ArabicString("كتب").startsWith("كتب")).toBe(true);
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

test("returns false", () => {
  expect(
    ArabicString("كَتب", { removeDiacritics: false }).startsWith("كتب")
  ).toBe(false);
});

test("returns true", () => {
  expect(ArabicString("كَتب").startsWith("كتب")).toBe(true);
});

test("returns false", () => {
  const ArCustom = ArabicClass.createInstance("", { removeDiacritics: false });
  expect(ArCustom("كَتب").startsWith("كتب")).toBe(false);
});

test("returns true", () => {
  expect(ArabicString("كَتب").startsWith("كتب")).toBe(true);
});
