import { api } from "@/lib/axios";
import { Category, CreateCategoryRequest, UpdateCategoryRequest } from "@/types/finance/categories.type";

export const CategoriesService = {
  findAll: async () => {
    const { data } = await api.get<Category[]>("/categories");

    return data;
  },
  create: async (createCategoryDto: CreateCategoryRequest) => {
    const { data } = await api.post<Category>("/categories", createCategoryDto);

    return data;
  },
  findOne: async (categoryId: string) => {
    const { data } = await api.get<Category>(`/categories/${categoryId}`);

    return data;
  },
  update: async (categoryId: string, updateCategoryDTO: UpdateCategoryRequest) => {
    const { data } = await api.patch<Category>(`/categories/${categoryId}`, updateCategoryDTO);

    return data;
  },
  delete: async (categoryId: string) => {
    const { data } = await api.delete<Category>(`/categories/${categoryId}`);

    return data;
  },
};