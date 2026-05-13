'use client';

import React from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Task } from '@/types/task';
import { GripVertical, Trash2, CheckCircle2, Circle, Clock } from 'lucide-react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface Props {
  task: Task;
  onDelete: (id: string) => void;
  onToggle: (id: string) => void;
}

export function SortableTask({ task, onDelete, onToggle }: Props) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: task.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const priorityColors = {
    low: 'bg-blue-500/10 text-blue-500 border-blue-500/20',
    medium: 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20',
    high: 'bg-red-500/10 text-red-500 border-red-500/20',
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={cn(
        "group relative bg-card border rounded-xl p-4 mb-3 shadow-sm transition-all hover:shadow-md",
        isDragging && "opacity-50 z-50 ring-2 ring-primary",
        task.completed && "opacity-75"
      )}
    >
      <div className="flex items-start gap-3">
        <button
          {...attributes}
          {...listeners}
          className="mt-1 text-muted-foreground hover:text-foreground cursor-grab active:cursor-grabbing outline-none"
        >
          <GripVertical size={18} />
        </button>

        <button
          onClick={() => onToggle(task.id)}
          className={cn(
            "mt-1 transition-colors",
            task.completed ? "text-primary" : "text-muted-foreground hover:text-primary"
          )}
        >
          {task.completed ? <CheckCircle2 size={20} /> : <Circle size={20} />}
        </button>

        <div className="flex-1 min-w-0">
          <h3 className={cn(
            "font-medium leading-none mb-1 truncate",
            task.completed && "line-through text-muted-foreground"
          )}>
            {task.title}
          </h3>
          {task.description && (
            <p className="text-sm text-muted-foreground line-clamp-2 mb-2">
              {task.description}
            </p>
          )}
          
          <div className="flex items-center gap-3">
            <span className={cn(
              "text-[10px] uppercase tracking-wider font-bold px-2 py-0.5 rounded-full border",
              priorityColors[task.priority]
            )}>
              {task.priority}
            </span>
            <div className="flex items-center gap-1 text-[11px] text-muted-foreground font-medium">
              <Clock size={12} />
              {new Date(task.createdAt).toLocaleDateString()}
            </div>
          </div>
        </div>

        <button
          onClick={() => onDelete(task.id)}
          className="opacity-0 group-hover:opacity-100 p-2 text-muted-foreground hover:text-destructive transition-all rounded-lg hover:bg-destructive/10"
        >
          <Trash2 size={16} />
        </button>
      </div>
    </div>
  );
}
