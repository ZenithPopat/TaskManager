import { useEffect, useState } from "react";

type Priority = "Low" | "Medium" | "High";

interface TaskSortingFilteringProps {
  setSortBy: (sortBy: "priority" | "dueDate" | "completion") => void;
  setFilterPriority: (priority: Priority | null) => void;
  setFilterCompletion: (completed: boolean | null) => void;
}

const TaskSortingFiltering: React.FC<TaskSortingFilteringProps>  = ({setSortBy, setFilterPriority, setFilterCompletion}) => {

    const [selectedSort, setSelectedSort] = useState(() => {
        const savedSort = localStorage.getItem("sort");
        return savedSort ? JSON.parse(savedSort) : "priority";
      });
    const [selectedPriority, setSelectedPriority] = useState<Priority | string>(() => {
        const savedPriority = localStorage.getItem("priorityFilter");
        return savedPriority ? JSON.parse(savedPriority) : "";
      });
    const [selectedCompletion, setSelectedCompletion] = useState(() => {
        const savedCompletion = localStorage.getItem("completionFilter");
        return savedCompletion === "null" ? "" : (savedCompletion === "true" ? "completed" : "incomplete");;
      });
    const [filter, setFilter] = useState<{ priority: Priority | null; completion: boolean | null }>({ priority: null, completion: null });

    useEffect(() => {
        const savedSort = localStorage.getItem('sort');
        const storedSort = savedSort ? JSON.parse(savedSort) : "priority";
        const savedPriority = localStorage.getItem('priorityFilter');
        const storedPriority = savedPriority ? JSON.parse(savedPriority) : "";
        const savedCompletion = localStorage.getItem('completionFilter');
        const storedCompletion = savedCompletion === "null" ? "" : (savedCompletion === "true" ? "completed" : "incomplete");
        if (storedSort) {
            setSelectedSort(storedSort);
        }
        if (storedPriority) {
            setSelectedPriority(storedPriority);
            setFilter(f => ({ ...f, priority: storedPriority }));
        }
        if (storedCompletion) {
            setSelectedCompletion(storedCompletion);
            setFilter(f => ({ ...f, completion: storedCompletion === "completed" ? true : storedCompletion === "incomplete" ? false : null }));
        }
    }, []);

    const handleSortChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const value = event.target.value;
        setSelectedSort(value);
        setSortBy(value as "priority" | "dueDate" | "completion");
        localStorage.setItem('sort', JSON.stringify(value));
    };

    const handlePriorityFilterChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const value = event.target.value;
        setSelectedPriority(value);
        setFilterPriority(value === "" ? null : value as Priority);
        setFilter({ ...filter, priority: value === "" ? null : value as Priority });
        localStorage.setItem('priorityFilter', JSON.stringify(value));
    };

    const handleCompletionFilterChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const value = event.target.value;
        setSelectedCompletion(value);
        setFilterCompletion(value === "" ? null : value === "completed");
        setFilter({ ...filter, completion: value === "" ? null : value === "completed" });
        localStorage.setItem('completionFilter', JSON.stringify(value === "" ? null : value === "completed"));
    };

    return (
        <div className="flex gap-4 mt-4 mb-4 p-2 border rounded-lg shadow-sm bg-gray-100 dark:bg-gray-800">
            {/* Sorting Dropdown */}
            <select
                value={selectedSort}
                onChange={handleSortChange}
                className="p-2 border bg-white text-black border-gray-300
                         dark:border-gray-600 dark:bg-gray-800 dark:text-white
                         rounded w-full focus:outline-none focus:ring-2
                         focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600"
            >
                <option value="priority">Sort by Priority</option>
                <option value="dueDate">Sort by Due Date</option>
                <option value="completion">Sort by Completion</option>
            </select>

            {/* Filtering by Priority */}
            <select
                value={selectedPriority}
                onChange={handlePriorityFilterChange}
                className="p-2 border bg-white text-black border-gray-300
                         dark:border-gray-600 dark:bg-gray-800 dark:text-white
                         rounded w-full focus:outline-none focus:ring-2
                         focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600"
            >
                <option value="">All Priorities</option>
                <option value="High">High</option>
                <option value="Medium">Medium</option>
                <option value="Low">Low</option>
            </select>

            {/* Filtering by Completion */}
            <select
                name="completion"
                value={selectedCompletion}
                onChange={handleCompletionFilterChange}
                className="p-2 border bg-white text-black border-gray-300
                         dark:border-gray-600 dark:bg-gray-800 dark:text-white
                         rounded w-full focus:outline-none focus:ring-2
                         focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600"
            >
                <option value="">All Tasks</option>
                <option value="completed">Completed</option>
                <option value="incomplete">Incomplete</option>
            </select>

            {/* Clear Filters Button */}
            {(filter.priority || filter.completion) && (
                <button
                    onClick={() => {
                        setSelectedPriority("");
                        setSelectedCompletion("");
                        setFilterPriority(null);
                        setFilterCompletion(null);
                        setFilter({ priority: null, completion: null });
                        localStorage.removeItem('priorityFilter');
                        localStorage.removeItem('completionFilter');
                        localStorage.removeItem('sort');
                    }}
                    className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                >
                    Clear Filters
                </button>
            )}
        </div>
    );

};

export default TaskSortingFiltering;