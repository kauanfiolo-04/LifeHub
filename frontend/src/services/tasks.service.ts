import { api } from "@/lib/axios";
import { CreateTaskRequest, Task } from "@/types/tasks.type";

export const TasksService = {
  findAll: async () => {
    const { data } = await api.get<Task[]>("/tasks");

    return data;
  },
  create: async (createTaskDto: CreateTaskRequest) => {
    const { data } = await api.post<Task>("/tasks", createTaskDto);

    return data;
  } 
};