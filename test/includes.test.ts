import { ArabicString } from "../src/index";

test("returns true", () => {
  expect(ArabicString("كتب").includes("كتب")).toBe(true);
});

test("returns true", () => {
  expect(ArabicString("السَّلَامُ عَلَيْكُمُ").includes("السلام")).toBe(true);
});

test("returns true", () => {
  expect(ArabicString("السَّلَامُ عَلَيْكُمُ").includes("السلام عليكم")).toBe(
    true
  );
});

test("returns false", () => {
  expect(ArabicString("السَّلَامُ عَلَيْكُمُ").includes("كتب")).toBe(false);
});

test("returns false", () => {
  expect(ArabicString("أكمل").includes("اكمل")).toBe(false);
});

test("returns true", () => {
  expect(ArabicString("أكمل", { normalizeAlef: true }).includes("اكمل")).toBe(
    true
  );
});

test("returns false", () => {
  expect(ArabicString("أكمل").includes("اكمل")).toBe(false);
});
