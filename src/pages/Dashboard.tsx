import { useQuery } from "@tanstack/react-query";
import Card from "../components/ui/Card";
import { formatCurrency } from "../utils/format";
import { DepartmentAPI } from "../api/departments";
import { EmployeeAPI } from "../api/employees";

export default function Dashboard() {
  // ✅ Fetch data
  const { data: departments = [], isLoading: loadingDepts } = useQuery({
    queryKey: ["departments"],
    queryFn: DepartmentAPI.getAll,
  });

  const { data: employees = [], isLoading: loadingEmps } = useQuery({
    queryKey: ["employees"],
    queryFn: EmployeeAPI.getAll,
  });

  // ✅ Metrics
  const totalDepartments = departments.length;
  const totalEmployees = employees.length;

  const avgSalary =
    employees.length > 0
      ? employees.reduce((sum, e) => sum + e.salary, 0) / employees.length
      : 0;

  const minAge =
    employees.length > 0 ? Math.min(...employees.map((e) => e.age)) : 0;
  const maxAge =
    employees.length > 0 ? Math.max(...employees.map((e) => e.age)) : 0;

  // ✅ Loading state
  if (loadingDepts || loadingEmps) {
    return <p className="text-subtext">Loading dashboard...</p>;
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-semibold">Dashboard</h1>
        <p className="text-subtext mt-1">
          Overview of your university’s departments and employees.
        </p>
      </div>

      {/* Stats cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="p-6">
          <h2 className="text-sm text-subtext">Departments</h2>
          <p className="text-2xl font-bold mt-1">{totalDepartments}</p>
        </Card>
        <Card className="p-6">
          <h2 className="text-sm text-subtext">Employees</h2>
          <p className="text-2xl font-bold mt-1">{totalEmployees}</p>
        </Card>
        <Card className="p-6">
          <h2 className="text-sm text-subtext">Average Salary</h2>
          <p className="text-2xl font-bold mt-1">
            {formatCurrency(avgSalary)}
          </p>
        </Card>
        <Card className="p-6">
          <h2 className="text-sm text-subtext">Age Range</h2>
          <p className="text-2xl font-bold mt-1">
            {minAge} – {maxAge}
          </p>
        </Card>
      </div>

      {/* Recent employees list */}
      <Card className="p-6">
        <h2 className="text-lg font-semibold mb-4">Recently Added Employees</h2>
        <ul className="divide-y divide-border">
          {employees.slice(0, 5).map((e) => (
            <li key={e.id} className="py-3 flex justify-between">
              <div>
                <p className="font-medium">
                  {e.firstName} {e.lastName}
                </p>
                <p className="text-sm text-subtext">{e.email}</p>
              </div>
              <p className="text-sm font-medium">{formatCurrency(e.salary)}</p>
            </li>
          ))}
          {employees.length === 0 && (
            <p className="text-subtext text-sm">No employees found.</p>
          )}
        </ul>
      </Card>
    </div>
  );
}
