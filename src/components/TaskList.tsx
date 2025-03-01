import { useState, useEffect } from "react";
import TaskItem from "./TaskItem";
import TaskForm from "./TaskForm";

type Task = {
  text: string;
  completed: boolean;
};

export default function TaskList() {
  const [tasks, setTasks] = useState<Task[]>(() => {
    // Load tasks from localStorage when the component mounts
    const savedTasks = localStorage.getItem("tasks");
    return savedTasks ? JSON.parse(savedTasks) : [];
  });

  // Save tasks to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const addTask = (taskText: string) => {
    setTasks((prevTasks) => [...prevTasks, { text: taskText, completed: false }]);
  };

  const toggleTaskCompletion = (index: number) => {
    setTasks((prevTasks) =>
      prevTasks.map((task, i) =>
        i === index ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const removeTask = (indexToRemove: number) => {
    setTasks((prevTasks) => prevTasks.filter((_, index) => index !== indexToRemove));
  };

  const clearTasks = () => {
    setTasks([]); // Clear all tasks
    localStorage.removeItem("tasks"); // Remove tasks from localStorage
  };

   // Count total & completed tasks
   const totalTasks = tasks.length;
   const completedTasks = tasks.filter((task) => task.completed).length;

   const editTask = (index: number, newText: string) => {
    setTasks((prevTasks) =>
      prevTasks.map((task, i) =>
        i === index ? { ...task, text: newText } : task
      )
    );
  }
  return (
    <div className="mt-6 w-full max-w-md">
      <TaskForm setTasks={addTask} />

      {/* Task Counter */}
      {totalTasks > 0 && (
        <div className="mt-4 text-center text-gray-700">
          <p>
            ✅ Completed: <span className="text-green-500">{completedTasks}</span> / {totalTasks}
          </p>
        </div>
      )}

      {tasks.length > 0 && (
        <button 
          onClick={clearTasks} 
          className="mt-4 p-2 bg-red-500 text-white rounded w-full hover:bg-red-600"
        >
          Clear All Tasks
        </button>
      )}
      <div className="mt-4">
        {tasks.length === 0 ? (
          <p className="text-gray-400 text-center">No tasks yet. Add one!</p>
        ) : (
          tasks.map((task, index) => (
            <TaskItem
              key={index}
              task={task}
              toggleCompletion={() => toggleTaskCompletion(index)}
              removeTask={() => removeTask(index)}
              editTask={(newText) => editTask(index, newText)}
            />
          ))
        )}
      </div>
    </div>
  );
}
