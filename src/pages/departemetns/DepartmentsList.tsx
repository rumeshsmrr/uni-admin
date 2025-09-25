import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import ListToolbar from "../../components/toolbar/ListToolbar";
import  DataTable from "../../components/ui/DataTable";
import type { Column } from "../../components/ui/DataTable";
import Button from "../../components/ui/Button";
import { departmentsMock } from "../../data/mock";
import type { Department } from "../../types";
import { formatDate } from "../../utils/format";

export default function DepartmentsList() {
  const nav = useNavigate();
  const [search, setSearch] = useState("");

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return departmentsMock;
    return departmentsMock.filter(d =>
      d.code.toLowerCase().includes(q) || d.name.toLowerCase().includes(q)
    );
  }, [search]);

  const columns: Column<Department>[] = [
    {
      id: "code",
      header: "Code",
      sortable: true,
      selector: r => r.code,
      cell: r => <span className="badge font-semibold">{r.code}</span>,
    },
    {
      id: "name",
      header: "Department Name",
      sortable: true,
      selector: r => r.name,
    },
    {
      id: "createdAt",
      header: "Created",
      sortable: true,
      selector: (r: { createdAt: string | number | Date; }) => new Date(r.createdAt).getTime(),
      cell: (r: { createdAt: string; }) => <span className="text-subtext">{formatDate(r.createdAt)}</span>,
    },
    {
      id: "actions",
      header: "Actions",
      selector: () => "",
      cell: r => (
        <div className="flex gap-2">
          <Button variant="soft" onClick={()=>nav(`/departments/${r.id}`)}>Edit</Button>
          <Button variant="soft" onClick={()=>alert(`Delete ${r.name} (mock)`)}>Delete</Button>
        </div>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-semibold">Departments</h1>
        <p className="text-subtext mt-1">Create, edit, and organize departments.</p>
      </div>

      {/* Toolbar */}
      <ListToolbar
        search={search}
        onSearch={setSearch}
        onAdd={()=>nav("/departments/new")}
        addLabel="Add "
      />

      {/* Table */}
      <DataTable
        data={filtered}
        columns={columns}
        rowKey={(r)=>r.id}
        initialPageSize={5}
      />
    </div>
  );
}
