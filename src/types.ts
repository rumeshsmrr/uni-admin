export type Department = {
  id: number;
  departmentCode: string;
  departmentName: string;
  createdAt: string;
};

export type Employee = {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  dob: string;           // ISO string from backend
  age: number;
  salary: number;
  departmentId: number;
  departmentName: string;
  createdAt: string;
  rowVersion: string;
};
