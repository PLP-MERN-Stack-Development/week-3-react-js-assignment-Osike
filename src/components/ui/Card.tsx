import React from 'react';
import { cn } from '../../utils/cn';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
}

const Card: React.FC<CardProps> = ({ children, className, hover = false }) => {
  return (
    <div
      className={cn(
        'bg-white dark:bg-gray-800 rounded-xl shadow-lg backdrop-blur-sm border border-gray-200 dark:border-gray-700',
        hover && 'hover:shadow-xl hover:scale-[1.02] transition-all duration-300',
        className
      )}
    >
      {children}
    </div>
  );
};

export default Card;