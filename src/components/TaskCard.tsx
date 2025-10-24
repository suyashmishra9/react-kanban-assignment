import React, { useState } from "react";
import type { Task } from "../types/Task";
import { Draggable } from "@hello-pangea/dnd";
import { useDispatch } from "react-redux";
import { deleteTask } from "../features/tasks/TaskSlice";
import { useTheme } from "../contexts/ThemeContext";
import TaskForm from "../features/tasks/TaskForm"; // import TaskForm for editing

interface TaskCardProps {
  task: Task;
  index: number;
}

const TaskCard: React.FC<TaskCardProps> = ({ task, index }) => {
  const dispatch = useDispatch();
  const { theme } = useTheme();
  const [isEditing, setIsEditing] = useState(false); // state to open edit modal

  const getPriorityColor = (priority: string) => {
    if (theme === "light") {
      switch (priority) {
        case "High":
          return "bg-red-100 text-red-800 border-red-200";
        case "Medium":
          return "bg-yellow-100 text-yellow-800 border-yellow-200";
        case "Low":
          return "bg-green-100 text-green-800 border-green-200";
        default:
          return "bg-gray-100 text-gray-800 border-gray-200";
      }
    } else {
      switch (priority) {
        case "High":
          return "bg-red-900/30 text-red-300 border-red-700";
        case "Medium":
          return "bg-yellow-900/30 text-yellow-300 border-yellow-700";
        case "Low":
          return "bg-green-900/30 text-green-300 border-green-700";
        default:
          return "bg-gray-700 text-gray-300 border-gray-600";
      }
    }
  };

  const isOverdue =
    new Date(task.dueDate) < new Date() && task.status !== "Done";
  const isDueToday =
    new Date(task.dueDate).toDateString() === new Date().toDateString();

  return (
    <>
      {isEditing && (
        <TaskForm task={task} onClose={() => setIsEditing(false)} />
      )}
      <Draggable draggableId={task.id} index={index}>
        {(provided, snapshot) => (
          <div
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            className={`group p-4 rounded-lg shadow-md hover:shadow-lg cursor-grab active:cursor-grabbing transition-all duration-200 ${
              snapshot.isDragging
                ? "rotate-2 scale-105 shadow-2xl"
                : "hover:scale-105"
            } ${
              theme === "light"
                ? "bg-white border-gray-200"
                : "bg-gray-700 border-gray-600"
            } border ${
              isOverdue
                ? theme === "light"
                  ? "border-red-300 bg-red-50/50"
                  : "border-red-600 bg-red-900/20"
                : ""
            }`}
          >
            <div className="flex justify-between items-start mb-3">
              <h3
                className={`font-semibold text-lg leading-tight ${
                  theme === "light" ? "text-gray-800" : "text-gray-200"
                }`}
              >
                {task.title}
              </h3>
              <div className="flex gap-2">
                {/* Edit Button */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setIsEditing(true);
                  }}
                  className="p-1 transition-colors duration-200 text-gray-400 hover:text-blue-500"
                  title="Edit task"
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
                      d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5M16 3l5 5-11 11H5v-5L16 3z"
                    />
                  </svg>
                </button>

                {/* Delete Button */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    dispatch(deleteTask(task.id));
                  }}
                  className="p-1 transition-colors duration-200 text-gray-400 hover:text-red-500"
                  title="Delete task"
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
                      d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                    />
                  </svg>
                </button>
              </div>
            </div>

            <p
              className={`text-sm mb-4 line-clamp-3 ${
                theme === "light" ? "text-gray-600" : "text-gray-400"
              }`}
            >
              {task.description}
            </p>

            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2">
                <span
                  className={`px-2 py-1 rounded-full text-xs font-medium border ${getPriorityColor(
                    task.priority
                  )}`}
                >
                  {task.priority}
                </span>
                {isOverdue && (
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-medium border ${
                      theme === "light"
                        ? "bg-red-100 text-red-800 border-red-200"
                        : "bg-red-900/30 text-red-300 border-red-700"
                    }`}
                  >
                    Overdue
                  </span>
                )}
                {isDueToday && !isOverdue && (
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-medium border ${
                      theme === "light"
                        ? "bg-blue-100 text-blue-800 border-blue-200"
                        : "bg-blue-900/30 text-blue-300 border-blue-700"
                    }`}
                  >
                    Due Today
                  </span>
                )}
              </div>

              <div
                className={`flex items-center gap-1 text-xs ${
                  theme === "light" ? "text-gray-500" : "text-gray-400"
                }`}
              >
                <svg
                  className="w-3 h-3"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
                <span
                  className={
                    isOverdue
                      ? theme === "light"
                        ? "text-red-600 font-medium"
                        : "text-red-400 font-medium"
                      : ""
                  }
                >
                  {new Date(task.dueDate).toLocaleDateString()}
                </span>
              </div>
            </div>
          </div>
        )}
      </Draggable>
    </>
  );
};

export default TaskCard;
