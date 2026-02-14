export type TempUnit = 'C' | 'F';

/**
 * Converts temperature from Fahrenheit to the specified unit.
 * @param tempF Temperature in Fahrenheit
 * @param unit Unit to convert to ('C' or 'F')
 * @returns Converted temperature
 */
export const convertTemp = (tempF: number, unit: TempUnit): number => {
  if (unit === 'F') return tempF;
  return Math.round((tempF - 32) * 5 / 9);
};
