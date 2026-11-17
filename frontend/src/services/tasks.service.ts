import { api } from "@/lib/axios";
import { Paginated } from "@/types/api.type";
import { CreateTaskRequest, FindParams, Task, UpdateTaskRequest } from "@/types/tasks.type";

export const TasksService = {
  findAll: async ({ search, sortBy, page, limit }: FindParams) => {
    const { data: response } = await api.get<Paginated<Task>>("/tasks", {
      params: { search, sortBy, page, limit },
    });

    return response;
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