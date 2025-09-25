import api from "./axios";

export type Employee = {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  dob: string;
  age: number;
  salary: number;
  departmentId: number;
};

export const EmployeeAPI = {
  getAll: async (): Promise<Employee[]> => {
    const res = await api.get("/employees");
    return res.data;
  },
  getById: async (id: number): Promise<Employee> => {
    const res = await api.get(`/employees/${id}`);
    return res.data;
  },
  create: async (data: Omit<Employee, "id">): Promise<Employee> => {
    const res = await api.post("/employees", data);
    return res.data;
  },
  update: async (id: number, data: Omit<Employee, "id">): Promise<Employee> => {
    const res = await api.put(`/employees/${id}`, data);
    return res.data;
  },
  remove: async (id: number): Promise<void> => {
    await api.delete(`/employees/${id}`);
  },
};
