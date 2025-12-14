import sharp from "sharp";
import path from "path";

export async function preprocessImage(inputPath) {
  const dir = path.dirname(inputPath);
  const ext = path.extname(inputPath);
  const base = path.basename(inputPath, ext);

  const outputPath = path.join(dir, `${base}_clean.png`);

  await sharp(inputPath)
    .grayscale()
    .normalize()
    .threshold(180)
    .toFile(outputPath);

  return outputPath;
}