// src/features/tasks/TaskColumn.tsx
import React from "react";
import type { Task } from "../../types/Task";
import TaskCard from "../../components/TaskCard";
import { Droppable } from "@hello-pangea/dnd";

interface TaskColumnProps {
  columnId: string;
  title: string;
  tasks: Task[];
}

const TaskColumn: React.FC<TaskColumnProps> = ({ columnId, title, tasks }) => {
  return (
    <div className="w-1/3 p-2">
      <h2 className="text-xl font-bold mb-2">{title}</h2>
      <Droppable droppableId={columnId}>
        {(provided) => (
          <div
            ref={provided.innerRef}
            {...provided.droppableProps}
            className="bg-gray-100 dark:bg-gray-800 p-2 min-h-[400px] rounded"
          >
            {tasks.map((task, index) => (
              <TaskCard key={task.id} task={task} index={index} />
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  );
};

export default TaskColumn;
