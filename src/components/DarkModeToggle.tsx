import { useState, useEffect } from "react";

const DarkModeToggle = () => {
  const [darkMode, setDarkMode] = useState<boolean>(false);

  useEffect(() => {
    // Check if dark mode is enabled in localStorage and set it
    const savedMode = localStorage.getItem("darkMode") === "true";
    setDarkMode(savedMode);
    if (savedMode) {
      document.documentElement.classList.add("dark");
    }
  }, []);

  const toggleDarkMode = () => {
    setDarkMode((prevMode) => {
      const newMode = !prevMode;
      // Save the user's preference to localStorage
      localStorage.setItem("darkMode", newMode.toString());
      if (newMode) {
        document.documentElement.classList.add("dark");
      } else {
        document.documentElement.classList.remove("dark");
      }
      return newMode;
    });
  };

  return (
    <div className="flex items-center">
      <label htmlFor="darkMode" className="mr-2 text-gray-800 dark:text-gray-200">
        Dark Mode
      </label>
      <input
        id="darkMode"
        type="checkbox"
        checked={darkMode}
        onChange={toggleDarkMode}
        className="toggle-checkbox hidden"
      />
      <div
        onClick={toggleDarkMode}
        className="relative cursor-pointer w-12 h-6 bg-gray-300 rounded-full transition-colors"
      >
        <div
          className={`absolute w-6 h-6 bg-white rounded-full transition-transform ${
            darkMode ? "translate-x-6" : "translate-x-0"
          }`}
        ></div>
      </div>
    </div>
  );
};

export default DarkModeToggle;