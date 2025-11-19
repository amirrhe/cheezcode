// cheez.mjs
import { print, FontStyle } from "persian-figlet";

const text = "چیز کُد";

// `silent: true` makes it return a string instead of printing directly
const result = print(text, {
  font: FontStyle.STANDARD, // or SLIM, etc.
  silent: true,
});

// You can also add colors in your terminal later if you want
console.log(result);
