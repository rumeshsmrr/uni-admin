import { BrowserRouter, Routes, Route } from "react-router-dom";
import AppLayout from "./layouts/AppLayout";
import Dashboard from "./pages/Dashboard";
import DepartmentsList from "./pages/departemetns/DepartmentsList";
import DepartmentForm from "./pages/departemetns/DepartmentForm";
import EmployeesList from "./pages/employees/EmployeesList";
import EmployeeForm from "./pages/employees/EmployeeForm";
import EmployeeEditWrapper from "./pages/employees/EmployeeEditWrapper";
import DepartmentEditWrapper from "./pages/departemetns/DepartmentEditWrapper";

function Placeholder({title}:{title:string}) {
  return <div className="card p-6 text-xl font-semibold">{title}</div>;
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AppLayout />}>
        <Route index element={<Dashboard />} />
          <Route path="departments" element={<DepartmentsList />} />
          <Route path="departments/new" element={<DepartmentForm mode="create" />} />
          <Route path="departments/:id" element={<DepartmentEditWrapper />} />
          <Route path="employees" element={<EmployeesList />} />
          <Route path="employees/new" element={<EmployeeForm mode="create" />} />
          <Route path="employees/:id" element={<EmployeeEditWrapper />} />
          <Route path="courses" element={<Placeholder title="Courses" />} />
          <Route path="settings" element={<Placeholder title="Settings" />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
