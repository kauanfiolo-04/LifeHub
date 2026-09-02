import { api } from "@/lib/axios";
import { CreateTaskRequest, FindAllTaskSearchParam, Task, UpdateTaskRequest } from "@/types/tasks.type";

export const TasksService = {
  findAll: async (params: FindAllTaskSearchParam) => {
    const { data } = await api.get<Task[]>("/tasks", { params });

    return data.map((task) => ({
      ...task,
      dueDate: new Date(task.dueDate),
    }));
  },
  findOne: async (taskId: string) => {
    const { data } = await api.get<Task>(`/tasks/${taskId}`);

    return {
      ...data,
      dueDate: new Date(data.dueDate),
    };
  },
  create: async (createTaskDto: CreateTaskRequest) => {
    const { data } = await api.post<Task>("/tasks", createTaskDto);

    return data;
  },
  update: async (taskId: string, updateTaskDto: UpdateTaskRequest) => {
    const { data } = await api.patch<Task>(`/tasks/${taskId}`, updateTaskDto);

    return data;
  },
  delete: async (taskId: string) => {
    const { data } = await api.delete<Task>(`/tasks/${taskId}`);

    return data;
  }
};