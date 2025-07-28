import React from 'react';

export function Container({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`w-full max-w-7xl mx-auto ${className == "" ? "px-4 md:px-4" : className}`}>
      {children}
    </div>
  );
}
