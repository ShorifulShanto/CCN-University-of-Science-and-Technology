import React from 'react';
import { LucideIcon } from 'lucide-react';

interface CircularIconProps {
  icon: LucideIcon;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

export default function CircularIcon({ icon: Icon, className = '', size = 'md' }: CircularIconProps) {
  const sizeClasses = {
    sm: 'w-10 h-10 text-sm',
    md: 'w-13 h-13 text-base',
    lg: 'w-16 h-16 text-xl',
  }[size];

  const iconSizes = {
    sm: 'w-4 h-4',
    md: 'w-5 h-5',
    lg: 'w-7 h-7',
  }[size];

  return (
    <div
      className={`icon-circle-container shrink-0 cursor-pointer ${sizeClasses} ${className}`}
    >
      <Icon className={`${iconSizes} transition-colors duration-300`} />
    </div>
  );
}
