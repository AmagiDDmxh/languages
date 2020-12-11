/**
 * Linear interpolation function
 * @param min The minimum number
 * @param max The maximum number
 * @param t Number between [0, 1] inclusive
 * @returns Number between [min, max] with linear scale
 */
export const lerp = (min: number, max: number, t: number) => {
  // Validation of t?
  return min * (1 - t) + max * t
}
