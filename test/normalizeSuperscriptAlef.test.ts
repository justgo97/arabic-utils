import { ArabicClass } from "../src/index";

const ArabicCustom = ArabicClass.createInstance("", {
  removeDiacritics: false,
  removeSuperscriptAlef: false,
  removeTatweel: false,
});

test("returns true", () => {
  expect(ArabicCustom("كتَٰب").normalizeSuperscriptAlef() === "كتَاب").toBe(
    true
  );
});

test("returns true", () => {
  expect(ArabicCustom("كتـٰب").normalizeSuperscriptAlef() === "كتاب").toBe(
    true
  );
});

test("returns true", () => {
  expect(ArabicCustom("مضىٰ").normalizeSuperscriptAlef() === "مضى").toBe(true);
});

test("returns true", () => {
  expect(
    ArabicCustom("هٰذا").normalizeSuperscriptAlef({
      removeAuxiliaryAlefs: false,
    }) === "هاذا"
  ).toBe(true);
});

test("returns true", () => {
  expect(
    ArabicCustom("هـٰذا").normalizeSuperscriptAlef({
      removeAuxiliaryAlefs: false,
    }) === "هاذا"
  ).toBe(true);
});

test("returns true", () => {
  expect(ArabicCustom("هٰذا").normalizeSuperscriptAlef() === "هذا").toBe(true);
});

test("returns true", () => {
  expect(ArabicCustom("هـٰذا").normalizeSuperscriptAlef()).toBe("هذا");
});
