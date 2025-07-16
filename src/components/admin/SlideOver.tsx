'use client';

import { X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useEffect } from 'react';

interface SlideOverProps {
  open: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
}

export default function SlideOver({ open, onClose, title = 'Details', children }: SlideOverProps) {
  useEffect(() => {
    if (open) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  return (
    <div
      className={cn(
        'fixed inset-0 z-50 transition-all duration-300 ease-in-out',
        open ? 'pointer-events-auto' : 'pointer-events-none'
      )}
    >
      {/* Background overlay */}
      <div
        className={cn(
          'absolute inset-0 bg-black/40 transition-opacity',
          open ? 'opacity-100' : 'opacity-0'
        )}
        onClick={onClose}
      />

      {/* Slide-over panel */}
      <div
        className={cn(
          'absolute right-0 top-0 h-full bg-white dark:bg-zinc-900 shadow-xl flex flex-col transition-transform duration-300 ease-in-out rounded-bl-xl rounded-tl-xl overflow-x-auto',
          open ? 'translate-x-0' : 'translate-x-full',
          'w-full sm:w-[80%] xl:w-3/8'
        )}
      >
        {/* Header with sticky close button */}
        <div className="sticky top-0 z-10 flex items-center justify-between px-4 py-3 border-b bg-white dark:bg-zinc-900">
          <h2 className="text-lg font-semibold">{title}</h2>
          <button onClick={onClose} className="text-zinc-500 hover:text-zinc-900 dark:hover:text-white">
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Scrollable content */}
        <div className="overflow-y-auto p-5 flex-1 space-y-4">
          {children}
        </div>
      </div>
    </div>
  );
}
