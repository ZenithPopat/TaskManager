import { useEffect, useState } from "react";

type Task = {
  id: string;
  text: string;
  completed: boolean;
  priority: 'Low' | 'Medium' | 'High';
  dueDate: string | null;
};

type Priority = "Low" | "Medium" | "High";

type TaskItemProps = {
  task: Task;
  toggleTaskCompletion: (id: string) => void;
  deleteTask: (id: string) => void;
  editTask: (id: string, newText: string, newPriority: Priority) => void; // 🆕 Edit function
};

export default function TaskItem({ task, toggleTaskCompletion, deleteTask, editTask }: TaskItemProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [newText, setNewText] = useState(task.text);
  const [newPriority, setNewPriority] = useState(task.priority);

  useEffect(() => {
    if (isEditing) {
      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === "Escape") {
          setIsEditing(false);
          setNewText(task.text);
          setNewPriority(task.priority);
        }
      };
      document.addEventListener("keydown", handleKeyDown);
      return () => {
        document.removeEventListener("keydown", handleKeyDown);
      };
    }
  }, [isEditing, task.text, task.priority]);

  const handleEdit = () => {
    if (newText.trim() === "") return;
    editTask(task.id, newText, newPriority);
    setIsEditing(false);
  };

  const isOverdue = task.dueDate && new Date(task.dueDate) < new Date() && !task.completed;


  // const options: Intl.DateTimeFormatOptions = {
  //   year: "numeric",
  //   month: "long",
  //   day: "numeric",
  // };

  return (
    <div
    className={`flex items-center justify-between text-black dark:text-white p-3 rounded-lg shadow-md mt-4 transition-transform duration-300 hover:scale-105 hover:shadow-lg 
      ${task.completed ? "bg-gray-200 dark:bg-gray-600" : "bg-gray-300 dark:bg-gray-700"} w-full max-w-4xl space-x-4`}
    >
      {isEditing ? (
        <div className="flex flex-col w-full">
          {/* Task Text Input */}
          <input
            type="text"
            value={newText}
            onChange={(e) => setNewText(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleEdit()}
            className="p-2 border bg-white text-black border-gray-300 
                      dark:border-gray-600 dark:bg-gray-800 dark:text-white
                      rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-500 mb-2"
            autoFocus
          />
          
          {/* Priority Dropdown */}
          <div className="mb-2">
            <select
              value={newPriority}
              onChange={(e) => setNewPriority(e.target.value as "Low" | "Medium" | "High")}
              className="p-2 border bg-white text-black border-gray-300
                         dark:border-gray-600 dark:bg-gray-800 dark:text-white
                         rounded w-full focus:outline-none focus:ring-2
                         focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600"
            >
              <option value="Low">Low</option>
              <option value="Medium">Medium</option>
              <option value="High">High</option>
            </select>
          </div>
        </div>
      ) : (
        <div>
          <span
          className={`flex-1 cursor-pointer ${task.completed ? "line-through text-gray-800" : "text-lg font-semibold"}
                     ${isOverdue ? "text-lg text-red-500 font-semibold" : ""}`}
          onClick={() => toggleTaskCompletion(task.id)}
          >
            {task.text}
          </span>
          {task.dueDate && (
            <span className={`text-sm ml-2 ${
              isOverdue ? "text-red-500 font-semibold" : "text-gray-500"
            }`}>
              Due: {new Date(task.dueDate).toLocaleDateString("en-GB")}
            </span>
          )}
        </div>
      )}

      <div className="flex items-center space-x-4 ml-4">
      {/* Priority Badge */}
      {!isEditing && (
        <span
        className={`px-3 py-1 rounded-full text-white text-xs font-semibold
          ${task.priority === "Low" ? "bg-green-500" : ""}
          ${task.priority === "Medium" ? "bg-yellow-500" : ""}
          ${task.priority === "High" ? "bg-red-500" : ""}`}
      > 
        {task.priority}
      </span>
      )}

      <div className="flex space-x-3">
        <button
          onClick={() => {
            if (isEditing) {
              handleEdit(); // Save on clicking "Save" while editing
            } else {
              setNewText(task.text);
              setNewPriority(task.priority);
              setIsEditing(true);
            }
          }}
          className={`px-4 py-2 rounded-md text-white transition-all duration-200 
            ${isEditing ? "bg-green-500 hover:bg-green-600" : "bg-blue-500 hover:bg-blue-600"}`}
        >
          {isEditing ? (
            <>
              💾 Save
            </>
          ) : (
            <>
              ✏️ Edit
            </>
          )}
        </button>

        {/* Cancel Button */}
        {isEditing && (
          <button
            onClick={() => {
              setIsEditing(false); // Revert to view mode
              setNewText(task.text); // Revert changes to the original text
              setNewPriority(task.priority); // Revert changes to the original priority
            }}
            className="px-4 py-2 rounded-md text-white bg-yellow-500 hover:bg-yellow-600 transition-all duration-200"
          >
            ❌ Cancel
          </button>
        )}

        {/* Delete Button */}
        <button
          onClick={() => deleteTask(task.id)}
          className="px-4 py-2 rounded-md text-white bg-red-500 hover:bg-red-600 transition-all duration-200"
        >
          🗑️ Delete
        </button>
      </div>
      </div>
    </div>
  );
}
