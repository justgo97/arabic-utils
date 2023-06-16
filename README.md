# arabic-utils package repository

An NPM package written in typescript that provides some utilites for handling Arabic strings such as removing diacritics, diacriticless search and more

> This package assumes that the provided strings contains only Arabic and might not work as intended with a different input.

# Usage

`import ArabicString from "arabic-utils";`

# Example

```
ArabicString("السَّلَامُ عَلَيْكُمُ").remove("السلام")
//=> " عَلَيْكُمُ"
```
