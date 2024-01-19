import { ArabicString } from "../src/index";

test("returns true", () => {
  expect(ArabicString("هـٰذا").replace("هـٰذا", "هذا") === "هذا").toBe(true);
});

test("returns true", () => {
  expect(
    ArabicString("هذا الكتاب").replace("الكتاب", "المكتوب") === "هذا المكتوب"
  ).toBe(true);
});

test("returns true", () => {
  expect(ArabicString("كتب الكتاب").replace("كتب", "قرء")).toBe("قرء الكتاب");
});

test("returns true", () => {
  expect(
    ArabicString("واحد، اثنين، ثلاث.").replace("اثنين", "خمسة") ===
      "واحد، خمسة، ثلاث."
  ).toBe(true);
});

test("returns true", () => {
  expect(
    ArabicString("واحد، two، ثلاث.").replace("two", "اثنين") ===
      "واحد، اثنين، ثلاث."
  ).toBe(true);
});

test("return true", () => {
  const input =
    "هَـٰذَا النَص يحاكي أنماط كتابة مختلفة وفيه كلمات مٌشَكَّلَة وغير مشكّلة، وكلمات قصيرة وطويــــــــــلة";
  const searchValue = "النص";
  const replaceValue = "السطر";

  const expected =
    "هَـٰذَا السطر يحاكي أنماط كتابة مختلفة وفيه كلمات مٌشَكَّلَة وغير مشكّلة، وكلمات قصيرة وطويــــــــــلة";

  const expression = ArabicString(input).replace(searchValue, replaceValue);

  expect(expression).toBe(expected);
});

test("return true", () => {
  const input =
    "هَـٰذَا النص يحاكي أنماط كتابة مختلفة وفيه كلمات مٌشَكَّلَة وغير مشكّلة، وكلمات قصيرة وطويــــــــــلة";
  const searchValue = "هذا";
  const replaceValue = "هذا";

  const expected =
    "هذا النص يحاكي أنماط كتابة مختلفة وفيه كلمات مٌشَكَّلَة وغير مشكّلة، وكلمات قصيرة وطويــــــــــلة";

  const expression = ArabicString(input, {
    removeSuperscriptAlef: true,
    removeDiacritics: true,
    removeTatweel: true,
  }).replace(searchValue, replaceValue);

  expect(expression).toBe(expected);
});

test("return true", () => {
  const input =
    "هَـٰذَا النص يحاكي أنماط كتابة مختلفة وفيه كلمات مٌشَكَّلَة وغير مشكّلة، وكلمات قصيرة وطويــــــــــلة";
  const searchValue = "مشكلة";
  const replaceValue = "";

  const expected =
    "هَـٰذَا النص يحاكي أنماط كتابة مختلفة وفيه كلمات  وغير ، وكلمات قصيرة وطويــــــــــلة";

  const expression = ArabicString(input).replace(searchValue, replaceValue);

  expect(expression).toBe(expected);
});

test("returns true", () => {
  expect(ArabicString("كلمة").replace("كلمة", "")).toBe("");
});
