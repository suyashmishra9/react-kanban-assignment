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
    if (filter === "High Priority") return task.priority === "High";
    if (filter === "Due Today") return task.dueDate === today;
    return true; 
  });

  const todoTasks = filteredTasks.filter((t) => t.status === "Todo");
  const inProgressTasks = filteredTasks.filter((t) => t.status === "In Progress");
  const doneTasks = filteredTasks.filter((t) => t.status === "Done");

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="p-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-100">
          Kanban Board
        </h1>
        <button
          className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
          onClick={() => setIsModalOpen(true)}
        >
          Add Task
        </button>
      </div>

      {isModalOpen && <TaskForm onClose={() => setIsModalOpen(false)} />}

      <div className="flex gap-2 p-4">
        {(["All", "High Priority", "Due Today"] as Filter[]).map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-3 py-1 rounded border ${
              filter === f
                ? "bg-blue-500 text-white"
                : "bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-100"
            }`}
          >
            {f}
          </button>
        ))}
      </div>

      <DragDropContext onDragEnd={handleDragEnd}>
        <div className="flex gap-4 p-4">
          <TaskColumn columnId="Todo" title="Todo" tasks={todoTasks} />
          <TaskColumn columnId="In Progress" title="In Progress" tasks={inProgressTasks} />
          <TaskColumn columnId="Done" title="Done" tasks={doneTasks} />
        </div>
      </DragDropContext>
    </div>
  );
};

export default Board;
