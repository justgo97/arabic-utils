import { ArabicString } from "../src/index";

test("returns true", () => {
  expect(ArabicString("كتاب").normalizeAlef() === "كتاب").toBe(true);
});

test("returns true", () => {
  expect(ArabicString("أإآ").normalizeAlef() === "ااا").toBe(true);
});

test("returns true", () => {
  expect(
    ArabicString("الآن إكتمل الأمل").normalizeAlef() === "الان اكتمل الامل"
  ).toBe(true);
});

test("returns true", () => {
  expect(ArabicString("إستئصال").normalizeAlef() === "استئصال").toBe(true);
});
