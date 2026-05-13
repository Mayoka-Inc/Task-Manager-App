import { useState, useEffect, useCallback } from 'react';
import { Task, Status } from '@/types/task';

const STORAGE_KEY = 'tasks_storage_v2';

export function useTasks() {
    const [tasks, setTasks] = useState<Task[]>([]);
    const [isLoaded, setIsLoaded] = useState(false);
    const [syncStatus, setSyncStatus] = useState<'synced' | 'syncing' | 'error'>('synced');

    // Load from local storage on mount
    useEffect(() => {
        try {
            const stored = localStorage.getItem(STORAGE_KEY);
            if (stored) {
                setTasks(JSON.parse(stored));
            } else {
                // Check for v1 storage and migrate
                const v1 = localStorage.getItem('tasks_storage_v1');
                if (v1) {
                    const oldTasks = JSON.parse(v1);
                    const migratedTasks = oldTasks.map((t: { title: string; completed: boolean; priority: Priority; description?: string }) => ({
                        ...t,
                        status: t.completed ? 'done' : 'todo',
                    }));
                    setTasks(migratedTasks);
                }
            }
        } catch (e) {
            console.error('Failed to parse tasks from local storage', e);
        } finally {
            setIsLoaded(true);
        }
    }, []);

    // Save to local storage and simulate cloud sync
    useEffect(() => {
        if (isLoaded) {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
            
            // Simulate Cloud Sync
            setSyncStatus('syncing');
            const timer = setTimeout(() => {
                setSyncStatus('synced');
            }, 1500);
            return () => clearTimeout(timer);
        }
    }, [tasks, isLoaded]);

    const addTask = (task: Omit<Task, 'id' | 'createdAt' | 'status'> & { status?: Status }) => {
        const newTask: Task = {
            ...task,
            id: crypto.randomUUID(),
            createdAt: Date.now(),
            status: task.status || 'todo',
        };
        setTasks(prev => [newTask, ...prev]);
    };

    const updateTask = useCallback((id: string, updates: Partial<Omit<Task, 'id' | 'createdAt'>>) => {
        setTasks(prev => prev.map(t => {
            if (t.id === id) {
                const updated = { ...t, ...updates };
                // Keep completed in sync with status
                if (updates.status) {
                    updated.completed = updates.status === 'done';
                } else if (updates.completed !== undefined) {
                    updated.status = updates.completed ? 'done' : t.status === 'done' ? 'todo' : t.status;
                }
                return updated;
            }
            return t;
        }));
    }, []);

    const toggleTask = (id: string) => {
        setTasks(prev => prev.map(t => {
            if (t.id === id) {
                const newCompleted = !t.completed;
                return { 
                    ...t, 
                    completed: newCompleted,
                    status: newCompleted ? 'done' : 'todo'
                };
            }
            return t;
        }));
    };

    const deleteTask = (id: string) => {
        setTasks(prev => prev.filter(t => t.id !== id));
    };

    const reorderTasks = (reordered: Task[]) => {
        setTasks(reordered);
    };

    const moveTask = (id: string, newStatus: Status) => {
        updateTask(id, { status: newStatus });
    };

    return {
        tasks,
        isLoaded,
        syncStatus,
        addTask,
        updateTask,
        toggleTask,
        deleteTask,
        reorderTasks,
        moveTask,
    };
}
