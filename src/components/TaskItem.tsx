import { useState } from "react";

type Task = {
  text: string;
  completed: boolean;
};

type TaskItemProps = {
  task: Task;
  toggleCompletion: () => void;
  removeTask: () => void;
  editTask: (newText: string) => void; // 🆕 Edit function
};

export default function TaskItem({ task, toggleCompletion, removeTask, editTask }: TaskItemProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [newText, setNewText] = useState(task.text);

  const handleEdit = () => {
    if (newText.trim() !== "") {
      editTask(newText);
    }
    setIsEditing(false);
  };

  return (
    <div className="flex items-center justify-between bg-gray-800 p-2 rounded shadow mt-2">
      {isEditing ? (
        <input
          type="text"
          value={newText}
          onChange={(e) => setNewText(e.target.value)}
          onBlur={handleEdit} // Save when input loses focus
          onKeyDown={(e) => e.key === "Enter" && handleEdit()} // Save on Enter
          className="p-1 border border-gray-300 rounded w-full"
          autoFocus
        />
      ) : (
        <span
          className={`flex-1 cursor-pointer ${task.completed ? "line-through text-gray-500" : ""}`}
          onClick={toggleCompletion}
        >
          {task.text}
        </span>
      )}

      <div className="flex space-x-2">
        {!isEditing && (
          <button
            onClick={() => setIsEditing(true)}
            className="text-blue-500 hover:underline"
          >
            ✏️ Edit
          </button>
        )}
        <button
          onClick={removeTask}
          className="text-red-500 hover:underline"
        >
          ❌
        </button>
      </div>
    </div>
  );
}
