import Tesseract from 'tesseract.js';
import fs from 'fs';

const images = [
  "WhatsApp Image 2026-05-14 at 10.14.26 (1).jpeg",
  "WhatsApp Image 2026-05-14 at 10.14.26.jpeg",
  "WhatsApp Image 2026-05-14 at 10.14.27 (1).jpeg",
  "WhatsApp Image 2026-05-14 at 10.14.27.jpeg",
  "WhatsApp Image 2026-05-14 at 10.14.28 (1).jpeg",
  "WhatsApp Image 2026-05-14 at 10.14.28.jpeg",
  "WhatsApp Image 2026-05-14 at 10.14.29.jpeg"
];

async function run() {
  let text = '';
  for (const img of images) {
    if (fs.existsSync(img)) {
      console.log(`Processing ${img}...`);
      const { data } = await Tesseract.recognize(img, 'ind');
      text += `\n\n--- ${img} ---\n\n` + data.text;
    }
  }
  fs.writeFileSync('extracted_text.txt', text);
  console.log('Done!');
}

run();
