import logo from "../../assets/logo.jpg";
import myPhoto from "../../assets/photo.png";
import { Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useSelector, useDispatch } from "react-redux";
import { login } from "../../features/auth/authSlice";
import { toast } from "react-toastify";

function Login() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  if (token) {
    navigate("/dashboard");
  }

  const dispatch = useDispatch();

  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    if (isError) {
      toast.error(message || "Login failed!");
    }

    if (isSuccess || user) {
      toast.success("Login successful!");
      navigate("/dashboard");
    }
  }, [user, isError, isSuccess, message, navigate, dispatch]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    if (!isLoading) {
      dispatch(login(data));
    }
  };

  return (
    <div className="flex items-center justify-center">
      {/* Left side image */}
      <div className="hidden md:flex w-1/2 p-6 h-screen items-center justify-center">
        <img
          src={myPhoto}
          alt="Students"
          className="object-contain object-center rounded-2xl h-full"
        />
      </div>

      {/* Right side form */}
      <div className="flex w-full md:w-1/2 h-screen items-center justify-center p-6">
        <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-lg">
          <div className="flex justify-center mb-6">
            <img src={logo} alt="Logo" className="w-20 h-20" />
          </div>

          <h2 className="text-2xl font-bold text-center mb-6">Log In</h2>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {/* Email */}
            <input
              type="email"
              placeholder="Email Address"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: "Invalid email address",
                },
              })}
              className="w-full px-4 py-2 border rounded-lg"
            />
            {errors.email && (
              <p className="text-red-500 text-sm">{errors.email.message}</p>
            )}

            {/* Password */}
            <input
              type="password"
              placeholder="Password"
              {...register("password", { required: "Password is required" })}
              className="w-full px-4 py-2 border rounded-lg"
            />
            {errors.password && (
              <p className="text-red-500 text-sm">{errors.password.message}</p>
            )}

            {/* Submit */}
            <button
              type="submit"
              className={`w-full text-white py-2 rounded-lg transition-colors ${
                isLoading
                  ? "bg-blue-300 cursor-not-allowed"
                  : "bg-blue-500 hover:bg-blue-600"
              }`}
              disabled={isLoading}
            >
              {isLoading ? "Logging in..." : "Log In"}
            </button>
          </form>

          {/* Register link */}
          <p className="mt-4 text-center text-sm">
            Don't have an account?{" "}
            <Link to="/register" className="text-blue-500 hover:underline">
              Sign Up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;
