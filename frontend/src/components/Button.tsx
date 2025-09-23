// src/components/Button.tsx
import React from 'react';

interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
  className?: string;
}

export default function Button({ children, onClick, type = 'button', className = '' }: ButtonProps) {
  const baseStyles = "bg-blue-600 text-white font-bold py-2 px-4 rounded hover:bg-blue-700 transition duration-300";
  return (
    <button
      type={type}
      onClick={onClick}
      className={`${baseStyles} ${className}`}
    >
      {children}
    </button>
  );
}