// cheez.mjs
import { print, FontStyle } from "persian-figlet";
import fs from "fs";

const text = "چیز گاریتا";

// ---------- helpers ----------

function trimEmptyEdges(asciiLines) {
  let start = 0;
  let end = asciiLines.length;

  while (start < end && asciiLines[start].trim() === "") start++;
  while (end > start && asciiLines[end - 1].trim() === "") end--;

  return asciiLines.slice(start, end);
}

function centerLine(str, artWidth) {
  const len = str.length;
  const padding = Math.max(0, Math.floor((artWidth - len) / 2));
  return " ".repeat(padding) + str;
}

// smarter cheese (cleaner and readable)
function addCheeseBubbles(asciiLines, artWidth) {
  const CHEESE_CHARS = ["🧀", "•", "o"];
  let strokeIndex = 0;

  return asciiLines.map((line) => {
    if (!line.includes("█")) return line.padEnd(artWidth, " ");

    const chars = line.padEnd(artWidth, " ").split("");
    let i = 0;

    while (i < chars.length) {
      if (chars[i] === "█") {
        let j = i;
        while (j < chars.length && chars[j] === "█") j++;

        const length = j - i;
        if (length >= 3) {
          const mid = i + Math.floor(length / 2);
          const variant = CHEESE_CHARS[strokeIndex % CHEESE_CHARS.length];
          chars[mid] = variant;
          strokeIndex++;
        }
        i = j;
      } else {
        i++;
      }
    }
    return chars.join("");
  });
}

// diagonal paw trail
function addDiagonalPaws(asciiLines, artWidth) {
  const result = asciiLines.map((l) => l.padEnd(artWidth, " "));
  const lastIndex = result.length - 1;

  return result.map((line, i) => {
    if (!line.includes("█") && !line.includes("🧀")) return line;

    const col = Math.floor((i / Math.max(1, lastIndex)) * (artWidth - 1));
    const chars = line.split("");

    if (chars[col] === " ") chars[col] = "🐾";

    return chars.join("");
  });
}

// ---------- main logic ----------

// Generate FIGlet ASCII
let raw = print(text, { font: FontStyle.STANDARD, silent: true });

// Trim edges
let lines = trimEmptyEdges(raw.split("\n"));
let width = Math.max(...lines.map((l) => l.length));

// Add effects
lines = addCheeseBubbles(lines, width);
lines = addDiagonalPaws(lines, width);

width = Math.max(...lines.map((l) => l.length));

// Cheese drips
const cheeseLine = centerLine("🧀🧀", width);

// Cat
const catOnTop = [
  centerLine("/\\_/\\", width),
  centerLine("( o.o )   🍕 Chiz Garita", width), // ENGLISH for terminal
  centerLine("> ^ <", width),
];

// Scratch
const scratchWidth = Math.floor(width * 0.85);
const scratches = centerLine("/".repeat(scratchWidth), width);

// Captions
const captionEn = centerLine(
  "Chiz Garita — Official Pizza of Team CheezCode 😺🧀",
  width
);

const captionFa = centerLine(
  "چیز گاریتا — پیتزای رسمی تیم چیزکُد 😺🧀",
  width
);

// Final art for terminal
const terminalOutput = [
  ...catOnTop,
  "",
  cheeseLine,
  ...lines,
  scratches,
  captionEn,
].join("\n");

// Final art for file (Persian)
const fileOutput = [
  ...catOnTop,
  "",
  cheeseLine,
  ...lines,
  scratches,
  captionFa,
].join("\n");

// Print to terminal (English)
console.log(terminalOutput);

// Save full Persian version for slides
fs.writeFileSync("cheez-ascii.txt", fileOutput, "utf8");
console.log("\n✓ Persian version written to cheez-ascii.txt");
