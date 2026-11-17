import React from 'react';
import { cn } from '../../lib/utils';

export interface SwissSectionHeaderProps {
  number?: string;
  title: string;
  subtitle?: string;
  description?: string;
  tag?: string;
  category?: string;
  align?: 'left' | 'center';
  theme?: 'light' | 'dark' | 'forest';
  light?: boolean;
  className?: string;
}

export const SwissCornerCross: React.FC<{ className?: string }> = ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth="2"
    stroke="currentColor"
    className={cn('w-3.5 h-3.5 pointer-events-none text-forest/40', className)}
  >
    <path strokeLinecap="square" strokeLinejoin="miter" d="M12 4v16m8-8H4" />
  </svg>
);

export const SwissBadge: React.FC<{
  children: React.ReactNode;
  variant?: 'sage' | 'gold' | 'forest' | 'navy' | 'outline';
  className?: string;
}> = ({ children, variant = 'sage', className }) => {
  const variantStyles = {
    sage: 'bg-[#EAF2ED] text-[#163A2D] border-[#D0E4DA]',
    gold: 'bg-[#FEFCE8] text-[#7A4E05] border-[#FAD02C] font-bold',
    forest: 'bg-[#163A2D] text-white border-[#163A2D]',
    navy: 'bg-[#0E1C2B] text-white border-[#0E1C2B]',
    outline: 'bg-transparent text-[#163A2D] border-[#D0E4DA]',
  };

  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 px-2.5 py-1 text-[11px] font-mono font-bold tracking-widest uppercase border rounded-none',
        variantStyles[variant],
        className
      )}
    >
      {children}
    </span>
  );
};

export const SwissSectionHeader: React.FC<SwissSectionHeaderProps> = ({
  number,
  title,
  subtitle,
  description,
  tag,
  category,
  align = 'left',
  theme = 'light',
  light,
  className,
}) => {
  const isDark = light === true || theme === 'dark' || theme === 'forest';
  const effectiveTag = tag || category;
  const effectiveSubtitle = subtitle || description;

  return (
    <div
      className={cn(
        'mb-12 sm:mb-16',
        align === 'center' ? 'text-center max-w-4xl mx-auto' : 'text-left max-w-3xl',
        className
      )}
    >
      {/* Swiss Monospace Number & Tag Row */}
      <div
        className={cn(
          'flex items-center gap-3 mb-4',
          align === 'center' ? 'justify-center' : 'justify-start'
        )}
      >
        {number && (
          <span
            className={cn(
              'font-mono text-xs font-black tracking-widest uppercase px-2 py-0.5 border',
              isDark
                ? 'bg-[#FAD02C] text-[#0D241C] border-[#FAD02C]'
                : 'bg-[#163A2D] text-white border-[#163A2D]'
            )}
          >
            {number}
          </span>
        )}
        {effectiveTag && (
          <span
            className={cn(
              'font-mono text-xs font-bold tracking-widest uppercase px-2 py-0.5 border',
              isDark
                ? 'bg-white/10 text-[#FEF08A] border-white/20'
                : 'bg-[#EAF2ED] text-[#163A2D] border-[#D0E4DA]'
            )}
          >
            {effectiveTag}
          </span>
        )}
        <div
          className={cn(
            'hidden sm:block h-[1px] flex-1 max-w-[120px]',
            isDark ? 'bg-white/20' : 'bg-[#D0E4DA]'
          )}
        />
      </div>

      {/* Grotesque Bold Headline */}
      <h2
        className={cn(
          'text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black tracking-tight uppercase leading-[1.08] font-sans',
          isDark ? 'text-white' : 'text-[#163A2D]'
        )}
      >
        {title}
      </h2>

      {/* Structured Subtitle with generous whitespace */}
      {effectiveSubtitle && (
        <p
          className={cn(
            'mt-4 text-sm sm:text-base md:text-lg leading-relaxed font-sans font-normal max-w-2xl',
            isDark ? 'text-white/80' : 'text-[#2D5344]'
          )}
        >
          {effectiveSubtitle}
        </p>
      )}
    </div>
  );
};

export const SwissButton: React.FC<{
  children: React.ReactNode;
  variant?: 'primary' | 'gold' | 'secondary' | 'sage';
  size?: 'sm' | 'md' | 'lg';
  icon?: React.ReactNode;
  onClick?: () => void;
  href?: string;
  className?: string;
  type?: 'button' | 'submit' | 'reset';
}> = ({
  children,
  variant = 'primary',
  size = 'md',
  icon,
  onClick,
  href,
  className,
  type = 'button',
}) => {
  const sizeStyles = {
    sm: 'px-3.5 py-1.5 text-xs',
    md: 'px-5 py-2.5 text-xs sm:text-sm',
    lg: 'px-7 py-3.5 text-sm sm:text-base',
  };

  const variantStyles = {
    primary:
      'bg-[#163A2D] text-white border-2 border-[#163A2D] hover:bg-[#FAD02C] hover:border-[#FAD02C] hover:text-[#0D241C] font-extrabold',
    gold:
      'bg-[#FAD02C] text-[#0D241C] border-2 border-[#FAD02C] hover:bg-[#163A2D] hover:border-[#163A2D] hover:text-white font-extrabold',
    secondary:
      'bg-transparent text-[#163A2D] border-2 border-[#163A2D] hover:bg-[#163A2D] hover:text-white font-extrabold',
    sage:
      'bg-[#EAF2ED] text-[#163A2D] border-2 border-[#D0E4DA] hover:bg-[#163A2D] hover:text-white hover:border-[#163A2D] font-extrabold',
  };

  const baseClasses = cn(
    'inline-flex items-center justify-center gap-2 font-sans uppercase tracking-wider rounded-none transition-all duration-150 ease-out cursor-pointer select-none active:scale-[0.98]',
    sizeStyles[size],
    variantStyles[variant],
    className
  );

  if (href) {
    return (
      <a href={href} className={baseClasses} onClick={onClick}>
        <span>{children}</span>
        {icon}
      </a>
    );
  }

  return (
    <button type={type} onClick={onClick} className={baseClasses}>
      <span>{children}</span>
      {icon}
    </button>
  );
};

export const SwissCard: React.FC<{
  children: React.ReactNode;
  variant?: 'white' | 'cream' | 'sage' | 'forest' | 'muted';
  pattern?: 'grid' | 'dots' | 'diagonal' | 'none';
  borderThick?: boolean;
  className?: string;
  withCrosses?: boolean;
}> = ({
  children,
  variant = 'white',
  pattern = 'none',
  borderThick = false,
  className,
  withCrosses = false,
}) => {
  const bgStyles = {
    white: 'bg-white text-[#163A2D]',
    cream: 'bg-[#FAF8F5] text-[#163A2D]',
    sage: 'bg-[#EAF2ED] text-[#163A2D]',
    forest: 'bg-[#163A2D] text-white',
    muted: 'bg-[#F3EFE8] text-[#163A2D]',
  };

  const patternClass =
    pattern === 'grid'
      ? 'swiss-grid-pattern'
      : pattern === 'dots'
      ? 'swiss-dots'
      : pattern === 'diagonal'
      ? 'swiss-diagonal'
      : '';

  return (
    <div
      className={cn(
        'relative rounded-none p-6 sm:p-8 transition-all duration-200',
        borderThick ? 'border-2 border-[#163A2D]' : 'border border-[#D0E4DA]',
        bgStyles[variant],
        patternClass,
        className
      )}
    >
      {withCrosses && (
        <>
          <SwissCornerCross className="absolute top-1.5 left-1.5" />
          <SwissCornerCross className="absolute top-1.5 right-1.5" />
          <SwissCornerCross className="absolute bottom-1.5 left-1.5" />
          <SwissCornerCross className="absolute bottom-1.5 right-1.5" />
        </>
      )}
      {children}
    </div>
  );
};
