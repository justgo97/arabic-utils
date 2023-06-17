# arabic-utils package repository

An NPM package written in typescript that provides some utilites for handling Arabic strings such as removing diacritics, diacriticless search and more

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

Removes occurrences of a specified text from an Arabic string.

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
