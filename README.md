# React Kanban Board Assignment

A modern, feature-rich Kanban board application built with React, TypeScript, and Redux Toolkit. This project demonstrates proficiency in modern React development with functional components, hooks, and efficient state management.

## 🚀 Features Implemented

### ✅ Core Functionality
- **Three-column Kanban board**: Todo, In Progress, and Done
- **Task Management**: Add, edit, and delete tasks with full CRUD operations
- **Drag & Drop**: Seamless task movement between columns using @hello-pangea/dnd
- **Real-time Updates**: Instant UI updates with Redux state management

### ✅ Task Details & Properties
- **Title**: Task name/heading
- **Description**: Detailed task description
- **Priority**: Low, Medium, High with color-coded indicators
- **Due Date**: Date picker with overdue highlighting
- **Status**: Automatically managed through column placement

### ✅ Data Persistence
- **localStorage Integration**: All task data automatically saved and restored
- **Session Recovery**: Tasks persist across browser refreshes and sessions
- **Real-time Sync**: Changes immediately saved to localStorage

### ✅ Filtering & Sorting
- **Global Filters**: 
  - All tasks
  - High Priority tasks only
  - Tasks due today
- **Column Sorting**: Sort by due date or priority within each column
- **Search Functionality**: Real-time search by task title

### ✅ Advanced Features
- **Progress Tracking**: Visual progress bar showing completion percentage
- **Responsive Design**: Mobile-friendly layout with adaptive columns
- **Dark Mode**: Beautiful dark theme with modern UI design
- **Visual Indicators**: 
  - Priority-based color coding
  - Overdue task highlighting
  - Due today badges
  - Task count displays

### ✅ Technical Excellence
- **TypeScript**: Full type safety throughout the application
- **Redux Toolkit**: Predictable state management with RTK
- **Modern React**: Functional components with hooks
- **Performance**: Optimized rendering and state updates
- **Code Quality**: Clean, maintainable, and well-structured code

## 🛠️ Technologies Used

- **React 19.1.1** - Modern React with latest features
- **TypeScript** - Type-safe development
- **Redux Toolkit** - State management
- **@hello-pangea/dnd** - Drag and drop functionality
- **Tailwind CSS** - Utility-first styling
- **Vite** - Fast build tool and dev server
- **date-fns** - Date manipulation utilities
- **uuid** - Unique ID generation

## 📦 Installation & Setup

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn package manager

### Getting Started

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd react-kanban-assignment
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:5173` (or the port shown in terminal)

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## 🎯 Usage Guide

### Adding Tasks
1. Click the "Add Task" button in the header
2. Fill in the task details (title, description, priority, due date)
3. Click "Add Task" to create the task

### Managing Tasks
- **Edit**: Click on a task card to modify its details
- **Delete**: Click the delete button on any task card
- **Move**: Drag and drop tasks between columns
- **Search**: Use the search bar to find tasks by title
- **Filter**: Use filter buttons to view specific task types

### Sorting Tasks
- Use the dropdown in each column header to sort by:
  - Due Date (earliest first)
  - Priority (High → Medium → Low)

## 🏗️ Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── TaskCard.tsx    # Individual task card component
│   ├── Button.tsx      # Custom button component
│   ├── Input.tsx       # Custom input component
│   └── Modal.tsx       # Modal wrapper component
├── features/           # Feature-based modules
│   └── tasks/          # Task management feature
│       ├── TaskColumn.tsx    # Column component
│       ├── TaskForm.tsx      # Add/Edit task form
│       └── TaskSlice.ts      # Redux slice for tasks
├── hooks/              # Custom React hooks
│   └── useLocalStorage.ts   # localStorage hook
├── pages/              # Page components
│   └── Board.tsx       # Main Kanban board page
├── store/              # Redux store configuration
│   └── index.ts        # Store setup
├── types/              # TypeScript type definitions
│   └── Task.ts         # Task interface
├── utils/              # Utility functions
│   ├── dateUtils.ts    # Date helper functions
│   └── priorityUtils.ts # Priority helper functions
└── styles/             # Global styles
    └── index.css       # Main stylesheet
```

## 🎨 Design Features

- **Modern Dark Theme**: Sleek dark mode design with gradient accents
- **Color-coded Priorities**: Visual priority indicators
- **Responsive Layout**: Adapts to all screen sizes
- **Smooth Animations**: Hover effects and transitions
- **Progress Visualization**: Real-time completion tracking
- **Intuitive UX**: User-friendly interface with clear visual hierarchy

## 🔧 Challenges & Solutions

### Challenge 1: Drag & Drop Implementation
**Problem**: Implementing smooth drag and drop between columns while maintaining state consistency.

**Solution**: Used @hello-pangea/dnd library with Redux state updates. Implemented proper drop handling with validation and state synchronization.

### Challenge 2: Data Persistence
**Problem**: Ensuring task data persists across browser sessions and refreshes.

**Solution**: Integrated localStorage with Redux Toolkit, automatically saving state changes and loading data on app initialization.

### Challenge 3: Type Safety
**Problem**: Maintaining type safety across complex state management and component props.

**Solution**: Created comprehensive TypeScript interfaces for all data structures and used strict typing throughout the application.

### Challenge 4: Performance Optimization
**Problem**: Ensuring smooth performance with large numbers of tasks and frequent state updates.

**Solution**: Implemented efficient filtering, memoization where appropriate, and optimized re-rendering patterns.

## 🚀 Future Enhancements

- [ ] Task categories/tags
- [ ] User authentication
- [ ] Team collaboration features
- [ ] Task templates
- [ ] Export/import functionality
- [ ] Advanced filtering options
- [ ] Task dependencies
- [ ] Time tracking

## 📄 License

This project is created as part of a React developer assignment and is for demonstration purposes.

## 👨‍💻 Developer

Built with ❤️ using modern React development practices and best practices for maintainable, scalable applications.