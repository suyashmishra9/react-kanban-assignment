// src/pages/Board.tsx
import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import type { RootState, AppDispatch } from "../store";
import TaskColumn from "../features/tasks/TaskColumn";
import { DragDropContext, type DropResult } from "@hello-pangea/dnd";
import type { Task } from "../types/Task";
import { setTasks } from "../features/tasks/TaskSlice";
import TaskForm from "../features/tasks/TaskForm";

const Board: React.FC = () => {
  const tasks = useSelector((state: RootState) => state.tasks.tasks);
  const dispatch = useDispatch<AppDispatch>();
  const [isModalOpen, setIsModalOpen] = useState(false);

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

  const todoTasks = tasks.filter((t) => t.status === "Todo");
  const inProgressTasks = tasks.filter((t) => t.status === "In Progress");
  const doneTasks = tasks.filter((t) => t.status === "Done");

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header with Add Task */}
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

      {/* Task Form Modal */}
      {isModalOpen && <TaskForm onClose={() => setIsModalOpen(false)} />}

      {/* Kanban Columns */}
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
