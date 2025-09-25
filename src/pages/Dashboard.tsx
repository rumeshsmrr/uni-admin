import Card from "../components/ui/Card";
import { departmentsMock, employeesMock } from "../data/mock";
import { formatCurrency } from "../utils/format";

export default function Dashboard() {
  // mock metrics
  const totalDepartments = departmentsMock.length;
  const totalEmployees = employeesMock.length;
  const avgSalary =
    employeesMock.reduce((sum, e) => sum + e.salary, 0) / employeesMock.length;


  const minAge = Math.min(...employeesMock.map(e => e.age));
  const maxAge = Math.max(...employeesMock.map(e => e.age));

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
          {employeesMock.slice(0, 5).map(e => (
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
        </ul>
      </Card>
    </div>
  );
}
