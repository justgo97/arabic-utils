// Some code below is extracted from https://github.com/peshitta/arabic-code-util/blob/master/src/main.js

interface ISymbols {
  [key: string]: { value: string };
}

const commonArabicSymbols: ISymbols = {
  kasra: { value: " ِ" }, //  ِ Arabic kasra - Garshuni: i
  shadda: { value: " ّ" }, //  ّ Arabic shadda - Garshuni
  sukun: { value: " ْ" }, //  ْ Arabic sukun

  superscriptAlef: { value: " ٰ" }, //  ٰ Arabic letter superscript alef - Garshuni: long a

  fathatan: { value: " ً" }, //  ً Arabic fathatan - Garshuni: an
  kasratan: { value: " ٍ" }, //  ٍ Arabic kasratan - Garshuni: in
  dammatan: { value: " ٌ" }, //  ٌ Arabic dammatan - Garshuni: un
  fatha: { value: " َ" }, //  َ Arabic fatha - Garshuni: a
  damma: { value: " ُ" }, //  ُ Arabic damma - Garshuni: u
};

export const arabicSymbolsArray = Object.values(commonArabicSymbols).map(
  (symbol) => symbol.value.trim()
);
