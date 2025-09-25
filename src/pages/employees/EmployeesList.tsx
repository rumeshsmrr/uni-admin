import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import ListToolbar from "../../components/toolbar/ListToolbar";
import  DataTable from "../../components/ui/DataTable";
import type { Column } from "../../components/ui/DataTable";
import Button from "../../components/ui/Button";
import Avatar from "../../components/ui/Avatar";
import Select from "../../components/ui/Select";
import { employeesMock, departmentsMock } from "../../data/mock";
import { formatCurrency, formatDate } from "../../utils/format";

export default function EmployeesList() {
  const nav = useNavigate();
  const [search, setSearch] = useState("");
  const [deptId, setDeptId] = useState<number | "">("");

  // Join employees with department name
  const enhanced = useMemo(() => {
    const deptMap = new Map(departmentsMock.map(d => [d.id, d.name]));
    return employeesMock.map(e => ({
      ...e,
      fullName: `${e.firstName} ${e.lastName}`,
      departmentName: deptMap.get(e.departmentId) ?? "—",
    }));
  }, []);

  // Filtering
  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    return enhanced.filter(e => {
      const matchesQ =
        !q ||
        e.fullName.toLowerCase().includes(q) ||
        e.email.toLowerCase().includes(q);
      const matchesDept = !deptId || e.departmentId === deptId;
      return matchesQ && matchesDept;
    });
  }, [enhanced, search, deptId]);

  // Columns
  const columns: Column<typeof enhanced[number]>[] = [
    {
      id: "name",
      header: "Employee",
      sortable: true,
      selector: r => r.fullName.toLowerCase(),
      cell: r => (
        <div className="flex items-center gap-3">
          <Avatar name={r.fullName} />
          <div>
            <div className="font-medium">{r.fullName}</div>
            <div className="text-subtext text-sm">{r.email}</div>
          </div>
        </div>
      ),
    },
    {
      id: "dob",
      header: "DOB",
      sortable: true,
      selector: r => new Date(r.dob).getTime(),
      cell: r => <span className="text-subtext">{formatDate(r.dob)}</span>,
    },
    {
      id: "age",
      header: "Age",
      sortable: true,
      selector: r => r.age,
    },
    {
      id: "salary",
      header: "Salary",
      sortable: true,
      selector: r => r.salary,
      cell: r => <span className="font-medium">{formatCurrency(r.salary)}</span>,
    },
    {
      id: "department",
      header: "Department",
      sortable: true,
      selector: r => r.departmentName.toLowerCase(),
      cell: r => <span className="badge">{r.departmentName}</span>,
    },
    {
      id: "actions",
      header: "Actions",
      selector: () => "",
      cell: r => (
        <div className="flex gap-2">
          <Button variant="soft" size="sm" onClick={() => nav(`/employees/${r.id}`)}>
            Edit
          </Button>
          <Button
            variant="danger"
            size="sm"
            onClick={() => alert(`Delete ${r.fullName} (mock)`)}
          >
            Delete
          </Button>
        </div>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-semibold">Employees</h1>
        <p className="text-subtext mt-1">Add, edit, and manage employees.</p>
      </div>

      {/* Toolbar */}
      <ListToolbar
        search={search}
        onSearch={setSearch}
        onAdd={() => nav("/employees/new")}
        addLabel="Add "
      >
        {/* ✅ Department filter */}
        <Select
          value={deptId === "" ? "" : String(deptId)}
          onChange={(e: { target: { value: string; }; }) =>
            setDeptId(e.target.value === "" ? "" : Number(e.target.value))
          }
        >
          <option value="">All Departments</option>
          {departmentsMock.map(d => (
            <option key={d.id} value={d.id}>
              {d.name}
            </option>
          ))}
        </Select>
      </ListToolbar>

      {/* Table */}
      <DataTable
        data={filtered}
        columns={columns}
        rowKey={r => r.id}
        initialPageSize={5}
      />
    </div>
  );
}
