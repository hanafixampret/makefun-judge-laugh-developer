import { mkdirSync, writeFileSync, readFileSync } from "node:fs";
import { join } from "node:path";

const ENTRY =
  "The bug is in a third-party library. I know, because I wrote the third-party library.";

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });
const outPath = join(outDir, "entry.txt");
writeFileSync(outPath, ENTRY, "utf8");

const back = readFileSync(outPath, "utf8");
if (back !== ENTRY) throw new Error("round-trip mismatch");
if (ENTRY.length < 1 || ENTRY.length > 200)
  throw new Error("entry length out of gate");
if (ENTRY.trim().length === 0) throw new Error("entry is blank");
if (ENTRY !== ENTRY.trim())
  throw new Error("entry has leading or trailing whitespace");
if (ENTRY.includes("\n")) throw new Error("entry must be a single line");
console.log(`wrote ${ENTRY.length} chars to ${outPath}`);
