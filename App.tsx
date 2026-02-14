
import { useState, useEffect } from 'react';
import { useStickyState } from './hooks/useStickyState';
import { Responsive, Layout } from 'react-grid-layout';
// @ts-ignore
import { WidthProvider } from 'react-grid-layout';

interface Layouts {
  [key: string]: Layout[];
}
import { TuiBox } from './components/TuiBox';
import { DateTimeWidget } from './components/DateTimeWidget';
import { StatsWidget } from './components/StatsWidget';
import { WeatherWidget } from './components/WeatherWidget';
import { TodoWidget } from './components/TodoWidget';
import { LinksWidget } from './components/LinksWidget';
import { SearchWidget } from './components/SearchWidget';
import { DonutWidget } from './components/DonutWidget';
import { MatrixWidget } from './components/MatrixWidget';
import { PipesWidget } from './components/PipesWidget';
import { SnakeWidget } from './components/SnakeWidget';
import { GameOfLifeWidget } from './components/GameOfLifeWidget';
import { FireworksWidget } from './components/FireworksWidget';
import { StarfieldWidget } from './components/StarfieldWidget';
import { RainWidget } from './components/RainWidget';
import { MazeWidget } from './components/MazeWidget';
import { Settings } from './components/Settings';
import { ThemeMaker } from './components/ThemeMaker';
import { THEMES, LINKS_DATA } from './constants';
import { TodoItem, LinkGroup, Theme } from './types';

const ResponsiveGridLayout = WidthProvider(Responsive);

const DEFAULT_LAYOUTS: Layouts = {
  lg: [
    { i: 'settings-guard', x: 11, y: 0, w: 1, h: 1, static: true },
    { i: 'search', x: 2, y: 0, w: 7, h: 2, minW: 1, minH: 2 },
    { i: 'datetime', x: 6, y: 2, w: 3, h: 3, minW: 1, minH: 2 },
    { i: 'stats', x: 5, y: 2, w: 1, h: 3, minW: 1, minH: 2 },
    { i: 'weather', x: 2, y: 2, w: 3, h: 9, minW: 1, minH: 2 },
    { i: 'todo', x: 5, y: 5, w: 4, h: 6, minW: 1, minH: 2 },
    { i: 'links', x: 2, y: 11, w: 7, h: 5, minW: 1, minH: 2 },
    { i: 'snake', x: 2, y: 16, w: 7, h: 2, minW: 1, minH: 2 }
  ],
  md: [
    { i: 'search', x: 0, y: 0, w: 11, h: 2, minW: 2, minH: 2 },
    { i: 'settings-guard', x: 11, y: 0, w: 1, h: 1, static: true },
    { i: 'datetime', x: 0, y: 2, w: 8, h: 4, minW: 2, minH: 2 },
    { i: 'stats', x: 8, y: 2, w: 4, h: 4, minW: 2, minH: 2 },
    { i: 'weather', x: 0, y: 6, w: 4, h: 6, minW: 2, minH: 2 },
    { i: 'todo', x: 4, y: 6, w: 8, h: 6, minW: 2, minH: 2 },
    { i: 'links', x: 0, y: 12, w: 12, h: 4, minW: 2, minH: 2 },
    { i: 'snake', x: 0, y: 44, w: 2, h: 4, minW: 1, minH: 2 }
  ],
  sm: [
    { i: 'settings-guard', x: 5, y: 0, w: 1, h: 1, static: true },
    { i: 'search', x: 0, y: 0, w: 5, h: 2, minW: 2, minH: 2 },
    { i: 'datetime', x: 0, y: 2, w: 6, h: 4, minW: 2, minH: 2 },
    { i: 'stats', x: 0, y: 6, w: 6, h: 3, minW: 2, minH: 2 },
    { i: 'weather', x: 0, y: 9, w: 6, h: 4, minW: 2, minH: 2 },
    { i: 'todo', x: 0, y: 13, w: 6, h: 5, minW: 2, minH: 2 },
    { i: 'links', x: 0, y: 18, w: 6, h: 4, minW: 2, minH: 2 },
    { i: 'snake', x: 0, y: 22, w: 2, h: 4, minW: 1, minH: 2 }
  ]
};

export default function App() {

  const [currentTheme, setCurrentTheme] = useStickyState<string>('greyish', 'tui-theme');
  const [customThemes, setCustomThemes] = useStickyState<Record<string, Theme>>({}, 'tui-custom-themes');
  const [isThemeMakerOpen, setIsThemeMakerOpen] = useState(false);

  const [todos, setTodos] = useStickyState<TodoItem[]>([], 'tui-todos');
  const [linkGroups, setLinkGroups] = useStickyState<LinkGroup[]>(LINKS_DATA, 'tui-links');
  const [customCss, setCustomCss] = useStickyState<string>('', 'tui-custom-css');
  const [statsMode, setStatsMode] = useStickyState<'text' | 'graph' | 'detailed' | 'minimal'>('minimal', 'tui-stats-mode');
  const [weatherMode, setWeatherMode] = useStickyState<'standard' | 'icon'>('standard', 'tui-weather-mode');
  const [layouts, setLayouts] = useStickyState<Layouts>(DEFAULT_LAYOUTS, 'tui-layouts-v4');


  const [tempUnit, setTempUnit] = useStickyState<'C' | 'F'>('C', 'tui-temp-unit');


  const [widgetRadius, setWidgetRadius] = useStickyState<number>(0, 'tui-widget-radius');
  const [openInNewTab, setOpenInNewTab] = useStickyState<boolean>(false, 'tui-open-new-tab');
  const [showWidgetTitles, setShowWidgetTitles] = useStickyState<boolean>(true, 'tui-show-titles');
  const [reserveSettingsSpace, setReserveSettingsSpace] = useStickyState<boolean>(true, 'tui-reserve-settings');
  const [customFont, setCustomFont] = useStickyState<string>('', 'tui-custom-font');
  const funDefaults = {
    matrix: { speed: 50, fade: 0.05, charSet: 'mixed' as const, charFlux: 30, glow: true, fontSize: 16 },
    pipes: { speed: 50, fade: 0.1, count: 5, fontSize: 16, lifetime: 80 },
    donut: { speed: 50 },
    snake: { speed: 100 },
    life: { speed: 50 },
    fireworks: { speed: 50, explosionSize: 50 },
    starfield: { speed: 25 },
    rain: { speed: 48 },
    maze: { speed: 50 },
  };

  const [funOptionsRaw, setFunOptions] = useStickyState<typeof funDefaults>(funDefaults, 'tui-fun-options-v3');

  // keep the settings-guard item pinned in each breakpoint
  useEffect(() => {
    if (reserveSettingsSpace) {
      setLayouts((prevLayouts) => {
        const nextLayouts = { ...prevLayouts };
        let hasChanges = false;

        (['lg', 'md', 'sm', 'xs', 'xxs'] as const).forEach((bp) => {
          if (!nextLayouts[bp]) return;

          const layout = [...nextLayouts[bp]];
          const guardIndex = layout.findIndex((item) => item.i === 'settings-guard');

          let targetX = 0;
          if (bp === 'lg' || bp === 'md') targetX = 11;
          else if (bp === 'sm') targetX = 5;
          else if (bp === 'xs') targetX = 3;
          else if (bp === 'xxs') targetX = 1;

          const guardItem = { i: 'settings-guard', x: targetX, y: 0, w: 1, h: 1, static: true };

          if (guardIndex === -1) {
            layout.push(guardItem);
            nextLayouts[bp] = layout;
            hasChanges = true;
          } else {
            const current = layout[guardIndex];
            if (current.x !== targetX || current.y !== 0 || !current.static || current.w !== 1 || current.h !== 1) {
              layout[guardIndex] = { ...current, ...guardItem };
              nextLayouts[bp] = layout;
              hasChanges = true;
            }
          }
        });

        return hasChanges ? nextLayouts : prevLayouts;
      });
    }
  }, [reserveSettingsSpace, setLayouts]);

  // merge defaults in case localStorage data is stale or partial
  const funOptions = {
    matrix: { ...funDefaults.matrix, ...funOptionsRaw?.matrix },
    pipes: { ...funDefaults.pipes, ...funOptionsRaw?.pipes },
    donut: { ...funDefaults.donut, ...funOptionsRaw?.donut },
    snake: { ...funDefaults.snake, ...funOptionsRaw?.snake },
    life: { ...funDefaults.life, ...funOptionsRaw?.life },
    fireworks: { ...funDefaults.fireworks, ...funOptionsRaw?.fireworks },
    starfield: { ...funDefaults.starfield, ...funOptionsRaw?.starfield },
    rain: { ...funDefaults.rain, ...funOptionsRaw?.rain },
    maze: { ...funDefaults.maze, ...funOptionsRaw?.maze },
  };


  const [activeWidgets, setActiveWidgets] = useStickyState<Record<string, boolean>>({
    search: true,
    datetime: true,
    stats: true,
    weather: true,
    todo: true,
    links: true,
    donut: false,
    matrix: false,
    pipes: false,
    snake: true,
    life: false,
    fireworks: false,
    starfield: false,
    rain: false,
    maze: false
  }, 'tui-active-widgets-v4');


  const [isLayoutLocked, setIsLayoutLocked] = useStickyState<boolean>(true, 'tui-layout-locked-v2');
  const [isResizingEnabled, setIsResizingEnabled] = useStickyState<boolean>(false, 'tui-resizing-enabled');


  const [presets, setPresets] = useStickyState<any[]>([], 'tui-presets');

  // legacy theme/mode migrations
  useEffect(() => {
    if (currentTheme === 'vss') {
      setCurrentTheme('crt');
    }
    if (currentTheme === 'lavander') {
      setCurrentTheme('lavender');
    }
    // @ts-ignore - handling migration from old state
    if (weatherMode === 'ascii') {
      // @ts-ignore
      setWeatherMode('icon');
    }
  }, [currentTheme, setCurrentTheme, weatherMode, setWeatherMode]);

  const allThemes = { ...THEMES, ...customThemes };


  useEffect(() => {
    const theme = allThemes[currentTheme] || THEMES['greyish'];
    const root = document.documentElement;

    root.style.setProperty('--color-bg', theme.colors.bg);
    root.style.setProperty('--color-fg', theme.colors.fg);
    root.style.setProperty('--color-muted', theme.colors.muted);
    root.style.setProperty('--color-border', theme.colors.border);
    root.style.setProperty('--color-accent', theme.colors.accent);
    root.style.setProperty('--color-hover', theme.colors.hover);

    document.body.style.backgroundColor = theme.colors.bg;
  }, [currentTheme]);


  useEffect(() => {
    const root = document.documentElement;
    root.style.setProperty('--widget-radius', `${widgetRadius}px`);
  }, [widgetRadius]);


  useEffect(() => {
    const styleId = 'tui-user-custom-css';
    let styleEl = document.getElementById(styleId) as HTMLStyleElement;
    if (!styleEl) {
      styleEl = document.createElement('style');
      styleEl.id = styleId;
      document.head.appendChild(styleEl);
    }
    styleEl.textContent = customCss;
  }, [customCss]);

  const handleSaveCustomTheme = (newTheme: Theme) => {
    setCustomThemes(prev => ({
      ...prev,
      [newTheme.name]: newTheme
    }));
    setCurrentTheme(newTheme.name);
    setIsThemeMakerOpen(false);
  };

  const handleDeleteCustomTheme = (name: string) => {
    const newThemes = { ...customThemes };
    delete newThemes[name];
    setCustomThemes(newThemes);
    if (currentTheme === name) {
      setCurrentTheme('greyish');
    }
  };

  const isCrt = currentTheme === 'crt';

  const onLayoutChange = (_: Layout[], allLayouts: any) => {
    setLayouts(allLayouts);
  };

  const resetLayout = () => {
    setLayouts(DEFAULT_LAYOUTS);
    setActiveWidgets({
      search: true,
      datetime: true,
      stats: true,
      weather: true,
      todo: true,
      links: true,
      donut: false,
      matrix: false,
      pipes: false,
      snake: true,
      life: false,
      fireworks: false,
      starfield: false,
      rain: false,
      maze: false
    });
    setShowWidgetTitles(true);
    setCustomFont('');
    setStatsMode('minimal');
    setWeatherMode('standard');
    setTempUnit('C');
    setWidgetRadius(0);
    setFunOptions(funDefaults);
  };

  const toggleWidget = (key: string) => {
    // If it's an extra widget (contains '-'), we simply remove it when toggled off
    if (key.includes('-') && activeWidgets[key]) {
      removeExtraWidget(key);
      return;
    }

    const willBeActive = !activeWidgets[key];
    setActiveWidgets(prev => ({
      ...prev,
      [key]: willBeActive
    }));

    if (willBeActive) {
      setLayouts(prev => {
        const nextLayouts = { ...prev } as Layouts;
        Object.keys(nextLayouts).forEach(bp => {
          const currentList = nextLayouts[bp] || [];
          if (!currentList.find((item: any) => item.i === key)) {
            let maxY = 0;
            currentList.forEach((item: any) => {
              maxY = Math.max(maxY, item.y + item.h);
            });

            nextLayouts[bp] = [
              ...currentList,
              { i: key, x: 0, y: maxY, w: 2, h: 4, minW: 1, minH: 2 }
            ];
          }
        });
        return nextLayouts;
      });
    }
  };

  const addExtraWidget = (type: string) => {
    const key = `${type}-${Date.now()}`;
    setActiveWidgets(prev => ({
      ...prev,
      [key]: true
    }));

    setLayouts(prev => {
      const nextLayouts = { ...prev } as Layouts;
      Object.keys(nextLayouts).forEach(bp => {
        const currentList = nextLayouts[bp] || [];
        let maxY = 0;
        currentList.forEach((item: any) => {
          maxY = Math.max(maxY, item.y + item.h);
        });

        nextLayouts[bp] = [
          ...currentList,
          { i: key, x: 0, y: maxY, w: 2, h: 4, minW: 1, minH: 2 }
        ];
      });
      return nextLayouts;
    });
  };

  const removeExtraWidget = (key: string) => {
    // Remove from active widgets
    setActiveWidgets(prev => {
        const next = { ...prev };
        delete next[key];
        return next;
    });

    // Remove from layouts
    setLayouts(prev => {
        const nextLayouts = { ...prev } as Layouts;
        Object.keys(nextLayouts).forEach(bp => {
            if (nextLayouts[bp]) {
                nextLayouts[bp] = nextLayouts[bp].filter(item => item.i !== key);
            }
        });
        return nextLayouts;
    });
  };

  const handleSavePreset = (name: string) => {
    const newPreset = {
      id: Date.now(),
      name,
      data: {
        currentTheme,
        todos,
        linkGroups,
        customCss,
        statsMode,
        weatherMode,
        tempUnit,
        layouts,
        activeWidgets,
        showWidgetTitles,
        customFont,
        funOptions,
        widgetRadius,
        openInNewTab
      }
    };
    setPresets([...presets, newPreset]);
  };

  const handleLoadPreset = (preset: any) => {
    if (!preset || !preset.data) return;
    const d = preset.data;
    if (d.currentTheme) setCurrentTheme(d.currentTheme);
    if (d.todos) setTodos(d.todos);
    if (d.linkGroups) setLinkGroups(d.linkGroups);
    if (d.customCss !== undefined) setCustomCss(d.customCss);
    if (d.statsMode) setStatsMode(d.statsMode);
    if (d.weatherMode) setWeatherMode(d.weatherMode);
    if (d.tempUnit) setTempUnit(d.tempUnit);
    if (d.layouts) setLayouts(d.layouts);
    if (d.activeWidgets) setActiveWidgets(d.activeWidgets);
    if (d.showWidgetTitles !== undefined) setShowWidgetTitles(d.showWidgetTitles);
    if (d.customFont !== undefined) setCustomFont(d.customFont);
    if (d.funOptions) setFunOptions(d.funOptions);
    if (d.widgetRadius !== undefined) setWidgetRadius(d.widgetRadius);
    if (d.openInNewTab !== undefined) setOpenInNewTab(d.openInNewTab);
  };

  const handleDeletePreset = (id: number) => {
    setPresets(presets.filter(p => p.id !== id));
  };

  const showHandles = isResizingEnabled && !isLayoutLocked;

  const appStyle = {
    fontFamily: customFont ? customFont : '"JetBrains Mono", monospace'
  };

  const [gridReady, setGridReady] = useState(false);
  const [isFirstLoad, setIsFirstLoad] = useState(true);

  // briefly hide grid items while layout is computed, then suppress transitions
  useEffect(() => {
    const showTimer = setTimeout(() => setGridReady(true), 150);
    const animTimer = setTimeout(() => setIsFirstLoad(false), 3000);
    return () => {
      clearTimeout(showTimer);
      clearTimeout(animTimer);
    };
  }, []);

  return (
    <div
      className={`min-h-screen w-full p-2 text-sm bg-[var(--color-bg)] relative overflow-hidden select-none ${isCrt ? 'theme-crt' : ''}`}
      style={appStyle}
    >

      {isCrt && (
        <>
          <div className="crt-curve-container"></div>
          <div className="crt-scanlines"></div>
          <div className="crt-noise"></div>
          <div className="crt-flicker"></div>
        </>
      )}

      <Settings
        currentTheme={currentTheme}
        onThemeChange={setCurrentTheme}
        customThemes={customThemes}
        onDeleteCustomTheme={handleDeleteCustomTheme}
        onOpenThemeMaker={() => setIsThemeMakerOpen(true)}
        linkGroups={linkGroups}
        onUpdateLinks={setLinkGroups}
        customCss={customCss}
        onCustomCssChange={setCustomCss}
        statsMode={statsMode}
        onStatsModeChange={setStatsMode}
        weatherMode={weatherMode}
        onWeatherModeChange={setWeatherMode}
        tempUnit={tempUnit}
        onTempUnitChange={setTempUnit}
        isLayoutLocked={isLayoutLocked}
        onToggleLayoutLock={() => setIsLayoutLocked(!isLayoutLocked)}
        isResizingEnabled={isResizingEnabled}
        onToggleResizing={() => setIsResizingEnabled(!isResizingEnabled)}
        onResetLayout={resetLayout}
        activeWidgets={activeWidgets}
        onToggleWidget={toggleWidget}
        onAddWidget={addExtraWidget}
        showWidgetTitles={showWidgetTitles}
        onToggleWidgetTitles={() => setShowWidgetTitles(!showWidgetTitles)}
        customFont={customFont}
        onCustomFontChange={setCustomFont}
        reserveSettingsSpace={reserveSettingsSpace}
        onToggleReserveSettings={() => setReserveSettingsSpace(!reserveSettingsSpace)}
        funOptions={funOptions}
        onFunOptionsChange={setFunOptions}
        presets={presets}
        onSavePreset={handleSavePreset}
        onLoadPreset={handleLoadPreset}
        onDeletePreset={handleDeletePreset}

        widgetRadius={widgetRadius}
        onWidgetRadiusChange={setWidgetRadius}
        openInNewTab={openInNewTab}
        onToggleOpenInNewTab={() => setOpenInNewTab(!openInNewTab)}
      />

      {isThemeMakerOpen && (
        <ThemeMaker
          onSave={handleSaveCustomTheme}
          onClose={() => setIsThemeMakerOpen(false)}
        />
      )}

      <div className="w-full z-10 relative px-2">
        <ResponsiveGridLayout
          className={`layout ${showHandles ? '' : 'hide-handles'} ${!gridReady ? 'grid-hidden' : ''} ${isFirstLoad ? 'no-animate' : ''}`}
          layouts={layouts}
          breakpoints={{ lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 }}
          cols={{ lg: 12, md: 12, sm: 6, xs: 4, xxs: 2 }}
          rowHeight={30}
          onLayoutChange={onLayoutChange}
          draggableHandle=".drag-handle"
          margin={[10, 10]}
          isResizable={showHandles}
          isDraggable={!isLayoutLocked}
          useCSSTransforms={true}
          resizeHandles={['se', 'sw', 'ne', 'nw']}
        >
          {reserveSettingsSpace && (
            <div key="settings-guard" className="settings-guard-item pointer-events-none" />
          )}

          {Object.keys(activeWidgets).map(key => {
            if (!activeWidgets[key]) return null;
            const isExtra = key.includes('-');
            const type = isExtra ? key.split('-')[0] : key;

            // Common props
            const boxProps = {
                key: key,
                title: isExtra ? `${type}.exe (${key.split('-')[1].slice(-4)})` : (
                    ['snake', 'life', 'fireworks', 'starfield', 'rain', 'maze', 'pipes', 'matrix', 'donut'].includes(type)
                        ? (type === 'life' ? 'conway.life' :
                           type === 'donut' ? 'donut.c' :
                           type === 'pipes' ? 'pipes.scr' :
                           type === 'matrix' ? 'matrix' :
                           type === 'snake' ? 'snake.exe' :
                           type === 'fireworks' ? 'fireworks.py' :
                           type === 'starfield' ? 'starfield.scr' :
                           type === 'rain' ? 'rain.sh' :
                           type === 'maze' ? 'maze.gen' : type)
                        : (type === 'todo' ? 'todo-list' : type === 'search' ? 'web_search' : type)
                ),
                showTitle: showWidgetTitles,
                onClose: isExtra ? () => removeExtraWidget(key) : undefined
            };

            switch (type) {
                case 'search':
                    return <TuiBox {...boxProps} title="web_search"><SearchWidget /></TuiBox>;
                case 'datetime':
                    return <TuiBox {...boxProps} title="datetime"><DateTimeWidget /></TuiBox>;
                case 'stats':
                    return <TuiBox {...boxProps} title="stats"><StatsWidget mode={statsMode} /></TuiBox>;
                case 'weather':
                    return <TuiBox {...boxProps} title="weather"><WeatherWidget mode={weatherMode} unit={tempUnit} /></TuiBox>;
                case 'todo':
                    return <TuiBox {...boxProps} title="todo-list"><TodoWidget tasks={todos} setTasks={setTodos} /></TuiBox>;
                case 'links':
                    return <TuiBox {...boxProps} title="links"><LinksWidget groups={linkGroups} openInNewTab={openInNewTab} /></TuiBox>;
                case 'donut':
                    return <TuiBox {...boxProps}><DonutWidget speed={funOptions.donut.speed} /></TuiBox>;
                case 'matrix':
                    return <TuiBox {...boxProps}><MatrixWidget options={funOptions.matrix} /></TuiBox>;
                case 'pipes':
                    return <TuiBox {...boxProps}><PipesWidget options={funOptions.pipes} /></TuiBox>;
                case 'snake':
                    return <TuiBox {...boxProps}><SnakeWidget speed={funOptions.snake.speed} /></TuiBox>;
                case 'life':
                    return <TuiBox {...boxProps}><GameOfLifeWidget speed={funOptions.life.speed} /></TuiBox>;
                case 'fireworks':
                    return <TuiBox {...boxProps}><FireworksWidget speed={funOptions.fireworks.speed} explosionSize={funOptions.fireworks.explosionSize} /></TuiBox>;
                case 'starfield':
                    return <TuiBox {...boxProps}><StarfieldWidget speed={funOptions.starfield.speed} /></TuiBox>;
                case 'rain':
                    return <TuiBox {...boxProps}><RainWidget speed={funOptions.rain.speed} /></TuiBox>;
                case 'maze':
                    return <TuiBox {...boxProps}><MazeWidget speed={funOptions.maze.speed} /></TuiBox>;
                default:
                    return null;
            }
          })}

        </ResponsiveGridLayout>
      </div>
    </div>
  );
}
