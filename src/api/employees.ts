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
  departmentName: string;
  createdAt: string;
  rowVersion: string;
};

// For create: backend doesn’t need id/createdAt/departmentName/rowVersion
export type EmployeeCreatePayload = Omit<
  Employee,
  "id" | "createdAt" | "departmentName" | "rowVersion" | "age"
>;

// For update: backend requires rowVersion but not id/createdAt/departmentName/age
export type EmployeeUpdatePayload = Omit<
  Employee,
  "id" | "createdAt" | "departmentName" | "age"
>;

export const EmployeeAPI = {
  getAll: async (): Promise<Employee[]> => {
    const res = await api.get("/employees");
    return res.data;
  },
  getById: async (id: number): Promise<Employee> => {
    const res = await api.get(`/employees/${id}`);
    return res.data;
  },
  create: async (data: EmployeeCreatePayload): Promise<Employee> => {
    const res = await api.post("/employees", data);
    return res.data;
  },
  update: async (id: number, data: EmployeeUpdatePayload): Promise<Employee> => {
    const res = await api.put(`/employees/${id}`, data);
    return res.data;
  },
  remove: async (id: number): Promise<void> => {
    await api.delete(`/employees/${id}`);
  },
};
