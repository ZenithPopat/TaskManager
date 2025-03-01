import Header from "./components/Header";
import TaskList from "./components/TaskList";

export default function App() {
  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center py-10">
      <Header />
      <TaskList />
    </div>
  );
}