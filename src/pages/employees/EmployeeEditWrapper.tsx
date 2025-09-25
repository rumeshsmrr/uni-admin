import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import EmployeeForm from "./EmployeeForm";
import type { FormValues } from "./EmployeeForm";
import { EmployeeAPI } from "../../api/employees";

export default function EmployeeEditWrapper() {
  const { id } = useParams();

  const { data: employee, isLoading, isError } = useQuery({
    queryKey: ["employees", id],
    queryFn: () => EmployeeAPI.getById(Number(id)),
    enabled: !!id,
  });

  if (isLoading) return <p>Loading employee...</p>;
  if (isError || !employee) return <p className="text-red-500">Employee not found</p>;

  const initialData: FormValues = {
    firstName: employee.firstName,
    lastName: employee.lastName,
    email: employee.email,
    dob: employee.dob.split("T")[0],
    age: employee.age,
    salary: employee.salary,
    departmentId: String(employee.departmentId),
    rowVersion: employee.rowVersion, // ✅ required for update
  };

  return <EmployeeForm mode="edit" initialData={initialData} />;
}
