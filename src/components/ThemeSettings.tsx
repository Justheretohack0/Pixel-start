import React, { useState } from 'react';
import { useTheme } from '../hooks/useTheme';
import { themes } from '../lib/themes';

export const ThemeSettings: React.FC = () => {
  const { theme, setTheme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Settings Trigger */}
      <div className="fixed top-4 right-4 z-50">
        <button
          onClick={() => setIsOpen(true)}
          className="text-text font-medium opacity-50 hover:opacity-100 transition-opacity duration-200 focus:opacity-100 outline-none focus-visible:ring-2 focus-visible:ring-primary rounded px-2 py-1"
          aria-label="Open settings"
        >
          Settings
        </button>
      </div>

      {/* Settings Modal */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm" onClick={() => setIsOpen(false)}>
          <div
            className="bg-surface p-6 rounded-lg shadow-xl w-full max-w-md mx-4 border border-white/10"
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
            aria-labelledby="settings-title"
          >
            <div className="flex justify-between items-center mb-6">
              <h2 id="settings-title" className="text-xl font-bold text-text">Appearance</h2>
              <button
                onClick={() => setIsOpen(false)}
                className="text-muted hover:text-text transition-colors p-1 rounded hover:bg-white/5"
                aria-label="Close settings"
              >
                ✕
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-muted mb-3">
                  Select Theme
                </label>
                <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
                  {Object.entries(themes).map(([key, value]) => (
                    <button
                      key={key}
                      onClick={() => setTheme(key)}
                      className={`
                        px-3 py-2 rounded-md text-sm font-medium transition-all
                        border-2 flex items-center gap-2 text-left
                        ${theme === key
                          ? 'border-primary bg-primary/10 text-primary'
                          : 'border-transparent bg-background hover:bg-background/80 hover:border-muted text-text'}
                      `}
                      aria-pressed={theme === key}
                    >
                      <span
                        className="w-4 h-4 rounded-full border border-white/20 shadow-sm"
                        style={{ backgroundColor: value.colors['--color-background'] }}
                      />
                      {value.name}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-8 pt-4 border-t border-white/10 text-xs text-muted text-center flex justify-between items-center">
              <span>Palette Theme Engine</span>
              <span>v1.0</span>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
