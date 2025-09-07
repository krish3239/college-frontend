import { Outlet, Link } from "react-router-dom";

export default function AuthLayout() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-6">
        
        {/* Where child routes (login/register) will render */}
        <Outlet />
      </div>
    </div>
  );
}
