import { splitArabicLetters } from "../src/utilities";

test("returns true", () => {
  const input = "هذا";
  const output = ["ه", "ذ", "ا"];

  const expression = splitArabicLetters(input);

  expect(expression).toStrictEqual(output);
});

test("returns true", () => {
  const input = "هـٰذا";
  const output = ["هـٰ", "ذ", "ا"];

  const expression = splitArabicLetters(input);

  expect(expression).toStrictEqual(output);
});

test("returns true", () => {
  const input = "كتـٰب";
  const output = ["ك", "ت", "ـٰ", "ب"];

  const expression = splitArabicLetters(input);

  expect(expression).toStrictEqual(output);
});

test("returns true", () => {
  const input = "كتـٰب";
  const output = ["ك", "تـٰ", "ب"];

  const expression = splitArabicLetters(input, { alefTatweelAsLetter: false });

  expect(expression).toStrictEqual(output);
});

test("returns true", () => {
  const input = "هَـٰذِهِ";
  const output = ["هَـٰ", "ذِ", "هِ"];

  const expression = splitArabicLetters(input);

  expect(expression).toStrictEqual(output);
});
