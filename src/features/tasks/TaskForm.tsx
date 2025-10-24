// src/features/tasks/TaskForm.tsx
import React, { useState } from "react";
import type { Task, Priority } from "../../types/Task";
import { useDispatch } from "react-redux";
import { addTask, updateTask } from "./TaskSlice";
import { v4 as uuidv4 } from "uuid";

interface TaskFormProps {
  task?: Task; // If editing, task will be passed
  onClose: () => void;
}

const priorities: Priority[] = ["Low", "Medium", "High"];

const TaskForm: React.FC<TaskFormProps> = ({ task, onClose }) => {
  const dispatch = useDispatch();

  const [title, setTitle] = useState(task?.title || "");
  const [description, setDescription] = useState(task?.description || "");
  const [priority, setPriority] = useState<Priority>(task?.priority || "Low");
  const [dueDate, setDueDate] = useState(task?.dueDate || "");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!title || !description || !dueDate) return;

    if (task) {
      // Update existing task
      dispatch(updateTask({ ...task, title, description, priority, dueDate }));
    } else {
      // Add new task
      const newTask: Task = {
        id: uuidv4(),
        title,
        description,
        priority,
        dueDate,
        status: "Todo",
      };
      dispatch(addTask(newTask));
    }

    onClose();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
      <div className="bg-white dark:bg-gray-700 p-6 rounded shadow w-96">
        <h2 className="text-xl font-bold mb-4">{task ? "Edit Task" : "Add Task"}</h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          <input
            type="text"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="p-2 border rounded"
            required
          />
          <textarea
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="p-2 border rounded"
            required
          />
          <select
            value={priority}
            onChange={(e) => setPriority(e.target.value as Priority)}
            className="p-2 border rounded"
          >
            {priorities.map((p) => (
              <option key={p} value={p}>{p}</option>
            ))}
          </select>
          <input
            type="date"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
            className="p-2 border rounded"
            required
          />
          <div className="flex justify-end gap-2 mt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded border"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 rounded bg-blue-500 text-white"
            >
              {task ? "Update" : "Add"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TaskForm;
