import React, { useState } from 'react';
import { LinkGroup } from '../../types';

interface SettingsShortcutsTabProps {
    linkGroups: LinkGroup[];
    onUpdateLinks: (groups: LinkGroup[]) => void;
}

export const SettingsShortcutsTab: React.FC<SettingsShortcutsTabProps> = ({
    linkGroups,
    onUpdateLinks,
}) => {
    const [newCatName, setNewCatName] = useState('');
    const [newLinkInputs, setNewLinkInputs] = useState<Record<string, { label: string, url: string }>>({});

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

    return (
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
    );
};
