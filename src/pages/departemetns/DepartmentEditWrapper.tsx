import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import DepartmentForm from "./DepartmentForm";
import type { DepartmentFormValues } from "./DepartmentForm";
import { DepartmentAPI } from "../../api/departments";

export default function DepartmentEditWrapper() {
  const { id } = useParams();

  const { data: dept, isLoading, isError } = useQuery({
    queryKey: ["departments", id],
    queryFn: () => DepartmentAPI.getById(Number(id)),
    enabled: !!id, // only fetch if id is available
  });

  if (isLoading) return <p>Loading department...</p>;
  if (isError || !dept) return <p className="text-red-500">Department not found</p>;

  const initialData: DepartmentFormValues = {
    departmentCode: dept.departmentCode,
    departmentName: dept.departmentName,
  };

  return <DepartmentForm mode="edit" initialData={initialData} />;
}
