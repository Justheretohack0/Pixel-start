import React, { useState, useRef, useEffect, useCallback } from 'react';
import { Theme } from '../types';
import { hexToHsv, hsvToHex } from '../utils/colorUtils';

interface ThemeMakerState {
    name: string;
    bg: string;
    fg: string;
    accent: string;
    muted: string;
    border: string;
    hover: string;
}

interface ThemeMakerProps {
    onSave: (theme: Theme) => void;
    onClose: () => void;
    initialTheme?: Theme;
}

// --- Picker Components ---

interface SatValBoxProps {
    hsv: { h: number, s: number, v: number };
    onChange: (newHsv: { h: number, s: number, v: number }) => void;
}

const SatValBox: React.FC<SatValBoxProps> = ({ hsv, onChange }) => {
    const boxRef = useRef<HTMLDivElement>(null);
    const [isDragging, setIsDragging] = useState(false);

    const handleMove = useCallback((e: MouseEvent) => {
        if (!boxRef.current) return;
        const rect = boxRef.current.getBoundingClientRect();
        const x = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
        const y = Math.max(0, Math.min(1, (e.clientY - rect.top) / rect.height));

        // x is saturation (0..100), y is value (100..0)
        onChange({ ...hsv, s: x * 100, v: (1 - y) * 100 });
    }, [hsv, onChange]);

    useEffect(() => {
        const up = () => setIsDragging(false);
        const move = (e: MouseEvent) => { if (isDragging) handleMove(e); };

        if (isDragging) {
            window.addEventListener('mouseup', up);
            window.addEventListener('mousemove', move);
        }

        return () => {
            window.removeEventListener('mouseup', up);
            window.removeEventListener('mousemove', move);
        };
    }, [isDragging, handleMove]);

    return (
        <div
            ref={boxRef}
            className="w-full h-32 relative cursor-crosshair border border-[var(--color-border)] mb-2"
            style={{
                backgroundColor: `hsl(${hsv.h}, 100%, 50%)`,
                backgroundImage: 'linear-gradient(to right, #fff, transparent), linear-gradient(to top, #000, transparent)'
            }}
            onMouseDown={(e) => {
                setIsDragging(true);
                handleMove(e.nativeEvent);
            }}
        >
            <div
                className="absolute w-3 h-3 border-2 border-black bg-white rounded-full -ml-1.5 -mt-1.5 shadow-sm pointer-events-none mix-blend-difference"
                style={{
                    left: `${hsv.s}%`,
                    top: `${100 - hsv.v}%`
                }}
            />
        </div>
    );
};

interface HueSliderProps {
    hsv: { h: number, s: number, v: number };
    onChange: (newHsv: { h: number, s: number, v: number }) => void;
}

const HueSlider: React.FC<HueSliderProps> = ({ hsv, onChange }) => {
    const sliderRef = useRef<HTMLDivElement>(null);
    const [isDragging, setIsDragging] = useState(false);

    const handleMove = useCallback((e: MouseEvent) => {
        if (!sliderRef.current) return;
        const rect = sliderRef.current.getBoundingClientRect();
        const x = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
        onChange({ ...hsv, h: x * 360 });
    }, [hsv, onChange]);

    useEffect(() => {
        const up = () => setIsDragging(false);
        const move = (e: MouseEvent) => { if (isDragging) handleMove(e); };

        if (isDragging) {
            window.addEventListener('mouseup', up);
            window.addEventListener('mousemove', move);
        }

        return () => {
            window.removeEventListener('mouseup', up);
            window.removeEventListener('mousemove', move);
        };
    }, [isDragging, handleMove]);

    return (

        <div
            ref={sliderRef}
            className="w-full h-4 relative cursor-crosshair mb-2"
            style={{
                background: 'linear-gradient(to right, #f00, #ff0, #0f0, #0ff, #00f, #f0f, #f00)',
                borderRadius: 'var(--widget-radius)'
            }}
            onMouseDown={(e) => {
                setIsDragging(true);
                handleMove(e.nativeEvent);
            }}
        >
            <div
                className="absolute w-2 h-full bg-white border border-black -ml-1 pointer-events-none"
                style={{ left: `${(hsv.h / 360) * 100}%` }}
            />
        </div>
    );
};

interface TuiColorPickerProps {
    label: string;
    value: string;
    onChange: (val: string) => void;
}

const TuiColorPicker: React.FC<TuiColorPickerProps> = ({ label, value, onChange }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [hsv, setHsv] = useState(hexToHsv(value));
    const wrapperRef = useRef<HTMLDivElement>(null);

    // Sync internal state if external value changes (and we aren't dragging ideally, but simple sync is fine)
    useEffect(() => {
        setHsv(hexToHsv(value));
    }, [value]);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };
        if (isOpen) document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [isOpen]);

    const handleHsvChange = (newHsv: { h: number, s: number, v: number }) => {
        setHsv(newHsv);
        onChange(hsvToHex(newHsv.h, newHsv.s, newHsv.v));
    };

    return (
        <div className="flex flex-col gap-1 p-2 border-b border-[var(--color-border)] last:border-0 border-opacity-30 relative" ref={wrapperRef}>
            <div className="flex items-center justify-between">
                <span className="font-mono text-sm uppercase text-[var(--color-accent)]">{label}</span>
                <div className="flex items-center gap-2">
                    <input
                        type="text"
                        value={value}
                        onChange={(e) => {
                            onChange(e.target.value);
                            setHsv(hexToHsv(e.target.value));
                        }}
                        className="bg-transparent border-b border-[var(--color-muted)] text-[var(--color-fg)] font-mono text-xs w-20 px-1 focus:border-[var(--color-accent)] outline-none text-right"
                    />
                    <div
                        onClick={() => setIsOpen(!isOpen)}
                        className="w-6 h-6 border border-[var(--color-border)] cursor-pointer hover:border-[var(--color-accent)]"
                        style={{ backgroundColor: value }}
                    />
                </div>
            </div>

            {isOpen && (
                <div className="absolute top-full right-0 mt-1 p-3 bg-[var(--color-bg)] border border-[var(--color-accent)] z-50 w-64 shadow-2xl">
                    <SatValBox hsv={hsv} onChange={handleHsvChange} />
                    <HueSlider hsv={hsv} onChange={handleHsvChange} />
                    <div className="text-right text-[10px] text-[var(--color-muted)] tracking-widest uppercase">
                        H:{Math.round(hsv.h)} S:{Math.round(hsv.s)} V:{Math.round(hsv.v)}
                    </div>
                </div>
            )}
        </div>
    );
};

export const ThemeMaker: React.FC<ThemeMakerProps> = ({ onSave, onClose, initialTheme }) => {
    const [state, setState] = useState<ThemeMakerState>({
        name: initialTheme?.name || '',
        bg: initialTheme?.colors.bg || '#0d0d0d',
        fg: initialTheme?.colors.fg || '#e0e0e0',
        accent: initialTheme?.colors.accent || '#ffffff',
        muted: initialTheme?.colors.muted || '#777777',
        border: initialTheme?.colors.border || '#333333',
        hover: initialTheme?.colors.hover || '#222222',
    });

    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [isDragging, setIsDragging] = useState(false);
    const dragStartPos = useRef({ x: 0, y: 0 });
    const containerRef = useRef<HTMLDivElement>(null);

    // Save handler
    const handleSave = () => {
        if (!state.name.trim()) return;

        const newTheme: Theme = {
            name: state.name.trim(),
            colors: {
                bg: state.bg,
                fg: state.fg,
                accent: state.accent,
                muted: state.muted,
                border: state.border,
                hover: state.hover,
            }
        };
        onSave(newTheme);
    };

    // Drag handlers (copied from Settings.tsx pattern)
    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            if (isDragging) {
                const newX = e.clientX - dragStartPos.current.x;
                const newY = e.clientY - dragStartPos.current.y;
                setPosition({ x: newX, y: newY });
            }
        };

        const handleMouseUp = () => {
            setIsDragging(false);
        };

        if (isDragging) {
            window.addEventListener('mousemove', handleMouseMove);
            window.addEventListener('mouseup', handleMouseUp);
        }

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('mouseup', handleMouseUp);
        };
    }, [isDragging]);

    const handleMouseDown = (e: React.MouseEvent) => {
        // Only drag from header
        const target = e.target as HTMLElement;
        if (target.closest('[data-drag-handle]')) {
            setIsDragging(true);
            dragStartPos.current = {
                x: e.clientX - position.x,
                y: e.clientY - position.y
            };
        }
    };

    return (
        <div
            ref={containerRef}
            style={{
                transform: `translate(${position.x}px, ${position.y}px)`,
            }}
            className="fixed top-1/2 left-1/2 -ml-[300px] -mt-[250px] w-[600px] h-[550px] bg-[var(--color-bg)] border border-[var(--color-border)] shadow-2xl z-50 flex flex-col font-mono text-[var(--color-accent)] modal-rounded overflow-hidden"
        >
            {/* Header */}
            <div
                data-drag-handle
                onMouseDown={handleMouseDown}
                className="flex justify-between items-center p-2 border-b border-[var(--color-border)] bg-[var(--color-hover)] cursor-move select-none"
            >
                <div className="flex items-center gap-2">
                    <span className="text-[var(--color-accent)] font-bold">⬡</span>
                    <span className="font-bold text-[var(--color-accent)]">theme_maker.exe</span>
                </div>
                <button
                    onClick={onClose}
                    className="text-[var(--color-muted)] hover:text-[var(--color-accent)] transition-colors px-2"
                >
                    [x]
                </button>
            </div>

            <div className="flex-1 flex overflow-hidden">
                {/* Controls Sidebar */}
                <div className="w-1/2 border-r border-[var(--color-border)] p-4 overflow-y-auto space-y-6">
                    {/* Name Input */}
                    <div className="space-y-2">
                        <label className="text-xs uppercase text-[var(--color-accent)] font-bold">Theme Name</label>
                        <input
                            type="text"
                            value={state.name}
                            onChange={(e) => setState({ ...state, name: e.target.value })}
                            placeholder="my_cool_theme"
                            className="w-full bg-[var(--color-bg)] border border-[var(--color-border)] text-[var(--color-fg)] px-2 py-1 outline-none focus:border-[var(--color-accent)] font-mono"
                        />
                    </div>

                    {/* Colors */}
                    <div className="space-y-1 border border-[var(--color-border)]" style={{ borderRadius: 'var(--widget-radius)' }}>
                        <TuiColorPicker label="Background" value={state.bg} onChange={(v) => setState(prev => ({ ...prev, bg: v }))} />
                        <TuiColorPicker label="Foreground" value={state.fg} onChange={(v) => setState(prev => ({ ...prev, fg: v }))} />
                        <TuiColorPicker label="Accent" value={state.accent} onChange={(v) => setState(prev => ({ ...prev, accent: v }))} />
                        <TuiColorPicker label="Muted" value={state.muted} onChange={(v) => setState(prev => ({ ...prev, muted: v }))} />
                        <TuiColorPicker label="Border" value={state.border} onChange={(v) => setState(prev => ({ ...prev, border: v }))} />
                        <TuiColorPicker label="Hover" value={state.hover} onChange={(v) => setState(prev => ({ ...prev, hover: v }))} />
                    </div>

                    {/* Actions */}
                    <div className="flex gap-2 pt-4">
                        <button
                            onClick={handleSave}
                            disabled={!state.name.trim()}
                            className="flex-1 bg-[var(--color-accent)] text-[var(--color-bg)] font-bold py-2 hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            SAVE
                        </button>
                        <button
                            onClick={onClose}
                            className="flex-1 border border-[var(--color-border)] text-[var(--color-fg)] py-2 hover:bg-[var(--color-hover)]"
                        >
                            CANCEL
                        </button>
                    </div>
                </div>

                {/* Live Preview */}
                <div
                    className="w-1/2 p-4 flex flex-col gap-4 relative"
                    style={{
                        backgroundColor: state.bg,
                        color: state.fg,
                        borderColor: state.border
                    }}
                >
                    <div className="absolute inset-0 pointer-events-none border-2 border-dashed border-white opacity-20 m-2 flex items-center justify-center">
                        <span className="bg-black text-white px-2 py-1 text-xs">PREVIEW AREA</span>
                    </div>

                    {/* Dummy UI Elements to show off the theme */}
                    <div className="z-10 flex flex-col gap-4 h-full">
                        <div className="border-b" style={{ borderColor: state.border, paddingBottom: '0.5rem' }}>
                            <span style={{ color: state.accent, fontWeight: 'bold' }}>user@terminal:~$</span> list
                        </div>

                        <div className="grid grid-cols-2 gap-2">
                            <div className="p-2 border" style={{ borderColor: state.border, backgroundColor: state.hover }}>
                                <span style={{ color: state.accent }}>Box 1 (Hover)</span>
                            </div>
                            <div className="p-2 border" style={{ borderColor: state.border }}>
                                <span>Box 2</span>
                            </div>
                        </div>

                        <div className="space-y-1 text-sm">
                            <div className="flex justify-between">
                                <span>CPU Usage</span>
                                <span style={{ color: state.accent }}>42%</span>
                            </div>
                            <div className="w-full h-2 overflow-hidden" style={{ backgroundColor: state.border, borderRadius: 'var(--widget-radius)' }}>
                                <div className="h-full w-[42%]" style={{ backgroundColor: state.accent }} />
                            </div>
                        </div>

                        <div className="mt-auto pt-4 border-t" style={{ borderColor: state.border, color: state.muted }}>
                            <p className="text-xs">System status: ONLINE</p>
                            <p className="text-xs">Last login: Today</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
