import React, { useState, useRef, useEffect } from 'react';
import { SettingsThemesTab } from './settings/SettingsThemesTab';
import { SettingsWidgetsTab } from './settings/SettingsWidgetsTab';
import { SettingsShortcutsTab } from './settings/SettingsShortcutsTab';
import { SettingsPresetsTab } from './settings/SettingsPresetsTab';
import { SettingsAdvancedTab } from './settings/SettingsAdvancedTab';
import { LinkGroup } from '../types';

interface SettingsProps {
    currentTheme: string;
    onThemeChange: (themeName: string) => void;
    linkGroups: LinkGroup[];
    onUpdateLinks: (groups: LinkGroup[]) => void;
    customCss: string;
    onCustomCssChange: (css: string) => void;
    statsMode: 'text' | 'graph' | 'detailed' | 'minimal';
    onStatsModeChange: (mode: 'text' | 'graph' | 'detailed' | 'minimal') => void;
    weatherMode: 'standard' | 'icon';
    onWeatherModeChange: (mode: 'standard' | 'icon') => void;
    tempUnit: 'C' | 'F';
    onTempUnitChange: (unit: 'C' | 'F') => void;
    isLayoutLocked: boolean;
    onToggleLayoutLock: () => void;
    isResizingEnabled: boolean;
    onToggleResizing: () => void;
    onResetLayout: () => void;
    activeWidgets: Record<string, boolean>;
    onToggleWidget: (key: string) => void;
    onAddWidget: (type: string) => void;


    showWidgetTitles: boolean;
    onToggleWidgetTitles: () => void;
    customFont: string;
    onCustomFontChange: (font: string) => void;
    reserveSettingsSpace: boolean;
    onToggleReserveSettings: () => void;
    funOptions: {
        matrix: { speed: number; fade: number; charSet: 'numbers' | 'latin' | 'mixed'; charFlux: number; glow: boolean; fontSize: number };
        pipes: { speed: number; fade: number; count: number; fontSize: number; lifetime: number };
        donut: { speed: number };
        snake: { speed: number };
        life: { speed: number };
        fireworks: { speed: number; explosionSize: number };
        starfield: { speed: number };
        rain: { speed: number };
        maze: { speed: number };
    };
    onFunOptionsChange: (options: any) => void;


    presets: any[];
    onSavePreset: (name: string) => void;
    onLoadPreset: (preset: any) => void;
    onDeletePreset: (id: number) => void;

    customThemes?: Record<string, any>;
    onDeleteCustomTheme?: (name: string) => void;
    onOpenThemeMaker?: () => void;


    widgetRadius?: number;
    onWidgetRadiusChange?: (value: number) => void;


    openInNewTab?: boolean;
    onToggleOpenInNewTab?: () => void;
}

type Tab = 'themes' | 'shortcuts' | 'widgets' | 'advanced' | 'presets';

export const Settings: React.FC = () => {
    const {
        currentTheme, setCurrentTheme,
        customThemes, handleDeleteCustomTheme, setIsThemeMakerOpen,
        linkGroups, setLinkGroups,
        customCss, setCustomCss,
        statsMode, setStatsMode,
        weatherMode, setWeatherMode,
        tempUnit, setTempUnit,
        isLayoutLocked, setIsLayoutLocked,
        isResizingEnabled, setIsResizingEnabled,
        resetLayout,
        activeWidgets, toggleWidget, addExtraWidget,
        showWidgetTitles, setShowWidgetTitles,
        customFont, setCustomFont,
        reserveSettingsSpace, setReserveSettingsSpace,
        funOptions, setFunOptions,
        presets, handleSavePreset, handleLoadPreset, handleDeletePreset,
        widgetRadius, setWidgetRadius,
        openInNewTab, setOpenInNewTab
    } = useAppContext();

    const [isButtonVisible, setIsButtonVisible] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [activeTab, setActiveTab] = useState<Tab>('themes');

    // Draggable State
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [isDragging, setIsDragging] = useState(false);
    const dragStartPos = useRef({ x: 0, y: 0 });

    // Resizable State
    const [size, setSize] = useState({ width: 640, height: 500 });
    const [isResizing, setIsResizing] = useState(false);
    const resizeStart = useRef({ x: 0, y: 0, w: 0, h: 0 });

    // Widget duplication modal state
    const [widgetToDuplicate, setWidgetToDuplicate] = useState<string | null>(null);

    const toggleModal = () => {
        setIsModalOpen(!isModalOpen);
        if (!isModalOpen) {
            setPosition({ x: 0, y: 0 });
        }
    };

    // drag
    const handleMouseDown = (e: React.MouseEvent) => {
        if (e.target !== e.currentTarget) return; // Only drag if clicking header directly
        setIsDragging(true);
        dragStartPos.current = {
            x: e.clientX - position.x,
            y: e.clientY - position.y
        };
    };

    // resize
    const handleResizeMouseDown = (e: React.MouseEvent) => {
        e.stopPropagation();
        e.preventDefault();
        setIsResizing(true);
        resizeStart.current = {
            x: e.clientX,
            y: e.clientY,
            w: size.width,
            h: size.height
        };
    };

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            if (isDragging) {
                const newX = Math.round(e.clientX - dragStartPos.current.x);
                const newY = Math.round(e.clientY - dragStartPos.current.y);
                setPosition({ x: newX, y: newY });
            }
            if (isResizing) {
                const deltaX = e.clientX - resizeStart.current.x;
                const deltaY = e.clientY - resizeStart.current.y;
                setSize({
                    width: Math.max(400, resizeStart.current.w + deltaX),
                    height: Math.max(350, resizeStart.current.h + deltaY)
                });
            }
        };

        const handleMouseUp = () => {
            setIsDragging(false);
            setIsResizing(false);
        };

        if (isDragging || isResizing) {
            window.addEventListener('mousemove', handleMouseMove);
            window.addEventListener('mouseup', handleMouseUp);
        }

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('mouseup', handleMouseUp);
        };
    }, [isDragging, isResizing]);

    return (
        <>
            {/* Hover Trigger Area */}
            <div
                className="absolute top-4 right-4 z-40 p-2 cursor-pointer"
                onMouseEnter={() => setIsButtonVisible(true)}
                onMouseLeave={() => setIsButtonVisible(false)}
                onClick={toggleModal}
            >
                <div className={`text-[var(--color-muted)] transition-opacity duration-200 ${isButtonVisible || isModalOpen ? 'opacity-100' : 'opacity-0'}`}>
                    ( settings )
                </div>
            </div>

            {/* Confirmation Modal for Widget Duplication */}
            {widgetToDuplicate && (
                <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/50 pointer-events-auto">
                    <div className="bg-[var(--color-bg)] border border-[var(--color-border)] p-4 shadow-2xl flex flex-col gap-4 max-w-sm">
                         <div className="text-[var(--color-fg)] font-bold text-center">
                            Add another '{widgetToDuplicate}'?
                        </div>
                        <div className="flex gap-4 justify-center">
                            <button
                                onClick={() => {
                                    addExtraWidget(widgetToDuplicate);
                                    setWidgetToDuplicate(null);
                                }}
                                className="px-4 py-1 border border-[var(--color-border)] text-[var(--color-accent)] hover:bg-[var(--color-hover)] no-radius"
                            >
                                [ YES ]
                            </button>
                            <button
                                onClick={() => setWidgetToDuplicate(null)}
                                className="px-4 py-1 border border-[var(--color-border)] text-[var(--color-muted)] hover:bg-[var(--color-hover)] no-radius"
                            >
                                [ NO ]
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* TUI Window Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center pointer-events-none">
                    <div
                        className="bg-[var(--color-bg)] border border-[var(--color-border)] shadow-2xl flex flex-col pointer-events-auto relative p-[2px] overflow-hidden"
                        style={{
                            transform: `translate(${position.x}px, ${position.y}px)`,
                            width: `${size.width}px`,
                            height: `${size.height}px`,
                            maxWidth: '95vw',
                            maxHeight: '95vh',
                        }}
                    >

                        {/* Window Title Bar */}
                        <div
                            className="flex items-center justify-between px-3 py-2 border-b border-[var(--color-border)] bg-[var(--color-hover)] select-none cursor-move group shrink-0"
                            onMouseDown={handleMouseDown}
                            title="Drag to move"
                        >
                            <div className="flex items-center gap-2 pointer-events-none">
                                <span className="text-[var(--color-fg)] font-bold text-xs">user@tui-dashboard:~/settings</span>
                            </div>
                            <div className="flex gap-3 text-[var(--color-muted)] font-mono text-xs">
                                <button onClick={(e) => { e.stopPropagation(); setIsModalOpen(false); }} className="hover:text-[var(--color-accent)]">[x]</button>
                            </div>
                        </div>

                        {/* tabs */}
                        <div className="flex border-b border-[var(--color-border)] px-2 pt-2 gap-2 bg-[var(--color-bg)] flex-wrap shrink-0">
                            {['themes', 'shortcuts', 'widgets', 'presets', 'advanced'].map(tab => (
                                <button
                                    key={tab}
                                    onClick={() => setActiveTab(tab as Tab)}
                                    className={`px-4 py-1 text-sm rounded-t-sm border-t border-l border-r ${activeTab === tab ? 'border-[var(--color-border)] bg-[var(--color-bg)] text-[var(--color-accent)] -mb-[1px] pb-2 font-bold' : 'border-transparent text-[var(--color-muted)] hover:text-[var(--color-fg)]'}`}
                                >
                                    {tab}
                                </button>
                            ))}
                        </div>

                        {/* content */}
                        <div className="p-6 overflow-y-auto custom-scrollbar flex-1 bg-[var(--color-bg)] min-h-0">


                            {activeTab === 'themes' && (
                                <SettingsThemesTab
                                    currentTheme={currentTheme}
                                    onThemeChange={onThemeChange}
                                    customThemes={customThemes}
                                    onDeleteCustomTheme={onDeleteCustomTheme}
                                    onOpenThemeMaker={onOpenThemeMaker}
                                />
                            )}


                            {activeTab === 'widgets' && (
                                <SettingsWidgetsTab
                                    activeWidgets={activeWidgets}
                                    onToggleWidget={onToggleWidget}
                                    onAddWidget={onAddWidget}
                                    setWidgetToDuplicate={setWidgetToDuplicate}
                                />
                            )}


                            {activeTab === 'shortcuts' && (
                                <SettingsShortcutsTab
                                    linkGroups={linkGroups}
                                    onUpdateLinks={onUpdateLinks}
                                />
                            )}


                            {activeTab === 'presets' && (
                                <SettingsPresetsTab
                                    presets={presets}
                                    onSavePreset={onSavePreset}
                                    onLoadPreset={onLoadPreset}
                                    onDeletePreset={onDeletePreset}
                                />
                            )}


                            {activeTab === 'advanced' && (
                                <SettingsAdvancedTab
                                    showWidgetTitles={showWidgetTitles}
                                    onToggleWidgetTitles={onToggleWidgetTitles}
                                    reserveSettingsSpace={reserveSettingsSpace}
                                    onToggleReserveSettings={onToggleReserveSettings}
                                    customFont={customFont}
                                    onCustomFontChange={onCustomFontChange}
                                    widgetRadius={widgetRadius}
                                    onWidgetRadiusChange={onWidgetRadiusChange}
                                    isLayoutLocked={isLayoutLocked}
                                    onToggleLayoutLock={onToggleLayoutLock}
                                    onResetLayout={onResetLayout}
                                    isResizingEnabled={isResizingEnabled}
                                    onToggleResizing={onToggleResizing}
                                    statsMode={statsMode}
                                    onStatsModeChange={onStatsModeChange}
                                    weatherMode={weatherMode}
                                    onWeatherModeChange={onWeatherModeChange}
                                    tempUnit={tempUnit}
                                    onTempUnitChange={onTempUnitChange}
                                    openInNewTab={openInNewTab}
                                    onToggleOpenInNewTab={onToggleOpenInNewTab}
                                    activeWidgets={activeWidgets}
                                    funOptions={funOptions}
                                    onFunOptionsChange={onFunOptionsChange}
                                    customCss={customCss}
                                    onCustomCssChange={onCustomCssChange}
                                />
                            )}

                        </div>


                        <div
                            className="absolute bottom-0 right-0 w-6 h-6 cursor-se-resize z-50 flex items-end justify-end text-[var(--color-accent)] opacity-50 hover:opacity-100 select-none"
                            onMouseDown={handleResizeMouseDown}
                            title="Resize"
                        >
                            <svg width="12" height="12" viewBox="0 0 10 10" fill="currentColor" className="pointer-events-none mb-[2px] mr-[2px]">
                                <path d="M10 10 L0 10 L10 0 Z" />
                            </svg>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};
