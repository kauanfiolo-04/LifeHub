export type ApiError = {
  statusCode: number;
  message: string;
  error: string;
}

export type Paginated<T> = {
  data: T[];
  meta: { total: number; page: number; limit: number; totalPages: number };
}
