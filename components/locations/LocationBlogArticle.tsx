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
    <div className="w-full bg-[#F6F2E9] text-[#17201B] py-16 lg:py-24 border-b border-[#17201B]/15">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Main Editorial Article Column (8 Cols) */}
          <article className="lg:col-span-8 space-y-10">
            {/* Article Intro Block */}
            <div className="space-y-6">
              <div className="bg-white border-l-4 border-[#1F8A5B] p-6 rounded-r-md shadow-xs">
                <p className="text-sm sm:text-base text-slate-800 leading-relaxed font-normal whitespace-pre-line">
                  {introduction}
                </p>
              </div>

              {localCoverageText && (
                <div className="bg-white p-6 rounded-md border border-[#17201B]/15 space-y-2">
                  <div className="flex items-center gap-2 text-xs font-mono font-bold text-[#1F8A5B] uppercase tracking-wider">
                    <ShieldCheck className="w-4 h-4 text-[#1F8A5B]" />
                    <span>Doorstep Pickup & Local Coverage in {cityName}</span>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-normal">
                    {localCoverageText}
                  </p>
                </div>
              )}
            </div>

            {/* Table of Contents Box */}
            {sections && sections.length > 0 && (
              <nav aria-label="Table of contents" className="bg-white border border-[#17201B]/15 rounded-md p-6 space-y-3 shadow-xs">
                <div className="flex items-center gap-2.5 text-sm font-serif font-bold text-[#17201B] border-b border-slate-200 pb-2.5">
                  <ListOrdered className="w-4 h-4 text-[#1F8A5B]" />
                  <span>Table of Contents: International Cargo in {cityName}</span>
                </div>
                <ol className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs font-mono text-slate-700 pt-1">
                  {sections.map((sec, idx) => (
                    <li key={idx}>
                      <a
                        href={`#section-${idx}`}
                        className="hover:text-[#1F8A5B] hover:underline flex items-center gap-1.5 transition-colors"
                      >
                        <span className="text-[#C6A15B] font-bold">{idx + 1}.</span>
                        <span>{sec.title}</span>
                      </a>
                    </li>
                  ))}
                  {faqs && faqs.length > 0 && (
                    <li>
                      <a
                        href="#section-faqs"
                        className="hover:text-[#1F8A5B] hover:underline flex items-center gap-1.5 transition-colors"
                      >
                        <span className="text-[#C6A15B] font-bold">{sections.length + 1}.</span>
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
                {sections.map((sec, idx) => (
                  <div
                    key={idx}
                    id={`section-${idx}`}
                    className="bg-white rounded-md border border-[#17201B]/15 p-6 sm:p-8 space-y-6 shadow-xs scroll-mt-28"
                  >
                    <h2 className="text-xl sm:text-2xl font-serif font-bold text-[#17201B] tracking-tight border-b border-slate-100 pb-3 flex items-center gap-3">
                      <span className="text-[#C6A15B] font-mono text-xl">{idx + 1}.</span>
                      <span>{sec.title}</span>
                    </h2>

                    <div className="text-xs sm:text-sm text-slate-700 leading-relaxed whitespace-pre-line space-y-4 font-normal">
                      {sec.content}
                    </div>

                    {/* Bullet Points Checklist */}
                    {sec.list && sec.list.length > 0 && (
                      <div className="pt-2">
                        <h4 className="text-xs font-mono font-bold text-slate-500 uppercase tracking-wider mb-3">
                          Key Highlights & Service Details:
                        </h4>
                        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          {sec.list.map((item, lIdx) => (
                            <li
                              key={lIdx}
                              className="flex items-start gap-2.5 bg-[#F6F2E9] p-3 rounded border border-[#17201B]/10 text-xs font-medium text-slate-800"
                            >
                              <CheckCircle2 className="w-4 h-4 text-[#1F8A5B] shrink-0 mt-0.5" />
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {/* Hyperlinks & Related Services */}
                    {sec.links && sec.links.length > 0 && (
                      <div className="pt-4 border-t border-slate-100 flex flex-wrap items-center gap-3">
                        {sec.links.map((link, kIdx) => (
                          <Link
                            key={kIdx}
                            href={link.href}
                            className="inline-flex items-center gap-2 px-4 py-2 bg-[#12372A] hover:bg-[#17201B] text-white rounded text-xs font-mono font-bold transition-colors shadow-xs"
                          >
                            <span>{link.label}</span>
                            <ArrowRight className="w-3.5 h-3.5 text-[#C6A15B]" />
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}

            {/* In-Depth FAQs Display */}
            {faqs && faqs.length > 0 && (
              <div id="section-faqs" className="bg-white rounded-md border border-[#17201B]/15 p-6 sm:p-8 space-y-8 shadow-xs scroll-mt-28">
                <div className="border-b border-slate-100 pb-4 space-y-1">
                  <div className="flex items-center gap-2 text-xs font-mono text-[#1F8A5B] font-bold uppercase">
                    <HelpCircle className="w-4 h-4" />
                    <span>Frequently Asked Questions</span>
                  </div>
                  <h2 className="text-xl font-serif font-bold text-[#17201B]">
                    Everything You Need to Know About Shipping from {cityName}
                  </h2>
                </div>

                <div className="space-y-6 divide-y divide-slate-100">
                  {faqs.map((faq, fIdx) => (
                    <div key={fIdx} className={fIdx > 0 ? 'pt-6 space-y-2' : 'space-y-2'}>
                      <h3 className="text-base font-serif font-bold text-[#17201B] flex items-start gap-2.5">
                        <span className="text-[#1F8A5B] font-mono font-bold">Q{fIdx + 1}.</span>
                        <span>{faq.question}</span>
                      </h3>
                      <p className="text-xs sm:text-sm text-slate-700 leading-relaxed pl-7 whitespace-pre-line font-normal">
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
            {/* Quick Quote Box */}
            <div className="bg-[#12372A] text-white rounded-md border border-[#1F8A5B]/30 p-6 space-y-6 shadow-xl">
              <div className="space-y-2">
                <span className="text-xs font-mono text-[#C6A15B] uppercase tracking-wider font-bold">
                  Instant Shipping Estimate
                </span>
                <h3 className="text-xl font-serif font-bold text-white">
                  Send Cargo from {cityName}
                </h3>
                <p className="text-xs text-slate-200 leading-relaxed font-normal">
                  Calculate doorstep shipping rates for Air Cargo & Sea Freight originating in {cityName}.
                </p>
              </div>

              <div className="flex flex-col gap-3.5 pt-2">
                <Link href={`/quote?origin=${cityName.toLowerCase()}`} className="block">
                  <Button
                    variant="accent"
                    size="lg"
                    className="w-full h-[46px] bg-[#C6A15B] hover:bg-[#b08e4d] text-[#17201B] font-bold"
                    rightIcon={<ArrowRight className="w-4 h-4 text-[#17201B]" />}
                  >
                    Calculate Shipping Rate
                  </Button>
                </Link>

                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full h-[46px] bg-[#1F8A5B] hover:bg-[#186e48] text-white font-bold text-xs rounded-md transition-colors flex items-center justify-center gap-2 shadow-xs"
                >
                  <MessageSquare className="w-4 h-4 text-white fill-current" />
                  <span>Ask {cityName} Hub on WhatsApp</span>
                </a>
              </div>
            </div>

            {/* Quick Navigation Cards */}
            <div className="bg-white rounded-md border border-[#17201B]/15 p-6 space-y-4 shadow-xs">
              <h4 className="text-xs font-mono font-bold text-slate-500 uppercase tracking-wider">
                Shipping Modes from {cityName}
              </h4>
              <div className="space-y-2.5">
                <Link
                  href="/cargo-services#part-1-air-cargo"
                  className="flex items-center justify-between p-3 bg-[#F6F2E9] hover:bg-slate-100 rounded border border-[#17201B]/10 text-xs font-bold text-[#17201B] transition-colors"
                >
                  <div className="flex items-center gap-2">
                    <Plane className="w-4 h-4 text-[#1F8A5B]" />
                    <span>Air Freight Services</span>
                  </div>
                  <ArrowRight className="w-3.5 h-3.5 text-slate-400" />
                </Link>

                <Link
                  href="/cargo-services#part-2-sea-cargo"
                  className="flex items-center justify-between p-3 bg-[#F6F2E9] hover:bg-slate-100 rounded border border-[#17201B]/10 text-xs font-bold text-[#17201B] transition-colors"
                >
                  <div className="flex items-center gap-2">
                    <Ship className="w-4 h-4 text-[#1F8A5B]" />
                    <span>Sea Cargo Services</span>
                  </div>
                  <ArrowRight className="w-3.5 h-3.5 text-slate-400" />
                </Link>

                <Link
                  href="/services/commercial-cargo"
                  className="flex items-center justify-between p-3 bg-[#F6F2E9] hover:bg-slate-100 rounded border border-[#17201B]/10 text-xs font-bold text-[#17201B] transition-colors"
                >
                  <div className="flex items-center gap-2">
                    <Package className="w-4 h-4 text-[#1F8A5B]" />
                    <span>Commercial Export Cargo</span>
                  </div>
                  <ArrowRight className="w-3.5 h-3.5 text-slate-400" />
                </Link>
              </div>
            </div>

            {/* Direct Contact Card */}
            {activePhone && (
              <div className="bg-white rounded-md border border-[#17201B]/15 p-6 space-y-3 shadow-xs">
                <h4 className="text-xs font-mono font-bold text-slate-500 uppercase tracking-wider">
                  Phone Support
                </h4>
                <p className="text-xs text-slate-600 leading-relaxed font-normal">
                  Speak directly with our Pakistan logistics dispatch team.
                </p>
                <a
                  href={`tel:${activePhone.replace(/\s+/g, '')}`}
                  className="inline-flex items-center gap-2 text-sm font-bold text-[#17201B] hover:text-[#1F8A5B] transition-colors"
                >
                  <Phone className="w-4 h-4 text-[#1F8A5B]" />
                  <span>{activePhone}</span>
                </a>
              </div>
            )}
          </aside>
        </div>
      </Container>
    </div>
  );
};
