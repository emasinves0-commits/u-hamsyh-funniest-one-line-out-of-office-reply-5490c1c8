import { mkdirSync, writeFileSync, readFileSync } from "node:fs";
import { createHash } from "node:crypto";

const ENTRY =
  "I’m OOO for Thanksgiving; I’ve forwarded all urgent requests to my Uncle Jim, who will likely respond with a 40-minute story about his 2014 knee surgery.";
const MIN_CHARS = 1;
const MAX_CHARS = 160;
const OUTPUT_DIR = "/output";
const OUTPUT_FILE = `${OUTPUT_DIR}/entry.txt`;

const charCount = (s: string): number => [...s].length;

if (charCount(ENTRY) < MIN_CHARS || charCount(ENTRY) > MAX_CHARS) {
  throw new Error(`entry must be ${MIN_CHARS} to ${MAX_CHARS} characters`);
}
if (/[\r\n]/.test(ENTRY)) {
  throw new Error("entry must be a single line");
}
if (ENTRY.trim().length === 0) {
  throw new Error("entry must not be only whitespace");
}
if (ENTRY !== ENTRY.trim()) {
  throw new Error("entry must not have leading or trailing whitespace");
}
if (/[\u0000-\u001f\u007f]/.test(ENTRY)) {
  throw new Error("entry must not contain control characters");
}

mkdirSync(OUTPUT_DIR, { recursive: true });
writeFileSync(OUTPUT_FILE, ENTRY, "utf8");

const expected = Buffer.from(ENTRY, "utf8");
const back = readFileSync(OUTPUT_FILE);
if (back.length !== expected.length || !back.equals(expected)) {
  throw new Error(
    `read-back mismatch: expected ${expected.length} bytes, got ${back.length}`,
  );
}
if (back.toString("utf8") !== ENTRY) {
  throw new Error("read-back text differs from entry");
}

const sha256 = createHash("sha256").update(back).digest("hex");
console.log("characters:", charCount(back.toString("utf8")));
console.log("bytes:", back.length);
console.log("sha256:", sha256);
