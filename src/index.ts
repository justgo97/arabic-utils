import {
  normalizeAlef,
  removeDiacritics,
  removeTatweel,
  removeSuperscriptAlef,
  removeText,
  INormalizeOptions,
  normalizeArabic,
  defaultNormalizeOptions,
  getMatches,
  IMatchOptions,
  IMatch,
  normalizeSuperscriptAlef,
  ISuperscriptAlefNormalizeOptions,
  defaultSuperscriptAlefNormalizeOptions,
  IRemoveTatweelOptions,
  defaultRemoveTatweelOptions,
  IEqualityOptions,
  defaultEqualityOptions,
  isEqual,
  replaceText,
  stripNonLetters,
  defaultMatchOptions,
} from "./utilities";

/**
 * Utility class for working with Arabic strings.
 */
export class ArabicClass {
  text: string;
  options: INormalizeOptions = {
    ...defaultNormalizeOptions,
  };
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
    const currentOptions = this.tempOptions
      ? { ...this.tempOptions }
      : { ...options };

    // Reset temporary options param
    this.tempOptions = undefined;

    // Get the normalized string with the current options
    const normalizedText = normalizeArabic(this.text, currentOptions);

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
   * Removes an occurrence of a specified text from an Arabic string.
   * The text is normalized by extracting Arabic letters before removing the specified text but the returned text will be identical to the original.
   *
   * @param {string} textToRemove - The text to be removed from the string.
   * @returns {string} The original string with the specified text removed.
   */
  remove(textToRemove: string): string {
    // See if the there is a temporary option param set
    const currentOptions = this.tempOptions
      ? { ...this.tempOptions }
      : { ...this.options };
    this.tempOptions = undefined;
    return removeText(this.text, textToRemove, currentOptions);
  }

  /**
   * Normalizes the occurrence of the Arabic letters "آ", "إ", and "أ" in the given Arabic text by replacing them with the letter "ا".
   * @returns {string} The normalized Arabic text with "آ", "إ", and "أ" replaced by "ا".
   */
  normalizeAlef(): string {
    return normalizeAlef(this.text);
  }

  /**
   * Removes ARABIC TATWEEL characters (U+0640) from an Arabic text string.
   * @param IRemoveTatweelOptions - Specifies tatweel removal options.
   * @returns {string} The modified string with ARABIC TATWEEL characters removed.
   */
  removeTatweel(
    removeTatweelOptions: IRemoveTatweelOptions = defaultRemoveTatweelOptions
  ): string {
    return removeTatweel(this.text, removeTatweelOptions);
  }

  /**
   * Removes SuperscriptAlef characters (U+0670) from an Arabic text string.
   *
   * @returns {string} The modified string with SuperscriptAlef characters removed.
   */
  removeSuperscriptAlef(): string {
    return removeSuperscriptAlef(this.text);
  }

  /**
   * Normalizes the Superscript Alef characters.
   * @param superscriptAlefNormalizeOptions Specifies Superscript Alef normalize options.
   * @returns The normalized Arabic text with Superscript Alefs replaced or removed.
   */
  normalizeSuperscriptAlef(
    superscriptAlefNormalizeOptions: ISuperscriptAlefNormalizeOptions = defaultSuperscriptAlefNormalizeOptions
  ): string {
    return normalizeSuperscriptAlef(this.text, superscriptAlefNormalizeOptions);
  }

  /**
   * Retrieves the matched parts from the given Arabic text based on the search token.
   * @param searchToken - The token to search for.
   * @param normalizeOptions - The options for text normalization (default: defaultOptions).
   * @param matchOptions - The options for matching (default: defaultMatchOptions).
   * @returns An array of matched parts as IMatch objects. If no matches are found, returns false.
   *
   * @example
   * Input:
   * arabicText: "خُلقتَ طَليقاً كَطَيفِ النَّسيمِ"
   * searchToken: "النسيم"
   *
   * console.log(ArabicString(arabicText).getMatches(searchToken))
   *
   * Output:
   * [
   *   { text: "خُلقتَ طَليقاً كَطَيفِ ", isMatch: false },
   *   { text: "النَّسيمِ", isMatch: true },
   * ]
   */
  getMatches(searchToken: string, matchOptions: IMatchOptions = defaultMatchOptions) {
    // See if the there is a temporary option param set
    const currentOptions = this.tempOptions
      ? { ...this.tempOptions }
      : { ...this.options };
    this.tempOptions = undefined;
    return getMatches(this.text, searchToken, currentOptions, matchOptions);
  }

  /**
   * Checks if two strings are equal based on the specified equality options.
   * @param {string} token - The second string to compare.
   * @param {IEqualityOptions} equalityOptions - The equality options to apply during comparison.
   * @returns {boolean} `true` if the strings are equal based on the specified options, `false` otherwise.
   */
  isEqual(
    token: string,
    equalityOptions: IEqualityOptions = defaultEqualityOptions
  ): boolean {
    const currentOptions = this.tempOptions
      ? { ...this.tempOptions }
      : { ...this.options };
    this.tempOptions = undefined;
    return isEqual(this.text, token, equalityOptions, currentOptions);
  }

  /**
   * Removes any non valid Arabic letters from a string. this will remove diacritics, signs, numbers and foreign letters.
   * @returns {string} The new string with only valid Arabic letters.
   */
  stripNonLetters(): string {
    return stripNonLetters(this.text);
  }

  /**
   * Replaces text in a string, using a search string.
   * @param searchValue A string to search for.
   * @param replaceValue A string containing the text to replace.
   */
  replace(searchValue: string, replaceValue: string): string {
    const currentOptions = this.tempOptions
      ? { ...this.tempOptions }
      : { ...this.options };
    this.tempOptions = undefined;
    return replaceText(this.text, searchValue, replaceValue, currentOptions);
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

  /**
   * Removes diacritics from the input string.
   * @param {string} arabicText - The input Arabic text to be modified.
   * @returns {string} The filtered string without the diacritics.
   */
  static removeDiacritics(arabicText: string): string {
    return removeDiacritics(arabicText);
  }

  /**
   * Normalizes the occurrence of the Arabic letters "آ", "إ", and "أ" in the given Arabic text by replacing them with the letter "ا".
   * @param {string} arabicText - The input Arabic text to be normalized.
   * @returns {string} The normalized Arabic text with "آ", "إ", and "أ" replaced by "ا".
   */
  static normalizeAlef(arabicText: string): string {
    return normalizeAlef(arabicText);
  }

  /**
   * Removes ARABIC TATWEEL characters (U+0640) from an Arabic text string.
   *
   * @param {string} arabicText - The Arabic text string to remove ARABIC TATWEEL characters from.
   * @param IRemoveTatweelOptions - Specifies tatweel removal options.
   * @returns {string} The modified string with ARABIC TATWEEL characters removed.
   */
  static removeTatweel(
    arabicText: string,
    removeTatweelOptions: IRemoveTatweelOptions = defaultRemoveTatweelOptions
  ): string {
    return removeTatweel(arabicText, removeTatweelOptions);
  }

  /**
   * Removes SuperscriptAlef characters (U+0670) from an Arabic text string.
   *
   * @param {string} arabicText - The Arabic text string to remove SuperscriptAlef characters from.
   * @returns {string} The modified string with SuperscriptAlef characters removed.
   */
  static removeSuperscriptAlef(arabicText: string): string {
    return removeSuperscriptAlef(arabicText);
  }

  /**
   * Normalizes the Superscript Alef characters.
   * @param arabicText The input Arabic text to normalize.
   * @param superscriptAlefNormalizeOptions Specifies Superscript Alef normalize options.
   * @returns The normalized Arabic text with Superscript Alefs replaced or removed.
   */
  static normalizeSuperscriptAlef(
    arabicText: string,
    superscriptAlefNormalizeOptions: ISuperscriptAlefNormalizeOptions = defaultSuperscriptAlefNormalizeOptions
  ): string {
    return normalizeSuperscriptAlef(
      arabicText,
      superscriptAlefNormalizeOptions
    );
  }

  /**
   * Normalize the Arabic text based on the specified options or the default options.
   * @param {string} arabicText - The input Arabic text to be modified.
   * @param options - Optional: The options to customize the normalization process.
   * @returns The normalized Arabic text.
   */
  static normalize(
    arabicText: string,
    options: INormalizeOptions = defaultNormalizeOptions
  ): string {
    return normalizeArabic(arabicText, options);
  }

  /**
   * Removes any non valid Arabic letters from a string.
   * @param {string} text - The text to process.
   * @returns {string} The new string with only valid Arabic letters.
   */
  static stripNonLetters(text: string): string {
    return stripNonLetters(text);
  }

  /**
   * Replaces text in a string, using a search string.
   * @param text A string to conduct the search.
   * @param searchValue A string to search for.
   * @param replaceValue A string containing the text to replace.
   * @param {INormalizeOptions} normalizeOptions - The normalization options to apply to the strings.
   */
  static replace(
    text: string,
    searchValue: string,
    replaceValue: string,
    normalizeOptions: INormalizeOptions = defaultNormalizeOptions
  ): string {
    return replaceText(text, searchValue, replaceValue, normalizeOptions);
  }
}

/**
 * Utility to work with Arabic strings.
 * @param text - The Arabic text to work with.
 * @param options - Optional: The options to customize the normalization process.
 * @returns {ArabicClass} An instance of the ArabicClass utility.
 */
export const ArabicString = ArabicClass.createInstance();

export {
  IMatch,
  IMatchOptions,
  INormalizeOptions,
  ISuperscriptAlefNormalizeOptions,
  IRemoveTatweelOptions,
};
