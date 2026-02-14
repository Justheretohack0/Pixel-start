import { describe, it } from 'node:test';
import assert from 'node:assert';
import { getWeatherCondition, convertTemp } from '../utils/weatherUtils.ts';

describe('convertTemp', () => {
  it('should return Fahrenheit value as is when unit is F', () => {
    assert.strictEqual(convertTemp(32, 'F'), 32);
    assert.strictEqual(convertTemp(100, 'F'), 100);
    assert.strictEqual(convertTemp(-40, 'F'), -40);
  });

  it('should convert Fahrenheit to Celsius correctly', () => {
    assert.strictEqual(convertTemp(32, 'C'), 0);
    assert.strictEqual(convertTemp(212, 'C'), 100);
    assert.strictEqual(convertTemp(-40, 'C'), -40);
  });

  it('should round Celsius conversion to nearest integer', () => {
    // 70F -> 21.11... -> 21
    assert.strictEqual(convertTemp(70, 'C'), 21);
    // 71F -> 21.66... -> 22
    assert.strictEqual(convertTemp(71, 'C'), 22);
  });
});

describe('getWeatherCondition', () => {
  it('should return Sunny/Clear Sky for code 0', () => {
    assert.strictEqual(getWeatherCondition(0, 1), 'Sunny');
    assert.strictEqual(getWeatherCondition(0, 0), 'Clear Sky');
  });

  it('should return Mainly Sunny/Mainly Clear for code 1', () => {
    assert.strictEqual(getWeatherCondition(1, 1), 'Mainly Sunny');
    assert.strictEqual(getWeatherCondition(1, 0), 'Mainly Clear');
  });

  it('should return Partly Cloudy for code 2', () => {
    assert.strictEqual(getWeatherCondition(2, 1), 'Partly Cloudy');
    assert.strictEqual(getWeatherCondition(2, 0), 'Partly Cloudy');
  });

  it('should return Overcast for code 3', () => {
    assert.strictEqual(getWeatherCondition(3), 'Overcast');
  });

  it('should return Foggy for codes 45 and 48', () => {
    assert.strictEqual(getWeatherCondition(45), 'Foggy');
    assert.strictEqual(getWeatherCondition(48), 'Foggy');
  });

  it('should return Drizzle for codes 51-55', () => {
    assert.strictEqual(getWeatherCondition(51), 'Drizzle');
    assert.strictEqual(getWeatherCondition(53), 'Drizzle');
    assert.strictEqual(getWeatherCondition(55), 'Drizzle');
  });

  it('should return Freezing Drizzle for codes 56 and 57', () => {
    assert.strictEqual(getWeatherCondition(56), 'Freezing Drizzle');
    assert.strictEqual(getWeatherCondition(57), 'Freezing Drizzle');
  });

  it('should return Rain for codes 61-65', () => {
    assert.strictEqual(getWeatherCondition(61), 'Rain');
    assert.strictEqual(getWeatherCondition(63), 'Rain');
    assert.strictEqual(getWeatherCondition(65), 'Rain');
  });

  it('should return Freezing Rain for codes 66 and 67', () => {
    assert.strictEqual(getWeatherCondition(66), 'Freezing Rain');
    assert.strictEqual(getWeatherCondition(67), 'Freezing Rain');
  });

  it('should return Snow for codes 71-75', () => {
    assert.strictEqual(getWeatherCondition(71), 'Snow');
    assert.strictEqual(getWeatherCondition(73), 'Snow');
    assert.strictEqual(getWeatherCondition(75), 'Snow');
  });

  it('should return Snow Grains for code 77', () => {
    assert.strictEqual(getWeatherCondition(77), 'Snow Grains');
  });

  it('should return Showers for codes 80-82', () => {
    assert.strictEqual(getWeatherCondition(80), 'Showers');
    assert.strictEqual(getWeatherCondition(81), 'Showers');
    assert.strictEqual(getWeatherCondition(82), 'Showers');
  });

  it('should return Snow Showers for codes 85 and 86', () => {
    assert.strictEqual(getWeatherCondition(85), 'Snow Showers');
    assert.strictEqual(getWeatherCondition(86), 'Snow Showers');
  });

  it('should return Thunderstorm for code 95', () => {
    assert.strictEqual(getWeatherCondition(95), 'Thunderstorm');
  });

  it('should return Thunderstorm with Hail for codes 96 and 99', () => {
    assert.strictEqual(getWeatherCondition(96), 'Thunderstorm with Hail');
    assert.strictEqual(getWeatherCondition(99), 'Thunderstorm with Hail');
  });

  it('should return Unknown for unmapped codes', () => {
    assert.strictEqual(getWeatherCondition(100), 'Unknown');
    assert.strictEqual(getWeatherCondition(-1), 'Unknown');
  });

  it('should handle missing isDay argument (default to 1)', () => {
     assert.strictEqual(getWeatherCondition(0), 'Sunny');
     assert.strictEqual(getWeatherCondition(1), 'Mainly Sunny');
  });
});
