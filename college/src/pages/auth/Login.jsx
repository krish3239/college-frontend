import logo from "../../assets/logo.jpg";
import myPhoto from "../../assets/photo.png";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useForm } from "react-hook-form";

function Login() {
  const [loginMethod, setLoginMethod] = useState("email");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log("Login form submitted:", data);
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Left side image */}
      <div className="hidden md:flex w-1/2 items-center justify-center bg-white">
        <img
          src={myPhoto}
          alt="Students"
          className="h-full w-full object-contain object-center bg-white"
        />
      </div>

      {/* Right side form */}
      <div className="flex w-full md:w-1/2 items-center justify-center p-6">
        <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-lg">
          <div className="flex justify-center mb-6">
            <img src={logo} alt="Logo" className="w-20 h-20" />
          </div>

          <h2 className="text-2xl font-bold text-center mb-6">Log In</h2>

          {/* Toggle between Email & Phone */}
          <div className="flex justify-center mb-4 space-x-4">
            <button
              type="button"
              onClick={() => setLoginMethod("email")}
              className={`px-4 py-2 rounded-lg text-sm font-medium ${
                loginMethod === "email"
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200 text-gray-700"
              }`}
            >
              Use Email
            </button>
            <button
              type="button"
              onClick={() => setLoginMethod("phone")}
              className={`px-4 py-2 rounded-lg text-sm font-medium ${
                loginMethod === "phone"
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200 text-gray-700"
              }`}
            >
              Use Phone
            </button>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {/* Email or Phone */}
            {loginMethod === "email" ? (
              <>
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
              </>
            ) : (
              <>
                <input
                  type="tel"
                  placeholder="Phone Number"
                  {...register("phone", {
                    required: "Phone number is required",
                    pattern: {
                      value: /^[0-9]{10}$/,
                      message: "Phone must be 10 digits",
                    },
                  })}
                  className="w-full px-4 py-2 border rounded-lg"
                />
                {errors.phone && (
                  <p className="text-red-500 text-sm">{errors.phone.message}</p>
                )}
              </>
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
              className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600"
            >
              Log In
            </button>
          </form>

          {/* Don’t have account option */}
          <p className="mt-4 text-center text-sm">
            Don’t have an account?{" "}
            <Link to="/" className="text-blue-500 hover:underline">
              Sign Up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;
