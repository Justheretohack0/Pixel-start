
import React, { useState, useEffect, useRef } from 'react';

const ENGINES = [
    { id: 'google', label: 'google', url: 'https://www.google.com/search?q=' },
    { id: 'ddg', label: 'duckduckgo', url: 'https://duckduckgo.com/?q=' },
    { id: 'bing', label: 'bing', url: 'https://www.bing.com/search?q=' },
    { id: 'youtube', label: 'youtube', url: 'https://www.youtube.com/results?search_query=' },
    { id: 'reddit', label: 'reddit', url: 'https://www.reddit.com/search/?q=' },
    { id: 'github', label: 'github', url: 'https://github.com/search?q=' },
];

export const SearchWidget: React.FC = () => {
    const [query, setQuery] = useState('');
    const [engineIndex, setEngineIndex] = useState(0);
    const [history, setHistory] = useState<string[]>([]);
    const [showHistory, setShowHistory] = useState(false);
    
    const inputRef = useRef<HTMLInputElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);

    // Persist engine selection and History
    useEffect(() => {
        const savedEngine = localStorage.getItem('tui-search-engine');
        if (savedEngine) {
            const index = ENGINES.findIndex(e => e.id === savedEngine);
            if (index !== -1) setEngineIndex(index);
        }

        try {
            const savedHistory = localStorage.getItem('tui-search-history');
            if (savedHistory) setHistory(JSON.parse(savedHistory));
        } catch (e) {}
    }, []);

    // Handle clicking outside to close history
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
                setShowHistory(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const cycleEngine = () => {
        const nextIndex = (engineIndex + 1) % ENGINES.length;
        setEngineIndex(nextIndex);
        localStorage.setItem('tui-search-engine', ENGINES[nextIndex].id);
        inputRef.current?.focus();
    };

    const saveToHistory = (q: string) => {
        const clean = q.trim();
        if (!clean) return;
        
        setHistory(prev => {
            // Remove duplicates of current query, add to top, limit to 8
            const next = [clean, ...prev.filter(x => x !== clean)].slice(0, 8);
            localStorage.setItem('tui-search-history', JSON.stringify(next));
            return next;
        });
    };

    const clearHistory = (e: React.MouseEvent) => {
        e.stopPropagation();
        setHistory([]);
        localStorage.removeItem('tui-search-history');
        inputRef.current?.focus();
    };

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        if (!query.trim()) return;

        saveToHistory(query);

        const currentEngine = ENGINES[engineIndex];
        window.open(currentEngine.url + encodeURIComponent(query), '_blank');
        setQuery('');
        setShowHistory(false);
        inputRef.current?.blur();
    };

    const handleSelectHistory = (item: string) => {
        setQuery(item);
        inputRef.current?.focus();
        // Optional: Auto-search on click? 
        // For now just fill input to let user edit or hit enter.
    };

    const currentEngine = ENGINES[engineIndex];

    return (
        <div 
            ref={containerRef} 
            className="h-full flex flex-col justify-center px-2 relative"
        >
            <form onSubmit={handleSearch} className="flex items-center gap-2 w-full z-20">
                <button 
                    type="button"
                    onClick={cycleEngine}
                    className="shrink-0 text-[var(--color-accent)] hover:text-[var(--color-fg)] font-bold font-mono transition-colors select-none"
                    title="Click to switch search engine"
                >
                    [{currentEngine.label}]
                </button>
                <div className="flex-1 relative group">
                     <span className="absolute left-0 top-1/2 -translate-y-1/2 text-[var(--color-muted)] font-bold pointer-events-none">
                        &gt;
                    </span>
                    <input 
                        ref={inputRef}
                        type="text" 
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        onFocus={() => setShowHistory(true)}
                        className="w-full bg-transparent border-none outline-none text-[var(--color-fg)] placeholder-[var(--color-muted)] font-mono pl-4 focus:placeholder-opacity-50 h-full py-1"
                        placeholder="search..."
                        autoComplete="off"
                    />
                </div>
                <button 
                    type="submit"
                    className="text-[var(--color-muted)] hover:text-[var(--color-fg)] text-xs font-mono"
                >
                    [ENTER]
                </button>
            </form>

            {/* History Dropdown */}
            {showHistory && history.length > 0 && (
                <div className="absolute top-[70%] left-0 w-full z-30 px-2">
                    <div className="bg-[var(--color-bg)] border border-[var(--color-border)] shadow-xl animate-in fade-in slide-in-from-top-2 duration-100">
                        <div className="flex justify-between items-center px-2 py-1 border-b border-[var(--color-border)] bg-[var(--color-hover)]">
                            <span className="text-[10px] text-[var(--color-muted)] font-mono uppercase">History</span>
                            <button 
                                onClick={clearHistory}
                                className="text-[10px] text-[var(--color-accent)] hover:text-red-500 font-mono"
                            >
                                [CLEAR]
                            </button>
                        </div>
                        <div className="max-h-[120px] overflow-y-auto custom-scrollbar">
                            {history.map((item, i) => (
                                <div 
                                    key={i}
                                    onClick={() => handleSelectHistory(item)}
                                    className="px-2 py-1.5 text-xs text-[var(--color-fg)] hover:bg-[var(--color-hover)] hover:text-[var(--color-accent)] cursor-pointer truncate font-mono border-b border-[var(--color-border)] border-opacity-10 last:border-0"
                                >
                                    {item}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};
