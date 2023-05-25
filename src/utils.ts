import { Scheme } from '@material/material-color-utilities';

export function hexToRgb(source: number) {
  const red = (source >> 16) & 255;
  const green = (source >> 8) & 255;
  const blue = source & 255;

  return `${red},${green},${blue}`;
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
    css += `${prefix}${scheme} {`;

    const fields = schemes[scheme].toJSON();

    // Remove error colors
    delete (fields as any).error;
    delete (fields as any).onError;
    delete (fields as any).errorContainer;
    delete (fields as any).onErrorContainer;

    for (const [key, value] of Object.entries(fields)) {
      const rgbValue = hexToRgb(value);

      css += `${cssVar(key)}: ${rgbValue};`;
    }

    css += '}';
  }

  return css;
}
