type TaskItemProps = {
  task: { text: string; completed: boolean };
  toggleCompletion: () => void;
  removeTask: () => void;
};

export default function TaskItem({ task, toggleCompletion, removeTask }: TaskItemProps) {
  return (
    <div className="flex justify-between items-center bg-gray-800 p-2 my-2 rounded-md">
      <div className="flex items-center">
        <input
          type="checkbox"
          checked={task.completed}
          onChange={toggleCompletion}
          className="mr-2"
        />
        <span className={task.completed ? "line-through text-gray-500" : ""}>
          {task.text}
        </span>
      </div>
      <button
        onClick={removeTask}
        className="bg-red-500 hover:bg-red-600 px-3 py-1 rounded-md text-white"
      >
        Delete
      </button>
    </div>
  );
}
