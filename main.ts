import * as fs from "node:fs";
import * as path from "node:path";

const LINE_1 =
  "At midnight, don't delete the working draft to make room for the better idea.";
const LINE_2 =
  "The better idea never arrived, and the empty file is still the only thing you shipped that night.";

function main(): void {
  const outDir = process.env.MAKEFUN_OUTPUT_DIR;
  if (!outDir) {
    console.error("MAKEFUN_OUTPUT_DIR is not set");
    process.exit(1);
  }
  const text = LINE_1 + "\n" + LINE_2;
  if (text.length < 1 || text.length > 280) {
    console.error("entry must be 1-280 characters, got " + text.length);
    process.exit(1);
  }
  const lines = text.split("\n");
  if (lines.length !== 2) {
    console.error("entry must be exactly two lines, got " + lines.length);
    process.exit(1);
  }
  for (const line of lines) {
    if (line.trim().length === 0 || !line.endsWith(".")) {
      console.error("each line must be one non-empty sentence ending with a period");
      process.exit(1);
    }
  }
  fs.mkdirSync(outDir, { recursive: true });
  const outPath = path.join(outDir, "entry.txt");
  fs.writeFileSync(outPath, text, "utf8");
  const readBack = fs.readFileSync(outPath, "utf8");
  if (readBack !== text) {
    console.error("read-back mismatch: written text differs from file content");
    process.exit(1);
  }
}

main();
