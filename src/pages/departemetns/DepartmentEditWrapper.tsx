import { useParams } from "react-router-dom";
import DepartmentForm from "./DepartmentForm";
import type { DepartmentFormValues } from "./DepartmentForm";
import { departmentsMock } from "../../data/mock";

export default function DepartmentEditWrapper() {
  const { id } = useParams();
  const dept = departmentsMock.find((d) => d.id === Number(id));

  if (!dept) return <p className="text-red-500">Department not found</p>;

  const initialData: DepartmentFormValues = {
    code: dept.code,
    name: dept.name,
  };

  return <DepartmentForm mode="edit" initialData={initialData} />;
}
