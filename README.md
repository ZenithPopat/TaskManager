# Task Manager App

A simple task manager app built with React, allowing users to create, edit, delete, and prioritize tasks. The app includes dark mode, task persistence with `localStorage`, and the ability to edit tasks with priority selection.

## Features

- **Task Creation & Management**: 
  - Add new tasks
  - Edit existing tasks
  - Delete tasks
  - Mark tasks as completed
  - Undo task deletions (coming soon)
  
- **Prioritization**:
  - Set task priority (Low, Medium, High) on creation and during editing
  - Display task priority as a badge
  - Sort tasks by priority

- **Dark Mode**:
  - Toggle between light and dark mode
  - User preference stored in `localStorage`

- **Responsive UI**:
  - Mobile-friendly design
  - Clear and intuitive task input, management, and editing features
 
- **Task Sorting And Filtering**:
  - Sort tasks by priority, due date, and completion status.
  - Filter tasks by Completion status and Priority.

- **Undo Deletion**:
  - Task deletions can be undone for 5 seconds after deletion.

## Tech Stack

- **Frontend**:
  - React
  - TypeScript
  - TailwindCSS for styling
  - Local Storage for task persistence

## Installation

1. Clone the repository:
    ```bash
    git clone (https://github.com/ZenithPopat/TaskManager.git)
    ```

2. Navigate to the project directory:
    ```bash
    cd TaskManager
    ```

3. Install dependencies:
    ```bash
    npm install
    ```

4. Run the development server:
    ```bash
    npm start
    ```

5. Open `http://localhost:3000` in your browser.

## Features To Be Added

- **Categories/Labels**: Add categories or labels to organize tasks better.
- **User Authentication**: Implement user sign-in and task synchronization across sessions.
- **Backend Integration**: Move from `localStorage` to a backend database (e.g., Firebase, Supabase, or PlanetScale).

## Contributing

1. Fork the repository
2. Create a new branch for each feature
3. Commit your changes
4. Push to your forked repository
5. Open a pull request to the main branch

## License

This project is licensed under the Blah Blah License - see the [LICENSE](LICENSE) file for details.
