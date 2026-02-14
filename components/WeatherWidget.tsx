import React, { useEffect, useState, useRef } from 'react';
import { WeatherIcon } from './WeatherIcons';
import { convertTemp, TempUnit, getWeatherCondition } from '../utils/weatherUtils';

interface WeatherWidgetProps {
  mode?: 'standard' | 'icon';
  unit?: TempUnit;
}

interface WeatherData {
  locationName?: string;
  current: {
    temp: number;
    condition: string;
    weatherCode: number;
    humidity: number;
    windSpeed: number;
    feelsLike: number;
    precipProb: number;
    precipAmt: number;
    visKm: number;
    isDay: number; // 1 for day, 0 for night
  };
  forecast: {
    time: string;
    temp: number;
    condition: string;
    weatherCode?: number;
    isDay?: number;
  }[];
}

export const WeatherWidget: React.FC<WeatherWidgetProps> = ({ mode = 'standard', unit = 'C' }) => {
  const [data, setData] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Responsive Logic for Standard Mode
  const containerRef = useRef<HTMLDivElement>(null);
  const [visibleForecastCount, setVisibleForecastCount] = useState(2);

  useEffect(() => {
    // 1. Try to load from cache
    const cached = localStorage.getItem('tui-weather-cache');
    let hasCache = false;

    if (cached) {
      try {
        const parsed = JSON.parse(cached);
        if (parsed) {
          setData(parsed);
          setLoading(false);
          hasCache = true;
        }
      } catch (e) {
        console.error("Weather cache parse error", e);
      }
    }

    if (!navigator.geolocation) {
      if (!hasCache) {
        setError("no geo support");
        setLoading(false);
      }
      return;
    }

    const fetchWeather = async (lat: number, lon: number, defaultCity?: string) => {
      try {
        // Parallelize requests
        const geoPromise = (async () => {
          let resolvedCity = defaultCity || "Unknown";
          if (!defaultCity) {
            try {
              const geoRes = await fetch(`https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lon}&localityLanguage=en`);
              const geoData = await geoRes.json();
              if (geoData.city) resolvedCity = geoData.city;
              else if (geoData.locality) resolvedCity = geoData.locality;
            } catch (e) { /* ignore */ }
          }
          return resolvedCity;
        })();

        const weatherPromise = fetch(
          `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,is_day,relative_humidity_2m,apparent_temperature,weather_code,wind_speed_10m,precipitation,visibility&hourly=temperature_2m,weather_code,precipitation_probability&temperature_unit=fahrenheit&wind_speed_unit=mph&timezone=auto`
        );

        const [city, response] = await Promise.all([geoPromise, weatherPromise]);

        if (!response.ok) throw new Error('API Error');

        const result = await response.json();

        // Get current hour index based on local time
        const now = new Date();
        const year = now.getFullYear();
        const month = String(now.getMonth() + 1).padStart(2, '0');
        const day = String(now.getDate()).padStart(2, '0');
        const hour = String(now.getHours()).padStart(2, '0');
        const currentHourIso = `${year}-${month}-${day}T${hour}`;

        let hourIndex = 0;
        const resultTimeIndex = result.hourly.time.findIndex((t: string) => t.startsWith(currentHourIso));
        if (resultTimeIndex !== -1) hourIndex = resultTimeIndex;

        // Parse Current
        const currentData = {
          temp: Math.round(result.current.temperature_2m),
          condition: getWeatherCondition(result.current.weather_code, result.current.is_day),
          weatherCode: result.current.weather_code,
          humidity: result.current.relative_humidity_2m,
          windSpeed: Math.round(result.current.wind_speed_10m),
          feelsLike: Math.round(result.current.apparent_temperature),
          precipProb: result.hourly.precipitation_probability[hourIndex] || 0,
          precipAmt: result.current.precipitation,
          visKm: (result.current.visibility || 0) / 1000,
          isDay: result.current.is_day
        };

        // Standard Forecast - Get next 3 hours
        const nextHours = result.hourly.time.slice(hourIndex + 1, hourIndex + 4);

        const standardForecast = nextHours.map((_: string, i: number) => {
          const actualIndex = hourIndex + 1 + i;
          const safeIndex = Math.min(actualIndex, result.hourly.temperature_2m.length - 1);

          const dateObj = new Date(result.hourly.time[safeIndex]);
          const hours = dateObj.getHours();
          const ampm = hours >= 12 ? 'pm' : 'am';
          const hours12 = hours % 12 || 12;
          const displayTime = `${hours12} ${ampm}`;
          const isDayForecast = (hours >= 6 && hours < 20) ? 1 : 0; // Rough estimate

          return {
            time: displayTime.padStart(5, ' '),
            temp: Math.round(result.hourly.temperature_2m[safeIndex]),
            condition: getWeatherCondition(result.hourly.weather_code[safeIndex], isDayForecast),
            weatherCode: result.hourly.weather_code[safeIndex],
            isDay: isDayForecast
          };
        });

        const newData = {
          locationName: city,
          current: currentData,
          forecast: standardForecast
        };

        setData(newData);
        setLoading(false);
        setError(null);

        // Update Cache
        localStorage.setItem('tui-weather-cache', JSON.stringify(newData));

      } catch (err) {
        console.error(err);
        if (!hasCache) {
          setError("fetch failed");
          setLoading(false);
        }
      }
    };

    // Delay fetch if we have cache, otherwise fetch immediately
    const delay = hasCache ? 1000 : 0;

    const timer = setTimeout(() => {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          fetchWeather(position.coords.latitude, position.coords.longitude);
        },
        (err: any) => {
          console.error("Geolocation Error:", err);
          if (!hasCache) {
            setError(err.message || "loc error");
            setLoading(false);
          }
        },
        { enableHighAccuracy: false, timeout: 5000, maximumAge: 60000 }
      );
    }, delay);

    return () => clearTimeout(timer);
  }, []);

  // Resize Observer for Standard Mode
  useEffect(() => {
    if (!containerRef.current || mode === 'icon') return;

    const handleResize = (entries: ResizeObserverEntry[]) => {
      for (let entry of entries) {
        const h = entry.contentRect.height;
        if (h < 200) {
          setVisibleForecastCount(0);
        } else if (h < 300) {
          setVisibleForecastCount(2);
        } else {
          setVisibleForecastCount(4);
        }
      }
    };

    const observer = new ResizeObserver(handleResize);
    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, [mode]);

  if (loading) {
    return (
      <div className="h-full flex flex-col items-center justify-center gap-2 text-[var(--color-muted)] select-none">
        <div className="flex space-x-1">
          <div className="w-1.5 h-1.5 bg-[var(--color-muted)] rounded-full animate-pulse" style={{ animationDelay: '0ms' }}></div>
          <div className="w-1.5 h-1.5 bg-[var(--color-muted)] rounded-full animate-pulse" style={{ animationDelay: '150ms' }}></div>
          <div className="w-1.5 h-1.5 bg-[var(--color-muted)] rounded-full animate-pulse" style={{ animationDelay: '300ms' }}></div>
        </div>
        <span className="text-xs font-mono opacity-50">loading..</span>
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="h-full flex flex-col items-center justify-center gap-2 text-[var(--color-muted)] select-none px-4">
        <span className="text-sm font-mono text-[var(--color-accent)]">⚠</span>
        <span className="text-xs font-mono opacity-70 text-center">{error || 'no data'}</span>
        <span className="text-[10px] font-mono opacity-40">check location permissions</span>
      </div>
    );
  }

  // --- Icon Mode Render ---
  if (mode === 'icon') {
    return (
      <div ref={containerRef} className="h-full w-full select-none overflow-hidden bg-[var(--color-bg)] p-4">
        <div className="grid grid-cols-2 grid-rows-[auto_1fr_auto] gap-2 h-full w-full">

          {/* Yellow Box: City Name */}
          <div className="col-span-2 flex items-center justify-end">
            <span className="text-[var(--color-fg)] font-bold text-2xl tracking-tight truncate w-full text-right" title={data.locationName}>
              {data.locationName}
            </span>
          </div>

          {/* Red Box: Main Icon AND Temp */}
          <div className="relative flex flex-col items-center justify-center min-w-0 min-h-0 pt-2">
            {/* Current Temp (Primary) */}
            <div className="text-[var(--color-fg)] font-bold text-4xl leading-none z-10 mb-2">
              {convertTemp(data.current.temp, unit)}°{unit}
            </div>

            {/* Icon (Below) */}
            <div className="flex items-center justify-center flex-1 w-full" style={{ fontSize: 'clamp(50px, 10vw, 100px)', lineHeight: 1 }}>
              <div className="flex items-center justify-center text-[var(--color-accent)]">
                <WeatherIcon code={data.current.weatherCode} isDay={data.current.isDay} />
              </div>
            </div>
          </div>

          {/* Green Box: Weather Details */}
          <div className="flex flex-col justify-center font-mono text-sm gap-1 text-[var(--color-muted)]">
            <span className="text-[var(--color-fg)] text-lg font-medium opacity-90 capitalize leading-none truncate w-full text-right mb-2">
              {data.current.condition}
            </span>

            <div className="grid grid-cols-[auto_1fr] gap-x-4 gap-y-1 w-full">
              {/* Humidity */}
              <span className="text-[10px] uppercase tracking-widest opacity-70">HUM</span>
              <span className="tabular-nums font-bold text-right text-[var(--color-fg)]">{data.current.humidity}%</span>

              {/* Wind */}
              <span className="text-[10px] uppercase tracking-widest opacity-70">WIND</span>
              <span className="tabular-nums font-bold text-right text-[var(--color-fg)]">{data.current.windSpeed} mph</span>

              {/* Visibility */}
              <span className="text-[10px] uppercase tracking-widest opacity-70">VIS</span>
              <span className="tabular-nums font-bold text-right text-[var(--color-fg)]">{data.current.visKm} km</span>

              {/* Feels Like */}
              <span className="text-[10px] uppercase tracking-widest opacity-70">FEELS</span>
              <span className="tabular-nums font-bold text-right text-[var(--color-fg)]">{convertTemp(data.current.feelsLike, unit)}°</span>
            </div>
          </div>

          {/* White Box: Hourly Forecast */}
          <div className="col-span-2 flex items-center justify-between border-t border-[var(--color-border)] pt-2 mt-1">
            {data.forecast.slice(0, 3).map((item, i) => (
              <div key={i} className="flex flex-col items-center gap-0.5 w-1/3 text-[var(--color-fg)]">
                <span className="text-[10px] font-mono opacity-50">{item.time}</span>
                <span className="text-sm font-bold">{convertTemp(item.temp, unit)}°</span>
                {/* Small icon for forecast */}
                <div style={{ fontSize: '1.2rem', lineHeight: 1 }} className="opacity-80 text-[var(--color-accent)]">
                  <WeatherIcon code={item.weatherCode || 0} isDay={item.isDay ?? 1} />
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>
    );
  }

  // --- Standard Mode Render ---
  return (
    <div ref={containerRef} className="h-full flex flex-col p-3 select-none overflow-hidden relative" style={{ fontFamily: 'inherit' }}>

      {/* Header Section */}
      <div className="flex-shrink-0 mb-2">
        <div className="text-5xl font-light text-[var(--color-fg)] leading-none">
          {convertTemp(data.current.temp, unit)}°
        </div>
        <div className="text-[var(--color-muted)] text-xl mt-1 opacity-80 lowercase">
          {data.current.condition}
        </div>
      </div>

      {/* Stats Grid - 2x2 Layout */}
      <div className="grid grid-cols-2 gap-x-2 gap-y-1 text-sm font-mono flex-shrink-0">
        {/* Row 1 */}
        <div className="flex items-center gap-3">
          <span className="text-[var(--color-muted)] w-8">humi</span>
          <span className="text-[var(--color-fg)]">{data.current.humidity}%</span>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-[var(--color-muted)] w-8">wind</span>
          <span className="text-[var(--color-fg)]">{data.current.windSpeed} mph</span>
        </div>

        {/* Row 2 */}
        <div className="flex items-center gap-3">
          <span className="text-[var(--color-muted)] w-8">prec</span>
          <span className="text-[var(--color-fg)]">{data.current.precipProb}%</span>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-[var(--color-muted)] w-8">feel</span>
          <span className="text-[var(--color-fg)]">{convertTemp(data.current.feelsLike, unit)}°</span>
        </div>
      </div>

      {/* Spacer */}
      <div className="flex-1 min-h-0"></div>

      {/* Hourly Forecast */}
      {visibleForecastCount > 0 && (
        <div className="flex-shrink-0 flex flex-col gap-1 border-t border-[var(--color-border)] border-opacity-30 pt-2 mt-2">
          {data.forecast.slice(0, visibleForecastCount).map((f, i) => (
            <div key={i} className="flex items-center text-sm font-mono">
              <span className="text-[var(--color-fg)] w-12 text-right mr-4">{f.time}</span>
              <span className="text-[var(--color-fg)] w-8">{convertTemp(f.temp, unit)}°</span>
              <span className="text-[var(--color-muted)] opacity-70 ml-2 truncate lowercase">{f.condition}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};