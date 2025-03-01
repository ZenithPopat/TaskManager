import { useState } from "react";

type TaskFormProps = {
  setTasks: (taskText: string) => void;
};

export default function TaskForm({ setTasks }: TaskFormProps) {
  const [task, setTask] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!task.trim()) return;
    setTasks(task); // ✅ Pass only the task text
    setTask("");
  };

  return (
    <form onSubmit={handleSubmit} className="flex">
      <input
        type="text"
        value={task}
        onChange={(e) => setTask(e.target.value)}
        placeholder="Enter a new task..."
        className="flex-1 p-2 rounded-l-md text-white bg-gray-700 placeholder-gray-400"
      />
      <button type="submit" className="bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded-r-md text-white">
        Add
      </button>
    </form>
  );
}
