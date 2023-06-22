import { ArabicString } from "../src/index";

test("returns expected", () => {
  const input = "بِسْمِ اللَّهِ الرَّحْمَـٰنِ الرَّحِيمِ";
  const expected = "بسم الله الرحمن الرحيم";
  expect(
    ArabicString(input).normalize({
      removeDiacritics: true,
      removeSuperscriptAlef: true,
      removeTatweel: true,
    })
  ).toBe(expected);
});

test("returns expected", () => {
  const input = "بِسْمِ اللَّهِ الرَّحْمَـٰنِ الرَّحِيمِ";
  const expected = "بسم الله الرحمـٰن الرحيم";
  expect(
    ArabicString(input).normalize({
      removeDiacritics: true,
      removeSuperscriptAlef: false,
      removeTatweel: false,
    })
  ).toBe(expected);
});

test("returns expected", () => {
  const input = "بِسْمِ اللَّهِ الرَّحْمَـٰنِ الرَّحِيمِ";
  const expected = "بسم الله الرحمان الرحيم";
  expect(
    ArabicString(input).normalize({
      removeDiacritics: true,
      removeSuperscriptAlef: false,
      normalizeSuperscripAlef: true,
    })
  ).toBe(expected);
});
