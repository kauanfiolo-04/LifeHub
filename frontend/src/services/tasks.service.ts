import { api } from "@/lib/axios";
import { CreateTaskRequest, FindAllTaskSearchParam, Task, UpdateTaskRequest } from "@/types/tasks.type";

export const TasksService = {
  findAll: async (params: FindAllTaskSearchParam) => {
    const { data } = await api.get<Task[]>("/tasks", { params });

    return data;
  },
  findOne: async (taskId: string) => {
    const { data } = await api.get<Task>(`/tasks/${taskId}`);

    return data;
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