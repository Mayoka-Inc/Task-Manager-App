import { Task } from '@/types/task';
import { TaskItem } from './TaskItem';

interface TaskListProps {
    tasks: Task[];
    onToggle: (id: string) => void;
    onDelete: (id: string) => void;
    onUpdate: (id: string, updates: Partial<Omit<Task, 'id' | 'createdAt'>>) => void;
}

export function TaskList({ tasks, onToggle, onDelete, onUpdate }: TaskListProps) {
    if (tasks.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center py-16 text-center animate-fade-in glass-card rounded-2xl border border-border/50">
                <div className="w-16 h-16 mb-4 rounded-full bg-primary/10 flex items-center justify-center">
                    <svg className="w-8 h-8 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                </div>
                <h3 className="text-xl font-medium text-foreground mb-2">No tasks yet</h3>
                <p className="text-gray-400 max-w-sm">
                    Add a task above to get started. You can add priorities and optional descriptions.
                </p>
            </div>
        );
    }

    return (
        <div className="space-y-1">
            {tasks.map((task) => (
                <TaskItem
                    key={task.id}
                    task={task}
                    onToggle={onToggle}
                    onDelete={onDelete}
                    onUpdate={onUpdate}
                />
            ))}
        </div>
    );
}
