import ArabicString from "../src/index";
import { IMatch } from "../src/utilities";

function isEqual(firstArr: IMatch[], secondArr: IMatch[] | false): boolean {
  if (!secondArr) return false;

  for (let i = 0; i < firstArr.length; i++) {
    const firstItem = firstArr[i];
    const secondItem = secondArr[i];

    if (!firstItem || !secondItem) return false;

    const { text: firstText, isMatch: firstIsMatch } = firstItem;
    const { text: secondText, isMatch: secondIsMatch } = secondItem;

    if (
      firstText === undefined ||
      secondText === undefined ||
      firstIsMatch === undefined ||
      secondIsMatch === undefined
    ) {
      return false;
    }

    if (firstText !== secondText || firstIsMatch !== secondIsMatch) {
      return false;
    }
  }

  return true;
}

test("returns true", () => {
  const input = "كتب كتاب";
  const token = "كتب";
  const expected: IMatch[] = [
    { text: "كتب", isMatch: true },
    { text: " كتاب", isMatch: false },
  ];
  const expression = ArabicString(input).getMatches(token);

  expect(isEqual(expected, expression)).toBe(true);
});

test("returns true", () => {
  const input = ".كتب.كتاب.";
  const token = "كتب";
  const expected: IMatch[] = [
    { text: ".", isMatch: false },
    { text: "كتب", isMatch: true },
    { text: ".كتاب.", isMatch: false },
  ];
  const expression = ArabicString(input).getMatches(token);

  expect(isEqual(expected, expression)).toBe(true);
});

test("returns true", () => {
  const input = "كتب كتاب مكتوب كت";
  const token = "كت";
  const expected = [
    { text: "كت", isMatch: true },
    { text: "ب ", isMatch: false },
    { text: "كت", isMatch: true },
    { text: "اب م", isMatch: false },
    { text: "كت", isMatch: true },
    { text: "وب ", isMatch: false },
    { text: "كت", isMatch: true },
  ];
  const expression = ArabicString(input).getMatches(token);

  expect(isEqual(expected, expression)).toBe(true);
});

test("returns true", () => {
  const input = "كتب كتاب مكتوب كت";
  const token = "كت";
  const expected = [
    { text: "كتب كتاب مكتوب ", isMatch: false },
    { text: "كت", isMatch: true },
  ];
  const expression = ArabicString(input).getMatches(token, {
    matchIdentical: true,
  });

  expect(isEqual(expected, expression)).toBe(true);
});

test("returns false", () => {
  const input = "كتب كتاب مكتوب كت";
  const token = "مكت";
  const expected = false;
  const expression = ArabicString(input).getMatches(token, {
    matchIdentical: true,
  });

  expect(expression).toBe(expected);
});

test("returns false", () => {
  const input = "";
  const token = "";
  const expected = false;
  const expression = ArabicString(input).getMatches(token);

  expect(expression).toBe(expected);
});

test("returns false", () => {
  const input = "بِسْمِ اللَّهِ الرَّحْمَـٰنِ الرَّحِيمِ";
  const token = "بِسْمِ";
  const expected = false;
  const expression = ArabicString(input).getMatches(token);

  expect(expression).toBe(expected);
});

test("returns true", () => {
  const input = "بِسْمِ اللَّهِ الرَّحْمَـٰنِ الرَّحِيمِ";
  const token = "بِسْمِ";
  const expected = [
    { text: "بِسْمِ", isMatch: true },
    { text: " اللَّهِ الرَّحْمَـٰنِ الرَّحِيمِ", isMatch: false },
  ];
  const expression = ArabicString(input, {
    removeDiacritics: false,
    removeTatweel: false,
    removeSuperscriptAlef: false,
  }).getMatches(token);

  expect(isEqual(expected, expression)).toBe(true);
});

test("returns true", () => {
  const input = "بِسْمِ اللَّهِ الرَّحْمَـٰنِ الرَّحِيمِ";
  const token = "بسم";
  const expected = [
    { text: "بِسْمِ", isMatch: true },
    { text: " اللَّهِ الرَّحْمَـٰنِ الرَّحِيمِ", isMatch: false },
  ];
  const expression = ArabicString(input).getMatches(token);

  expect(isEqual(expected, expression)).toBe(true);
});

test("returns true", () => {
  const input = "بِسْمِ اللَّهِ الرَّحْمَـٰنِ الرَّحِيمِ";
  const token = "بسم ";
  const expected = [
    { text: "بِسْمِ ", isMatch: true },
    { text: "اللَّهِ الرَّحْمَـٰنِ الرَّحِيمِ", isMatch: false },
  ];
  const expression = ArabicString(input).getMatches(token);

  expect(isEqual(expected, expression)).toBe(true);
});

test("returns true", () => {
  const input = "بِسْمِ اللَّهِ الرَّحْمَـٰنِ الرَّحِيمِ";
  const token = "الله ";
  const expected = [
    { text: "بِسْمِ ", isMatch: false },
    { text: "اللَّهِ ", isMatch: true },
    { text: "الرَّحْمَـٰنِ الرَّحِيمِ", isMatch: false },
  ];
  const expression = ArabicString(input).getMatches(token);

  expect(isEqual(expected, expression)).toBe(true);
});

test("returns true", () => {
  const input = "بِسْمِ اللَّهِ الرَّحْمَـٰنِ الرَّحِيمِ";
  const token = " الله ";
  const expected = [
    { text: "بِسْمِ", isMatch: false },
    { text: " اللَّهِ ", isMatch: true },
    { text: "الرَّحْمَـٰنِ الرَّحِيمِ", isMatch: false },
  ];
  const expression = ArabicString(input).getMatches(token);

  expect(isEqual(expected, expression)).toBe(true);
});

test("returns true", () => {
  const input = "بِسْمِ اللَّهِ الرَّحْمَـٰنِ الرَّحِيمِ";
  const token = " الرحيم";
  const expected = [
    { text: "بِسْمِ اللَّهِ الرَّحْمَـٰنِ", isMatch: false },
    { text: " الرَّحِيمِ", isMatch: true },
  ];
  const expression = ArabicString(input).getMatches(token);

  expect(isEqual(expected, expression)).toBe(true);
});

test("returns true", () => {
  const input =
    "وَمَنْ كَانَ فِي هَـٰذِهِ أَعْمَىٰ فَهُوَ فِي الْآخِرَةِ أَعْمَىٰ وَأَضَلُّ سَبِيلًا";
  const token = "أعمى";
  const expected = [
    { text: "وَمَنْ كَانَ فِي هَـٰذِهِ ", isMatch: false },
    { text: "أَعْمَىٰ", isMatch: true },
    { text: " فَهُوَ فِي الْآخِرَةِ ", isMatch: false },
    { text: "أَعْمَىٰ", isMatch: true },
    { text: " وَأَضَلُّ سَبِيلًا", isMatch: false },
  ];
  const expression = ArabicString(input).getMatches(token);

  expect(expression).toStrictEqual(expected);
});

test("returns false", () => {
  const input =
    "وَمَنْ كَانَ فِي هَـٰذِهِ أَعْمَىٰ فَهُوَ فِي الْآخِرَةِ أَعْمَىٰ وَأَضَلُّ سَبِيلًا";
  const token = "أَعْمَىٰ";
  const expected = false;
  const expression = ArabicString(input).getMatches(token);

  expect(expression).toBe(expected);
});

test("returns true", () => {
  const input =
    "وَمَنْ كَانَ فِي هَـٰذِهِ أَعْمَىٰ فَهُوَ فِي الْآخِرَةِ أَعْمَىٰ وَأَضَلُّ سَبِيلًا";
  const token = "أَعْمَىٰ";
  const expected = [
    { text: "وَمَنْ كَانَ فِي هَـٰذِهِ ", isMatch: false },
    { text: "أَعْمَىٰ", isMatch: true },
    { text: " فَهُوَ فِي الْآخِرَةِ ", isMatch: false },
    { text: "أَعْمَىٰ", isMatch: true },
    { text: " وَأَضَلُّ سَبِيلًا", isMatch: false },
  ];
  const expression = ArabicString(input, {
    removeSuperscriptAlef: false,
    removeDiacritics: false,
  }).getMatches(token);

  expect(expression).toStrictEqual(expected);
});

test("returns true", () => {
  const input = "خُلقتَ طَليقاً كَطَيفِ النَّسيمِ";
  const token = "النسيم";
  const expected = [
    { text: "خُلقتَ طَليقاً كَطَيفِ ", isMatch: false },
    { text: "النَّسيمِ", isMatch: true },
  ];
  const expression = ArabicString(input).getMatches(token);

  expect(expression).toStrictEqual(expected);
});