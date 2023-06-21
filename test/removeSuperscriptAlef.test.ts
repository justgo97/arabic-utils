import { ArabicString } from "../src/index";

test("returns expected", () => {
  const input = "الرحمـٰن";
  const expected = "الرحمـن";
  expect(ArabicString(input).removeSuperscriptAlef()).toBe(expected);
});
