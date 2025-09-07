import logo from "../../assets/logo.jpg";
import myPhoto from "../../assets/photo.png";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useForm } from "react-hook-form";

function Register() {
  const [signupMethod, setSignupMethod] = useState("email");

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log("Signup form submitted:", data);
  };

  const password = watch("password"); // watch the password field

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

          <h2 className="text-2xl font-bold text-center mb-6">Sign Up</h2>

          {/* Toggle Email / Phone */}
          <div className="flex justify-center mb-4 space-x-4">
            <button
              type="button"
              onClick={() => setSignupMethod("email")}
              className={`px-4 py-2 rounded-lg text-sm font-medium ${
                signupMethod === "email"
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200 text-gray-700"
              }`}
            >
              Use Email
            </button>
            <button
              type="button"
              onClick={() => setSignupMethod("phone")}
              className={`px-4 py-2 rounded-lg text-sm font-medium ${
                signupMethod === "phone"
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200 text-gray-700"
              }`}
            >
              Use Phone
            </button>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {/* Full Name */}
            <input
              type="text"
              placeholder="Full Name"
              {...register("fullName", { required: "Full name is required" })}
              className="w-full px-4 py-2 border rounded-lg"
            />
            {errors.fullName && (
              <p className="text-red-500 text-sm">{errors.fullName.message}</p>
            )}

            {/* Email or Phone */}
            {signupMethod === "email" ? (
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
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 6,
                  message: "Password must be at least 6 characters",
                },
              })}
              className="w-full px-4 py-2 border rounded-lg"
            />
            {errors.password && (
              <p className="text-red-500 text-sm">{errors.password.message}</p>
            )}

            {/* Confirm Password */}
            <input
              type="password"
              placeholder="Confirm Password"
              {...register("confirmPassword", {
                required: "Please confirm your password",
                validate: (value) =>
                  value === password || "Passwords do not match",
              })}
              className="w-full px-4 py-2 border rounded-lg"
            />
            {errors.confirmPassword && (
              <p className="text-red-500 text-sm">
                {errors.confirmPassword.message}
              </p>
            )}

            {/* Terms */}
            <div className="flex items-center">
              <input type="checkbox" id="terms" className="mr-2" />
              <label htmlFor="terms" className="text-sm">
                I agree to all terms and conditions
              </label>
            </div>

            {/* Submit */}
            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600"
            >
              Sign Up
            </button>
          </form>

          {/* Already have account */}
          <p className="mt-4 text-center text-sm">
            Already have an account?{" "}
            <Link to="/login" className="text-blue-500 hover:underline">
              Log In
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Register;
