import { normalizeAlef, removeDiacritics, removeText } from "./utilities";

interface INormalizeOptions {
  normalizeAlef?: boolean;
  removeDiacritics?: boolean;
}

/**
 * Utility class for working with Arabic strings.
 */
export class ArabicClass {
  text: string;
  options: INormalizeOptions = { normalizeAlef: false, removeDiacritics: true };
  tempOptions: INormalizeOptions | undefined;

  /**
   * Create an instance of the ArabicClass utility.
   * @param text - The Arabic text to work with.
   * @param options - Optional: The options to customize the normalization process.
   * @returns {ArabicClass} An instance of the ArabicClass utility.
   */
  constructor(text: string, options?: INormalizeOptions) {
    this.text = text;
    if (options) {
      this.options = { ...options };
    }
  }

  /**
   * Set the options to customize the normalization process for the current instance.
   * @param options - The options to customize the normalization process.
   * @returns {void}
   */
  setNormalizeOptions(options: INormalizeOptions): void {
    this.options = { ...options };
  }

  /**
   * Normalize the Arabic text based on the specified options or the default options.
   * @param options - Optional: The options to customize the normalization process.
   * @returns The normalized Arabic text.
   */
  normalize(options: INormalizeOptions = this.options): string {
    // See if the there is a temporary option param set
    const currentOptions = this.tempOptions ? this.tempOptions : options;

    // Initialize a variable with the original text
    let normalizedText = this.text;

    // Check if diacritics removal is enabled
    if (currentOptions.removeDiacritics) {
      // Call the removeDiacritics function and assign the result back to normalizedText
      normalizedText = removeDiacritics(normalizedText);
    }

    // Check if Alef normalization is enabled
    if (currentOptions.normalizeAlef) {
      // Call the normalizeAlef function and assign the result back to normalizedText
      normalizedText = normalizeAlef(normalizedText);
    }

    // Reset temporary options param
    this.tempOptions = undefined;

    // Return the normalized text
    return normalizedText;
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
    const normalizedText = this.normalize();
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
    const normalizedText = this.normalize();
    return normalizedText.startsWith(searchString, position);
  }

  /**
   * Removes diacritics from the input string.
   * @returns {string} The filtered string containing only valid Arabic letters.
   */
  removeDiacritics(): string {
    return removeDiacritics(this.text);
  }

  /**
   * Removes occurrences of a specified text from an Arabic string.
   * The text is normalized by extracting Arabic letters before removing the specified text.
   *
   * @param {string} textToRemove - The text to be removed from the string.
   * @returns {string} The modified string with the specified text removed.
   */
  remove(textToRemove: string): string {
    const normalizedText = this.normalize();
    return removeText(this.text, normalizedText, textToRemove);
  }

  /**
   * Normalizes the occurrence of the Arabic letters "آ", "إ", and "أ" in the given Arabic text by replacing them with the letter "ا".
   * @returns {string} The normalized Arabic text with "آ", "إ", and "أ" replaced by "ا".
   */
  normalizeAlef(): string {
    return normalizeAlef(this.text);
  }

  /**
   * Factory function for returning an instance of the ArabicClass utility.
   * @param {string} text - The Arabic text to work with.
   * @param options - Optional: The options to customize the normalization process.
   * @returns {ArabicClass} An instance of the ArabicClass utility.
   */
  getInstance(text: string, options?: INormalizeOptions): ArabicClass {
    this.text = text;

    if (options) {
      this.tempOptions = { ...options };
    }
    return this;
  }

  /**
   * Factory function for creating an instance of the ArabicClass utility.
   * @param {string} text - The Arabic text to work with.
   * @param options - Optional: The options to customize the normalization process.
   * @returns {ArabicClass} An instance of the ArabicClass utility.
   */
  static createInstance(
    text: string = "",
    options?: INormalizeOptions
  ): (text: string, options?: INormalizeOptions | undefined) => ArabicClass {
    const newClass = new ArabicClass(text, options);
    return newClass.getInstance.bind(newClass);
  }
}

/**
 * Utility to work with Arabic strings.
 * @param text - The Arabic text to work with.
 * @param options - Optional: The options to customize the normalization process.
 * @returns {ArabicClass} An instance of the ArabicClass utility.
 */
const ArabicString = ArabicClass.createInstance();
export default ArabicString;
