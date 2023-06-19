// Some code below is extracted from https://github.com/peshitta/arabic-code-util/blob/master/src/main.js

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
  kasra: { value: " ِ" }, //  ِ Arabic kasra - Garshuni: i
  shadda: { value: " ّ" }, //  ّ Arabic shadda - Garshuni
  sukun: { value: " ْ" }, //  ْ Arabic sukun

  fathatan: { value: " ً" }, //  ً Arabic fathatan - Garshuni: an
  kasratan: { value: " ٍ" }, //  ٍ Arabic kasratan - Garshuni: in
  dammatan: { value: " ٌ" }, //  ٌ Arabic dammatan - Garshuni: un
  fatha: { value: " َ" }, //  َ Arabic fatha - Garshuni: a
  damma: { value: " ُ" }, //  ُ Arabic damma - Garshuni: u
};

type ExtraArabicSymbols = "superscriptAlef" | "tatweel";

type IExtraArabicSymbols = {
  [key in ExtraArabicSymbols]: ISymbolObject;
};

const extraArabicSymbols: IExtraArabicSymbols = {
  superscriptAlef: { value: "\u0670" },
  tatweel: { value: "\u0640" },
};

export const arabicDiacriticsArray = Object.values(commonArabicDiacritics).map(
  (symbol) => symbol.value.trim()
);

const extraSymbolsArray = Object.values(extraArabicSymbols).map(
  (symbol) => symbol.value
);

// Combination of diacritics + extra symbols ( just superscriptAlef and tatweel for now )
export const arabicSymbolsArray = Object.values(commonArabicDiacritics)
  .map((symbol) => symbol.value.trim())
  .concat(extraSymbolsArray);
