import React from 'react';

export interface OperationalDataItem {
  label: string;
  value: string;
  subtext?: string;
  badge?: string;
  highlight?: boolean;
}

export interface OperationalDataPanelProps {
  title?: string;
  subtitle?: string;
  eyebrow?: string;
  items?: OperationalDataItem[];
  columns?: 2 | 3 | 4;
  theme?: 'warm' | 'forest' | 'dark';
  footnote?: string;
  children?: React.ReactNode;
  className?: string;
}

export const OperationalDataPanel: React.FC<OperationalDataPanelProps> = ({
  title,
  subtitle,
  eyebrow,
  items,
  columns = 3,
  theme = 'warm',
  footnote,
  children,
  className = '',
}) => {
  const themeStyles = {
    warm: 'bg-[#F6F2E9] border-[#12372A]/15 text-[#17201B]',
    forest: 'bg-[#12372A] border-[#C6A15B]/30 text-[#F6F2E9]',
    dark: 'bg-[#17201B] border-[#1F8A5B]/30 text-[#F6F2E9]',
  };

  const titleStyles = {
    warm: 'text-[#12372A]',
    forest: 'text-white',
    dark: 'text-white',
  };

  const eyebrowStyles = {
    warm: 'text-[#1F8A5B] bg-[#1F8A5B]/10 border-[#1F8A5B]/20',
    forest: 'text-[#C6A15B] bg-[#C6A15B]/15 border-[#C6A15B]/30',
    dark: 'text-[#C6A15B] bg-[#C6A15B]/15 border-[#C6A15B]/30',
  };

  const itemCardStyles = {
    warm: 'bg-white/80 border-[#12372A]/10 text-[#17201B]',
    forest: 'bg-[#17201B]/40 border-[#C6A15B]/20 text-[#F6F2E9]',
    dark: 'bg-[#12372A]/40 border-[#1F8A5B]/20 text-[#F6F2E9]',
  };

  const gridCols = {
    2: 'grid-cols-1 md:grid-cols-2',
    3: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
    4: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-4',
  };

  return (
    <div
      className={`rounded-2xl border p-6 sm:p-8 md:p-10 shadow-sm relative overflow-hidden transition-all ${
        themeStyles[theme]
      } ${className}`}
    >
      {(eyebrow || title || subtitle) && (
        <div className="mb-8 space-y-2.5">
          {eyebrow && (
            <span
              className={`inline-block px-3 py-1 text-xs font-mono font-bold tracking-widest uppercase rounded-full border ${eyebrowStyles[theme]}`}
            >
              {eyebrow}
            </span>
          )}
          {title && (
            <h3 className={`font-serif text-2xl sm:text-3xl font-bold ${titleStyles[theme]}`}>
              {title}
            </h3>
          )}
          {subtitle && (
            <p className="font-sans text-sm sm:text-base opacity-80 max-w-2xl leading-relaxed">
              {subtitle}
            </p>
          )}
        </div>
      )}

      {items && items.length > 0 && (
        <div className={`grid gap-4 sm:gap-6 ${gridCols[columns]}`}>
          {items.map((item, idx) => (
            <div
              key={idx}
              className={`rounded-xl border p-5 transition-all flex flex-col justify-between ${
                itemCardStyles[theme]
              } ${item.highlight ? 'ring-1 ring-[#C6A15B]' : ''}`}
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-2">
                  <span className="font-sans text-xs sm:text-sm font-semibold tracking-wide uppercase opacity-75">
                    {item.label}
                  </span>
                  {item.badge && (
                    <span className="px-2 py-0.5 font-mono text-[10px] font-bold tracking-wider uppercase rounded bg-[#C6A15B]/20 text-[#C6A15B] border border-[#C6A15B]/30">
                      {item.badge}
                    </span>
                  )}
                </div>
                <div className="font-mono text-xl sm:text-2xl lg:text-3xl font-bold tracking-tight text-[#1F8A5B] my-1">
                  {item.value}
                </div>
              </div>
              {item.subtext && (
                <p className="font-sans text-xs sm:text-sm opacity-70 mt-2 border-t border-current/10 pt-2 leading-snug">
                  {item.subtext}
                </p>
              )}
            </div>
          ))}
        </div>
      )}

      {children && <div className={items && items.length > 0 ? 'mt-6' : ''}>{children}</div>}

      {footnote && (
        <p className="mt-6 pt-4 border-t border-current/10 font-mono text-xs opacity-65 leading-relaxed">
          * {footnote}
        </p>
      )}
    </div>
  );
};
