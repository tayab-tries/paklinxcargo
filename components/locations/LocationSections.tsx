import React from 'react';
import Link from 'next/link';
import { ArrowRight, CheckCircle2 } from 'lucide-react';
import { Container } from '@/components/ui/Container';

export interface LocationSectionsProps {
  sections?: Array<{
    title: string;
    content: string;
    list?: string[];
    links?: Array<{ label: string; href: string }>;
  }>;
}

export const LocationSections: React.FC<LocationSectionsProps> = ({
  sections = [],
}) => {
  if (!sections || sections.length === 0) return null;

  return (
    <section className="w-full bg-background py-12 lg:py-16 border-b border-border">
      <Container>
        <div className="max-w-4xl mx-auto space-y-12">
          {sections.map((section, idx) => (
            <div
              key={idx}
              className="bg-surface rounded-md border border-border p-6 lg:p-8 space-y-4 shadow-xs"
            >
              <h2 className="text-heading-lg font-bold text-foreground tracking-tight">
                {section.title}
              </h2>

              <div className="text-body-md text-slate-700 leading-relaxed whitespace-pre-line space-y-3">
                {section.content}
              </div>

              {section.list && section.list.length > 0 && (
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-2.5 pt-3">
                  {section.list.map((item, lIdx) => (
                    <li key={lIdx} className="flex items-start gap-2.5 text-xs font-mono text-slate-800">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              )}

              {section.links && section.links.length > 0 && (
                <div className="flex flex-wrap items-center gap-3 pt-4 border-t border-border/60">
                  {section.links.map((link, kIdx) => (
                    <Link
                      key={kIdx}
                      href={link.href}
                      className="inline-flex items-center gap-1.5 text-xs font-mono font-bold text-accent-dark hover:text-brand-navy underline underline-offset-4 transition-colors"
                    >
                      <span>{link.label}</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
};
