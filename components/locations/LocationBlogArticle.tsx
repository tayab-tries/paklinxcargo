import React from 'react';
import Link from 'next/link';
import {
  ArrowRight,
  CheckCircle2,
  Phone,
  MessageSquare,
  HelpCircle,
  ShieldCheck,
  Plane,
  Ship,
  Package,
  ListOrdered,
} from 'lucide-react';
import { Container } from '@/components/ui/Container';
import { Button } from '@/components/ui/Button';
import ReactMarkdown from 'react-markdown';
import rehypeSanitize from 'rehype-sanitize';
import { buildWhatsappUrl } from '@/lib/utils/whatsapp';

export interface LocationBlogArticleProps {
  cityName: string;
  introduction: string;
  localCoverageText: string;
  sections?: Array<{
    title: string;
    content: string;
    list?: string[];
    links?: Array<{ label: string; href: string }>;
  }>;
  faqs?: Array<{ question: string; answer: string }>;
  phone?: string;
  whatsappNumber?: string;
}

export const LocationBlogArticle: React.FC<LocationBlogArticleProps> = ({
  cityName,
  introduction,
  localCoverageText,
  sections = [],
  faqs = [],
  phone,
  whatsappNumber,
}) => {
  const activePhone = phone || '';
  const activeWhatsapp = whatsappNumber || activePhone;
  const whatsappUrl = buildWhatsappUrl(
    activeWhatsapp,
    `Assalam o Alaikum, I want to send international cargo from ${cityName}. Please guide me.`
  );

  return (
    <div className="w-full bg-background text-foreground py-12 lg:py-20 border-b border-border">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Main Editorial Article Column (8 Cols) */}
          <article className="lg:col-span-8 space-y-10">
            {/* Article Intro Block */}
            <div className="prose prose-slate max-w-none space-y-6">
              <div className="bg-surface border-l-4 border-accent p-6 rounded-r-md shadow-xs">
                <p className="text-body-md text-slate-800 leading-relaxed font-normal whitespace-pre-line">
                  {introduction}
                </p>
              </div>

              {localCoverageText && (
                <div className="bg-surface-subtle p-6 rounded-md border border-border space-y-2">
                  <div className="flex items-center gap-2 text-xs font-mono font-bold text-accent-dark uppercase tracking-wider">
                    <ShieldCheck className="w-4 h-4 text-emerald-600" />
                    <span>Doorstep Pickup & Local Coverage in {cityName}</span>
                  </div>
                  <p className="text-body-sm text-slate-700 leading-relaxed">
                    {localCoverageText}
                  </p>
                </div>
              )}
            </div>

            {/* Table of Contents Box (like ez-toc on Mahir Packers) */}
            {sections && sections.length > 0 && (
              <nav aria-label="Table of contents" className="bg-slate-50 border border-slate-200 rounded-lg p-6 space-y-3 shadow-xs">
                <div className="flex items-center gap-2.5 text-sm font-bold text-slate-900 border-b border-slate-200 pb-2.5">
                  <ListOrdered className="w-4 h-4 text-accent-dark" />
                  <span>Table of Contents: International Cargo in {cityName}</span>
                </div>
                <ol className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs font-medium text-slate-700 pt-1">
                  {sections.map((sec, idx) => (
                    <li key={idx}>
                      <a
                        href={`#section-${idx}`}
                        className="hover:text-accent-dark hover:underline flex items-center gap-1.5 transition-colors"
                      >
                        <span className="text-accent font-mono font-bold">{idx + 1}.</span>
                        <span>{sec.title}</span>
                      </a>
                    </li>
                  ))}
                  {faqs && faqs.length > 0 && (
                    <li>
                      <a
                        href="#section-faqs"
                        className="hover:text-accent-dark hover:underline flex items-center gap-1.5 transition-colors"
                      >
                        <span className="text-accent font-mono font-bold">{sections.length + 1}.</span>
                        <span>Frequently Asked Questions ({faqs.length})</span>
                      </a>
                    </li>
                  )}
                </ol>
              </nav>
            )}

            {/* Editorial Content Sections */}
            {sections && sections.length > 0 && (
              <div className="space-y-10">
                {sections.map((sec, idx) => {
                  const cleanTitle = sec.title.replace(/^#+\s*/, '').trim();
                  return (
                    <div
                      key={idx}
                      id={`section-${idx}`}
                      className="bg-surface rounded-md border border-border p-6 sm:p-8 space-y-6 shadow-xs scroll-mt-28"
                    >
                      <h2 className="text-heading-lg sm:text-2xl font-extrabold text-foreground tracking-tight border-b border-border pb-3 flex items-center gap-3">
                        <span className="text-accent font-mono text-xl">{idx + 1}.</span>
                        <span>{cleanTitle}</span>
                      </h2>

                      <div className="text-body-md text-slate-800 leading-relaxed space-y-4 prose prose-slate max-w-none prose-h3:text-lg prose-h3:font-bold prose-h3:text-slate-900 prose-h3:mt-5 prose-h3:mb-2 prose-h3:border-b prose-h3:border-slate-200 prose-h3:pb-1 prose-h4:text-base prose-h4:font-semibold prose-h4:text-slate-900 prose-strong:font-semibold prose-strong:text-slate-900 prose-ul:list-disc prose-ul:pl-5 prose-ul:my-3 prose-ol:list-decimal prose-ol:pl-5 prose-ol:my-3 prose-li:my-1">
                        <ReactMarkdown rehypePlugins={[rehypeSanitize]}>
                          {sec.content}
                        </ReactMarkdown>
                      </div>

                      {/* Bullet Points Checklist */}
                      {sec.list && sec.list.length > 0 && (
                        <div className="pt-2">
                          <h4 className="text-xs font-mono font-bold text-slate-500 uppercase tracking-wider mb-3">
                            Key Highlights & Service Includes:
                          </h4>
                          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            {sec.list.map((item, lIdx) => {
                              const cleanItem = item.replace(/^(?:\d+\.|\*|-)\s*/, '').trim();
                              return (
                                <li
                                  key={lIdx}
                                  className="flex items-start gap-2.5 bg-surface-subtle p-3 rounded border border-border/80 text-xs font-medium text-slate-800"
                                >
                                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                                  <span>{cleanItem}</span>
                                </li>
                              );
                            })}
                          </ul>
                        </div>
                      )}

                      {/* Hyperlinks & Related Services */}
                      {sec.links && sec.links.length > 0 && (
                        <div className="pt-4 border-t border-border flex flex-wrap items-center gap-3">
                          {sec.links.map((link, kIdx) => (
                            <Link
                              key={kIdx}
                              href={link.href}
                              className="inline-flex items-center gap-2 px-4 py-2 bg-brand-navy hover:bg-slate-800 text-white rounded text-xs font-mono font-bold transition-colors shadow-xs"
                            >
                              <span>{link.label}</span>
                              <ArrowRight className="w-3.5 h-3.5 text-accent" />
                            </Link>
                          ))}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            )}

            {/* All FAQs Displayed In-Depth (Blog Editorial Q&A List) */}
            {faqs && faqs.length > 0 && (
              <div id="section-faqs" className="bg-surface rounded-md border border-border p-6 sm:p-8 space-y-8 shadow-xs scroll-mt-28">
                <div className="border-b border-border pb-4 space-y-1">
                  <div className="flex items-center gap-2 text-xs font-mono text-accent-dark font-bold uppercase">
                    <HelpCircle className="w-4 h-4" />
                    <span>Frequently Asked Questions</span>
                  </div>
                  <h2 className="text-heading-xl font-bold text-foreground">
                    Everything You Need to Know About Shipping from {cityName}
                  </h2>
                </div>

                <div className="space-y-6 divide-y divide-border/60">
                  {faqs.map((faq, fIdx) => (
                    <div key={fIdx} className={fIdx > 0 ? 'pt-6 space-y-2' : 'space-y-2'}>
                      <h3 className="text-heading-md font-bold text-foreground flex items-start gap-2.5">
                        <span className="text-accent-dark font-mono font-bold">Q{fIdx + 1}.</span>
                        <span>{faq.question}</span>
                      </h3>
                      <p className="text-body-md text-slate-700 leading-relaxed pl-7 whitespace-pre-line">
                        {faq.answer}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </article>

          {/* Sticky Editorial Sidebar (4 Cols) */}
          <aside className="lg:col-span-4 space-y-8 lg:sticky lg:top-24">
            {/* Quick Quote Widget Box */}
            <div className="bg-brand-black-deep text-white rounded-md border border-border-dark p-6 space-y-6 shadow-2xl">
              <div className="space-y-2">
                <span className="text-xs font-mono text-accent uppercase tracking-wider font-semibold">
                  Instant Rate Calculator
                </span>
                <h3 className="text-heading-lg font-bold text-white">
                  Send Cargo from {cityName}
                </h3>
                <p className="text-body-xs text-slate-300 leading-relaxed">
                  Get door-to-door shipping estimates for Air Cargo & Sea Freight originating in {cityName}.
                </p>
              </div>

              <div className="flex flex-col gap-3.5 pt-2">
                <Link href={`/quote?origin=${cityName.toLowerCase()}`} className="block">
                  <Button
                    variant="accent"
                    size="lg"
                    className="w-full h-[46px]"
                    rightIcon={<ArrowRight className="w-4 h-4 text-brand-black" />}
                  >
                    Calculate Shipping Rate
                  </Button>
                </Link>

                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full h-[46px] bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-md transition-colors flex items-center justify-center gap-2 shadow-xs"
                >
                  <MessageSquare className="w-4 h-4 text-white fill-current" />
                  <span>Ask {cityName} Hub on WhatsApp</span>
                </a>
              </div>
            </div>

            {/* Quick Navigation Cards */}
            <div className="bg-surface rounded-md border border-border p-6 space-y-4 shadow-xs">
              <h4 className="text-xs font-mono font-bold text-slate-500 uppercase tracking-wider">
                Shipping Modes from {cityName}
              </h4>
              <div className="space-y-2.5">
                <Link
                  href="/services/air-freight"
                  className="flex items-center justify-between p-3 bg-surface-subtle hover:bg-slate-100 rounded border border-border text-xs font-bold text-brand-black transition-colors"
                >
                  <div className="flex items-center gap-2">
                    <Plane className="w-4 h-4 text-accent-dark" />
                    <span>Air Freight Services</span>
                  </div>
                  <ArrowRight className="w-3.5 h-3.5 text-slate-400" />
                </Link>

                <Link
                  href="/services/sea-cargo"
                  className="flex items-center justify-between p-3 bg-surface-subtle hover:bg-slate-100 rounded border border-border text-xs font-bold text-brand-black transition-colors"
                >
                  <div className="flex items-center gap-2">
                    <Ship className="w-4 h-4 text-accent-dark" />
                    <span>Sea Cargo Services</span>
                  </div>
                  <ArrowRight className="w-3.5 h-3.5 text-slate-400" />
                </Link>

                <Link
                  href="/services/commercial-cargo"
                  className="flex items-center justify-between p-3 bg-surface-subtle hover:bg-slate-100 rounded border border-border text-xs font-bold text-brand-black transition-colors"
                >
                  <div className="flex items-center gap-2">
                    <Package className="w-4 h-4 text-accent-dark" />
                    <span>Commercial Export Cargo</span>
                  </div>
                  <ArrowRight className="w-3.5 h-3.5 text-slate-400" />
                </Link>
              </div>
            </div>

            {/* Direct Contact Card */}
            <div className="bg-surface-subtle rounded-md border border-border p-6 space-y-3">
              <h4 className="text-xs font-mono font-bold text-slate-500 uppercase tracking-wider">
                Need Phone Support?
              </h4>
              <p className="text-body-xs text-slate-600 leading-relaxed">
                Speak directly with our Pakistan logistics dispatch team.
              </p>
              <a
                href={`tel:${activePhone.replace(/\s+/g, '')}`}
                className="inline-flex items-center gap-2 text-sm font-bold text-brand-black hover:text-accent-dark transition-colors"
              >
                <Phone className="w-4 h-4 text-accent-dark" />
                <span>{activePhone}</span>
              </a>
            </div>
          </aside>
        </div>
      </Container>
    </div>
  );
};
