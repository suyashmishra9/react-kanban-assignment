import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import type { RootState, AppDispatch } from "../store";
import TaskColumn from "../features/tasks/TaskColumn";
import { DragDropContext, type DropResult } from "@hello-pangea/dnd";
import type { Task } from "../types/Task";
import { setTasks } from "../features/tasks/TaskSlice";
import TaskForm from "../features/tasks/TaskForm";

type Filter = "All" | "High Priority" | "Due Today";

const Board: React.FC = () => {
  const tasks = useSelector((state: RootState) => state.tasks.tasks);
  const dispatch = useDispatch<AppDispatch>();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [filter, setFilter] = useState<Filter>("All");
  const [searchTerm, setSearchTerm] = useState("");

  const handleDragEnd = (result: DropResult) => {
    const { destination, source, draggableId } = result;
    if (!destination) return;
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    )
      return;

    const task = tasks.find((t) => t.id === draggableId);
    if (!task) return;

    const updatedTask: Task = {
      ...task,
      status: destination.droppableId as Task["status"],
    };

    const newTasks = tasks.filter((t) => t.id !== draggableId);
    newTasks.splice(destination.index, 0, updatedTask);
    dispatch(setTasks(newTasks));
  };

  const today = new Date().toISOString().split("T")[0];
  const filteredTasks = tasks.filter((task) => {
    if (
      searchTerm &&
      !task.title.toLowerCase().includes(searchTerm.toLowerCase())
    ) {
      return false;
    }
    if (filter === "High Priority") return task.priority === "High";
    if (filter === "Due Today") return task.dueDate === today;
    return true;
  });

  const totalTasks = tasks.length;
  const completedTasks = tasks.filter((t) => t.status === "Done").length;
  const progressPercentage =
    totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

  const todoTasks = filteredTasks.filter((t) => t.status === "Todo");
  const inProgressTasks = filteredTasks.filter(
    (t) => t.status === "In Progress"
  );
  const doneTasks = filteredTasks.filter((t) => t.status === "Done");

  return (
    <div className="min-h-screen bg-linear-to-br from-gray-900 to-gray-800">
      <div className="bg-gray-800/80 backdrop-blur-sm border-b border-gray-700 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-4">
            <h1 className="text-3xl font-bold bg-linear-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              Kanban Board
            </h1>
            <div className="flex items-center gap-4">
              <span className="text-sm text-gray-400">
                {tasks.length} tasks
              </span>
              <div className="flex items-center gap-2">
                <span className="text-xs text-gray-400">Progress:</span>
                <div className="w-32 bg-gray-700 rounded-full h-2">
                  <div
                    className="bg-linear-to-r from-blue-500 to-purple-600 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${progressPercentage}%` }}
                  ></div>
                </div>
                <span className="text-xs text-gray-400">
                  {progressPercentage}%
                </span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              className="px-6 py-2 bg-linear-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white rounded-lg font-medium shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 flex items-center gap-2"
              onClick={() => setIsModalOpen(true)}
            >
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 4v16m8-8H4"
                />
              </svg>
              Add Task
            </button>
          </div>
        </div>
      </div>

      {isModalOpen && <TaskForm onClose={() => setIsModalOpen(false)} />}

      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <input
                type="text"
                placeholder="Search tasks by title..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-4 py-2 pl-10 bg-gray-700 border border-gray-600 rounded-lg text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
              />
              <svg
                className="absolute left-3 top-2.5 w-4 h-4 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>
          </div>

          <div className="flex gap-2">
            {(["All", "High Priority", "Due Today"] as Filter[]).map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                  filter === f
                    ? "bg-blue-500 text-white shadow-lg transform scale-105"
                    : "bg-gray-700 text-gray-300 hover:bg-gray-600 border border-gray-600"
                }`}
              >
                {f}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 pb-8">
        <DragDropContext onDragEnd={handleDragEnd}>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <TaskColumn columnId="Todo" title="Todo" tasks={todoTasks} />
            <TaskColumn
              columnId="In Progress"
              title="In Progress"
              tasks={inProgressTasks}
            />
            <TaskColumn columnId="Done" title="Done" tasks={doneTasks} />
          </div>
        </DragDropContext>
      </div>
    </div>
  );
};

export default Board;
