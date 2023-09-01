export namespace COLOR_VARIABLES {
  export const MIN_HEX = 0;
  export const MAX_HEX = 4294967295;

  export const MIN_RGB = 0;
  export const MAX_RGB = 255;
}

export namespace MATERIAL {
  export const SURFACE_CONTAINER_KEY = 'surface-container';
  export const SURFACE_CONTAINER_THRESHOLDS: Record<string, number> = {
    [`${SURFACE_CONTAINER_KEY}-lowest`]: 0.05,
    [`${SURFACE_CONTAINER_KEY}-low`]: 0.08,
    [`${SURFACE_CONTAINER_KEY}`]: 0.11,
    [`${SURFACE_CONTAINER_KEY}-high`]: 0.12,
    [`${SURFACE_CONTAINER_KEY}-highest`]: 0.14,
  };
}
