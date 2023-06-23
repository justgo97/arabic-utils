import { arabicSymbolsArray, arabicDiacriticsArray } from "./arabicSymbols";

interface ISplitOptions {
  alefTatweelAsLetter: boolean;
}

const defaultSplitOptions: ISplitOptions = {
  alefTatweelAsLetter: true,
};

/**
 * Splits Arabic text into an array of individual letters joining them with their diacritics and extra symbols if any.
 * @param {string} arabicText - The input Arabic text.
 * @param splitOptions - the split options.
 * @returns {string[]} An array of individual Arabic letters joined with their diacritics and extra symbols if any.
 */
function splitArabicLetters(
  arabicText: string,
  splitOptions: ISplitOptions = defaultSplitOptions
): string[] {
  const result: string[] = [];

  for (let i = 0; i < arabicText.length; i++) {
    const currentChar = arabicText[i]!;

    const nextChar = i < arabicText.length ? arabicText[i + 1]! : "";

    if (arabicSymbolsArray.includes(currentChar) && result.length) {
      if (splitOptions.alefTatweelAsLetter && currentChar + nextChar === "ـٰ") {
        result.push(currentChar);
      } else {
        result[result.length - 1] += currentChar;
      }
    } else {
      result.push(currentChar);
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
 * @param {string} textToRemove - The text to be removed from the string.
 * @param normalizeOptions - Optional: The options to customize the normalization process
 * @returns {string} The modified string with the specified text removed.
 */
export function removeText(
  arabicText: string,
  textToRemove: string,
  normalizeOptions: INormalizeOptions = defaultNormalizeOptions
): string {
  const normalizedText = normalizeArabic(arabicText, normalizeOptions);

  // Find the starting index of the text to remove in the normalized text
  const startIdx = normalizedText.indexOf(textToRemove);

  // Check if the text to remove exists in the normalized text
  if (startIdx === -1) {
    // If not found, return the original string
    return arabicText;
  }

  // Split the original Arabic text into separate letters
  const textSeparated = splitArabicLetters(arabicText, {
    alefTatweelAsLetter: !normalizeOptions.removeSuperscriptAlef,
  });

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

export interface IRemoveTatweelOptions {
  removeAuxiliairyOnly: boolean;
}

export const defaultRemoveTatweelOptions: IRemoveTatweelOptions = {
  removeAuxiliairyOnly: true,
};

/**
 * Removes ARABIC TATWEEL characters (U+0640) from an Arabic text string.
 *
 * @param {string} arabicText - The Arabic text string to remove ARABIC TATWEEL characters from.
 * @param IRemoveTatweelOptions - Specifies tatweel removal options.
 * @returns {string} The modified string with ARABIC TATWEEL characters removed.
 */
export function removeTatweel(
  arabicText: string,
  removeTatweelOptions: IRemoveTatweelOptions = defaultRemoveTatweelOptions
): string {
  if (removeTatweelOptions.removeAuxiliairyOnly) {
    return arabicText.replace(/\u0640(?!\u0670)/g, "");
  } else {
    return arabicText.replace(/\u0640/g, "");
  }
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

export interface ISuperscriptAlefNormalizeOptions {
  removeAuxiliaryAlefs: boolean;
}

export const defaultSuperscriptAlefNormalizeOptions: ISuperscriptAlefNormalizeOptions =
  {
    removeAuxiliaryAlefs: true,
  };

/**
 * Normalizes the Superscript Alef characters.
 * @param arabicText The input Arabic text to normalize.
 * @param superscriptAlefNormalizeOptions Specifies Superscript Alef normalize options.
 * @returns The normalized Arabic text with Superscript Alefs replaced or removed.
 */
export function normalizeSuperscriptAlef(
  arabicText: string,
  superscriptAlefNormalizeOptions: ISuperscriptAlefNormalizeOptions = defaultSuperscriptAlefNormalizeOptions
): string {
  /**
   * it's common to omit Superscript Alefs before ["ه", "ل", "ذ", "ى"] since we never write "هاذا" and only "هذا" is the standard usage
   */
  if (superscriptAlefNormalizeOptions.removeAuxiliaryAlefs) {
    arabicText = arabicText.replace(/(?<=(ه|ذ|ل|ى))(ـٰ|\u0670)/g, "");
  }

  return arabicText.replace(/\u0670|ـٰ/g, "ا");
}

export interface INormalizeOptions {
  normalizeAlef?: boolean;
  normalizeSuperscripAlef?: boolean;
  removeDiacritics?: boolean;
  removeTatweel?: boolean;
  removeSuperscriptAlef?: boolean;
}

export const defaultNormalizeOptions: INormalizeOptions = {
  normalizeAlef: false,
  normalizeSuperscripAlef: false,
  removeDiacritics: true,
  removeTatweel: false,
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
  options: INormalizeOptions = defaultNormalizeOptions
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

  if (options.removeSuperscriptAlef) {
    normalizedText = removeSuperscriptAlef(normalizedText);
  } else if (options.normalizeSuperscripAlef) {
    normalizedText = normalizeSuperscriptAlef(normalizedText);
  }

  // Note: This should be at last, the order of these functions matter!
  if (options.removeTatweel) {
    normalizedText = removeTatweel(normalizedText);
  }

  return normalizedText;
}

/**
 * Escapes special characters in a string to be used as a literal in a regular expression pattern.
 * @param {string} string - The input string to escape.
 * @returns {string} The escaped string with special characters replaced by their escaped versions.
 */
function escapeRegex(string: string): string {
  return string.replace(/[/\-\\^$*+?.()|[\]{}]/g, "\\$&");
}

/**
 * Creates a regular expression that matches the provided term bounded by whitespace characters or start/end.
 * @param term - The term to match.
 * @returns A regular expression that matches the term bounded by whitespace characters or start/end.
 */
function identicalRegex(term: string): RegExp {
  const startBoundary = term.charAt(0) === " " ? "" : "(?<=^|\\s)";
  const endBoundary = term.charAt(term.length - 1) === " " ? "" : "(?=\\s|$)";
  const regexPattern = `(${startBoundary}${escapeRegex(term)}${endBoundary})`;

  return new RegExp(regexPattern);
}

export interface IMatch {
  text: string;
  isMatch: boolean;
}

export interface IMatchOptions {
  matchIdentical?: boolean;
}

const defaultMatchOptions: IMatchOptions = {
  matchIdentical: false,
};

/**
 * Retrieves the matched parts from the given Arabic text based on the search token.
 * @param arabicText - The Arabic text to search in.
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
export function getMatches(
  arabicText: string,
  searchToken: string,
  normalizeOptions: INormalizeOptions = defaultNormalizeOptions,
  matchOptions: IMatchOptions = defaultMatchOptions
) {
  // Ignore empty strings from both sides
  if (!arabicText.trim() || !searchToken.trim()) return false;

  const normalizedText = normalizeArabic(arabicText, normalizeOptions);

  // Check whether we can find any matches
  const isTokenFound = matchOptions?.matchIdentical
    ? identicalRegex(searchToken).test(normalizedText)
    : normalizedText.includes(searchToken);

  if (!isTokenFound) {
    return false;
  }

  // Check whether or not we have done any normalizations to the text
  const hasStringChanged = Object.keys(normalizeOptions).some(
    (option) => normalizeOptions[option as keyof INormalizeOptions] === true
  );

  // A skeleton text without diacritics will be useful for matching later on
  const skeletonText =
    normalizeOptions.removeDiacritics || !hasStringChanged
      ? normalizedText
      : normalizeArabic(normalizedText, {
          ...normalizeOptions,
          removeDiacritics: true,
        });

  // using RegExp with () here because we want to include the searchToken as a separate part in the resulting array.
  const regex = matchOptions?.matchIdentical
    ? identicalRegex(searchToken)
    : new RegExp(`(${escapeRegex(searchToken)})`);

  const parts = normalizedText.split(regex).filter((part) => part !== "");

  const splittedLetters = splitArabicLetters(arabicText);

  const getOriginalPart = (part: string, traversedLength: [number]) => {
    const skeletonPart = normalizeOptions.removeDiacritics
      ? part
      : normalizeArabic(part, {
          ...normalizeOptions,
          removeDiacritics: true,
        });

    const indexOfPart = skeletonText.indexOf(skeletonPart, traversedLength[0]);

    traversedLength[0] += skeletonPart.length;

    return splittedLetters
      .slice(indexOfPart, indexOfPart + skeletonPart.length)
      .join("");
  };

  const traversedLength: [number] = [0];

  const matchParts: IMatch[] = parts.map((part) => {
    const partText = hasStringChanged
      ? getOriginalPart(part, traversedLength)
      : part;

    const currentPart: IMatch = {
      text: partText,
      isMatch: part === searchToken,
    };

    return currentPart;
  });

  return matchParts;
}
