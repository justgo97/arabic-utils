# arabic-utils

[![build](https://github.com/justgo97/arabic-utils/actions/workflows/release_package.yml/badge.svg)](https://github.com/justgo97/arabic-utils/actions) [![img](https://img.shields.io/npm/v/arabic-utils.svg)](https://www.npmjs.com/package/arabic-utils) [![img](https://img.shields.io/npm/dt/arabic-utils.svg)](https://www.npmjs.com/package/arabic-utils) [![img](https://img.shields.io/npm/l/arabic-utils.svg)](https://github.com/justgo97/arabic-utils/blob/main/LICENSE)

An NPM package designed for use in both browser and Node environments. It offers a range of convenient utilities specifically tailored for Arabic string manipulation, including functionalities like token search, removing diacritics and more.

# Installation

`npm install arabic-utils`

# Usage

```javascript
import { ArabicString } from "arabic-utils";
```

### getMatches(searchToken: string, matchOptions?: IMatchOptions)

Retrieves the matched parts from the given Arabic text based on the search token.

Example:

```javascript
const input = "خُلقتَ طَليقاً كَطَيفِ النَّسيمِ";
const token = "النسيم";
console.log(ArabicString(input).getMatches(token)).

/*
* Output:
* [
*   { text: "خُلقتَ طَليقاً كَطَيفِ ", isMatch: false },
*   { text: "النَّسيمِ", isMatch: true },
* ]
*/
```

### removeDiacritics()

Removes diacritics from the input string.

Example:

```javascript
const normalized = ArabicString("السَّلَامُ عَلَيْكُمُ").removeDiacritics();
console.log(normalized); // "السلام عليكم"
```

### removeTatweel()

Removes ARABIC TATWEEL characters (U+0640) from an Arabic text string.

Example:

```javascript
console.log(ArabicString("كتــــــــــــــــاب").removeTatweel()); // "كتاب"
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
console.log(ArabicString("الآن").normalizeAlef()); // "الان"
```

### remove(textToRemove: string)

Removes an occurrence of a specified text from an Arabic string.

Example:

```javascript
const newString = ArabicString("السَّلَامُ عَلَيْكُمُ").remove("السلام");
console.log(newString); // " عَلَيْكُمُ"
```

### Notes:

Do not nest calls to `ArabicString` in each other it will cause undesired behavior

Example:

```javascript
import { ArabicString } from "arabic-utils";

// ❌ This is invalid syntax
const newString = ArabicString("السلام عليكم").remove(
  ArabicString("السَّلَامُ").removeDiacritics()
);
console.log(newString); // ""
```

```javascript
import { ArabicString } from "arabic-utils";

// ✅ This is valid
const normalizedToken = ArabicString("السَّلَامُ").removeDiacritics();
const newString = ArabicString("السلام عليكم").remove(normalizedToken);
console.log(newString); // " عليكم"
```

```javascript
import { ArabicString, ArabicClass } from "arabic-utils";

// ✅ This is also valid
const newString = ArabicString("السلام عليكم").remove(
  ArabicClass.removeDiacritics("السَّلَامُ")
);
console.log(newString); // " عليكم"
```

⚠️ More examples and use cases are in the [test files](/test/)

# Demo

Demo website to show the main functionalities of the package: [arabic-utils.pages.dev](https://arabic-utils.pages.dev/)

Ps: don't mind the styling I will update it one day 😅

# TODO

- [x] Add semi diacritics tolerance so that a token diacritics can be taken into account when doing checks ( example "كَتَبَ" === "كَتب" will be true but "كَتَبَ" === "كُتب" will be false)

# Contributing

You can report any bugs or do pull requests for any kind of improvement.

# License

[MIT](LICENSE)
