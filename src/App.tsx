import Header from "./components/Header";
import TaskList from "./components/TaskList";
import DarkModeToggle from "./components/DarkModeToggle";

export default function App() {

  return (
      <div className="min-h-screen bg-white dark:bg-gray-900 text-black dark:text-white flex flex-col items-center py-10">
        <Header />
        <DarkModeToggle/>
        <TaskList />
      </div>
  );
}