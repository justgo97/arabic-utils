import { ArabicString } from "../src/index";

test("returns true", () => {
  expect(ArabicString("كَتب").removeDiacritics() === "كتب").toBe(true);
});

test("returns true", () => {
  expect(ArabicString("كتب").removeDiacritics() === "كتب").toBe(true);
});

test("returns true", () => {
  expect(ArabicString("كَتّْبَََ").removeDiacritics() === "كتب").toBe(true);
});

test("returns false", () => {
  expect(ArabicString("كتب").removeDiacritics() === "").toBe(false);
});

test("returns true", () => {
  expect(
    ArabicString(
      "رَبَّنَا لَا تُؤَاخِذْنَا إِنْ نَسِينَا أَوْ أَخْطَأْنَا"
    ).removeDiacritics() === "ربنا لا تؤاخذنا إن نسينا أو أخطأنا"
  ).toBe(true);
});
