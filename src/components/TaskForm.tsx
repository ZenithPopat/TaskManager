import { useState } from "react";
interface TaskFormProps {
  addTask: (id: string, priority: string) => void;
}

const TaskForm = ({ addTask }: TaskFormProps) => {
  const [taskText, setTaskText] = useState<string>("");
  const [taskPriority, setTaskPriority] = useState<string>("Medium");

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
      {/* <input
        type="text"
        value={taskText}
        onChange={(e) => setTaskText(e.target.value)}
        placeholder="Add a new task"
        className="w-full p-3 mb-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white dark:border-gray-600 transition duration-200"
      /> */}
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
          onChange={(e) => setTaskPriority(e.target.value)}
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

// type TaskFormProps = {
//   setTasks: (taskText: string) => void;
// };

// export default function TaskForm({ setTasks }: TaskFormProps) {
//   const [task, setTask] = useState("");

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();
//     if (!task.trim()) return;
//     setTasks(task); // ✅ Pass only the task text
//     setTask("");
//   };

//   return (
//     <form onSubmit={handleSubmit} className="flex">
//       <input
//         type="text"
//         value={task}
//         onChange={(e) => setTask(e.target.value)}
//         placeholder="Enter a new task..."
//         className="flex-1 p-2 rounded-l-md text-black dark:text-white bg-gray-400 dark:bg-gray-700 placeholder-white dark:placeholder-gray-400"
//       />
//       <button type="submit" className="bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded-r-md text-white">
//         Add
//       </button>
//     </form>
//   );
// }
