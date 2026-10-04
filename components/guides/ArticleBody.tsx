import React from 'react';
import { PortableText, PortableTextComponents } from 'next-sanity';
import ReactMarkdown from 'react-markdown';
import rehypeSanitize from 'rehype-sanitize';
import Link from 'next/link';
import Image from 'next/image';

export interface ArticleBodyProps {
  body?: unknown[];
  contentMarkdown?: string;
}

const portableTextComponents: PortableTextComponents = {
  block: {
    h1: ({ children }) => (
      <h1 className="text-2xl sm:text-3xl font-serif font-bold text-[#17201B] pt-8 pb-3 border-b border-[#17201B]/15 tracking-tight mt-8 mb-4">
        {children}
      </h1>
    ),
    h2: ({ children }) => (
      <h2 className="text-xl sm:text-2xl font-serif font-bold text-[#17201B] pt-8 pb-3 border-b border-[#17201B]/15 tracking-tight mt-8 mb-4">
        {children}
      </h2>
    ),
    h3: ({ children }) => (
      <h3 className="text-lg font-serif font-bold text-[#17201B] pt-6 pb-2 tracking-tight mt-6 mb-3">
        {children}
      </h3>
    ),
    normal: ({ children }) => (
      <p className="text-sm sm:text-base text-[#17201B]/85 leading-[1.8] font-normal my-5">
        {children}
      </p>
    ),
    blockquote: ({ children }) => (
      <blockquote className="border-l-4 border-[#C6A15B] pl-5 italic text-[#17201B]/90 bg-[#F6F2E9] p-5 my-8 font-serif text-base">
        {children}
      </blockquote>
    ),
  },
  list: {
    bullet: ({ children }) => (
      <ul className="space-y-3 my-6 pl-5 list-disc text-sm sm:text-base text-[#17201B]/85 font-normal">
        {children}
      </ul>
    ),
    number: ({ children }) => (
      <ol className="space-y-3 my-6 pl-5 list-decimal text-sm sm:text-base text-[#17201B]/85 font-normal">
        {children}
      </ol>
    ),
  },
  listItem: {
    bullet: ({ children }) => <li className="leading-relaxed">{children}</li>,
    number: ({ children }) => <li className="leading-relaxed">{children}</li>,
  },
  marks: {
    strong: ({ children }) => <strong className="font-bold text-[#17201B]">{children}</strong>,
    em: ({ children }) => <em className="italic">{children}</em>,
    code: ({ children }) => (
      <code className="bg-[#F6F2E9] px-2 py-0.5 text-xs font-mono text-[#17201B] border border-[#17201B]/10">
        {children}
      </code>
    ),
    link: ({ value, children }) => {
      const href = value?.href || '#';
      const isExternal = href.startsWith('http');
      return (
        <Link
          href={href}
          target={isExternal ? '_blank' : undefined}
          rel={isExternal ? 'noopener noreferrer' : undefined}
          className="text-[#1F8A5B] font-bold underline underline-offset-4 hover:text-[#12372A] transition-colors"
        >
          {children}
        </Link>
      );
    },
  },
  types: {
    image: ({ value }) => {
      const imgUrl = value?.asset?.url || value?.url;
      if (!imgUrl) return null;
      return (
        <figure className="my-10 space-y-3">
          <div className="relative aspect-[16/9] w-full overflow-hidden bg-[#F6F2E9] border border-[#17201B]/15">
            <Image src={imgUrl} alt={value.alt || 'Article graphic'} fill className="object-cover" />
          </div>
          {value.caption && (
            <figcaption className="text-center text-xs font-mono text-[#17201B]/60">
              {value.caption}
            </figcaption>
          )}
        </figure>
      );
    },
  },
};

export const ArticleBody: React.FC<ArticleBodyProps> = ({ body, contentMarkdown }) => {
  if (Array.isArray(body) && body.length > 0) {
    return (
      <div className="prose max-w-prose mx-auto text-[#17201B] leading-relaxed font-normal space-y-6">
        <PortableText value={body} components={portableTextComponents} />
      </div>
    );
  }

  if (!contentMarkdown) return null;

  return (
    <div className="prose max-w-prose mx-auto text-[#17201B] leading-relaxed font-normal space-y-5 text-sm sm:text-base [&_h1]:text-2xl [&_h1]:sm:text-3xl [&_h1]:font-serif [&_h1]:font-bold [&_h1]:border-b [&_h1]:border-[#17201B]/15 [&_h1]:pb-3 [&_h1]:mt-8 [&_h1]:mb-4 [&_h2]:text-xl [&_h2]:sm:text-2xl [&_h2]:font-serif [&_h2]:font-bold [&_h2]:border-b [&_h2]:border-[#17201B]/15 [&_h2]:pb-3 [&_h2]:mt-8 [&_h2]:mb-4 [&_h3]:text-lg [&_h3]:font-serif [&_h3]:font-bold [&_h3]:mt-6 [&_h3]:mb-3 [&_p]:text-[#17201B]/85 [&_p]:leading-[1.8] [&_ul]:list-disc [&_ul]:pl-5 [&_ul]:space-y-3 [&_ul]:my-6 [&_ol]:list-decimal [&_ol]:pl-5 [&_ol]:space-y-3 [&_ol]:my-6 [&_li]:text-[#17201B]/85 [&_strong]:font-bold [&_strong]:text-[#17201B] [&_blockquote]:border-l-4 [&_blockquote]:border-[#C6A15B] [&_blockquote]:pl-5 [&_blockquote]:italic [&_blockquote]:bg-[#F6F2E9] [&_blockquote]:p-5 [&_blockquote]:my-8 [&_table]:w-full [&_table]:border-collapse [&_table]:my-8 [&_th]:bg-[#12372A] [&_th]:text-white [&_th]:p-3.5 [&_th]:text-left [&_th]:text-xs [&_th]:font-mono [&_th]:uppercase [&_th]:tracking-wider [&_td]:p-3.5 [&_td]:border [&_td]:border-[#17201B]/15 [&_td]:text-xs [&_td]:sm:text-sm">
      <ReactMarkdown
        rehypePlugins={[rehypeSanitize]}
        components={{
          h1: ({ children }) => (
            <h2 className="text-xl sm:text-2xl font-serif font-bold text-[#17201B] pt-8 pb-3 border-b border-[#17201B]/15 tracking-tight mt-8 mb-4">
              {children}
            </h2>
          ),
        }}
      >
        {contentMarkdown}
      </ReactMarkdown>
    </div>
  );
};
