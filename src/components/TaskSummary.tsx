interface TaskSummaryProps {
    total: number;
    active: number;
    completed: number;
}

export function TaskSummary({ total, active, completed }: TaskSummaryProps) {
    return (
        <div className="flex gap-6 text-sm text-gray-400 mb-6 px-2 animate-fade-in">
            <span>
                <strong className="text-foreground">{total}</strong> Total
            </span>
            <span>
                <strong className="text-foreground">{active}</strong> Active
            </span>
            <span>
                <strong className="text-foreground">{completed}</strong> Completed
            </span>
        </div>
    );
}
