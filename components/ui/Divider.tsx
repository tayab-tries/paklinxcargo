import React from 'react';
import { cn } from './Button';

export interface DividerProps extends React.HTMLAttributes<HTMLHRElement> {
  variantSurface?: 'dark' | 'light';
}

export const Divider: React.FC<DividerProps> = ({
  variantSurface = 'dark',
  className,
  ...props
}) => {
  return (
    <hr
      className={cn(
        'w-full border-0 h-px my-6',
        variantSurface === 'dark' ? 'bg-border-dark' : 'bg-border',
        className
      )}
      {...props}
    />
  );
};
