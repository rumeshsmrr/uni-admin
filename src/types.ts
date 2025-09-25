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
    dob: string; // ISO date
    age: number; // ✅ now directly stored from DB
    salary: number;
    departmentId: number;
    createdAt: string;
  };
  