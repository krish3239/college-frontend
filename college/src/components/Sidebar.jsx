import { NavLink, useNavigate } from "react-router-dom";
import { Home, FileText, GraduationCap, LogOut, Menu } from "lucide-react";
import { logout } from "../features/auth/authSlice.js";
import { useDispatch } from "react-redux";
import { motion } from "framer-motion";

function Sidebar({ isSidebarOpen, toggleSidebar }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user=JSON.parse(localStorage.getItem("user"))
  const role=user.role

  const menuItems = [
    { name: "Colleges", icon: <GraduationCap size={20} />, path: "/dashboard/university" },
    { name: "Home", icon: <Home size={20} />, path: "/dashboard/home" },
    { name: "Results", icon: <FileText size={20} />, path: "/dashboard/result" },
  ];
    if (role === "admin") {
    menuItems.push({ name: "Queries", icon: <FileText size={20} />, path: "/dashboard/enquiry" });
  }

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  return (
    <motion.div
      animate={{ width: isSidebarOpen ? 200 : 70 }}
      transition={{ duration: 0.3, type: "spring", stiffness: 50 }}
      className="bg-white shadow-lg flex flex-col border-r border-gray-300 
                 min-h-screen fixed md:relative z-20 overflow-hidden"
    >
      {/* Top section with logo + toggle */}
      <div className="p-4 flex items-center justify-center flex-shrink-0">
        <button
          onClick={toggleSidebar}
          className="text-gray-700 hover:text-blue-500 transition-colors duration-200
                     p-2 rounded-lg hover:bg-gray-100 flex-shrink-0"
        >
          <Menu size={24} />
        </button>
      </div>

      {/* Menu Links */}
      <nav className="flex-1 px-2 space-y-2 overflow-hidden">
        {menuItems.map((item) => (
          <div key={item.name} className="relative">
            <NavLink
              to={item.path}
              end
              className={({ isActive }) =>
                `flex items-center px-4 py-3 rounded-lg font-medium transition-all duration-200 relative group w-full
                ${
                  isActive
                    ? "bg-blue-500 text-white shadow-md"
                    : "text-gray-700 hover:bg-gray-100 hover:text-blue-600"
                }`
              }
            >
              <span className="flex-shrink-0 flex items-center justify-center">
                {item.icon}
              </span>
              
              {/* Text with proper overflow handling */}
              <motion.span
                initial={false}
                animate={{
                  opacity: isSidebarOpen ? 1 : 0,
                  width: isSidebarOpen ? "auto" : 0,
                  marginLeft: isSidebarOpen ? 12 : 0,
                }}
                transition={{ duration: 0.2, ease: "easeInOut" }}
                className="whitespace-nowrap overflow-hidden"
                style={{ 
                  display: isSidebarOpen ? "block" : "none" 
                }}
              >
                {item.name}
              </motion.span>
            </NavLink>
            
            {/* Tooltip for collapsed state */}
            {!isSidebarOpen && (
              <div className="absolute left-full top-1/2 transform -translate-y-1/2 ml-2 z-50 pointer-events-none">
                <div className="bg-gray-900 text-white text-sm px-3 py-2 rounded-md 
                               opacity-0 group-hover:opacity-100 transition-opacity duration-200 
                               whitespace-nowrap shadow-lg border">
                  {item.name}
                  {/* Tooltip arrow */}
                  <div className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-1 
                                 w-0 h-0 border-t-4 border-b-4 border-r-4 
                                 border-transparent border-r-gray-900"></div>
                </div>
              </div>
            )}
          </div>
        ))}
      </nav>

      {/* Logout Button */}
      <div className="p-4 border-t border-gray-300 flex-shrink-0">
        <div className="relative">
          <button
            onClick={handleLogout}
            className="flex items-center w-full px-4 py-3 text-gray-700 rounded-lg 
                       hover:bg-red-50 hover:text-red-600 transition-all duration-200 
                       font-medium group"
          >
            <span className="flex-shrink-0 flex items-center justify-center">
              <LogOut size={20} />
            </span>
            
            {/* Logout text with proper overflow handling */}
            <motion.span
              initial={false}
              animate={{
                opacity: isSidebarOpen ? 1 : 0,
                width: isSidebarOpen ? "auto" : 0,
                marginLeft: isSidebarOpen ? 12 : 0,
              }}
              transition={{ duration: 0.2, ease: "easeInOut" }}
              className="whitespace-nowrap overflow-hidden"
              style={{ 
                display: isSidebarOpen ? "block" : "none" 
              }}
            >
              Logout
            </motion.span>
          </button>
          
          {/* Logout tooltip for collapsed state */}
          {!isSidebarOpen && (
            <div className="absolute left-full top-1/2 transform -translate-y-1/2 ml-2 z-50 pointer-events-none">
              <div className="bg-gray-900 text-white text-sm px-3 py-2 rounded-md 
                             opacity-0 group-hover:opacity-100 transition-opacity duration-200 
                             whitespace-nowrap shadow-lg border">
                Logout
                {/* Tooltip arrow */}
                <div className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-1 
                               w-0 h-0 border-t-4 border-b-4 border-r-4 
                               border-transparent border-r-gray-900"></div>
              </div>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}

export default Sidebar;