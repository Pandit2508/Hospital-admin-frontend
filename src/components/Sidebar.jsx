import React from "react";
import { Link, useLocation } from "react-router-dom";
import { Home, ClipboardList, LogOut } from "lucide-react"; // optional icons

const Sidebar = () => {
  const location = useLocation();
  const menuItems = [
    { name: "Dashboard", path: "/dashboard", icon: <Home size={18} /> },
    { name: "Add Hospital", path: "/add-hospital", icon: <ClipboardList size={18} /> },
  ];

  return (
    <div className="h-screen w-64 bg-blue-800 text-white flex flex-col p-5 fixed left-0 top-0 shadow-xl">
      <h2 className="text-2xl font-bold mb-8 text-center">Admin Panel</h2>
      <nav className="flex flex-col gap-3">
        {menuItems.map((item) => (
          <Link
            key={item.name}
            to={item.path}
            className={`flex items-center gap-3 px-4 py-2 rounded-md hover:bg-blue-700 ${
              location.pathname === item.path ? "bg-blue-700" : ""
            }`}
          >
            {item.icon}
            {item.name}
          </Link>
        ))}
      </nav>
      <div className="mt-auto">
        <button className="w-full bg-red-600 hover:bg-red-700 px-4 py-2 rounded-md flex items-center justify-center gap-2">
          <LogOut size={18} /> Logout
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
