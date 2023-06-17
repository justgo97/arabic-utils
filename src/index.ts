import { extractArabicLetters, removeText } from "./utilities";

/**
 * Utility class for working with Arabic strings.
 */
class ArabicClass {
  text: string;

  constructor(text: string) {
    this.text = text;
  }

  /**
   * Checks if the Arabic text includes a specified search string.
   * The text is normalized by extracting Arabic letters without diacritics before performing the search.
   *
   * @param {string} searchString - The search string to look for.
   * @param {number} [position] - Optional. The position in the text to start the search from.
   * @returns {boolean} True if the search string is found, false otherwise.
   */
  includes(searchString: string, position?: number): boolean {
    const normalizedText = extractArabicLetters(this.text);
    return normalizedText.includes(searchString, position);
  }

  /**
   * Checks if a given search string exists at the specified position within the text.
   * The text is normalized by extracting Arabic letters without diacritics before performing the check.
   * @param {string} searchString - The search string to look for.
   * @param {number} [position] - Optional. The position in the text to start the search from.
   * @returns {boolean} True if the search string exists at the specified position, false otherwise.
   */
  startsWith(searchString: string, position?: number): boolean {
    const normalizedText = extractArabicLetters(this.text);
    return normalizedText.startsWith(searchString, position);
  }

  /**
   * Removes diacritics from the input string.
   * @returns {string} The filtered string containing only valid Arabic letters.
   */
  removeDiacritics(): string {
    return extractArabicLetters(this.text);
  }

  /**
   * Removes occurrences of a specified text from an Arabic string.
   * The text is normalized by extracting Arabic letters before removing the specified text.
   *
   * @param {string} textToRemove - The text to be removed from the string.
   * @returns {string} The modified string with the specified text removed.
   */
  remove(textToRemove: string): string {
    return removeText(this.text, textToRemove);
  }

  static instance: ArabicClass | null = null;

  /**
   * Factory function for creating an instance of the ArabicClass utility.
   * @param {string} text - The Arabic text to work with.
   * @returns {ArabicClass} An instance of the ArabicClass utility.
   */
  static getInstance(text: string): ArabicClass {
    if (!ArabicClass.instance) {
      ArabicClass.instance = new ArabicClass(text);
    } else {
      ArabicClass.instance.text = text;
    }
    return ArabicClass.instance;
  }
}

const ArabicString = ArabicClass.getInstance;

export default ArabicString;
