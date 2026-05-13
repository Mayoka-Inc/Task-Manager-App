'use client';

import { FilterType, Priority } from '@/types/task';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface FilterBarProps {
  currentFilter: FilterType;
  onFilterChange: (filter: FilterType) => void;
  priorityFilter: Priority | 'all';
  onPriorityFilterChange: (priority: Priority | 'all') => void;
}

export function FilterBar({ 
  currentFilter, 
  onFilterChange,
  priorityFilter,
  onPriorityFilterChange
}: FilterBarProps) {
  const statusFilters: { label: string; value: FilterType }[] = [
    { label: 'All', value: 'all' },
    { label: 'To Do', value: 'todo' },
    { label: 'In Progress', value: 'in-progress' },
    { label: 'Done', value: 'done' },
  ];

  const priorities: (Priority | 'all')[] = ['all', 'low', 'medium', 'high'];

  return (
    <div className="flex flex-wrap items-center gap-4 mb-8">
      <div className="flex items-center gap-2 bg-muted/50 p-1 rounded-xl border">
        {statusFilters.map((f) => (
          <button
            key={f.value}
            onClick={() => onFilterChange(f.value)}
            className={cn(
              "px-4 py-1.5 text-xs font-bold uppercase tracking-wider rounded-lg transition-all",
              currentFilter === f.value
                ? "bg-background text-foreground shadow-sm"
                : "text-muted-foreground hover:text-foreground"
            )}
          >
            {f.label}
          </button>
        ))}
      </div>

      <div className="flex items-center gap-2">
        <span className="text-[10px] font-bold uppercase text-muted-foreground tracking-widest">Priority:</span>
        <div className="flex gap-1">
          {priorities.map((p) => (
            <button
              key={p}
              onClick={() => onPriorityFilterChange(p)}
              className={cn(
                "px-3 py-1 text-[10px] font-bold uppercase rounded-lg border transition-all",
                priorityFilter === p
                  ? "bg-primary/10 border-primary text-primary"
                  : "bg-background border-transparent text-muted-foreground hover:border-muted-foreground/30"
              )}
            >
              {p}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
