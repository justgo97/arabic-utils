import { ArabicString, ArabicClass } from "../src/index";

test("returns true", () => {
  ArabicString("").setNormalizeOptions({});
  expect(ArabicString("").options.normalizeAlef === undefined).toBe(true);
});

test("returns true", () => {
  const ArabicCustom = ArabicClass.createInstance();
  ArabicCustom("").setNormalizeOptions({});
  expect(ArabicCustom("").options.normalizeAlef === undefined).toBe(true);
});

test("returns true", () => {
  const ArabicCustom = ArabicClass.createInstance();
  ArabicCustom("").setNormalizeOptions({ removeDiacritics: false });
  expect(ArabicCustom("").options.removeDiacritics === false).toBe(true);
});

test("returns false", () => {
  const ArabicCustom = ArabicClass.createInstance();
  ArabicCustom("", { removeDiacritics: false }).removeDiacritics();
  expect(ArabicCustom("").options.removeDiacritics === false).toBe(false);
});

test("returns true", () => {
  expect(ArabicClass.removeDiacritics("كَتّبَ") === "كتب").toBe(true);
});

test("returns true", () => {
  expect(
    ArabicClass.normalize("كِتَـٰبْ", {
      removeSuperscriptAlef: false,
      removeDiacritics: true,
      normalizeSuperscripAlef: true,
    }) === "كتاب"
  ).toBe(true);
});

test("returns true", () => {
  expect(ArabicClass.removeSuperscriptAlef("هـٰذا") === "هـذا").toBe(true);
});

test("returns true", () => {
  expect(ArabicClass.removeTatweel("كتــــــــــــــــاب") === "كتاب").toBe(
    true
  );
});

test("returns true", () => {
  expect(ArabicClass.normalizeSuperscriptAlef("كتـٰب") === "كتاب").toBe(true);
});

test("returns true", () => {
  expect(ArabicClass.normalizeAlef("أكتب") === "اكتب").toBe(true);
});
