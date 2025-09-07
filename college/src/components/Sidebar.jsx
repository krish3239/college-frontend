import { NavLink } from "react-router-dom";
import { Home, FileText, GraduationCap, LogOut } from "lucide-react";
import logo from "../assets/logo.jpg"; // your logo from assets

function Sidebar() {
  const menuItems = [
    { name: "Home", icon: <Home size={20} />, path: "/dashboard" },
    {
      name: "Results",
      icon: <FileText size={20} />,
      path: "/dashboard/result",
    },
    {
      name: "Colleges",
      icon: <GraduationCap size={20} />,
      path: "/dashboard/colleges",
    },
  ];

  return (
    <div className="w-64 bg-white shadow-lg flex flex-col">
      {/* Logo Section */}
      <div className="p-6 border-b flex flex-col items-center">
        <img src={logo} alt="Logo" className="h-13 w-16 rounded-full mb-2" />
      </div>

      {/* Menu Links */}
      <nav className="flex-1  space-y-2">
        {menuItems.map((item) => (
          <NavLink
            key={item.name}
            to={item.path}
            end
            className={({ isActive }) =>
              `flex items-center px-4 py-2 rounded-lg font-medium transition ${
                isActive
                  ? "bg-blue-500 text-white"
                  : "text-gray-700 hover:bg-gray-100"
              }`
            }
          >
            <span className="mr-3">{item.icon}</span>
            {item.name}
          </NavLink>
        ))}
      </nav>

      {/* Logout Button */}
      <div className="p-4 border-t">
        <button className="flex items-center w-full px-4 py-2 text-gray-700 rounded-lg hover:bg-gray-100 transition">
          <LogOut size={20} className="mr-3" />
          Logout
        </button>
      </div>
    </div>
  );
}

export default Sidebar;
