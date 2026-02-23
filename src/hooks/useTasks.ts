import { useState, useEffect } from 'react';
import { Task } from '@/types/task';

const STORAGE_KEY = 'tasks_storage_v1';

export function useTasks() {
    const [tasks, setTasks] = useState<Task[]>([]);
    const [isLoaded, setIsLoaded] = useState(false);

    // Load from local storage on mount
    useEffect(() => {
        try {
            const stored = localStorage.getItem(STORAGE_KEY);
            if (stored) {
                setTasks(JSON.parse(stored));
            }
        } catch (e) {
            console.error('Failed to parse tasks from local storage', e);
        } finally {
            setIsLoaded(true);
        }
    }, []);

    // Save to local storage whenever tasks change
    useEffect(() => {
        if (isLoaded) {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
        }
    }, [tasks, isLoaded]);

    const addTask = (task: Omit<Task, 'id' | 'createdAt'>) => {
        const newTask: Task = {
            ...task,
            id: crypto.randomUUID(),
            createdAt: Date.now(),
        };
        setTasks(prev => [newTask, ...prev]);
    };

    const updateTask = (id: string, updates: Partial<Omit<Task, 'id' | 'createdAt'>>) => {
        setTasks(prev => prev.map(t => t.id === id ? { ...t, ...updates } : t));
    };

    const toggleTask = (id: string) => {
        setTasks(prev => prev.map(t => t.id === id ? { ...t, completed: !t.completed } : t));
    };

    const deleteTask = (id: string) => {
        setTasks(prev => prev.filter(t => t.id !== id));
    };

    const reorderTasks = (reordered: Task[]) => {
        setTasks(reordered);
    };

    return {
        tasks,
        isLoaded,
        addTask,
        updateTask,
        toggleTask,
        deleteTask,
        reorderTasks,
    };
}
