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
      <h1 className="text-display-sm sm:text-3xl font-extrabold text-brand-black pt-6 pb-2 border-b border-border tracking-tight my-4">
        {children}
      </h1>
    ),
    h2: ({ children }) => (
      <h2 className="text-heading-xl font-bold text-brand-black pt-8 pb-2 border-b border-border tracking-tight my-4">
        {children}
      </h2>
    ),
    h3: ({ children }) => (
      <h3 className="text-heading-lg font-bold text-brand-black pt-6 pb-2 tracking-tight my-3">
        {children}
      </h3>
    ),
    normal: ({ children }) => (
      <p className="text-body-lg text-slate-700 leading-[1.75] font-normal my-4">
        {children}
      </p>
    ),
    blockquote: ({ children }) => (
      <blockquote className="border-l-4 border-accent pl-4 italic text-slate-700 bg-surface-subtle p-4 rounded-r my-6 font-medium">
        {children}
      </blockquote>
    ),
  },
  list: {
    bullet: ({ children }) => (
      <ul className="space-y-2.5 my-4 pl-4 list-disc text-body-md text-slate-700 font-normal">
        {children}
      </ul>
    ),
    number: ({ children }) => (
      <ol className="space-y-2.5 my-4 pl-4 list-decimal text-body-md text-slate-700 font-normal">
        {children}
      </ol>
    ),
  },
  listItem: {
    bullet: ({ children }) => <li className="leading-relaxed">{children}</li>,
    number: ({ children }) => <li className="leading-relaxed">{children}</li>,
  },
  marks: {
    strong: ({ children }) => <strong className="font-semibold text-brand-black">{children}</strong>,
    em: ({ children }) => <em className="italic">{children}</em>,
    code: ({ children }) => (
      <code className="bg-surface-subtle px-1.5 py-0.5 rounded text-sm font-mono text-slate-800">
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
          className="text-accent-dark font-semibold underline underline-offset-2 hover:text-brand-black transition-colors"
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
        <figure className="my-8 space-y-2">
          <div className="relative aspect-[16/9] w-full rounded-md overflow-hidden bg-surface-subtle border border-border">
            <Image src={imgUrl} alt={value.alt || 'Article graphic'} fill className="object-cover" />
          </div>
          {value.caption && (
            <figcaption className="text-center text-xs font-mono text-slate-500">
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
      <div className="prose max-w-prose text-brand-black leading-relaxed font-normal space-y-6">
        <PortableText value={body} components={portableTextComponents} />
      </div>
    );
  }

  if (!contentMarkdown) return null;

  return (
    <div className="prose max-w-prose text-brand-black leading-relaxed font-normal space-y-6">
      <ReactMarkdown rehypePlugins={[rehypeSanitize]}>
        {contentMarkdown}
      </ReactMarkdown>
    </div>
  );
};
