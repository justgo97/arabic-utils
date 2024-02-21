import { ArabicString } from "../src/index";

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
  expect(
    ArabicString(input, {
      removeDiacritics: true,
      removeSuperscriptAlef: true,
      removeTatweel: true,
    }).remove(token)
  ).toBe(expected);
});

test("returns true", () => {
  expect(ArabicString("... بدأ ...").remove("بدأ")).toBe("...  ...");
});

test("returns true", () => {
  expect(ArabicString("كتب كتاب.").remove("كتاب")).toBe("كتب .");
});

test("return true", () => {
  const input =
    "هَـٰذَا النص يحاكي أنماط كتابة مختلفة وفيه كلمات مٌشَكَّلَة وغير مشكّلة، وكلمات قصيرة وطويــــــــــلة";
  const token = "هذا";

  const expected =
    " النص يحاكي أنماط كتابة مختلفة وفيه كلمات مٌشَكَّلَة وغير مشكّلة، وكلمات قصيرة وطويــــــــــلة";

  const expression = ArabicString(input, {
    removeDiacritics: true,
    normalizeSuperscripAlef: true,
  }).remove(token);

  expect(expression).toBe(expected);
});

test("return true", () => {
  const input =
    "هَـٰذَا النص يحاكي أنماط كتابة مختلفة وفيه كلمات مٌشَكَّلَة وغير مشكّلة، وكلمات قصيرة وطويــــــــــلة";
  const token = "هذا";

  const expected =
    " النص يحاكي أنماط كتابة مختلفة وفيه كلمات مٌشَكَّلَة وغير مشكّلة، وكلمات قصيرة وطويــــــــــلة";

  const expression = ArabicString(input, {
    removeDiacritics: true,
    removeSuperscriptAlef: true,
    removeTatweel: true,
  }).remove(token);

  expect(expression).toBe(expected);
});


test("returns true", () => {
  expect(ArabicString("هَـٰذَا").remove("هذا")).toBe("");
});