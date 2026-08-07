import { api } from "@/lib/axios";
import { CreateTaskRequest, FindAllTaskSearchParam, Task } from "@/types/tasks.type";

export const TasksService = {
  findAll: async (params: FindAllTaskSearchParam) => {
    const { data } = await api.get<Task[]>("/tasks", { params });

    return data;
  },
  create: async (createTaskDto: CreateTaskRequest) => {
    const { data } = await api.post<Task>("/tasks", createTaskDto);

    return data;
  } 
};