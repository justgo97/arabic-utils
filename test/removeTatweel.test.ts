import { ArabicString } from "../src/index";

test("returns true", () => {
  expect(ArabicString("كتــــــــــــــــاب").removeTatweel() === "كتاب").toBe(
    true
  );
});
