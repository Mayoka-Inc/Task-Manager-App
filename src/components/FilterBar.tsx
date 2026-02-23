import { FilterType } from '@/types/task';

interface FilterBarProps {
    currentFilter: FilterType;
    onFilterChange: (filter: FilterType) => void;
}

export function FilterBar({ currentFilter, onFilterChange }: FilterBarProps) {
    const filters: { label: string; value: FilterType }[] = [
        { label: 'All', value: 'all' },
        { label: 'Active', value: 'active' },
        { label: 'Completed', value: 'completed' },
    ];

    return (
        <div className="flex items-center gap-2 p-1.5 bg-card/40 backdrop-blur-md rounded-xl border border-border w-fit">
            {filters.map((f) => (
                <button
                    key={f.value}
                    onClick={() => onFilterChange(f.value)}
                    className={`px-4 py-1.5 text-sm font-medium rounded-lg transition-all ${currentFilter === f.value
                            ? 'bg-primary text-primary-foreground shadow-sm'
                            : 'text-gray-400 hover:text-foreground hover:bg-white/5'
                        }`}
                >
                    {f.label}
                </button>
            ))}
        </div>
    );
}
