
import React, { useState, useRef, useEffect } from 'react';
import { THEMES } from '../constants';
import { LinkGroup } from '../types';
import { AsciiSlider } from './AsciiSlider';
import { WidgetToggle } from './WidgetToggle';

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



export const Settings: React.FC<SettingsProps> = ({
    currentTheme,
    onThemeChange,
    linkGroups,
    onUpdateLinks,
    customCss,
    onCustomCssChange,
    statsMode,
    onStatsModeChange,
    weatherMode,
    onWeatherModeChange,
    tempUnit,
    onTempUnitChange,
    isLayoutLocked,
    onToggleLayoutLock,
    isResizingEnabled,
    onToggleResizing,
    onResetLayout,
    activeWidgets = {},
    onToggleWidget,
    showWidgetTitles,
    onToggleWidgetTitles,
    customFont,
    onCustomFontChange,
    reserveSettingsSpace,
    onToggleReserveSettings,

    customThemes = {},
    onDeleteCustomTheme,
    onOpenThemeMaker,

    funOptions,
    onFunOptionsChange,
    presets,
    onSavePreset,
    onLoadPreset,
    onDeletePreset,
    widgetRadius = 4,
    onWidgetRadiusChange,
    openInNewTab,
    onToggleOpenInNewTab,
}) => {
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

    // Local state for adding new shortcuts / presets
    const [newCatName, setNewCatName] = useState('');
    const [newLinkInputs, setNewLinkInputs] = useState<Record<string, { label: string, url: string }>>({});
    const [newPresetName, setNewPresetName] = useState('');

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



    const handleAddCategory = () => {
        if (!newCatName.trim()) return;
        onUpdateLinks([...linkGroups, { category: newCatName, links: [] }]);
        setNewCatName('');
    };

    const handleDeleteCategory = (catIndex: number) => {
        const newGroups = [...linkGroups];
        newGroups.splice(catIndex, 1);
        onUpdateLinks(newGroups);
    };

    const handleAddLink = (catIndex: number) => {
        const catName = linkGroups[catIndex].category;
        const input = newLinkInputs[catName] || { label: '', url: '' };

        if (!input.label.trim() || !input.url.trim()) return;

        const newGroups = [...linkGroups];
        newGroups[catIndex].links.push({ ...input });
        onUpdateLinks(newGroups);

        setNewLinkInputs({
            ...newLinkInputs,
            [catName]: { label: '', url: '' }
        });
    };

    const handleDeleteLink = (catIndex: number, linkIndex: number) => {
        const newGroups = [...linkGroups];
        newGroups[catIndex].links.splice(linkIndex, 1);
        onUpdateLinks(newGroups);
    };

    const updateLinkInput = (catName: string, field: 'label' | 'url', value: string) => {
        setNewLinkInputs({
            ...newLinkInputs,
            [catName]: {
                ...(newLinkInputs[catName] || { label: '', url: '' }),
                [field]: value
            }
        });
    };


    const handleSavePresetClick = () => {
        if (!newPresetName.trim()) return;
        onSavePreset(newPresetName);
        setNewPresetName('');
    };

    const CoreWidgets = ['search', 'datetime', 'stats', 'weather', 'todo', 'links'];
    const FunWidgets = ['donut', 'matrix', 'pipes', 'snake', 'life', 'fireworks', 'starfield', 'rain', 'maze'];

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
                                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">


                                    <div
                                        onClick={onOpenThemeMaker}
                                        className="border border-[var(--color-accent)] border-dashed p-2 cursor-pointer hover:bg-[var(--color-hover)] flex flex-col items-center justify-center gap-2 text-center group min-h-[80px]"
                                    >
                                        <span className="text-2xl text-[var(--color-accent)] group-hover:scale-110 transition-transform">+</span>
                                        <span className="text-xs font-mono text-[var(--color-accent)]">CREATE NEW</span>
                                    </div>


                                    {Object.entries(customThemes).map(([key, theme]: [string, any]) => (
                                        <div
                                            key={key}
                                            onClick={() => onThemeChange(key)}
                                            className={`
                                                border p-2 cursor-pointer transition-all relative overflow-hidden group min-h-[80px] flex flex-col justify-between
                                                ${currentTheme === key
                                                    ? 'border-[var(--color-accent)] bg-[var(--color-hover)]'
                                                    : 'border-[var(--color-border)] hover:border-[var(--color-muted)]'
                                                }
                                            `}
                                        >
                                            <div className="flex items-center justify-between gap-1 mb-2 px-1">
                                                <div className="flex items-center gap-2 overflow-hidden w-full pr-8">
                                                    <span className="font-mono text-xs uppercase truncate text-[var(--color-accent)]">{theme.name}</span>
                                                </div>
                                            </div>
                                            <div className="flex w-full h-8 gap-0 mt-auto">
                                                <div className="flex-1 h-full" style={{ backgroundColor: theme.colors.bg }} />
                                                <div className="flex-1 h-full" style={{ backgroundColor: theme.colors.fg }} />
                                                <div className="flex-1 h-full" style={{ backgroundColor: theme.colors.accent }} />
                                            </div>
                                            <div
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    onDeleteCustomTheme?.(key);
                                                }}
                                                className="absolute top-0 right-0 bg-[var(--color-bg)] border-l border-b border-[var(--color-border)] px-2 py-0.5 cursor-pointer hover:text-[var(--color-accent)] hover:border-[var(--color-accent)] transition-all z-10"
                                                title="Delete Theme"
                                            >
                                                <span className="block group-hover:hidden text-[10px] text-[var(--color-accent)] font-bold">CUSTOM</span>
                                                <span className="hidden group-hover:block text-[10px] font-bold text-[var(--color-accent)]">[x]</span>
                                            </div>
                                        </div>
                                    ))}


                                    {Object.keys(THEMES).map(themeKey => (
                                        <div
                                            key={themeKey}
                                            onClick={() => onThemeChange(themeKey)}
                                            className={`
                                                border p-2 cursor-pointer transition-all relative overflow-hidden group min-h-[80px] flex flex-col justify-between
                                                ${currentTheme === themeKey
                                                    ? 'border-[var(--color-accent)] bg-[var(--color-hover)]'
                                                    : 'border-[var(--color-border)] hover:border-[var(--color-muted)]'}
                                            `}
                                        >
                                            <div className="flex items-center justify-between gap-1 mb-2 px-1">
                                                <div className="flex items-center gap-2 overflow-hidden w-full">
                                                    <span className="font-mono text-xs uppercase truncate text-[var(--color-accent)]">{THEMES[themeKey].name}</span>
                                                </div>
                                            </div>
                                            <div className="flex w-full h-8 gap-0 mt-auto">
                                                <div className="flex-1 h-full" style={{ backgroundColor: THEMES[themeKey].colors.bg }} />
                                                <div className="flex-1 h-full" style={{ backgroundColor: THEMES[themeKey].colors.fg }} />
                                                <div className="flex-1 h-full" style={{ backgroundColor: THEMES[themeKey].colors.accent }} />
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}


                            {activeTab === 'widgets' && (
                                <div className="space-y-6">

                                    <div>
                                        <h3 className="text-[var(--color-accent)] font-bold mb-4 border-b border-[var(--color-border)] pb-2">Core Widgets</h3>
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                            {CoreWidgets.map(w => (
                                                <WidgetToggle
                                                    key={w}
                                                    id={w}
                                                    label={w}
                                                    isActive={!!activeWidgets[w]}
                                                    onToggle={onToggleWidget}
                                                />
                                            ))}
                                        </div>
                                    </div>

                                    <div>
                                        <h3 className="text-[var(--color-accent)] font-bold mb-4 border-b border-[var(--color-border)] pb-2">Visual / Extras</h3>
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                            {FunWidgets.map(w => (
                                                <WidgetToggle
                                                    key={w}
                                                    id={w}
                                                    label={w}
                                                    isActive={!!activeWidgets[w]}
                                                    onToggle={onToggleWidget}
                                                />
                                            ))}
                                        </div>
                                    </div>

                                    <p className="text-[var(--color-muted)] text-xs mt-4">
                                        Note: Toggling widgets may reset their position to the bottom of the grid.
                                    </p>
                                </div>
                            )}


                            {activeTab === 'shortcuts' && (
                                <div className="space-y-6">
                                    {linkGroups.map((group, groupIdx) => (
                                        <div key={groupIdx} className="border border-[var(--color-border)] p-4 relative no-radius">
                                            <div className="flex justify-between items-center mb-3">
                                                <h3 className="text-[var(--color-accent)] font-bold">{group.category}</h3>
                                                <button
                                                    onClick={() => handleDeleteCategory(groupIdx)}
                                                    className="text-[var(--color-muted)] hover:text-red-500 text-xs"
                                                >
                                                    [delete group]
                                                </button>
                                            </div>

                                            <div className="space-y-2 mb-4">
                                                {group.links.map((link, linkIdx) => (
                                                    <div key={linkIdx} className="flex items-center justify-between bg-[var(--color-hover)] p-2 px-3 text-sm">
                                                        <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-4 overflow-hidden">
                                                            <span className="text-[var(--color-fg)] font-bold min-w-[80px]">{link.label}</span>
                                                            <span className="text-[var(--color-muted)] truncate text-xs">{link.url}</span>
                                                        </div>
                                                        <button
                                                            onClick={() => handleDeleteLink(groupIdx, linkIdx)}
                                                            className="text-[var(--color-muted)] hover:text-red-500 ml-2"
                                                        >
                                                            x
                                                        </button>
                                                    </div>
                                                ))}
                                            </div>


                                            <div className="flex flex-col sm:flex-row gap-2 mt-2 pt-2 border-t border-[var(--color-border)] border-dashed">
                                                <input
                                                    type="text"
                                                    placeholder="label"
                                                    className="bg-[var(--color-bg)] border border-[var(--color-border)] text-[var(--color-fg)] px-2 py-1 text-sm focus:border-[var(--color-accent)] outline-none w-full sm:w-1/4 select-text no-radius"
                                                    value={newLinkInputs[group.category]?.label || ''}
                                                    onChange={(e) => updateLinkInput(group.category, 'label', e.target.value)}
                                                />
                                                <input
                                                    type="text"
                                                    placeholder="url (https://...)"
                                                    className="bg-[var(--color-bg)] border border-[var(--color-border)] text-[var(--color-fg)] px-2 py-1 text-sm focus:border-[var(--color-accent)] outline-none flex-1 select-text no-radius"
                                                    value={newLinkInputs[group.category]?.url || ''}
                                                    onChange={(e) => updateLinkInput(group.category, 'url', e.target.value)}
                                                    onKeyDown={(e) => e.key === 'Enter' && handleAddLink(groupIdx)}
                                                />
                                                <button
                                                    onClick={() => handleAddLink(groupIdx)}
                                                    className="border border-[var(--color-border)] text-[var(--color-muted)] hover:text-[var(--color-fg)] hover:border-[var(--color-fg)] px-3 py-1 text-sm no-radius"
                                                >
                                                    add
                                                </button>
                                            </div>
                                        </div>
                                    ))}


                                    <div className="flex gap-2 items-center mt-6 p-4 border border-[var(--color-border)] border-dashed opacity-70 hover:opacity-100 transition-opacity">
                                        <span className="text-[var(--color-muted)] text-sm">New Category:</span>
                                        <input
                                            type="text"
                                            placeholder="category name"
                                            className="bg-[var(--color-bg)] border-b border-[var(--color-muted)] text-[var(--color-fg)] px-2 py-1 text-sm focus:border-[var(--color-accent)] outline-none select-text"
                                            value={newCatName}
                                            onChange={(e) => setNewCatName(e.target.value)}
                                            onKeyDown={(e) => e.key === 'Enter' && handleAddCategory()}
                                        />
                                        <button
                                            onClick={handleAddCategory}
                                            className="text-[var(--color-fg)] hover:text-[var(--color-accent)] text-sm font-bold"
                                        >
                                            [ + ]
                                        </button>
                                    </div>
                                </div>
                            )}


                            {activeTab === 'presets' && (
                                <div className="space-y-6">
                                    <div className="border border-[var(--color-border)] p-4">
                                        <h3 className="text-[var(--color-accent)] font-bold mb-3">Save Current Config</h3>
                                        <div className="flex gap-2">
                                            <input
                                                type="text"
                                                placeholder="preset name (e.g. Work Mode)"
                                                className="bg-[var(--color-bg)] border border-[var(--color-border)] text-[var(--color-fg)] px-3 py-1 text-sm focus:border-[var(--color-accent)] outline-none flex-1 select-text no-radius"
                                                value={newPresetName}
                                                onChange={(e) => setNewPresetName(e.target.value)}
                                                onKeyDown={(e) => e.key === 'Enter' && handleSavePresetClick()}
                                            />
                                            <button
                                                onClick={handleSavePresetClick}
                                                className="bg-[var(--color-hover)] text-[var(--color-fg)] px-4 py-1 text-sm border border-[var(--color-border)] hover:border-[var(--color-accent)] no-radius"
                                            >
                                                [ SAVE ]
                                            </button>
                                        </div>
                                    </div>

                                    <div className="border-t border-[var(--color-border)] pt-4">
                                        <h3 className="text-[var(--color-accent)] font-bold mb-4">Saved Presets</h3>
                                        <div className="space-y-2">
                                            {presets.length === 0 && (
                                                <div className="text-[var(--color-muted)] italic text-sm">No saved presets.</div>
                                            )}
                                            {presets.map(preset => (
                                                <div key={preset.id} className="flex items-center justify-between border border-[var(--color-border)] p-3 hover:bg-[var(--color-hover)] no-radius">
                                                    <span className="text-[var(--color-fg)] font-mono">{preset.name}</span>
                                                    <div className="flex gap-3">
                                                        <button
                                                            onClick={() => onLoadPreset(preset)}
                                                            className="text-[var(--color-accent)] hover:underline text-xs"
                                                        >
                                                            [ LOAD ]
                                                        </button>
                                                        <button
                                                            onClick={() => onDeletePreset(preset.id)}
                                                            className="text-[var(--color-muted)] hover:text-red-500 text-xs"
                                                        >
                                                            [ x ]
                                                        </button>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            )}


                            {activeTab === 'advanced' && (
                                <div className="space-y-6">

                                    <div className="border border-[var(--color-border)] p-4">
                                        <h3 className="text-[var(--color-accent)] font-bold mb-2">Appearance</h3>
                                        <div className="flex flex-col gap-3">

                                            <div
                                                onClick={onToggleWidgetTitles}
                                                className="flex items-center gap-2 cursor-pointer select-none group"
                                            >
                                                <span className="font-mono text-[var(--color-accent)] font-bold">
                                                    {showWidgetTitles ? '[x]' : '[ ]'}
                                                </span>
                                                <span className="text-[var(--color-fg)] text-sm group-hover:text-[var(--color-fg)]">Show Widget Titles</span>
                                            </div>

                                            <div
                                                onClick={onToggleReserveSettings}
                                                className="flex items-center gap-2 cursor-pointer select-none group mt-3"
                                            >
                                                <span className="font-mono text-[var(--color-accent)] font-bold">
                                                    {reserveSettingsSpace ? '[x]' : '[ ]'}
                                                </span>
                                                <span className="text-[var(--color-fg)] text-sm group-hover:text-[var(--color-fg)]">Reserve Settings Space</span>
                                            </div>

                                            <div className="flex flex-col gap-1 mt-2">
                                                <span className="text-[var(--color-muted)] text-xs">Custom Font Family</span>
                                                <input
                                                    type="text"
                                                    placeholder="e.g. Comic Sans MS, Arial"
                                                    className="bg-[var(--color-bg)] border border-[var(--color-border)] text-[var(--color-fg)] px-2 py-1 text-sm focus:border-[var(--color-accent)] outline-none w-full select-text font-sans"
                                                    value={customFont}
                                                    onChange={(e) => onCustomFontChange(e.target.value)}
                                                />
                                                <span className="text-[var(--color-muted)] text-[10px] opacity-60">Press enter or click away to apply.</span>
                                            </div>


                                            <div className="flex flex-col gap-1 mt-2 border-t border-[var(--color-border)] pt-2 border-dashed">
                                                <AsciiSlider
                                                    label="Widget Roundness"
                                                    value={widgetRadius}
                                                    min={0}
                                                    max={24}
                                                    displayValue={`${widgetRadius}px`}
                                                    onChange={(v) => onWidgetRadiusChange?.(v)}
                                                    hint="0 = sharp corners, 24 = very round"
                                                />
                                            </div>
                                        </div>
                                    </div>


                                    <div className="border border-[var(--color-border)] p-4">
                                        <h3 className="text-[var(--color-accent)] font-bold mb-2">Layout</h3>
                                        <div className="flex flex-col gap-3">

                                            <div className="flex items-center gap-4">
                                                <button
                                                    onClick={onToggleLayoutLock}
                                                    className={`px-3 py-1 border text-xs font-mono transition-colors no-radius ${isLayoutLocked ? 'border-[var(--color-accent)] text-[var(--color-accent)]' : 'border-[var(--color-border)] text-[var(--color-muted)] hover:text-[var(--color-fg)]'}`}
                                                >
                                                    [{isLayoutLocked ? 'LOCKED' : 'UNLOCKED'}]
                                                </button>
                                                <button
                                                    onClick={onResetLayout}
                                                    className="px-3 py-1 border border-[var(--color-border)] text-[var(--color-muted)] hover:text-red-500 hover:border-red-500 text-xs font-mono no-radius"
                                                >
                                                    [RESET TO DEFAULT]
                                                </button>
                                            </div>


                                            <div
                                                onClick={onToggleResizing}
                                                className="flex items-center gap-2 cursor-pointer mt-2 group text-xs font-mono text-left select-none"
                                            >
                                                <span className={`text-[var(--color-accent)] font-bold`}>
                                                    {isResizingEnabled ? '[x]' : '[ ]'}
                                                </span>
                                                <span className={`${isResizingEnabled ? 'text-[var(--color-fg)]' : 'text-[var(--color-muted)] group-hover:text-[var(--color-fg)]'}`}>
                                                    Enable Resizing (Experimental)
                                                </span>
                                            </div>
                                        </div>
                                    </div>


                                    <div className="border border-[var(--color-border)] p-4">
                                        <h3 className="text-[var(--color-accent)] font-bold mb-2">Stats Widget Style</h3>
                                        <div className="flex flex-col sm:flex-row gap-4 flex-wrap">
                                            <div onClick={() => onStatsModeChange('text')} className="flex items-center gap-2 cursor-pointer select-none group">
                                                <span className="font-mono text-[var(--color-accent)] font-bold">
                                                    {statsMode === 'text' ? '[x]' : '[ ]'}
                                                </span>
                                                <span className="text-[var(--color-fg)] group-hover:text-[var(--color-accent)]">Text</span>
                                            </div>
                                            <div onClick={() => onStatsModeChange('graph')} className="flex items-center gap-2 cursor-pointer select-none group">
                                                <span className="font-mono text-[var(--color-accent)] font-bold">
                                                    {statsMode === 'graph' ? '[x]' : '[ ]'}
                                                </span>
                                                <span className="text-[var(--color-fg)] group-hover:text-[var(--color-accent)]">Graphs</span>
                                            </div>
                                            <div onClick={() => onStatsModeChange('detailed')} className="flex items-center gap-2 cursor-pointer select-none group">
                                                <span className="font-mono text-[var(--color-accent)] font-bold">
                                                    {statsMode === 'detailed' ? '[x]' : '[ ]'}
                                                </span>
                                                <span className="text-[var(--color-fg)] group-hover:text-[var(--color-accent)]">Detailed</span>
                                            </div>
                                            <div onClick={() => onStatsModeChange('minimal')} className="flex items-center gap-2 cursor-pointer select-none group">
                                                <span className="font-mono text-[var(--color-accent)] font-bold">
                                                    {statsMode === 'minimal' ? '[x]' : '[ ]'}
                                                </span>
                                                <span className="text-[var(--color-fg)] group-hover:text-[var(--color-accent)]">Compact</span>
                                            </div>
                                        </div>
                                    </div>


                                    <div className="border border-[var(--color-border)] p-4">
                                        <h3 className="text-[var(--color-accent)] font-bold mb-2">Weather Style</h3>
                                        <div className="flex flex-col gap-4">

                                            <div className="flex flex-col sm:flex-row gap-4">
                                                <div onClick={() => onWeatherModeChange('standard')} className="flex items-center gap-2 cursor-pointer select-none group">
                                                    <span className="font-mono text-[var(--color-accent)] font-bold">
                                                        {weatherMode === 'standard' ? '[x]' : '[ ]'}
                                                    </span>
                                                    <span className="text-[var(--color-fg)] group-hover:text-[var(--color-accent)]">Standard</span>
                                                </div>
                                                <div onClick={() => onWeatherModeChange('icon')} className="flex items-center gap-2 cursor-pointer select-none group">
                                                    <span className="font-mono text-[var(--color-accent)] font-bold">
                                                        {weatherMode === 'icon' ? '[x]' : '[ ]'}
                                                    </span>
                                                    <span className="text-[var(--color-fg)] group-hover:text-[var(--color-accent)]">Icon Mode</span>
                                                </div>
                                            </div>


                                            <div className="flex items-center gap-4 mt-2 border-t border-[var(--color-border)] pt-2 border-dashed">
                                                <span className="text-[var(--color-muted)] text-sm">Units:</span>
                                                <div onClick={() => onTempUnitChange('C')} className="flex items-center gap-2 cursor-pointer select-none group">
                                                    <span className="font-mono text-[var(--color-accent)] font-bold">
                                                        {tempUnit === 'C' ? '[x]' : '[ ]'}
                                                    </span>
                                                    <span className="text-[var(--color-fg)] group-hover:text-[var(--color-accent)]">Celsius (°C)</span>
                                                </div>
                                                <div onClick={() => onTempUnitChange('F')} className="flex items-center gap-2 cursor-pointer select-none group">
                                                    <span className="font-mono text-[var(--color-accent)] font-bold">
                                                        {tempUnit === 'F' ? '[x]' : '[ ]'}
                                                    </span>
                                                    <span className="text-[var(--color-fg)] group-hover:text-[var(--color-accent)]">Fahrenheit (°F)</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>


                                    <div className="border border-[var(--color-border)] p-4">
                                        <h3 className="text-[var(--color-accent)] font-bold mb-2">Link Behavior</h3>
                                        <div onClick={() => onToggleOpenInNewTab?.()} className="flex items-center gap-2 cursor-pointer select-none group">
                                            <span className="font-mono text-[var(--color-accent)] font-bold">
                                                {openInNewTab ? '[x]' : '[ ]'}
                                            </span>
                                            <span className="text-[var(--color-fg)] group-hover:text-[var(--color-accent)]">Open Links in New Tab</span>
                                        </div>
                                    </div>

                                    {/* matrix */}
                                    {activeWidgets['matrix'] && (
                                        <div className="border border-[var(--color-border)] p-4 space-y-3">
                                            <h3 className="text-[var(--color-accent)] font-bold">⬡ Matrix Widget</h3>

                                            <AsciiSlider
                                                label="Drop Speed" value={funOptions.matrix.speed} min={5} max={200}
                                                displayValue={`${funOptions.matrix.speed}%`}
                                                onChange={(v) => onFunOptionsChange({ ...funOptions, matrix: { ...funOptions.matrix, speed: v } })}
                                            />

                                            <AsciiSlider
                                                label="Trail Fade" value={funOptions.matrix.fade} min={0.01} max={0.3} step={0.01}
                                                displayValue={`${Math.round((1 - funOptions.matrix.fade * 3.33) * 100)}%`}
                                                onChange={(v) => onFunOptionsChange({ ...funOptions, matrix: { ...funOptions.matrix, fade: v } })}
                                                hint="Lower = longer trails"
                                            />

                                            <AsciiSlider
                                                label="Letter Size" value={funOptions.matrix.fontSize} min={8} max={32}
                                                displayValue={`${funOptions.matrix.fontSize}px`}
                                                onChange={(v) => onFunOptionsChange({ ...funOptions, matrix: { ...funOptions.matrix, fontSize: v } })}
                                            />


                                            <div className="flex items-center justify-between">
                                                <span className="text-xs text-[var(--color-fg)]">Glow Letters</span>
                                                <div
                                                    onClick={() => onFunOptionsChange({ ...funOptions, matrix: { ...funOptions.matrix, glow: !funOptions.matrix.glow } })}
                                                    className="cursor-pointer text-xs font-mono text-[var(--color-accent)] hover:text-[var(--color-fg)] transition-colors select-none"
                                                >
                                                    {funOptions.matrix.glow ? '[x]' : '[ ]'}
                                                </div>
                                            </div>


                                            <div>
                                                <div className="text-xs text-[var(--color-fg)] mb-2">Character Set</div>
                                                <div className="flex flex-wrap gap-2 text-xs">
                                                    {(['mixed', 'numbers', 'latin'] as const).map((mode) => (
                                                        <div
                                                            key={mode}
                                                            onClick={() => onFunOptionsChange({ ...funOptions, matrix: { ...funOptions.matrix, charSet: mode } })}
                                                            className={`cursor-pointer px-2 py-1 border ${funOptions.matrix.charSet === mode ? 'border-[var(--color-accent)] text-[var(--color-accent)]' : 'border-[var(--color-border)] text-[var(--color-muted)]'}`}
                                                        >
                                                            {mode.charAt(0).toUpperCase() + mode.slice(1)}
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                    {/* pipes */}
                                    {activeWidgets['pipes'] && (
                                        <div className="border border-[var(--color-border)] p-4 space-y-3">
                                            <h3 className="text-[var(--color-accent)] font-bold">⬡ Pipes Widget</h3>

                                            <AsciiSlider
                                                label="Draw Speed" value={funOptions.pipes.speed} min={5} max={200}
                                                displayValue={`${funOptions.pipes.speed}%`}
                                                onChange={(v) => onFunOptionsChange({ ...funOptions, pipes: { ...funOptions.pipes, speed: v } })}
                                            />

                                            <AsciiSlider
                                                label="Trail Length" value={funOptions.pipes.fade} min={0.01} max={0.5} step={0.01}
                                                displayValue={`${Math.round((1 - funOptions.pipes.fade * 2) * 100)}%`}
                                                onChange={(v) => onFunOptionsChange({ ...funOptions, pipes: { ...funOptions.pipes, fade: v } })}
                                                hint="Lower = longer trails"
                                            />

                                            <AsciiSlider
                                                label="Lifetime" value={funOptions.pipes.lifetime} min={20} max={300} step={5}
                                                displayValue={`${funOptions.pipes.lifetime} steps`}
                                                onChange={(v) => onFunOptionsChange({ ...funOptions, pipes: { ...funOptions.pipes, lifetime: v } })}
                                                hint="How long before a pipe resets"
                                            />

                                            <AsciiSlider
                                                label="Pipe Count" value={funOptions.pipes.count} min={1} max={10}
                                                onChange={(v) => onFunOptionsChange({ ...funOptions, pipes: { ...funOptions.pipes, count: v } })}
                                            />

                                            <AsciiSlider
                                                label="Pipe Size" value={funOptions.pipes.fontSize} min={8} max={32}
                                                displayValue={`${funOptions.pipes.fontSize}px`}
                                                onChange={(v) => onFunOptionsChange({ ...funOptions, pipes: { ...funOptions.pipes, fontSize: v } })}
                                            />
                                        </div>
                                    )}
                                    {/* donut */}
                                    {activeWidgets['donut'] && (
                                        <div className="border border-[var(--color-border)] p-4 space-y-3">
                                            <h3 className="text-[var(--color-accent)] font-bold">⬡ Donut Widget</h3>

                                            <AsciiSlider
                                                label="Spin Speed" value={funOptions.donut.speed} min={5} max={200}
                                                displayValue={`${funOptions.donut.speed}%`}
                                                onChange={(v) => onFunOptionsChange({ ...funOptions, donut: { ...funOptions.donut, speed: v } })}
                                            />
                                        </div>
                                    )}
                                    {/* snake */}
                                    {activeWidgets['snake'] && (
                                        <div className="border border-[var(--color-border)] p-4 space-y-3">
                                            <h3 className="text-[var(--color-accent)] font-bold">⬡ Snake Widget</h3>
                                            <AsciiSlider
                                                label="Speed" value={funOptions.snake.speed} min={5} max={100}
                                                displayValue={`${funOptions.snake.speed}%`}
                                                onChange={(v) => onFunOptionsChange({ ...funOptions, snake: { ...funOptions.snake, speed: v } })}
                                            />
                                        </div>
                                    )}
                                    {/* game of life */}
                                    {activeWidgets['life'] && (
                                        <div className="border border-[var(--color-border)] p-4 space-y-3">
                                            <h3 className="text-[var(--color-accent)] font-bold">⬡ Conway's Life Widget</h3>
                                            <AsciiSlider
                                                label="Speed" value={funOptions.life.speed} min={5} max={100}
                                                displayValue={`${funOptions.life.speed}%`}
                                                onChange={(v) => onFunOptionsChange({ ...funOptions, life: { ...funOptions.life, speed: v } })}
                                            />
                                        </div>
                                    )}
                                    {/* fireworks */}
                                    {activeWidgets['fireworks'] && (
                                        <div className="border border-[var(--color-border)] p-4 space-y-3">
                                            <h3 className="text-[var(--color-accent)] font-bold">⬡ Fireworks Widget</h3>
                                            <AsciiSlider
                                                label="Explosion Size" value={funOptions.fireworks.explosionSize ?? 50} min={10} max={200}
                                                displayValue={`${funOptions.fireworks.explosionSize ?? 50}%`}
                                                onChange={(v) => onFunOptionsChange({ ...funOptions, fireworks: { ...funOptions.fireworks, explosionSize: v } })}
                                            />
                                            <AsciiSlider
                                                label="Frequency" value={funOptions.fireworks.speed} min={55} max={400}
                                                displayValue={`${funOptions.fireworks.speed}%`}
                                                onChange={(v) => onFunOptionsChange({ ...funOptions, fireworks: { ...funOptions.fireworks, speed: v } })}
                                            />
                                        </div>
                                    )}
                                    {/* starfield */}
                                    {activeWidgets['starfield'] && (
                                        <div className="border border-[var(--color-border)] p-4 space-y-3">
                                            <h3 className="text-[var(--color-accent)] font-bold">⬡ Starfield Widget</h3>
                                            <AsciiSlider
                                                label="Warp Speed" value={funOptions.starfield.speed} min={5} max={100}
                                                displayValue={`${funOptions.starfield.speed}%`}
                                                onChange={(v) => onFunOptionsChange({ ...funOptions, starfield: { ...funOptions.starfield, speed: v } })}
                                            />
                                        </div>
                                    )}
                                    {/* rain */}
                                    {activeWidgets['rain'] && (
                                        <div className="border border-[var(--color-border)] p-4 space-y-3">
                                            <h3 className="text-[var(--color-accent)] font-bold">⬡ Rain Widget</h3>
                                            <AsciiSlider
                                                label="Intensity" value={funOptions.rain.speed} min={5} max={100}
                                                displayValue={`${funOptions.rain.speed}%`}
                                                onChange={(v) => onFunOptionsChange({ ...funOptions, rain: { ...funOptions.rain, speed: v } })}
                                            />
                                        </div>
                                    )}
                                    {/* maze */}
                                    {activeWidgets['maze'] && (
                                        <div className="border border-[var(--color-border)] p-4 space-y-3">
                                            <h3 className="text-[var(--color-accent)] font-bold">⬡ Maze Widget</h3>
                                            <AsciiSlider
                                                label="Generation Speed" value={funOptions.maze.speed} min={5} max={100}
                                                displayValue={`${funOptions.maze.speed}%`}
                                                onChange={(v) => onFunOptionsChange({ ...funOptions, maze: { ...funOptions.maze, speed: v } })}
                                            />
                                        </div>
                                    )}

                                    <div className="border border-[var(--color-border)] p-4">
                                        <h3 className="text-[var(--color-accent)] font-bold mb-2">Custom CSS</h3>
                                        <p className="text-[var(--color-muted)] text-xs mb-2">Override theme styles. Saved locally.</p>
                                        <textarea
                                            className="w-full h-40 bg-[var(--color-bg)] border border-[var(--color-border)] text-[var(--color-fg)] p-2 font-mono text-xs focus:border-[var(--color-accent)] outline-none select-text"
                                            placeholder=".tui-box { border-radius: 10px; }"
                                            value={customCss}
                                            onChange={(e) => onCustomCssChange(e.target.value)}
                                        />
                                    </div>


                                    <div className="border border-[var(--color-border)] p-4">
                                        <h3 className="text-[var(--color-accent)] font-bold mb-2">Export / Import Settings</h3>
                                        <p className="text-[var(--color-muted)] text-xs mb-3">Backup all settings to a JSON file, or restore from a previous backup.</p>
                                        <div className="flex gap-3 flex-wrap">
                                            <button
                                                onClick={() => {
                                                    const data: Record<string, any> = {};
                                                    for (let i = 0; i < localStorage.length; i++) {
                                                        const key = localStorage.key(i);
                                                        if (key && key.startsWith('tui-')) {
                                                            try {
                                                                data[key] = JSON.parse(localStorage.getItem(key)!);
                                                            } catch {
                                                                data[key] = localStorage.getItem(key);
                                                            }
                                                        }
                                                    }
                                                    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
                                                    const url = URL.createObjectURL(blob);
                                                    const a = document.createElement('a');
                                                    a.href = url;
                                                    a.download = `tui-dashboard-settings-${new Date().toISOString().slice(0, 10)}.json`;
                                                    a.click();
                                                    URL.revokeObjectURL(url);
                                                }}
                                                className="px-4 py-1 border border-[var(--color-border)] text-[var(--color-fg)] hover:border-[var(--color-accent)] hover:text-[var(--color-accent)] text-xs font-mono no-radius transition-colors"
                                            >
                                                [ EXPORT ]
                                            </button>
                                            <button
                                                onClick={() => {
                                                    const input = document.createElement('input');
                                                    input.type = 'file';
                                                    input.accept = '.json';
                                                    input.onchange = (e: any) => {
                                                        const file = e.target.files?.[0];
                                                        if (!file) return;
                                                        const reader = new FileReader();
                                                        reader.onload = (ev) => {
                                                            try {
                                                                const data = JSON.parse(ev.target?.result as string);
                                                                if (typeof data !== 'object' || data === null) {
                                                                    alert('Invalid settings file.');
                                                                    return;
                                                                }
                                                                Object.entries(data).forEach(([key, value]) => {
                                                                    if (key.startsWith('tui-')) {
                                                                        localStorage.setItem(key, JSON.stringify(value));
                                                                    }
                                                                });
                                                                window.location.reload();
                                                            } catch {
                                                                alert('Failed to parse settings file.');
                                                            }
                                                        };
                                                        reader.readAsText(file);
                                                    };
                                                    input.click();
                                                }}
                                                className="px-4 py-1 border border-[var(--color-border)] text-[var(--color-fg)] hover:border-[var(--color-accent)] hover:text-[var(--color-accent)] text-xs font-mono no-radius transition-colors"
                                            >
                                                [ IMPORT ]
                                            </button>
                                        </div>
                                    </div>

                                    <div className="text-[10px] text-[var(--color-muted)] mt-6 text-center opacity-50 font-mono">
                                        v2.1
                                    </div>
                                </div>
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
