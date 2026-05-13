'use client';

import React from 'react';
import { Cloud, CloudOff, RefreshCw } from 'lucide-react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface Props {
  status: 'synced' | 'syncing' | 'error';
}

export function SyncIndicator({ status }: Props) {
  return (
    <div className={cn(
      "flex items-center gap-2 px-3 py-1.5 rounded-full text-[11px] font-bold uppercase tracking-wider transition-all border",
      status === 'synced' && "bg-green-500/10 text-green-500 border-green-500/20",
      status === 'syncing' && "bg-blue-500/10 text-blue-500 border-blue-500/20",
      status === 'error' && "bg-red-500/10 text-red-500 border-red-500/20"
    )}>
      {status === 'synced' && (
        <>
          <Cloud size={14} />
          <span>Cloud Synced</span>
        </>
      )}
      {status === 'syncing' && (
        <>
          <RefreshCw size={14} className="animate-spin" />
          <span>Syncing...</span>
        </>
      )}
      {status === 'error' && (
        <>
          <CloudOff size={14} />
          <span>Sync Error</span>
        </>
      )}
    </div>
  );
}
