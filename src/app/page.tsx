'use client';

import { useState, useMemo } from 'react';
import { useTasks } from '@/hooks/useTasks';
import { TaskInput } from '@/components/TaskInput';
import { TaskList } from '@/components/TaskList';
import { FilterBar } from '@/components/FilterBar';
import { TaskSummary } from '@/components/TaskSummary';
import { KanbanBoard } from '@/components/KanbanBoard';
import { SyncIndicator } from '@/components/SyncIndicator';
import { FilterType } from '@/types/task';
import { LayoutGrid, List } from 'lucide-react';

export default function Home() {
  const { tasks, isLoaded, syncStatus, addTask, updateTask, toggleTask, deleteTask, reorderTasks, moveTask } = useTasks();
  const [filter, setFilter] = useState<FilterType>('all');
  const [view, setView] = useState<'list' | 'kanban'>('list');

  const filteredTasks = useMemo(() => {
    switch (filter) {
      case 'active':
        return tasks.filter(t => !t.completed);
      case 'completed':
        return tasks.filter(t => t.completed);
      case 'todo':
        return tasks.filter(t => t.status === 'todo');
      case 'in-progress':
        return tasks.filter(t => t.status === 'in-progress');
      case 'done':
        return tasks.filter(t => t.status === 'done');
      default:
        return tasks;
    }
  }, [tasks, filter]);

  const activeCount = tasks.filter(t => !t.completed).length;
  const completedCount = tasks.length - activeCount;

  if (!isLoaded) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-background text-foreground">
        <div className="w-8 h-8 border-4 border-primary/30 border-t-primary rounded-full animate-spin"></div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-background text-foreground py-12 px-4 sm:px-6 relative overflow-hidden">
      {/* Dynamic Background Effect */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-primary/20 blur-[120px] rounded-full pointer-events-none opacity-50" />

      <div className="max-w-5xl mx-auto relative z-10">
        <header className="mb-10 text-center sm:text-left flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight mb-2 bg-gradient-to-br from-white to-gray-500 bg-clip-text text-transparent">
              Task Master
            </h1>
            <p className="text-gray-400 font-medium">Organize your work, beautifully.</p>
          </div>
          <div className="flex flex-col items-end gap-3">
            <SyncIndicator status={syncStatus} />
            <div className="flex bg-secondary/50 p-1 rounded-xl border border-border/50 backdrop-blur-sm">
              <button
                onClick={() => setView('list')}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${view === 'list' ? 'bg-primary text-primary-foreground shadow-lg' : 'hover:bg-primary/10'}`}
              >
                <List size={18} />
                <span className="text-sm font-semibold">List</span>
              </button>
              <button
                onClick={() => setView('kanban')}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${view === 'kanban' ? 'bg-primary text-primary-foreground shadow-lg' : 'hover:bg-primary/10'}`}
              >
                <LayoutGrid size={18} />
                <span className="text-sm font-semibold">Kanban</span>
              </button>
            </div>
          </div>
        </header>

        <TaskSummary
          total={tasks.length}
          active={activeCount}
          completed={completedCount}
        />

        <div className="max-w-3xl mx-auto mb-12">
            <TaskInput onAdd={(title, description, priority) => addTask({ title, description, priority: priority || 'medium', completed: false })} />
        </div>

        {tasks.length > 0 && (
          <div className="flex flex-col sm:flex-row justify-between items-center mb-8 gap-4 animate-fade-in">
            <h2 className="text-2xl font-bold tracking-tight">
              {view === 'list' ? 'Your Tasks' : 'Board View'}
            </h2>
            {view === 'list' && (
              <FilterBar currentFilter={filter} onFilterChange={setFilter} />
            )}
          </div>
        )}

        {view === 'list' ? (
          <div className="max-w-3xl mx-auto">
            <TaskList
              tasks={filteredTasks}
              onToggle={toggleTask}
              onDelete={deleteTask}
              onUpdate={updateTask}
            />
          </div>
        ) : (
          <KanbanBoard
            tasks={tasks}
            onReorder={reorderTasks}
            onStatusChange={moveTask}
            onDelete={deleteTask}
            onToggle={toggleTask}
          />
        )}
      </div>
    </main>
  );
}
