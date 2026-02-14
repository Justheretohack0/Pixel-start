import { describe, it } from 'node:test';
import assert from 'node:assert';
import { getWeatherCondition } from '../utils/weatherUtils.ts';

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

  it('should return Rain for codes 61-67', () => {
    assert.strictEqual(getWeatherCondition(61), 'Rain');
    assert.strictEqual(getWeatherCondition(63), 'Rain');
    assert.strictEqual(getWeatherCondition(65), 'Rain');
    assert.strictEqual(getWeatherCondition(66), 'Rain');
    assert.strictEqual(getWeatherCondition(67), 'Rain');
  });

  it('should return Snow for codes 71-77', () => {
    assert.strictEqual(getWeatherCondition(71), 'Snow');
    assert.strictEqual(getWeatherCondition(73), 'Snow');
    assert.strictEqual(getWeatherCondition(75), 'Snow');
    assert.strictEqual(getWeatherCondition(77), 'Snow');
  });

  it('should return Showers for codes 80-82', () => {
    assert.strictEqual(getWeatherCondition(80), 'Showers');
    assert.strictEqual(getWeatherCondition(81), 'Showers');
    assert.strictEqual(getWeatherCondition(82), 'Showers');
  });

  it('should return Thunderstorm for codes 95-99', () => {
    assert.strictEqual(getWeatherCondition(95), 'Thunderstorm');
    assert.strictEqual(getWeatherCondition(96), 'Thunderstorm');
    assert.strictEqual(getWeatherCondition(99), 'Thunderstorm');
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
