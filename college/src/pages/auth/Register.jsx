import logo from "../../assets/logo.jpg";
import myPhoto from "../../assets/photo.png";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { registers } from "../../features/auth/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { toast } from "react-toastify";

function Register() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  );

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    if (!isLoading) {
      dispatch(registers(data));
    }
  };

  // ✅ Toast notifications
  useEffect(() => {
    if (isError) {
      toast.error(message || "Registration failed!");
    }

    if (isSuccess || user) {
      toast.success("Registration successful!");
      navigate("/dashboard"); // redirect after success
    }
  }, [isError, isSuccess, user, message, navigate]);

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

          <h2 className="text-2xl font-bold text-center mb-6">Sign Up</h2>

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
              {isLoading ? "Signing up..." : "Sign Up"}
            </button>
          </form>

          {/* Already have account option */}
          <p className="mt-4 text-center text-sm">
            Already have an account?{" "}
            <Link to="/login" className="text-blue-500 hover:underline">
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Register;
