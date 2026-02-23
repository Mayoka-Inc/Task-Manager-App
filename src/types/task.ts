export type Priority = 'low' | 'medium' | 'high';

export interface Task {
    id: string;
    title: string;
    description?: string;
    completed: boolean;
    createdAt: number;
    priority: Priority;
    dueDate?: number; // timestamp
}

export type FilterType = 'all' | 'active' | 'completed';
