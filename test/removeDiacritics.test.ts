import ArabicString from "../src/index";

test("returns true", () => {
  expect(ArabicString("كَتب").removeDiacritics() === "كتب").toBe(true);
});

test("returns true", () => {
  expect(ArabicString("كتب").removeDiacritics() === "كتب").toBe(true);
});

test("returns true", () => {
  expect(ArabicString("كَتّْبَََ").removeDiacritics() === "كتب").toBe(true);
});

test("returns false", () => {
  expect(ArabicString("كتب").removeDiacritics() === "").toBe(false);
});

test("returns true", () => {
  expect(
    ArabicString("أَحْضِرْ الكِتَابَ").removeDiacritics() === "أحضر الكتاب"
  ).toBe(true);
});
