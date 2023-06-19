import { arabicSymbolsArray, arabicDiacriticsArray } from "./arabicSymbols";

/**
 * Splits Arabic text into an array of individual letters joining them with their diacritics and extra symbols if any.
 * @param {string} arabicText - The input Arabic text.
 * @returns {string[]} An array of individual Arabic letters joined with their diacritics and extra symbols if any.
 */
export function splitArabicLetters(arabicText: string): string[] {
  const result: string[] = [];

  for (const char of arabicText) {
    if (arabicSymbolsArray.includes(char) && result.length) {
      result[result.length - 1] += char;
    } else {
      result.push(char);
    }
  }

  return result;
}

/**
 * Normalizes the occurrence of the Arabic letters "آ", "إ", and "أ" in the given Arabic text by replacing them with the letter "ا".
 * @param {string} arabicText - The input Arabic text to be normalized.
 * @returns {string} The normalized Arabic text with "آ", "إ", and "أ" replaced by "ا".
 */
export function normalizeAlef(arabicText: string): string {
  return arabicText.replace(/(آ|إ|أ)/g, "ا");
}

/**
 * Removes an occurrence of a specified text from an Arabic string.
 *
 * @param {string} arabicText - The input Arabic string.
 * @param {string} normalizedText - The input normamized to check the text to remove against.
 * @param {string} textToRemove - The text to be removed from the string.
 * @returns {string} The modified string with the specified text removed.
 */
export function removeText(
  arabicText: string,
  normalizedText: string,
  textToRemove: string
): string {
  // Find the starting index of the text to remove in the normalized text
  const startIdx = normalizedText.indexOf(textToRemove);

  // Check if the text to remove exists in the normalized text
  if (startIdx === -1) {
    // If not found, return the original string
    return arabicText;
  }

  // Split the original Arabic text into separate letters
  const textSeparated = splitArabicLetters(arabicText);

  // Remove the specified text from the array using splice
  textSeparated.splice(startIdx, textToRemove.length);

  // Join the modified array elements to get the resulting string
  const result = textSeparated.join("");

  // Return the modified string
  return result;
}

/**
 * Removes diacritics from the input string.
 * @param {string} arabicText - The input Arabic text to be modified.
 * @returns {string} The filtered string without the diacritics.
 */
export function removeDiacritics(arabicText: string): string {
  return arabicText
    .split("")
    .filter((char) => !arabicDiacriticsArray.includes(char))
    .join("");
}

/**
 * Removes ARABIC TATWEEL characters (U+0640) from an Arabic text string.
 *
 * @param {string} arabicText - The Arabic text string to remove ARABIC TATWEEL characters from.
 * @returns {string} The modified string with ARABIC TATWEEL characters removed.
 */
export function removeTatweel(arabicText: string): string {
  return arabicText.replace(/\u0640/g, "");
}

/**
 * Removes SuperscriptAlef characters (U+0670) from an Arabic text string.
 *
 * @param {string} arabicText - The Arabic text string to remove SuperscriptAlef characters from.
 * @returns {string} The modified string with SuperscriptAlef characters removed.
 */
export function removeSuperscriptAlef(arabicText: string): string {
  return arabicText.replace(/\u0670/g, "");
}

export interface INormalizeOptions {
  normalizeAlef?: boolean;
  removeDiacritics?: boolean;
  removeTatweel?: boolean;
  removeSuperscriptAlef?: boolean;
}

export const defaultOptions: INormalizeOptions = {
  normalizeAlef: false,
  removeDiacritics: true,
  removeTatweel: true,
  removeSuperscriptAlef: true,
};

/**
 * Normalize the Arabic text based on the specified options or the default options.
 * @param {string} arabicText - The input Arabic text to be modified.
 * @param options - Optional: The options to customize the normalization process.
 * @returns The normalized Arabic text.
 */
export function normalizeArabic(
  arabicText: string,
  options: INormalizeOptions = defaultOptions
): string {
  // Initialize a variable with the original text
  let normalizedText = arabicText;

  // Check if diacritics removal is enabled
  if (options.removeDiacritics) {
    // Call the removeDiacritics function and assign the result back to normalizedText
    normalizedText = removeDiacritics(normalizedText);
  }

  // Check if Alef normalization is enabled
  if (options.normalizeAlef) {
    // Call the normalizeAlef function and assign the result back to normalizedText
    normalizedText = normalizeAlef(normalizedText);
  }

  if (options.removeTatweel) {
    normalizedText = removeTatweel(normalizedText);
  }

  if (options.removeSuperscriptAlef) {
    normalizedText = removeSuperscriptAlef(normalizedText);
  }

  return normalizedText;
}
