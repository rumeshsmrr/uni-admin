import { useParams } from "react-router-dom";
import EmployeeForm from "./EmployeeForm";
import type { FormValues } from "./EmployeeForm";
import { employeesMock } from "../../data/mock";

export default function EmployeeEditWrapper() {
  const { id } = useParams();
  const employee = employeesMock.find((e) => e.id === Number(id));

  if (!employee) return <p className="text-red-500">Employee not found</p>;

  // Transform mock data to match form structure
  const initialData: FormValues = {
    firstName: employee.firstName,
    lastName: employee.lastName,
    email: employee.email,
    dob: employee.dob,
    age: employee.age,
    salary: employee.salary,
    departmentId: String(employee.departmentId),
  };

  return <EmployeeForm mode="edit" initialData={initialData} />;
}
