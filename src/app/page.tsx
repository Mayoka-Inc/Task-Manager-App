'use client';

import { useState, useMemo } from 'react';
import { useTasks } from '@/hooks/useTasks';
import { TaskInput } from '@/components/TaskInput';
import { TaskList } from '@/components/TaskList';
import { FilterBar } from '@/components/FilterBar';
import { TaskSummary } from '@/components/TaskSummary';
import { FilterType } from '@/types/task';

export default function Home() {
  const { tasks, isLoaded, addTask, updateTask, toggleTask, deleteTask } = useTasks();
  const [filter, setFilter] = useState<FilterType>('all');

  const filteredTasks = useMemo(() => {
    switch (filter) {
      case 'active':
        return tasks.filter(t => !t.completed);
      case 'completed':
        return tasks.filter(t => t.completed);
      default:
        return tasks;
    }
  }, [tasks, filter]);

  const activeCount = tasks.filter(t => !t.completed).length;
  const completedCount = tasks.length - activeCount;

  if (!isLoaded) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-background">
        <div className="w-8 h-8 border-4 border-primary/30 border-t-primary rounded-full animate-spin"></div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-background text-foreground py-12 px-4 sm:px-6 relative overflow-hidden">
      {/* Dynamic Background Effect */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-primary/20 blur-[120px] rounded-full pointer-events-none opacity-50" />

      <div className="max-w-3xl mx-auto relative z-10">
        <header className="mb-10 text-center sm:text-left flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight mb-2 bg-gradient-to-br from-white to-gray-500 bg-clip-text text-transparent">
              Task Master
            </h1>
            <p className="text-gray-400">Organize your work, beautifully.</p>
          </div>
        </header>

        <TaskSummary
          total={tasks.length}
          active={activeCount}
          completed={completedCount}
        />

        <TaskInput onAdd={(title, description, priority) => addTask({ title, description, priority: priority || 'medium', completed: false })} />

        {tasks.length > 0 && (
          <div className="flex justify-between items-center mb-6 animate-fade-in">
            <h2 className="text-xl font-semibold">Your Tasks</h2>
            <FilterBar currentFilter={filter} onFilterChange={setFilter} />
          </div>
        )}

        <TaskList
          tasks={filteredTasks}
          onToggle={toggleTask}
          onDelete={deleteTask}
          onUpdate={updateTask}
        />
      </div>
    </main>
  );
}
