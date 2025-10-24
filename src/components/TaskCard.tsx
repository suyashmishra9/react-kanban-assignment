import React from "react";
import type { Task } from "../types/Task";
import { Draggable } from "@hello-pangea/dnd";
import { useDispatch } from "react-redux";
import { deleteTask } from "../features/tasks/TaskSlice";

interface TaskCardProps {
  task: Task;
  index: number;
}

const TaskCard: React.FC<TaskCardProps> = ({ task, index }) => {
  const dispatch = useDispatch(); // ✅ inside component

  return (
    <Draggable draggableId={task.id} index={index}>
      {(provided) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          className="bg-white dark:bg-gray-700 p-4 mb-3 rounded shadow cursor-pointer"
        >
          <h3 className="font-bold text-lg">{task.title}</h3>
          <p className="text-sm mt-1">{task.description}</p>
          <div className="flex justify-between mt-2 text-xs">
            <span
              className={`px-2 py-1 rounded text-white ${
                task.priority === "High"
                  ? "bg-red-500"
                  : task.priority === "Medium"
                  ? "bg-yellow-500"
                  : "bg-green-500"
              }`}
            >
              {task.priority}
            </span>
            <span>{new Date(task.dueDate).toLocaleDateString()}</span>
          </div>
          <button
            onClick={() => dispatch(deleteTask(task.id))}
            className="text-red-500 text-xs mt-2"
          >
            Delete
          </button>
        </div>
      )}
    </Draggable>
  );
};

export default TaskCard;
