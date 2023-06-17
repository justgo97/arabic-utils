import ArabicString from "../src/index";

test("returns true", () => {
  expect(ArabicString("كتاب").normalizeAlef() === "كتاب").toBe(true);
});

test("returns true", () => {
  expect(ArabicString("أإآ").normalizeAlef() === "ااا").toBe(true);
});

test("returns true", () => {
  expect(ArabicString("لآلئ").normalizeAlef() === "لالئ").toBe(true);
});

test("returns true", () => {
  expect(ArabicString("إستئصال").normalizeAlef() === "استئصال").toBe(true);
});
