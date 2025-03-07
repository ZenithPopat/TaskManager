import { useState } from "react";

type Priority = "Low" | "Medium" | "High";
interface TaskFormProps {
  addTask: (id: string, priority: Priority) => void;
}

const TaskForm = ({ addTask }: TaskFormProps) => {
  const [taskText, setTaskText] = useState<string>("");
  const [taskPriority, setTaskPriority] = useState<Priority>("Medium");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (taskText.trim()) {
      addTask(
        taskText, taskPriority
      );
      setTaskText("");
      setTaskPriority("Medium");
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
        />
      </div>

      <div className="mb-2">
        <label htmlFor="priority" className="sr-only">
          Priority
        </label>
        <select
          id="priority"
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
      </div>

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
