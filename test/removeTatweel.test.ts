import { ArabicString } from "../src/index";

test("returns true", () => {
  expect(ArabicString("كتــــــــــــــــاب").removeTatweel() === "كتاب").toBe(
    true
  );
});

test("returns true", () => {
  expect(ArabicString("هـٰذا").removeTatweel() === "هـٰذا").toBe(true);
});

test("returns true", () => {
  expect(
    ArabicString("هـٰذا").removeTatweel({ removeAuxiliairyOnly: false }) ===
      "هٰذا"
  ).toBe(true);
});
