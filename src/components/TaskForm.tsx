import { useState } from "react";

type Priority = "Low" | "Medium" | "High";
interface TaskFormProps {
  addTask: (text: string, priority: Priority, dueDate: string|null) => void;
}

const TaskForm = ({ addTask }: TaskFormProps) => {
  const [taskText, setTaskText] = useState<string>("");
  const [taskPriority, setTaskPriority] = useState<Priority>("Medium");
  const [dueDate, setDueDate] = useState<string | null>(null);
  const [error, setError] = useState<string>("");

  const getTodayFormatted = () => {
    const today = new Date();
    const day = String(today.getDate()).padStart(2, "0"); // Ensure two digits
    const month = String(today.getMonth() + 1).padStart(2, "0"); // Month is 0-based
    const year = today.getFullYear();
    
    return `${year}-${month}-${day}`;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!taskText.trim()) {
      setError("Task cannot be empty.");
      return;
    }

    const today = new Date(getTodayFormatted());
    if (dueDate && new Date(dueDate) < today) {
      setError("Due date cannot be in the past.");
      return;
    }

    setError("");

    if (taskText.trim()) {
      addTask(
        taskText, taskPriority, dueDate
      );
      setTaskText("");
      setTaskPriority("Medium");
      setDueDate(null);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-4">
      <div className="mb-2">
        <label htmlFor="task" className="sr-only">
          Task
        </label>
        <input
          type="text"
          value={taskText}
          onChange={(e) => setTaskText(e.target.value)}
          placeholder="Add a task..."
          className="w-full p-2 border border-gray-300 dark:border-gray-600 
                    rounded-lg shadow-sm focus:outline-none focus:ring-2 
                    focus:ring-blue-500 dark:focus:ring-blue-400 
                    bg-white dark:bg-gray-800 text-black dark:text-white 
                    transition-all"
          aria-label="Task description"
        />
      </div>

      <div className="mb-2 flex space-x-2">
        <label htmlFor="priority" className="sr-only">
          Priority
        </label>
        <select
          id="priority"
          aria-label="Task Priority"
          value={taskPriority}
          onChange={(e) => setTaskPriority(e.target.value as Priority)}
          className="w-full p-2 border border-gray-300 dark:border-gray-600 
                    rounded-lg shadow-sm focus:outline-none focus:ring-2 
                    focus:ring-blue-500 dark:focus:ring-blue-400 
                    bg-white dark:bg-gray-800 text-black dark:text-white 
                    transition-all"
        >
          <option value="Low">Low</option>
          <option value="Medium">Medium</option>
          <option value="High">High</option>
        </select>
        <div className="mb-2">
          <label htmlFor="due-date" className="sr-only">Due Date</label>
          <input
            type="date"
            aria-label="Due Date"
            id="due-date"
            value={dueDate || ""}
            onChange={(e) => setDueDate(e.target.value)}
            className="w-full p-2 border border-gray-300 dark:border-gray-600
                       rounded-lg shadow-sm focus:outline-none focus:ring-2 
                       focus:ring-blue-500 dark:focus:ring-blue-400 bg-white
                       dark:bg-gray-800 text-black dark:text-white transition-all"
          />
        </div>
      </div>
      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
      <button
        type="submit"
        className="w-full p-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-200 dark:bg-blue-700 dark:hover:bg-blue-800"
      >
        ➕ Add Task
      </button>
    </form>
  );
};

export default TaskForm;
