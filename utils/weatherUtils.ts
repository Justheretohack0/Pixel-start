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

// Map WMO Weather Codes to text conditions
export const getWeatherCondition = (code: number, isDay: number = 1): string => {
  if (code === 0) return isDay ? 'Sunny' : 'Clear Sky';
  if (code === 1) return isDay ? 'Mainly Sunny' : 'Mainly Clear';
  if (code === 2) return 'Partly Cloudy';
  if (code === 3) return 'Overcast';
  if (code === 45 || code === 48) return 'Foggy';
  if (code >= 51 && code <= 55) return 'Drizzle';
  if (code === 56 || code === 57) return 'Freezing Drizzle';
  if (code >= 61 && code <= 65) return 'Rain';
  if (code === 66 || code === 67) return 'Freezing Rain';
  if (code >= 71 && code <= 75) return 'Snow';
  if (code === 77) return 'Snow Grains';
  if (code >= 80 && code <= 82) return 'Showers';
  if (code === 85 || code === 86) return 'Snow Showers';
  if (code === 95) return 'Thunderstorm';
  if (code === 96 || code === 99) return 'Thunderstorm with Hail';
  return 'Unknown';
};
