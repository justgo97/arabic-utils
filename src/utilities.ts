import { validArabicLetters } from "./arabicLetters";
import { arabicSymbolsArray } from "./arabicSymbols";

/**
 * Checks if a string is empty (contains only whitespace characters).
 * @param {string} str - The string to check.
 * @returns {boolean} Returns `true` if the string is empty, `false` otherwise.
 */
function isStringEmpty(str: string): boolean {
  return str.trim().length === 0;
}

/**
 * Splits Arabic text into an array of individual letters while preserving diacritics and whitespaces.
 * @param {string} arabicText - The input Arabic text.
 * @returns {string[]} An array of individual Arabic letters and whitespaces if any.
 */
export function splitArabicLetters(arabicText: string): string[] {
  const result: string[] = [];

  for (const char of arabicText) {
    if (!isStringEmpty(char) && !validArabicLetters.includes(char)) {
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
 * Removes occurrences of a specified text from an Arabic string.
 * The text is normalized by extracting Arabic letters before removing the specified text.
 *
 * @param {string} arabicText - The input Arabic string.
 * @param {string} textToRemove - The text to be removed from the string.
 * @returns {string} The modified string with the specified text removed.
 */
export function removeText(arabicText: string, textToRemove: string): string {
  // Normalize the Arabic text by extracting Arabic letters
  const normalizedText = removeDiacritics(arabicText);

  // Check if the text to remove exists in the normalized text
  if (!normalizedText.includes(textToRemove)) {
    // If not found, return the original string
    return arabicText;
  }

  // Find the starting index of the text to remove in the normalized text
  const startIdx = normalizedText.indexOf(textToRemove);

  // Calculate the ending index of the text to remove
  const endIdx = startIdx + textToRemove.length;

  // Split the original Arabic text into separate letters
  const textSeparated = splitArabicLetters(arabicText);

  // Remove the specified text from the array using splice
  textSeparated.splice(startIdx, endIdx);

  // Join the modified array elements to get the resulting string
  const result = textSeparated.join("");

  // Return the modified string
  return result;
}

/**
 * Removes diacritics from the input string.
 * @param {string} arabicText - The input Arabic text to be normalized.
 * @returns {string} The filtered string containing only valid Arabic letters.
 */
export function removeDiacritics(arabicText: string): string {
  return arabicText
    .split("")
    .filter((char) => !arabicSymbolsArray.includes(char))
    .join("");
}
