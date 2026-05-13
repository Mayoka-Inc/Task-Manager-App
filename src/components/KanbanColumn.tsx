'use client';

import React from 'react';
import { useDroppable } from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { Task, Status } from '@/types/task';
import { SortableTask } from './SortableTask';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface Props {
  id: Status;
  title: string;
  tasks: Task[];
  onDelete: (id: string) => void;
  onToggle: (id: string) => void;
}

export function KanbanColumn({ id, title, tasks, onDelete, onToggle }: Props) {
  const { setNodeRef } = useDroppable({ id });

  return (
    <div className="flex flex-col h-full min-w-[300px] flex-1">
      <div className="flex items-center justify-between mb-4 px-2">
        <h2 className="text-sm font-bold uppercase tracking-widest text-muted-foreground flex items-center gap-2">
          {title}
          <span className="bg-muted text-muted-foreground px-2 py-0.5 rounded-full text-[10px]">
            {tasks.length}
          </span>
        </h2>
      </div>

      <div
        ref={setNodeRef}
        className={cn(
          "flex-1 rounded-2xl bg-muted/30 p-2 min-h-[500px] transition-colors border-2 border-dashed border-transparent",
        )}
      >
        <SortableContext items={tasks.map(t => t.id)} strategy={verticalListSortingStrategy}>
          {tasks.map(task => (
            <SortableTask
              key={task.id}
              task={task}
              onDelete={onDelete}
              onToggle={onToggle}
            />
          ))}
        </SortableContext>
      </div>
    </div>
  );
}
