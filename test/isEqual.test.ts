import { ArabicString } from "../src/index";

test("returns true", () => {
  expect(ArabicString("كتب").isEqual("كتب")).toBe(true);
});

test("returns true", () => {
  expect(ArabicString("كَتَبَ").isEqual("كتب")).toBe(true);
});

test("returns false", () => {
  expect(
    ArabicString("كَتَبَ").isEqual("كتب", { ignoreDiacritics: false })
  ).toBe(false);
});

test("returns true", () => {
  expect(
    ArabicString("كَتَبَ").isEqual("كَتب", { partialDiacritics: true })
  ).toBe(true);
});

test("returns false", () => {
  expect(
    ArabicString("كَتَبَ").isEqual("كُتب", { partialDiacritics: true })
  ).toBe(false);
});

test("returns true", () => {
  expect(
    ArabicString("رَكَّبَ").isEqual("ركّب", { partialDiacritics: true })
  ).toBe(true);
});

test("returns true", () => {
  expect(
    ArabicString("رَكَّبَ").isEqual("ركَّب", { partialDiacritics: true })
  ).toBe(true);
});

test("returns false", () => {
  expect(
    ArabicString("رَكَّبَ").isEqual("ركِّب", { partialDiacritics: true })
  ).toBe(false);
});

test("returns false", () => {
  expect(ArabicString("كتب").isEqual("ركب", { partialDiacritics: true })).toBe(
    false
  );
});
