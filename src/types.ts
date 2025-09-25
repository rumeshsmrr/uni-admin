export type Department = {
    id: number;
    code: string;
    name: string;
    createdAt: string; // ISO
  };
  
  export type Employee = {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    dob: string; // ISO date
    age: number; // ✅ now directly stored from DB
    salary: number;
    departmentId: number;
    createdAt: string;
  };
  