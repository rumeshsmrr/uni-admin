import { useState } from "react";
import { NavLink } from "react-router-dom";
import { LayoutDashboard, Users, BookOpen, Settings, Building2, ChevronLeft, ChevronRight } from "lucide-react";
import clsx from "clsx";

export default function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);

  const navItems = [
    { to: "/", label: "Dashboard", icon: <LayoutDashboard size={18}/> },
    { to: "/departments", label: "Departments", icon: <Building2 size={18}/> },
    { to: "/employees", label: "Employees", icon: <Users size={18}/> },
    { to: "/courses", label: "Courses", icon: <BookOpen size={18}/> },
    { to: "/settings", label: "Settings", icon: <Settings size={18}/> },
  ];

  return (
    <aside
      className={clsx(
        "bg-card border-r border-border h-screen sticky top-0 flex flex-col transition-all duration-300",
        collapsed ? "w-[70px]" : "w-[240px]"
      )}
    >
      {/* Header / Logo */}
      <div className="flex items-center justify-between p-4 border-b border-border">
        {!collapsed && <span className="font-semibold text-lg">Acme University</span>}
        <button
          className="btn btn-soft p-1"
          onClick={() => setCollapsed(c => !c)}
        >
          {collapsed ? <ChevronRight size={18}/> : <ChevronLeft size={18}/>}
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-2 space-y-1">
        {navItems.map(item => (
          <NavLink
            key={item.to}
            to={item.to}
            className={({isActive}) =>
              clsx(
                "flex items-center gap-3 rounded-xl px-3 py-2 text-sm font-medium transition-colors",
                isActive ? "bg-primary text-primary-fg" : "hover:bg-muted text-text"
              )
            }
          >
            {item.icon}
            {!collapsed && <span>{item.label}</span>}
          </NavLink>
        ))}
      </nav>

      {/* Footer/Profile area (optional) */}
      <div className="p-4 border-t border-border">
        {!collapsed && (
          <div className="flex items-center gap-3">
            <div className="h-9 w-9 rounded-full bg-muted"></div>
            <div className="text-sm">
              <div className="font-medium">Admin User</div>
              <div className="text-subtext text-xs">Admin</div>
            </div>
          </div>
        )}
      </div>
    </aside>
  );
}
