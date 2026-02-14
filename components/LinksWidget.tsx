import React from 'react';
import { LinkGroup } from '../types';

interface LinksWidgetProps {
    groups: LinkGroup[];
    openInNewTab?: boolean;
}

export const LinksWidget: React.FC<LinksWidgetProps> = ({ groups, openInNewTab = true }) => {
    return (
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 h-full overflow-y-auto custom-scrollbar pr-2">
            {groups.map((group) => (
                <div key={group.category} className="flex flex-col gap-2 min-w-0">
                    <h4 className="text-[var(--color-muted)] text-xs font-bold uppercase mb-1 tracking-wider border-b border-[var(--color-border)] pb-1 w-max">
                        {group.category}
                    </h4>
                    {group.links.length === 0 && (
                        <span className="text-[var(--color-muted)] text-xs italic opacity-50">empty</span>
                    )}
                    {group.links.map(link => (
                        <a
                            key={`${link.label}-${link.url}`}
                            href={link.url}
                            target={openInNewTab ? "_blank" : "_self"}
                            rel="noopener noreferrer"
                            className="text-[var(--color-muted)] hover:text-[var(--color-fg)] hover:text-shadow-glow transition-all duration-[20ms] text-sm truncate block"
                            title={link.url}
                        >
                            &gt; {link.label}
                        </a>
                    ))}
                </div>
            ))}
            {groups.length === 0 && (
                <div className="col-span-full flex items-center justify-center text-[var(--color-muted)]">
                    No shortcuts configured. Open settings (top right) to add some.
                </div>
            )}
        </div>
    );
};