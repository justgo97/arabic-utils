# arabic-utils package repository

An NPM package written in typescript that provides some utilites for handling Arabic strings such as removing diacritics, diacriticless search and more

> This package assumes that the provided strings contains only Arabic input and might not work as intended with a different input.

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
console.log(normalized); // السلام عليكم
```

### remove(textToRemove: string)

Removes occurrences of a specified text from an Arabic string.

Example

```javascript
const newString = ArabicString("السَّلَامُ عَلَيْكُمُ").remove("السلام");
console.log(newString); //=> " عَلَيْكُمُ"
```
