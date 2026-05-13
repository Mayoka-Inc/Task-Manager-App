'use client';

import { useState } from 'react';
import { Plus } from 'lucide-react';
import { Priority } from '@/types/task';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface TaskInputProps {
  onAdd: (title: string, description?: string, priority?: Priority) => void;
}

export function TaskInput({ onAdd }: TaskInputProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState<Priority>('medium');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    onAdd(title.trim(), description.trim() || undefined, priority);
    setTitle('');
    setDescription('');
    setPriority('medium');
    setIsExpanded(false);
  };

  return (
    <div className={cn(
      "bg-card border rounded-2xl shadow-lg transition-all duration-300 mb-8",
      isExpanded ? "ring-2 ring-primary/20 shadow-xl" : "hover:border-primary/50"
    )}>
      <form onSubmit={handleSubmit} className="p-2">
        <div className="flex items-center gap-2">
          <div className="flex-1 px-4">
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              onFocus={() => setIsExpanded(true)}
              placeholder="Add a new task..."
              className="w-full bg-transparent border-none outline-none py-3 text-lg font-medium placeholder:text-muted-foreground/60"
            />
          </div>
          <button
            type="submit"
            disabled={!title.trim()}
            className="h-10 w-10 flex items-center justify-center bg-primary text-primary-foreground rounded-xl hover:opacity-90 disabled:opacity-50 transition-all shrink-0"
          >
            <Plus size={20} />
          </button>
        </div>

        {isExpanded && (
          <div className="px-4 pb-4 pt-2 border-t mt-2 animate-in fade-in slide-in-from-top-2">
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Add details and notes..."
              className="w-full bg-transparent border-none outline-none text-sm text-muted-foreground resize-none h-20 mb-4"
            />
            
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="flex flex-col gap-1">
                  <span className="text-[10px] font-bold uppercase text-muted-foreground tracking-wider">Priority</span>
                  <div className="flex gap-1">
                    {(['low', 'medium', 'high'] as Priority[]).map((p) => (
                      <button
                        key={p}
                        type="button"
                        onClick={() => setPriority(p)}
                        className={cn(
                          "px-3 py-1 rounded-lg text-xs font-semibold capitalize transition-all border",
                          priority === p 
                            ? "bg-primary/10 border-primary text-primary" 
                            : "bg-muted/50 border-transparent text-muted-foreground hover:bg-muted"
                        )}
                      >
                        {p}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
              
              <button
                type="button"
                onClick={() => setIsExpanded(false)}
                className="text-xs font-medium text-muted-foreground hover:text-foreground transition-colors"
              >
                Collapse
              </button>
            </div>
          </div>
        )}
      </form>
    </div>
  );
}
