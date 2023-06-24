import { ArabicString } from "../src/index";

test("returns true", () => {
  expect(ArabicString("أإآ").normalizeAlef()).toBe("ااا");
});
