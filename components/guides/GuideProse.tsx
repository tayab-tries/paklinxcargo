import React from 'react';
import { Container } from '@/components/ui/Container';
import { Article } from '@/lib/supabase/articles';

export interface GuideProseProps {
  article: Article;
}

export const GuideProse: React.FC<GuideProseProps> = ({ article }) => {
  return (
    <section className="w-full bg-surface py-16 lg:py-24 border-b border-border text-brand-black">
      <Container size="narrow">
        <article className="prose prose-slate max-w-prose text-body-md leading-relaxed text-slate-700 space-y-6">
          <div dangerouslySetInnerHTML={{ __html: article.content }} />
        </article>
      </Container>
    </section>
  );
};
