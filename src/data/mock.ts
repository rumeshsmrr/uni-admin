import type { Department, Employee } from "../types";

export const departmentsMock: Department[] = [
  { id: 1, code: "CSE", name: "Computer Science", createdAt: "2023-09-01T10:00:00Z" },
  { id: 2, code: "ENG", name: "English",           createdAt: "2023-10-10T10:00:00Z" },
  { id: 3, code: "BUS", name: "Business",           createdAt: "2024-02-15T10:00:00Z" },
];

export const employeesMock: Employee[] = [
  { id: 101, firstName: "John",  lastName: "Doe",   email: "john.doe@example.com",   dob: "1998-05-20", age: 26, salary: 120000, departmentId: 1, createdAt: "2024-01-02T09:00:00Z" },
  { id: 102, firstName: "Maya",  lastName: "Perera",email: "maya.p@example.com",     dob: "1996-09-12", age: 27, salary: 150000, departmentId: 3, createdAt: "2024-01-05T09:00:00Z" },
  { id: 103, firstName: "Arun",  lastName: "Silva", email: "arun.silva@example.com", dob: "1995-01-08", age: 29, salary: 110000, departmentId: 2, createdAt: "2024-03-12T09:00:00Z" },
];
