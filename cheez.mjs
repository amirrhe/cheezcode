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

// diagonal paw trail across the block (only on spaces, never on letters)
function addDiagonalPaws(asciiLines, width) {
  const lastIndex = asciiLines.length - 1;

  return asciiLines.map((line, i) => {
    const chars = line.split("");

    // choose a column based on row index → diagonal effect
    const col = Math.floor((i / Math.max(1, lastIndex)) * (width - 1));

    // place paw only if it's background (space), so we don't break any strokes
    if (chars[col] === " ") {
      chars[col] = "🐾";
    }

    return chars.join("");
  });
}

// ---------- main logic ----------

// Generate FIGlet ASCII from Persian text
let raw = print(text, { font: FontStyle.STANDARD, silent: true });

// Trim empty top/bottom
let lines = trimEmptyEdges(raw.split("\n"));

// Normalize width
let width = Math.max(...lines.map((l) => l.length));
lines = lines.map((l) => l.padEnd(width, " "));

// Add diagonal paws walking across the block (but only on spaces)
lines = addDiagonalPaws(lines, width);

// Cheese drips line above the word
const cheeseLine = centerLine("🧀🧀", width);

// Cat (branding)
const catOnTop = [
  centerLine("/\\_/\\", width),
  centerLine("( o.o )   🍕 Chiz Garita", width),
  centerLine("> ^ <", width),
];

// Scratch line under the word
const scratchWidth = Math.floor(width * 0.85);
const scratches = centerLine("/".repeat(scratchWidth), width);

// Persian caption
const captionFa = centerLine(
  "چیز گاریتا — پیتزای رسمی تیم چیزکُد 😺🧀",
  width
);

// Final art for file
const fileOutput = [
  ...catOnTop,
  "",
  cheeseLine,
  ...lines,      // FIGlet + diagonal paws
  scratches,
  captionFa,
].join("\n");

// Write only to file (no console ASCII)
fs.writeFileSync("cheez-ascii.txt", fileOutput, "utf8");
