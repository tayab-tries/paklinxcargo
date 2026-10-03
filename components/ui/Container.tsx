import React from 'react';
import { cn } from './Button';

export interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  size?: 'default' | 'narrow' | 'wide';
}

export const Container: React.FC<ContainerProps> = ({
  children,
  size = 'default',
  className,
  ...props
}) => {
  const sizeStyles = {
    narrow: 'max-w-4xl',
    default: 'max-w-7xl',
    wide: 'max-w-7.5xl',
  }[size];

  return (
    <div className={cn('w-full mx-auto px-4 sm:px-6 lg:px-8', sizeStyles, className)} {...props}>
      {children}
    </div>
  );
};
