import React, { useState } from "react";
import type { Task } from "../../types/Task";
import TaskCard from "../../components/TaskCard";
import { Droppable } from "@hello-pangea/dnd";

interface TaskColumnProps {
  columnId: string;
  title: string;
  tasks: Task[];
}

type SortOption = "None" | "Due Date" | "Priority";

const TaskColumn: React.FC<TaskColumnProps> = ({ columnId, title, tasks }) => {
  const [sortOption, setSortOption] = useState<SortOption>("None");

  const sortedTasks = [...tasks].sort((a, b) => {
    if (sortOption === "Due Date") {
      return new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime();
    }
    if (sortOption === "Priority") {
      const priorityOrder = { High: 1, Medium: 2, Low: 3 } as const;
      return priorityOrder[a.priority] - priorityOrder[b.priority];
    }
    return 0; 
  });

  return (
    <div className="w-1/3 p-2">
      <div className="flex justify-between items-center mb-2">
        <h2 className="text-xl font-bold">{title}</h2>
        <select
          value={sortOption}
          onChange={(e) => setSortOption(e.target.value as SortOption)}
          className="p-1 text-xs border rounded"
        >
          <option value="None">Sort</option>
          <option value="Due Date">Due Date</option>
          <option value="Priority">Priority</option>
        </select>
      </div>

      <Droppable droppableId={columnId}>
        {(provided) => (
          <div
            ref={provided.innerRef}
            {...provided.droppableProps}
            className="bg-gray-100 dark:bg-gray-800 p-2 min-h-[400px] rounded"
          >
            {sortedTasks.map((task, index) => (
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
