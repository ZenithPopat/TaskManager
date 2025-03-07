import { useState, useEffect } from "react";
import TaskItem from "./TaskItem";
import TaskForm from "./TaskForm";

type Task = {
  id: string;
  text: string;
  completed: boolean;
  priority: 'Low' | 'Medium' | 'High';
};

type Priority = "Low" | "Medium" | "High";

const priorityOrder: Record<Priority, number> = {
  Low: 1,
  Medium: 2,
  High: 3,
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

  const addTask = (text: string, priority: Priority) => {
    const newTask: Task = {
      id: crypto.randomUUID(), // Generate unique ID
      text,
      completed: false,
      priority,
    };

    setTasks((prev) => [...prev, newTask]);
  };

  const toggleTaskCompletion = (id: string) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const removeTask = (id: string) => {
    setTasks((prev) => prev.filter((task) => task.id !== id));
  };

  const clearTasks = () => {
    setTasks([]); // Clear all tasks
    localStorage.removeItem("tasks"); // Remove tasks from localStorage
  };

   // Count total & completed tasks
   const totalTasks = tasks.length;
   const completedTasks = tasks.filter((task) => task.completed).length;

  const editTask = (id: string, newText: string, newPriority: Priority) => {
    setTasks((prev) =>
      prev.map((task) => (task.id === id ? { ...task, text: newText, priority: newPriority } : task))
    );
  };

  const sortedTasks = tasks.sort(
    (a, b) => priorityOrder[a.priority as Priority] - priorityOrder[b.priority as Priority]
  );
  
  return (
    <div className="mt-6 w-full max-w-lg mx-auto">
      <TaskForm addTask={addTask} />

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
          sortedTasks.map((task) => (
            <TaskItem
              key={task.id}
              task={task}
              toggleTaskCompletion={toggleTaskCompletion}
              removeTask={removeTask}
              editTask={editTask}
            />
          ))
        )}
      </div>
    </div>
  );
}
