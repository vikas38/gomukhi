
import React from 'react';

interface ActionButtonProps {
  onClick?: () => void;
  children: React.ReactNode;
  className?: string;
  type?: 'button' | 'submit' | 'reset';
}

const ActionButton: React.FC<ActionButtonProps> = ({ onClick, children, className = '', type = 'button' }) => {
  const baseClasses = `
    w-full
    flex items-center justify-center gap-2
    px-4 py-3
    rounded-xl
    font-semibold text-white
    shadow-lg
    focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-800
    transition-all duration-200 ease-in-out
    transform active:scale-95
  `;

  return (
    <button
      type={type}
      onClick={onClick}
      className={`${baseClasses} ${className}`}
    >
      {children}
    </button>
  );
};

export default ActionButton;
