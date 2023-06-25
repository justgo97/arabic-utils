export const validArabicLetters = [
  "ا",
  "أ",
  "إ",
  "آ",
  "ب",
  "ت",
  "ث",
  "ج",
  "ح",
  "خ",
  "د",
  "ذ",
  "ر",
  "ز",
  "س",
  "ش",
  "ص",
  "ض",
  "ط",
  "ظ",
  "ع",
  "غ",
  "ف",
  "ق",
  "ك",
  "ل",
  "م",
  "ن",
  "ه",
  "و",
  "ي",
  "ى",
  "ة",
  "ء",
  "ؤ",
  "ئ",
];

interface ISymbolObject {
  value: string;
}

type DiacriticSymbols =
  | "kasra"
  | "shadda"
  | "sukun"
  | "fathatan"
  | "kasratan"
  | "dammatan"
  | "fatha"
  | "damma";

type IDiacriticSymbols = {
  [key in DiacriticSymbols]: ISymbolObject;
};

const commonArabicDiacritics: IDiacriticSymbols = {
  fathatan: { value: "\u064B" }, //  ً fathatan
  dammatan: { value: "\u064C" }, //  ٌ dammatan
  kasratan: { value: "\u064D" }, //  ٍ kasratan
  fatha: { value: "\u064E" }, //  َ fatha
  damma: { value: "\u064F" }, //  ُ damma
  kasra: { value: "\u0650" }, //  ِ kasra
  shadda: { value: "\u0651" }, //  ّ shadda
  sukun: { value: "\u0652" }, //  ْ sukun
};

type ExtraArabicSymbols = "superscriptAlef" | "tatweel";

type IExtraArabicSymbols = {
  [key in ExtraArabicSymbols]: ISymbolObject;
};

const extraArabicSymbols: IExtraArabicSymbols = {
  superscriptAlef: { value: "\u0670" }, //  ٰ superscript alef
  tatweel: { value: "\u0640" }, // ـ tatweel
};

export const arabicDiacriticsArray = Object.values(commonArabicDiacritics).map(
  (symbol) => symbol.value
);

const extraSymbolsArray = Object.values(extraArabicSymbols).map(
  (symbol) => symbol.value
);

// Combination of diacritics + extra symbols ( just superscriptAlef and tatweel for now )
export const arabicSymbolsArray = Object.values(commonArabicDiacritics)
  .map((symbol) => symbol.value)
  .concat(extraSymbolsArray);
