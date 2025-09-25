import api from "./axios";

export type Department = {
  id: number;
  departmentCode: string;
  departmentName: string;
  createdAt: string;
};

export const DepartmentAPI = {
  getAll: async (): Promise<Department[]> => {
    const res = await api.get("/departments");
    return res.data;
  },
  getById: async (id: number): Promise<Department> => {
    const res = await api.get(`/departments/${id}`);
    return res.data;
  },
  create: async (
    data: Omit<Department, "id" | "createdAt">
  ): Promise<Department> => {
    const res = await api.post("/departments", data);
    return res.data;
  },
  update: async (
    id: number,
    data: Omit<Department, "id" | "createdAt">
  ): Promise<Department> => {
    const res = await api.put(`/departments/${id}`, data);
    return res.data;
  },
  remove: async (id: number): Promise<void> => {
    return api.delete(`/departments/${id}`); // no try/catch, let it throw
  },
  
};
