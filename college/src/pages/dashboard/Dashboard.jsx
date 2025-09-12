import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import axiosInstance from "../../api/axiosInstance";

const Dashboard = ({ studentData: initialStudentData }) => {
  const user = JSON.parse(localStorage.getItem("user"));
  const role = user["role"];

  const { register, handleSubmit, reset } = useForm({
    defaultValues: initialStudentData || {},
  });

  const [searchQuery, setSearchQuery] = useState("");
  const [error, setError] = useState("");
  const [studentData, setStudentData] = useState(initialStudentData || {}); // Add state for student data

  // Add the missing fetchStudentByQuery function
  const fetchStudentByQuery = async (query) => {
    try {
      const res = await axiosInstance.get(`student/search/${query}`);
      if (res.data && res.data.success) {
        return res.data.data;
      }
      return null;
    } catch (error) {
      console.log("Error fetching student:", error);
      return null;
    }
  };

  const handleSearch = async () => {
    setError("");
    reset({
      studentName: "",
      guardianName: "",
      gender: "",
      address: "",
      phoneNumber: "",
      email: "",
      rollNumber: "",
      status: "",
      bloodGroup: "",
    });
    const data = await fetchStudentByQuery(searchQuery);
    if (data) {
      reset(data);
      setStudentData(data); // Update display data too
    } else {
      reset({});
      setStudentData({}); // Clear display data
      setError("No student found with given email or phone.");
    }
  };

  const studentView = async () => {
    if (role === "student") {
      try {
        const res = await axiosInstance.get(`student/search/${user["email"]}`);
        if (res.data && res.data.success) {
          reset(res.data.data); // Update form
          setStudentData(res.data.data); // Update display data
        } else {
          reset({});
          setStudentData({});
          setError("No student found with given email or phone.");
        }
      } catch (error) {
        console.log("the fetching error", error);
        setError("Error loading student data");
      }
    }
  };

  useEffect(() => {
    studentView();
  }, [role]); // Add proper dependencies

  const onSubmit = async (data) => {
    try {
      // Add API call to actually update the data
      const res = await axiosInstance.patch(`student/${data.email}`, data);
      if (res.data && res.data.success) {
        console.log("Updated Data:", data);
        alert("Student data updated successfully!");
        setStudentData(data); // Update display data
      } else {
        alert("Failed to update student data");
      }
    } catch (error) {
      console.log("Update error:", error);
      alert("Error updating student data");
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-8 bg-blue-50 rounded-xl shadow-sm">
      <h2 className="text-2xl font-bold mb-6">
        {role === "admin" ? "Admin - Edit Student" : "Student Details"}
      </h2>

      {/* Admin Search Box */}
      {role === "admin" && (
        <div className="mb-6 flex gap-2">
          <input
            type="text"
            placeholder="Search by email"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="flex-1 border border-blue-200 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <button
            type="button"
            onClick={handleSearch}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg"
          >
            Search
          </button>
        </div>
      )}
      {error && <p className="text-red-500 mb-4">{error}</p>}

      {/* Student/Admin Form */}
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="grid grid-cols-2 gap-6"
      >
        {[
          { label: "Student Name", name: "studentName" },
          { label: "Guardian Name", name: "guardianName" },
          { label: "Gender", name: "gender", placeholder: "Male/Female/Other" },
          { label: "Address", name: "address" },
          { label: "Phone Number", name: "phoneNumber" },
          { label: "Email", name: "email" },
          { label: "Roll Number", name: "rollNumber" },
          {
            label: "Marital Status",
            name: "status",
            placeholder: "Single/Married",
          },
          {
            label: "Blood Group",
            name: "bloodGroup",
            placeholder: "A+,A-,B+,B-",
          },
        ].map((field) => (
          <div key={field.name} className="flex flex-col">
            <label className="mb-1 font-medium">{field.label}</label>
            {role === "admin" ? (
              <>
                {field.label === "Email" ? (
                  <input
                    type="text"
                    {...register(field.name)}
                    disabled
                    className="border border-blue-200 rounded-lg p-2 bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-400"
                  />
                ) : (
                  <input
                    type="text"
                    placeholder={field?.placeholder}
                    {...register(field.name)}
                    className="border border-blue-200 rounded-lg p-2 bg-white focus:outline-none focus:ring-2 focus:ring-blue-400"
                  />
                )}
              </>
            ) : (
              <p className="border border-blue-200 rounded-lg p-2 bg-white">
                {studentData?.[field.name] || "-"}
              </p>
            )}
          </div>
        ))}

        {role === "admin" && (
          <div className="col-span-2 mt-4">
            <button
              type="submit"
              className="bg-green-600 text-white px-6 py-2 rounded-lg"
            >
              Save Changes
            </button>
          </div>
        )}
      </form>
    </div>
  );
};

export default Dashboard;
