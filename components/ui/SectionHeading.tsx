import React from 'react';
import { cn } from './Button';
import { Badge } from './Badge';

export interface SectionHeadingProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'title'> {
  badge?: string;
  title: React.ReactNode;
  subtitle?: React.ReactNode;
  align?: 'left' | 'center';
  badgeVariant?: 'accent' | 'primary' | 'navy' | 'outline' | 'outline-dark';
}

export const SectionHeading: React.FC<SectionHeadingProps> = ({
  badge,
  title,
  subtitle,
  align = 'left',
  badgeVariant = 'accent',
  className,
  ...props
}) => {
  return (
    <div
      className={cn(
        'space-y-3 max-w-3xl',
        align === 'center' ? 'mx-auto text-center' : 'text-left',
        className
      )}
      {...props}
    >
      {badge && (
        <div className={align === 'center' ? 'flex justify-center' : ''}>
          <Badge variant={badgeVariant} size="md">
            {badge}
          </Badge>
        </div>
      )}
      <h2 className="text-[28px] sm:text-[36px] lg:text-[42px] font-serif font-bold tracking-tight text-current leading-[1.15]">
        {title}
      </h2>
      {subtitle && (
        <p className="text-body-md text-muted-foreground font-normal leading-relaxed">
          {subtitle}
        </p>
      )}
    </div>
  );
};
