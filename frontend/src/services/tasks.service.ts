import { api } from "@/lib/axios";
import { Paginated } from "@/types/api.type";
import { CreateTaskRequest, FindTasksParams, Task, UpdateTaskRequest } from "@/types/tasks.type";
import { toCsv } from "@/utils/to-csv";

export const TasksService = {
  findAll: async (params: FindTasksParams) => {
    const { status, priority, dateFilters, ...rest } = params;

    const { data: response } = await api.get<Paginated<Task>>("/tasks", { 
      params: {
      ...rest,
      status: toCsv(status),
      priority: toCsv(priority),
      dateFilters: toCsv(dateFilters),
    } });

    return {
      ...response,
      data: response.data.map(t => ({ ...t, dueDate: new Date(t.dueDate) }))
    };
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