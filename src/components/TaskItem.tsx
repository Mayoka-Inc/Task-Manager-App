import { useState, useRef, useEffect } from 'react';
import { CheckCircle2, Circle, Trash2, Edit2, GripVertical, AlertCircle } from 'lucide-react';
import { Task, Priority } from '@/types/task';

interface TaskItemProps {
    task: Task;
    onToggle: (id: string) => void;
    onDelete: (id: string) => void;
    onUpdate: (id: string, updates: Partial<Omit<Task, 'id' | 'createdAt'>>) => void;
}

const formatDate = (timestamp: number) => {
    return new Intl.DateTimeFormat('en-US', {
        month: 'short',
        day: 'numeric',
        hour: 'numeric',
        minute: '2-digit',
    }).format(new Date(timestamp));
};

const PriorityIcon = ({ priority }: { priority: Priority }) => {
    switch (priority) {
        case 'high':
            return <AlertCircle className="w-4 h-4 text-danger" />;
        case 'medium':
            return <AlertCircle className="w-4 h-4 text-orange-500" />;
        case 'low':
            return <AlertCircle className="w-4 h-4 text-blue-400" />;
    }
};

export function TaskItem({ task, onToggle, onDelete, onUpdate }: TaskItemProps) {
    const [isEditing, setIsEditing] = useState(false);
    const [editTitle, setEditTitle] = useState(task.title);
    const [editDesc, setEditDesc] = useState(task.description || '');
    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (isEditing) {
            inputRef.current?.focus();
        }
    }, [isEditing]);

    const handleSave = () => {
        if (!editTitle.trim()) return;
        onUpdate(task.id, {
            title: editTitle.trim(),
            description: editDesc.trim() || undefined,
        });
        setIsEditing(false);
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') {
            handleSave();
        } else if (e.key === 'Escape') {
            setIsEditing(false);
            setEditTitle(task.title);
            setEditDesc(task.description || '');
        }
    };

    return (
        <div className={`group flex items-start gap-4 p-4 mb-3 rounded-2xl glass-card transition-all hover:bg-white/5 animate-slide-in ${task.completed ? 'opacity-60 grayscale-[0.2]' : ''
            }`}>
            <button className="mt-1 cursor-grab active:cursor-grabbing text-gray-500 hover:text-foreground opacity-30 group-hover:opacity-100 transition-opacity">
                <GripVertical className="w-5 h-5" />
            </button>

            <button
                onClick={() => onToggle(task.id)}
                className="mt-1 flex-shrink-0 text-gray-400 hover:text-primary transition-colors focus:outline-none focus:ring-2 focus:ring-primary rounded-full"
            >
                {task.completed ? (
                    <CheckCircle2 className="w-6 h-6 text-primary" />
                ) : (
                    <Circle className="w-6 h-6" />
                )}
            </button>

            <div className="flex-grow min-w-0">
                {isEditing ? (
                    <div className="flex flex-col gap-2 w-full">
                        <input
                            ref={inputRef}
                            type="text"
                            value={editTitle}
                            onChange={(e) => setEditTitle(e.target.value)}
                            onKeyDown={handleKeyDown}
                            onBlur={handleSave}
                            className="w-full bg-black/20 text-foreground border border-border rounded px-2 py-1 text-lg outline-none focus:border-primary"
                        />
                        <input
                            type="text"
                            value={editDesc}
                            onChange={(e) => setEditDesc(e.target.value)}
                            onKeyDown={handleKeyDown}
                            onBlur={handleSave}
                            placeholder="Description..."
                            className="w-full bg-black/20 text-gray-300 border border-border rounded px-2 py-1 text-sm outline-none focus:border-primary"
                        />
                    </div>
                ) : (
                    <div className="flex flex-col gap-1">
                        <div className="flex items-center gap-2">
                            <h3 className={`text-lg font-medium truncate ${task.completed ? 'line-through text-gray-500' : 'text-foreground'}`}>
                                {task.title}
                            </h3>
                            <PriorityIcon priority={task.priority} />
                        </div>
                        {task.description && (
                            <p className={`text-sm ${task.completed ? 'text-gray-600 line-through' : 'text-gray-400'}`}>
                                {task.description}
                            </p>
                        )}
                        <span className="text-xs text-gray-600 mt-1">
                            Added {formatDate(task.createdAt)}
                        </span>
                    </div>
                )}
            </div>

            <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <button
                    onClick={() => setIsEditing(true)}
                    className="p-2 text-gray-400 hover:text-primary transition-colors rounded-lg hover:bg-white/5"
                    title="Edit Task"
                >
                    <Edit2 className="w-4 h-4" />
                </button>
                <button
                    onClick={() => onDelete(task.id)}
                    className="p-2 text-gray-400 hover:text-danger transition-colors rounded-lg hover:bg-white/5"
                    title="Delete Task"
                >
                    <Trash2 className="w-4 h-4" />
                </button>
            </div>
        </div>
    );
}
