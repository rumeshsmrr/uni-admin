import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import ListToolbar from "../../components/toolbar/ListToolbar";
import DataTable from "../../components/ui/DataTable";
import type { Column } from "../../components/ui/DataTable";
import Button from "../../components/ui/Button";
import { DepartmentAPI} from "../../api/departments";
import type { Department } from "../../types";
import { formatDate } from "../../utils/format";
import type { AxiosError } from "axios";

export default function DepartmentsList() {
  const nav = useNavigate();
  const queryClient = useQueryClient();
  const [search, setSearch] = useState("");

  // fetch departments
  const { data: departments = [], isLoading, isError } = useQuery<Department[]>({
    queryKey: ["departments"],
    queryFn: DepartmentAPI.getAll,
  });

  // delete mutation
  const deleteMutation = useMutation<void, AxiosError, number>({
    mutationFn: (id) => DepartmentAPI.remove(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["departments"] });
    },
    onError: (error) => {
      const msg =
        (error.response?.data as { message?: string })?.message ||
        "Failed to delete department. Please try again.";
      alert(msg);
    },
  });
  
  // search filter
  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return departments;
    return departments.filter(
      (d) =>
        d.departmentCode.toLowerCase().includes(q) ||
        d.departmentName.toLowerCase().includes(q)
    );
  }, [departments, search]);

  // columns
  const columns: Column<Department>[] = [
    {
      id: "departmentCode",
      header: "Code",
      selector: (r) => r.departmentCode,
      sortable: true,
    },
    {
      id: "departmentName",
      header: "Department Name",
      selector: (r) => r.departmentName,
      sortable: true,
    },
    {
      id: "createdAt",
      header: "Created",
      selector: (r) => new Date(r.createdAt).getTime(),
      sortable: true,
      cell: (r) => <span className="text-subtext">{formatDate(r.createdAt)}</span>,
    },
    {
      id: "actions",
      header: "Actions",
      selector: () => "",
      cell: (r) => (
        <div className="flex gap-2">
          <Button variant="soft" onClick={() => nav(`/departments/${r.id}`)}>
            Edit
          </Button>
          <Button
            variant="danger"
            onClick={() => deleteMutation.mutate(r.id)}
            disabled={deleteMutation.isPending}
          >
            {deleteMutation.isPending ? "Deleting..." : "Delete"}
          </Button>
        </div>
      ),
    },
  ];

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p className="text-red-500">Failed to load departments</p>;

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold">Departments</h1>
      <ListToolbar
        search={search}
        onSearch={setSearch}
        onAdd={() => nav("/departments/new")}
        addLabel="Add "
      />
      <DataTable
        data={filtered}
        columns={columns}
        rowKey={(r) => r.id}
        initialPageSize={5}
      />
    </div>
  );
}