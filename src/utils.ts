import { Scheme } from '@material/material-color-utilities';

import { MATERIAL } from './constants.js';

/**
 * Converts a hexadecimal color value to its corresponding RGB representation.
 * The source should be an integer ranging from 0 to 4294967295 (0xFFFFFFFF).
 *
 * @param {number} source - The hexadecimal color value as an integer (0xFFFFFFFF).
 * @returns {[number, number, number]} An array representing the resulting RGB color: [red, green, blue]
 */
export function hexToRgb(source: number): [number, number, number] {
  const red = (source >> 16) & 255;
  const green = (source >> 8) & 255;
  const blue = source & 255;

  return [red, green, blue];
}

/**
 * Calculates the resulting RGB values based on the input RGBA color and background color.
 * The first three parameters should be integers ranging from 0 to 255, and the fourth parameter should be a floating-point number ranging from 0 to 1.
 * @param  {[number, number, number, number]} rgba - An array representing the RGBA color: [red, green, blue, alpha]
 * @param  {[number, number, number]} background - An array representing the background color: [red, green, blue]
 * @returns {[number, number, number]} An array representing the resulting RGB color: [red, green, blue]
 */
export function rgbaToRgb(
  rgba: [number, number, number, number],
  background: [number, number, number] = [255, 255, 255],
): [number, number, number] {
  return [
    Math.round((1 - rgba[3]) * background[0] + rgba[3] * rgba[0]),
    Math.round((1 - rgba[3]) * background[1] + rgba[3] * rgba[1]),
    Math.round((1 - rgba[3]) * background[2] + rgba[3] * rgba[2]),
  ];
}

export function cssVar(field: string, prefix = '--v-theme-') {
  return prefix + field.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();
}

export function convertSchemesToCss(
  schemes: Record<string, Scheme>,
  prefix = '.v-theme--',
) {
  let css = '';

  for (const scheme in schemes) {
    css += `${prefix}${scheme}{`;

    const fields = schemes[scheme].toJSON();

    // Remove error colors
    delete (fields as any).error;
    delete (fields as any).onError;
    delete (fields as any).errorContainer;
    delete (fields as any).onErrorContainer;

    for (const [key, value] of Object.entries(fields)) {
      const rgbValue = hexToRgb(value).join(',');

      css += `${cssVar(key)}:${rgbValue};`;
    }

    // add surface container
    const primaryColor = hexToRgb(fields.primary);
    const surfaceColor = hexToRgb(fields.surface);
    for (const [key, value] of Object.entries(
      MATERIAL.SURFACE_CONTAINER_THRESHOLDS,
    )) {
      const rgbValue = rgbaToRgb([...primaryColor, value], surfaceColor).join(
        ',',
      );

      css += `${cssVar(key)}:${rgbValue};`;
    }
    css += '}';
  }

  return css;
}
