import {
  argbFromRgb,
  CustomColor,
  QuantizerCelebi,
  Score,
  themeFromSourceColor,
} from '@material/material-color-utilities';
import { createCanvas, loadImage } from 'canvas';

export * from '@material/material-color-utilities';

/**
 * Get the source color from an image.
 *
 * @param path The image path
 * @return Source color - the color most suitable for creating a UI theme
 */
export async function sourceColorFromImagePath(path: string) {
  // Load image from temp path
  const image = await loadImage(path);

  // Convert Image data to Pixel Array
  const imageBytes = await new Promise<Uint8ClampedArray>((resolve, reject) => {
    const canvas = createCanvas(image.width, image.height);
    const context = canvas.getContext('2d');
    if (!context) {
      reject(new Error('Could not get canvas context'));
      return;
    }
    const callback = () => {
      canvas.width = image.width;
      canvas.height = image.height;
      context.drawImage(image, 0, 0);
      let rect = [0, 0, image.width, image.height];
      const area = (image as any)?.dataset?.['area'];
      if (area && /^\d+(\s*,\s*\d+){3}$/.test(area)) {
        rect = area.split(/\s*,\s*/).map((s: any) => {
          // tslint:disable-next-line:ban
          return parseInt(s, 10);
        });
      }
      const [sx, sy, sw, sh] = rect;
      resolve(context.getImageData(sx, sy, sw, sh).data);
    };
    if (image.complete) {
      callback();
    } else {
      image.onload = callback;
    }
  });

  // Convert Image data to Pixel Array
  const pixels: number[] = [];
  for (let i = 0; i < imageBytes.length; i += 4) {
    const a = imageBytes[i + 3];

    if (a < 255) {
      continue;
    }

    const r = imageBytes[i];
    const g = imageBytes[i + 1];
    const b = imageBytes[i + 2];

    const argb = argbFromRgb(r, g, b);
    pixels.push(argb);
  }

  // Convert Pixels to Material Colors
  const result = QuantizerCelebi.quantize(pixels, 128);
  const ranked = Score.score(result);
  const top = ranked[0];
  return top;
}

export async function themeFromImagePath(
  path: string,
  customColors: CustomColor[] = [],
) {
  const source = await sourceColorFromImagePath(path);
  return themeFromSourceColor(source, customColors);
}
