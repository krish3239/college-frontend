import { User } from "lucide-react";

function Navbar() {
  return (
    <div className="w-full h-25 bg-white border-b border-blue-200 flex items-center justify-between px-6">
      {/* Page title (optional) */}
      <h1 className="text-lg justify-center">
        Guru Nanak Dev College of Health & Sciences
      </h1>

      {/* User Info */}
      <div className="flex items-center space-x-3">
        <User className="w-6 h-6 text-gray-600" />
        <div>
          <p className="font-medium text-gray-800">Student 1</p>
          <p className="text-sm text-gray-500">example@gmail.com</p>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
