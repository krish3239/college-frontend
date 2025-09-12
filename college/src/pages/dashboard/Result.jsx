import React, { useState } from "react";
import { useForm, useFieldArray } from "react-hook-form";

// Mock API call
const fetchResultByRoll = async (roll) => {
  if (roll === "STU123") {
    return {
      studentInfo: {
        fullName: "John Doe",
        rollNumber: "STU123",
        course: "B.Sc Computer Science",
        semester: "Semester 2",
        session: "2025",
      },
      subjects: [
        { code: "ENG101", name: "English", maxMarks: 100, obtainedMarks: 78, grade: "B+" },
        { code: "MAT102", name: "Mathematics", maxMarks: 100, obtainedMarks: 88, grade: "A" },
        { code: "PHY103", name: "Physics", maxMarks: 100, obtainedMarks: 67, grade: "B" },
        { code: "CSC104", name: "Computer Science", maxMarks: 100, obtainedMarks: 92, grade: "A+" },
      ],
      status: "Pass",
    };
  }
  return null;
};

const Result = ({ role = "admin" }) => {
  const { register, handleSubmit, reset, control } = useForm({
    defaultValues: {
      studentInfo: {},
      subjects: [],
      status: "",
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "subjects",
  });

  const [searchRoll, setSearchRoll] = useState("");
  const [error, setError] = useState("");

  const handleSearch = async () => {
    setError("");
    const data = await fetchResultByRoll(searchRoll);
    if (data) {
      reset(data);
    } else {
      reset({});
      setError("No result found for given roll number.");
    }
  };

  const onSubmit = (data) => {
    console.log("Result Saved:", data);
    alert("Result saved successfully!");
  };

  return (
    <div className="max-w-5xl mx-auto p-8 bg-blue-50 rounded-xl shadow-sm">
      <h2 className="text-2xl font-bold mb-6">
        {role === "admin" ? "Admin - Manage Result" : "Student Result"}
      </h2>

      {/* Admin Search Box */}
      {role === "admin" && (
        <div className="mb-6 flex gap-2">
          <input
            type="text"
            placeholder="Enter Roll Number"
            value={searchRoll}
            onChange={(e) => setSearchRoll(e.target.value)}
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
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Student Info */}
        <div className="grid grid-cols-2 gap-6 bg-white p-4 rounded-lg border border-blue-100">
          {[
            { label: "Full Name", name: "studentInfo.fullName" },
            { label: "Roll Number", name: "studentInfo.rollNumber" },
            { label: "Course", name: "studentInfo.course" },
            { label: "Semester", name: "studentInfo.semester" },
            { label: "Session", name: "studentInfo.session" },
          ].map((field) => (
            <div key={field.name} className="flex flex-col">
              <label className="mb-1 font-medium">{field.label}</label>
              {role === "admin" ? (
                <input
                  type="text"
                  {...register(field.name)}
                  className="border border-blue-200 rounded-lg p-2 bg-white focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
              ) : (
                <p className="border border-blue-200 rounded-lg p-2 bg-white">
                  {control._formValues?.studentInfo?.[field.name.split(".")[1]] || "-"}
                </p>
              )}
            </div>
          ))}
        </div>

        {/* Subjects Table */}
        <div className="bg-white p-4 rounded-lg border border-blue-100">
          <div className="flex justify-between items-center mb-3">
            <h3 className="text-lg font-semibold">Subjects</h3>
            {role === "admin" && (
              <button
                type="button"
                onClick={() =>
                  append({ code: "", name: "", maxMarks: "", obtainedMarks: "", grade: "" })
                }
                className="bg-green-600 text-white px-3 py-1 rounded-lg text-sm"
              >
                + Add Subject
              </button>
            )}
          </div>
          <div className="overflow-x-auto">
            <table className="w-full border border-blue-100 text-left text-sm">
              <thead className="bg-blue-100">
                <tr>
                  <th className="p-2 border border-blue-200">Code</th>
                  <th className="p-2 border border-blue-200">Subject</th>
                  <th className="p-2 border border-blue-200">Max Marks</th>
                  <th className="p-2 border border-blue-200">Obtained</th>
                  <th className="p-2 border border-blue-200">Grade</th>
                  {role === "admin" && <th className="p-2 border border-blue-200">Action</th>}
                </tr>
              </thead>
              <tbody>
                {fields.map((field, index) => (
                  <tr key={field.id} className="border border-blue-100">
                    {["code", "name", "maxMarks", "obtainedMarks", "grade"].map((col) => (
                      <td key={col} className="p-2 border border-blue-200">
                        {role === "admin" ? (
                          <input
                            type="text"
                            {...register(`subjects.${index}.${col}`)}
                            className="w-full border border-blue-200 rounded-lg p-1 focus:outline-none focus:ring-1 focus:ring-blue-400"
                          />
                        ) : (
                          <p>{control._formValues?.subjects?.[index]?.[col] || "-"}</p>
                        )}
                      </td>
                    ))}
                    {role === "admin" && (
                      <td className="p-2 border border-blue-200 text-center">
                        <button
                          type="button"
                          onClick={() => remove(index)}
                          className="text-red-600 text-sm"
                        >
                          Remove
                        </button>
                      </td>
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Result Status */}
        <div className="bg-white p-4 rounded-lg border border-blue-100">
          <label className="mb-1 font-medium block">Result Status (Pass/Fail)</label>
          {role === "admin" ? (
            <select
              {...register("status")}
              className="border border-blue-200 rounded-lg p-2 bg-white focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
              <option value="">Select</option>
              <option value="Pass">Pass</option>
              <option value="Fail">Fail</option>
            </select>
          ) : (
            <p className="border border-blue-200 rounded-lg p-2 bg-white">
              {control._formValues?.status || "-"}
            </p>
          )}
        </div>

        {role === "admin" && (
          <div className="text-right">
            <button
              type="submit"
              className="bg-green-600 text-white px-6 py-2 rounded-lg"
            >
              Save Result
            </button>
          </div>
        )}
      </form>
    </div>
  );
};

export default Result;
