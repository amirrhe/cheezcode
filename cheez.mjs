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
  const padding = Math.max(0, Math.floor((artWidth - str.length) / 2));
  return " ".repeat(padding) + str;
}

// diagonal paw trail (only on spaces)
function addDiagonalPaws(asciiLines, width) {
  const lastIndex = asciiLines.length - 1;

  return asciiLines.map((line, i) => {
    const chars = line.split("");
    const col = Math.floor((i / Math.max(1, lastIndex)) * (width - 1));

    if (chars[col] === " ") chars[col] = "🐾";
    return chars.join("");
  });
}

// ---------- main ----------

// Generate FIGlet ASCII
let raw = print(text, { font: FontStyle.STANDARD, silent: true });

// Trim empty rows
let lines = trimEmptyEdges(raw.split("\n"));

// Determine width and pad
let width = Math.max(...lines.map((l) => l.length));
lines = lines.map((l) => l.padEnd(width, " "));

// Add paws
lines = addDiagonalPaws(lines, width);

// Cheese drips
const cheeseLine = centerLine("🧀🧀", width);

// --- FIXED CAT ALIGNMENT ---
// center the cat head
const catHead = centerLine("/\\_/\\", width);

// center ONLY the face
const catFaceCentered = centerLine("( o.o )", width);

// append text WITHOUT breaking centering
const catFace = catFaceCentered + "  🍕 Chiz Garita";

// center the chin
const catChin = centerLine("> ^ <", width);

// Scratch line
const scratchWidth = Math.floor(width * 0.85);
const scratches = centerLine("/".repeat(scratchWidth), width);

// Persian caption
const captionFa = centerLine(
  "چیز گاریتا — پیتزای رسمی تیم چیزکُد 😺🧀",
  width
);

// Final art
const fileOutput = [
  catHead,
  catFace,
  catChin,
  "",
  cheeseLine,
  ...lines,
  scratches,
  captionFa,
].join("\n");

// Save
fs.writeFileSync("cheez-ascii.txt", fileOutput, "utf8");
