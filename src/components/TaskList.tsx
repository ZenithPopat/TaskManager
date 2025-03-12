import { useState, useEffect, useCallback } from "react";
import TaskItem from "./TaskItem";
import TaskForm from "./TaskForm";
import TaskSortingFiltering from "./TaskSortingFiltering";

type Task = {
  id: string;
  text: string;
  completed: boolean;
  priority: 'Low' | 'Medium' | 'High';
  dueDate: string | null;
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

  const [sortBy, setSortBy] = useState<"priority" | "dueDate" | "completion">(() => {
    const savedSort = localStorage.getItem("sort");
    return savedSort ? JSON.parse(savedSort) : "priority";
  });
  const [filterPriority, setFilterPriority] = useState<Priority | null>(() => {
    const savedPriority = localStorage.getItem("priorityFilter");
    return savedPriority ? JSON.parse(savedPriority) : null;
  });
  const [filterCompletion, setFilterCompletion] = useState<boolean | null>(() => {
    const savedCompletion = localStorage.getItem("completionFilter");
    return savedCompletion ? JSON.parse(savedCompletion) : null;
  });

  const [deletedTask, setDeletedTask] = useState<Task | null>(null);
  const [undoTimeout, setUndoTimeout] = useState<NodeJS.Timeout | null>(null);

  // Save tasks to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  useEffect(() => {
    const storedDeletedTask = localStorage.getItem("deletedTask");
    if (storedDeletedTask) {
      const { task, timestamp } = JSON.parse(storedDeletedTask);
      const timePassed = Date.now() - timestamp;
      const timeLeft = 5000 - timePassed;

      // If it's within 5 seconds, allow undo
      if (timePassed < 5000) {
        setDeletedTask(task);

        const timeout = setTimeout(() => {
          setDeletedTask(null);
          localStorage.removeItem("deletedTask");
        }, timeLeft);

        return () => clearTimeout(timeout);

      } else {
        localStorage.removeItem("deletedTask");
      }
    }
  }, []);

  useEffect(() => {
    return () => {
      if (undoTimeout) clearTimeout(undoTimeout);
    };
  }, [undoTimeout]);

  const addTask = (text: string, priority: Priority, dueDate: string|null) => {
    const newTask: Task = {
      id: crypto.randomUUID(), // Generate unique ID
      text,
      completed: false,
      priority,
      dueDate
    };

    setTasks((prev) => [...prev, newTask]);
  };

  const toggleTaskCompletion = useCallback((id: string) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  }, [setTasks]);

  const deleteTask = (id: string) => {
    const taskToDelete = tasks.find((task) => task.id === id);
    if(!taskToDelete) return;

    setDeletedTask(taskToDelete);

    const updatedTasks = tasks.filter((task) => task.id !== id);
    setTasks(updatedTasks);
    localStorage.setItem("tasks", JSON.stringify(updatedTasks));

    localStorage.setItem("deletedTask", JSON.stringify({task: taskToDelete, timestamp: Date.now()}));
    
    const timeout = setTimeout(() => {
      setDeletedTask(null);
      localStorage.removeItem("deletedTask");
    }, 5000);
    setUndoTimeout(timeout);

  };

  const handleUndo = () => {
    if (!deletedTask) return;
    if (!tasks.find(task => task.id === deletedTask.id)) {
      const updatedTasks = [...tasks, deletedTask];
      setTasks(updatedTasks);
      localStorage.setItem("tasks", JSON.stringify(updatedTasks));
    }
    setDeletedTask(null);
    if(undoTimeout) {
      clearTimeout(undoTimeout);
    }
  };

  const clearTasks = () => {
    if (window.confirm("Are you sure you want to delete all tasks? This cannot be undone!")) {
      setTasks([]);
      localStorage.removeItem("tasks");
    }
  };

   // Count total & completed tasks
   const totalTasks = tasks.length;
   const completedTasks = tasks.filter((task) => task.completed).length;

  const editTask = (id: string, newText: string, newPriority: Priority) => {
    setTasks((prev) =>
      prev.map((task) => (task.id === id ? { ...task, text: newText, priority: newPriority } : task))
    );
  };

  const filteredTasks = tasks.filter((task) => {
    const matchesPriority = filterPriority ? task.priority === filterPriority : true;
    const matchesCompletion = filterCompletion !== null ? task.completed === filterCompletion : true;
    return matchesPriority && matchesCompletion;
  });

  const sortedTasks = [...filteredTasks].sort((a, b) => {
    if (sortBy === "priority") {
      return priorityOrder[a.priority] - priorityOrder[b.priority];
    } else if (sortBy === "dueDate") {
      if(!a.dueDate && !b.dueDate) {
        return 0;
      } else if (!a.dueDate) {
        return 1;
      }
      else if (!b.dueDate) { 
        return -1;
      }
      return (a.dueDate ? new Date(a.dueDate).getTime() : 0) - (b.dueDate ? new Date(b.dueDate).getTime() : 0);
    } else if (sortBy === "completion") {
      return Number(b.completed) - Number(a.completed);
    }
    return 0;
  });

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

      <div>
        <TaskSortingFiltering
          setSortBy={setSortBy}
          setFilterPriority={setFilterPriority}
          setFilterCompletion={setFilterCompletion}
      />
      </div>

      <div className="mt-4">
        {tasks.length !== 0 ? (sortedTasks.length === 0 ? (
          <p className="text-gray-400 text-center">No tasks available!</p>
        ) : (
          sortedTasks.map((task) => (
            <TaskItem
              key={task.id}
              task={task}
              toggleTaskCompletion={toggleTaskCompletion}
              deleteTask={deleteTask}
              editTask={editTask}
            />
          ))
        )) : <p className="text-gray-400 text-center">No tasks yet. Add one!</p>}
      </div>
      {deletedTask && (
        <div className="fixed bottom-4 right-4 bg-gray-800 text-white p-4 rounded shadow">
          <span>Task deleted</span>
          <button onClick={handleUndo} className="ml-4 bg-blue-500 px-2 py-1 rounded">
            Undo
          </button>
        </div>
      )}
    </div>
  );
}
