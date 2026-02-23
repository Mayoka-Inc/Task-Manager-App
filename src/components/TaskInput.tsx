import { useState } from 'react';
import { PlusCircle } from 'lucide-react';
import { Priority } from '@/types/task';

interface TaskInputProps {
    onAdd: (title: string, description?: string, priority?: Priority) => void;
}

export function TaskInput({ onAdd }: TaskInputProps) {
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
    };

    return (
        <form onSubmit={handleSubmit} className="glass-card rounded-2xl p-4 sm:p-6 mb-8 mt-4 animate-fade-in">
            <div className="flex flex-col gap-4">
                <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="What needs to be done?"
                    className="w-full bg-transparent text-lg text-foreground placeholder-gray-500 border-none outline-none focus:ring-0"
                    required
                />

                <div className="h-px bg-border w-full" />

                <div className="flex flex-col sm:flex-row gap-4 justify-between sm:items-center">
                    <input
                        type="text"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        placeholder="Add details (optional)"
                        className="w-full sm:w-1/2 bg-transparent text-sm text-gray-400 placeholder-gray-600 border-none outline-none focus:ring-0"
                    />

                    <div className="flex items-center gap-3">
                        <select
                            value={priority}
                            onChange={(e) => setPriority(e.target.value as Priority)}
                            className="bg-background border border-border text-foreground text-sm rounded-lg focus:ring-primary focus:border-primary px-2.5 py-1.5 outline-none cursor-pointer"
                        >
                            <option value="low">Low Priority</option>
                            <option value="medium">Medium Priority</option>
                            <option value="high">High Priority</option>
                        </select>

                        <button
                            type="submit"
                            disabled={!title.trim()}
                            className="inline-flex items-center justify-center gap-2 px-4 py-2 text-sm font-medium text-primary-foreground bg-primary rounded-lg hover:bg-primary/90 focus:outline-none focus:ring-4 focus:ring-primary/20 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                        >
                            <PlusCircle className="w-4 h-4" />
                            Add Task
                        </button>
                    </div>
                </div>
            </div>
        </form>
    );
}
