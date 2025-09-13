import { User, Menu } from "lucide-react";

function Navbar({ toggleSidebar }) {
  const user=JSON.parse(localStorage.getItem("user"))
  return (
    <div className="w-full h-24 bg-white border-b border-blue-100 flex items-center justify-between px-6 z-10">
      <div className="flex items-center">
        {/* Toggle button visible on smaller screens */}
        <button
          onClick={toggleSidebar}
          className="text-gray-600 md:hidden mr-4 focus:outline-none"
        >
          <Menu size={24} />
        </button>
        <h1 className="text-lg font-semibold text-gray-800">
          Shri Guru Nanak Dev College of Health & Sciences
        </h1>
      </div>

      {/* User Info */}
      <div className="flex items-center space-x-3">
        <User className="w-6 h-6 text-gray-600" />
        <div>
          <p className="font-medium text-gray-800">{user.role}</p>
          <p className="text-sm text-gray-500">{user.email}</p>
        </div>
      </div>
    </div>
  );
}

export default Navbar;