import { BrowserRouter, Routes, Route } from "react-router-dom";
import AppLayout from "./layouts/AppLayout";
import Dashboard from "./pages/Dashboard";

function Placeholder({title}:{title:string}) {
  return <div className="card p-6 text-xl font-semibold">{title}</div>;
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AppLayout />}>
        <Route index element={<Dashboard />} />
          <Route path="departments" element={<Placeholder title="Departments" />} />
          <Route path="employees" element={<Placeholder title="Employees" />} />
          <Route path="courses" element={<Placeholder title="Courses" />} />
          <Route path="settings" element={<Placeholder title="Settings" />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
