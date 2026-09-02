export enum TaskPriority {
  LOW = 1,
  MEDIUM = 2,
  HIGH = 3
}

export enum TaskStatus {
  PENDING = 'pending',
  IN_PROGRESS = 'in_progress',
  COMPLETED = 'completed',
  CANCELLED = 'cancelled'
}

export enum TaskSortBy {
  PRIORITY = "priority",
  DUE_DATE = "dueDate",
  CREATED_AT = "createdAt",
  UPDATED_AT = "updatedAt"
}

export type Task = {
  id: string;
  title: string;
  description?: string;
  status: TaskStatus;
  priority: TaskPriority;
  dueDate: Date;
  createdAt?: Date;
  updatedAt?: Date;
};

export type FindAllTaskSearchParam = {
  search?: string;
  sortBy?: TaskSortBy;
}

export type CreateTaskRequest = {
  title: string;
  description?: string;
  status: TaskStatus;
  priority: TaskPriority;
  dueDate?: Date;
};

export type UpdateTaskRequest = Partial<CreateTaskRequest>;