import fs from 'fs';
import Vibrant from 'node-vibrant';

const indexPaths = [
  'src/assets/data/cover-images.json',
  'src/assets/data/sheet-images.json'
];

indexPaths.forEach(async (indexFile) => {
  const index = JSON.parse(fs.readFileSync(indexFile, 'utf-8'));

  // Array to hold all the promises returned by determineCommonColor
  const promises = index.map(async (block) => {
    block.commonColor = await determineCommonColor(`public/${block.url}`);
  });

  // Wait for all promises to resolve
  await Promise.all(promises);

  fs.writeFileSync(indexFile, JSON.stringify(index, null, 2));
});

async function determineCommonColor(imagePath) {
  try {
    const palette = await Vibrant.from(imagePath).getPalette();
    // Assuming the palette has been successfully generated
    // You can access different colors like Vibrant, Muted, DarkVibrant, etc.
    return palette.Vibrant.hex || null; // Fallback color if Vibrant color not available
  } catch (error) {
    console.error(`Error determining common color for ${imagePath}:`, error);
    return null;
  }
}
