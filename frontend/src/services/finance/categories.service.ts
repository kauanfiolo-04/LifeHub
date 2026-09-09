import { api } from "@/lib/axios";
import { Category, CreateCategoryRequest, UpdateCategoryRequest } from "@/types/finance/categories.type";

export const CategoriesService = {
  findAll: async () => {
    const { data } = await api.get<Category[]>("/accounts");

    return data;
  },
  create: async (createCategoryDto: CreateCategoryRequest) => {
    const { data } = await api.post<Category>("/accounts", createCategoryDto);

    return data;
  },
  findOne: async (categoryId: string) => {
    const { data } = await api.get<Category>(`/accounts/${categoryId}`);

    return data;
  },
  update: async (categoryId: string, updateCategoryDTO: UpdateCategoryRequest) => {
    const { data } = await api.patch<Category>(`/accounts/${categoryId}`, updateCategoryDTO);

    return data;
  },
  delete: async (categoryId: string) => {
    const { data } = await api.delete<Category>(`/accounts/${categoryId}`);

    return data;
  },
};