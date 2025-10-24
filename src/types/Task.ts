export type Priority = "Low" | "Medium" | "High";

export interface Task {
  id: string; 
  title: string;
  description: string;
  priority: Priority;
  dueDate: string; 
  status: "Todo" | "In Progress" | "Done";
}
