import { useState } from "react";

type Task = {
  id: string;
  text: string;
  completed: boolean;
  priority: string;
};

type TaskItemProps = {
  task: Task;
  toggleTaskCompletion: (id: string) => void;
  removeTask: (id: string) => void;
  editTask: (id: string, newText: string) => void; // 🆕 Edit function
};

export default function TaskItem({ task, toggleTaskCompletion, removeTask, editTask }: TaskItemProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [newText, setNewText] = useState(task.text);

  const handleEdit = () => {
    if (newText.trim() === "") return;
    editTask(task.id, newText);
    setIsEditing(false);
  };

  return (
    <div
      className={`flex items-center justify-between text-black dark:text-white p-4 rounded-lg shadow-md mt-4 transition-transform duration-300 hover:scale-105 hover:shadow-lg 
        ${task.completed ? 'bg-gray-200 dark:bg-gray-600' : 'bg-gray-300 dark:bg-gray-700'}`}
    >
      {isEditing ? (
        <input
          type="text"
          value={newText}
          onChange={(e) => {
            setNewText(e.target.value);
          }}
          onBlur={handleEdit} 
          onKeyDown={(e) => e.key === "Enter" && handleEdit()} 
          className="p-2 border border-gray-300 rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
          autoFocus
        />
      ) : (
        <span
          className={`flex-1 cursor-pointer ${task.completed ? "line-through text-gray-500" : ""}`}
          onClick={() => toggleTaskCompletion(task.id)}
        >
          {task.text}
        </span>
      )}

      <div className="flex space-x-2">
        <span
          className={`ml-2 py-1 px-3 rounded-full text-white text-xs font-semibold ${
            task.priority === "Low"
              ? "bg-green-500"
              : task.priority === "Medium"
              ? "bg-yellow-500"
              : "bg-red-500"
          }`}
        >
          {task.priority}
        </span>
        {!isEditing && (
          <button
          onClick={() => {
            setNewText(task.text);
            setIsEditing(true);
          }}
          className="text-blue-500 hover:text-blue-700 transition-colors duration-200"
        >
          ✏️ Edit
        </button>
        )}
        <button
            onClick={() => removeTask(task.id)}
            className="text-red-500 hover:text-red-700 transition-colors duration-200">
            🗑️ Delete
        </button>
      </div>
    </div>
  );
}
