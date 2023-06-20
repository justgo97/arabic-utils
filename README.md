# arabic-utils

[![img](https://img.shields.io/npm/v/arabic-utils.svg)](https://www.npmjs.com/package/arabic-utils) [![img](https://img.shields.io/npm/dt/arabic-utils.svg)](https://www.npmjs.com/package/arabic-utils) [![img](https://img.shields.io/npm/l/arabic-utils.svg)](https://github.com/woofers/arabic-utils/blob/main/LICENSE)

An NPM package written in typescript that provides some utilites for handling Arabic strings such as removing diacritics, tatweel and more.

# Instalation

`npm install arabic-utils`

# Usage

```javascript
import ArabicString from "arabic-utils";
```

### removeDiacritics()

Removes diacritics from the input string.

Example:

```javascript
const normalized = ArabicString("السَّلَامُ عَلَيْكُمُ").removeDiacritics();
console.log(normalized); // "السلام عليكم"
```

### remove(textToRemove: string)

Removes an occurrence of a specified text from an Arabic string.

Example:

```javascript
const newString = ArabicString("السَّلَامُ عَلَيْكُمُ").remove("السلام");
console.log(newString); // " عَلَيْكُمُ"
```

### includes(searchString: string, position?: number)

Checks if the Arabic text includes a specified search string.

Example:

```javascript
console.log(ArabicString("السَّلَامُ عَلَيْكُمُ").includes("السلام")); // true
```

### startsWith(searchString: string, position?: number)

Checks if the Arabic text starts with a specified search string.

Example:

```javascript
console.log(ArabicString("السَّلَامُ عَلَيْكُمُ").startsWith("السلام")); // true
```

### normalizeAlef()

Normalizes the occurrence of the letters "آ", "إ", and "أ" in the given Arabic text by replacing them with the letter "ا".

Example:

```javascript
console.log(ArabicString("الآن إكتمل الأمل").normalizeAlef()); // "الان اكتمل الامل"
```

### removeTatweel()

Removes ARABIC TATWEEL characters (U+0640) from an Arabic text string.

Example:

```javascript
console.log(ArabicString("كتــــــــــــــــاب").removeTatweel()); // "كتاب"
```

# TODO

- [ ] Consider adding CJS module format support
- [ ] Add a method to get match results in array format ( useful for the purpose of highlighting and such )
- [ ] Add option to remove extra symbols that could exist in various texts in the normalize method
- [ ] Add replace method
- [ ] Add semi diacritics tolerance so that a token diacritics can be taken into account when doing checks ( example "كَتَبَ" === "كَتب" will be true )
