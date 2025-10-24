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

  const getColumnColor = (columnId: string) => {
    switch (columnId) {
      case 'Todo':
        return 'border-blue-800 bg-blue-900/20';
      case 'In Progress':
        return 'border-yellow-800 bg-yellow-900/20';
      case 'Done':
        return 'border-green-800 bg-green-900/20';
      default:
        return 'border-gray-700 bg-gray-800/50';
    }
  };

  const getColumnIcon = (columnId: string) => {
    switch (columnId) {
      case 'Todo':
        return (
          <svg className="w-5 h-5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
          </svg>
        );
      case 'In Progress':
        return (
          <svg className="w-5 h-5 text-yellow-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        );
      case 'Done':
        return (
          <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        );
      default:
        return null;
    }
  };

  return (
    <div className="flex flex-col h-full">
      <div className={`p-4 rounded-t-lg border-2 ${getColumnColor(columnId)} transition-all duration-200`}>
        <div className="flex justify-between items-center mb-3">
          <div className="flex items-center gap-2">
            {getColumnIcon(columnId)}
            <h2 className="text-lg font-semibold text-gray-200">{title}</h2>
            <span className="px-2 py-1 text-xs font-medium bg-gray-700/60 text-gray-300 rounded-full">
              {sortedTasks.length}
            </span>
          </div>
          <select
            value={sortOption}
            onChange={(e) => setSortOption(e.target.value as SortOption)}
            className="px-3 py-1 text-sm bg-gray-700 border border-gray-600 rounded-lg text-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-200"
          >
            <option value="None">Sort</option>
            <option value="Due Date">Due Date</option>
            <option value="Priority">Priority</option>
          </select>
        </div>
      </div>

      {/* Column Content */}
      <Droppable droppableId={columnId}>
        {(provided, snapshot) => (
          <div
            ref={provided.innerRef}
            {...provided.droppableProps}
            className={`flex-1 p-4 min-h-[500px] rounded-b-lg border-2 border-t-0 ${getColumnColor(columnId)} ${
              snapshot.isDraggingOver 
                ? 'bg-blue-900/30 border-blue-700' 
                : ''
            } transition-all duration-200`}
          >
            {sortedTasks.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-32 text-gray-500">
                <svg className="w-8 h-8 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
                <p className="text-sm">No tasks yet</p>
              </div>
            ) : (
              <div className="space-y-3">
                {sortedTasks.map((task, index) => (
                  <TaskCard key={task.id} task={task} index={index} />
                ))}
              </div>
            )}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  );
};

export default TaskColumn;
