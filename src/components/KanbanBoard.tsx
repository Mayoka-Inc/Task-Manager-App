'use client';

import React, { useState } from 'react';
import {
  DndContext,
  DragOverlay,
  closestCorners,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragStartEvent,
  DragOverEvent,
  DragEndEvent,
  defaultDropAnimationSideEffects,
} from '@dnd-kit/core';
import {
  arrayMove,
  sortableKeyboardCoordinates,
} from '@dnd-kit/sortable';
import { Task, Status } from '@/types/task';
import { KanbanColumn } from './KanbanColumn';
import { SortableTask } from './SortableTask';

interface Props {
  tasks: Task[];
  onReorder: (tasks: Task[]) => void;
  onDelete: (id: string) => void;
  onToggle: (id: string) => void;
}

export function KanbanBoard({ tasks, onReorder, onDelete, onToggle }: Props) {
  const [activeTask, setActiveTask] = useState<Task | null>(null);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 5,
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const columns: { id: Status; title: string }[] = [
    { id: 'todo', title: 'To Do' },
    { id: 'in-progress', title: 'In Progress' },
    { id: 'done', title: 'Done' },
  ];

  function handleDragStart(event: DragStartEvent) {
    const { active } = event;
    const task = tasks.find((t) => t.id === active.id);
    if (task) setActiveTask(task);
  }

  function handleDragOver(event: DragOverEvent) {
    const { active, over } = event;
    if (!over) return;

    const activeId = active.id;
    const overId = over.id;

    if (activeId === overId) return;

    const isActiveATask = tasks.some(t => t.id === activeId);
    const isOverATask = tasks.some(t => t.id === overId);
    const isOverAColumn = ['todo', 'in-progress', 'done'].includes(overId as string);

    if (!isActiveATask) return;

    // Dropping over another task
    if (isOverATask) {
      const activeTask = tasks.find(t => t.id === activeId)!;
      const overTask = tasks.find(t => t.id === overId)!;

      if (activeTask.status !== overTask.status) {
        const newTasks = tasks.map(t => {
          if (t.id === activeId) {
            return { ...t, status: overTask.status, completed: overTask.status === 'done' };
          }
          return t;
        });
        
        const activeIndex = newTasks.findIndex(t => t.id === activeId);
        const overIndex = newTasks.findIndex(t => t.id === overId);
        onReorder(arrayMove(newTasks, activeIndex, overIndex));
      }
    }

    // Dropping over a column
    if (isOverAColumn) {
      const activeTask = tasks.find(t => t.id === activeId)!;
      if (activeTask.status !== overId) {
        const newTasks = tasks.map(t => {
          if (t.id === activeId) {
            return { ...t, status: overId as Status, completed: overId === 'done' };
          }
          return t;
        });
        onReorder(newTasks);
      }
    }
  }

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;
    if (!over) {
        setActiveTask(null);
        return;
    }

    const activeId = active.id;
    const overId = over.id;

    if (activeId !== overId) {
        const activeIndex = tasks.findIndex(t => t.id === activeId);
        const overIndex = tasks.findIndex(t => t.id === overId);
        
        if (overIndex !== -1) {
            onReorder(arrayMove(tasks, activeIndex, overIndex));
        }
    }

    setActiveTask(null);
  }

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCorners}
      onDragStart={handleDragStart}
      onDragOver={handleDragOver}
      onDragEnd={handleDragEnd}
    >
      <div className="flex gap-6 overflow-x-auto pb-6 scrollbar-hide">
        {columns.map((col) => (
          <KanbanColumn
            key={col.id}
            id={col.id}
            title={col.title}
            tasks={tasks.filter((t) => t.status === col.id)}
            onDelete={onDelete}
            onToggle={onToggle}
          />
        ))}
      </div>

      <DragOverlay dropAnimation={{
        sideEffects: defaultDropAnimationSideEffects({
          styles: {
            active: {
              opacity: '0.5',
            },
          },
        }),
      }}>
        {activeTask ? (
          <div className="w-[300px]">
            <SortableTask
              task={activeTask}
              onDelete={() => {}}
              onToggle={() => {}}
            />
          </div>
        ) : null}
      </DragOverlay>
    </DndContext>
  );
}
