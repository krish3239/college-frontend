import React, { useState, useEffect } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import axiosInstance from "../../api/axiosInstance";

const Result = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const role = user?.role;
  
  const { register, handleSubmit, reset, control, watch } = useForm({
    defaultValues: {
      studentInfo: {
        fullName: "",
        rollNumber: "",
        course: "",
        semester: "",
        session: ""
      },
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
  const [loading, setLoading] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentRollNumber, setCurrentRollNumber] = useState("");

  // Watch form values for real-time display
  const watchedValues = watch();


  // Auto-load student's result if they're a student
  useEffect(() => {
    if (role === "student" && user?.rollNumber) {
      handleSearch(user.rollNumber);
    }
  }, [role,user?.rollNumber]);

  // API call to fetch result by roll number
  const fetchResultByRoll = async (rollNumber) => {
    try {
      const response = await axiosInstance.get(`/result/student/${rollNumber}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to fetch result' };
    }
  };

  // API call to create new result
  const createResult = async (resultData) => {
    try {
      const response = await axiosInstance.post('/result', resultData);
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to create result' };
    }
  };

  // API call to update existing result
  const updateResult = async (rollNumber, resultData) => {
    try {
      const response = await axiosInstance.put(`/result/${rollNumber}`, resultData);
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to update result' };
    }
  };

  const handleSearch = async (rollNumber = searchRoll) => {
    if (!rollNumber.trim()) {
      setError("Please enter a roll number");
      return;
    }

    setError("");
    setLoading(true);
    
    try {
      const response = await fetchResultByRoll(rollNumber.trim().toUpperCase());
      
      if (response.success && response.data) {
        // Result found - populate form for editing
        reset(response.data);
        setIsEditing(true);
        setCurrentRollNumber(response.data.studentInfo.rollNumber);
        if (role === "admin") {
          setSearchRoll(response.data.studentInfo.rollNumber);
        }
      } else {
        // No result found - initialize empty form for new entry
        resetToNewEntry(rollNumber.trim().toUpperCase());
      }
    } catch (error) {
      console.error("Search error:", error);
      setError(error.message || "No result found for given roll number.");
      resetToNewEntry(rollNumber.trim().toUpperCase());
    } finally {
      setLoading(false);
    }
  };

  const resetToNewEntry = (rollNumber = "") => {
    reset({
      studentInfo: {
        fullName: "",
        rollNumber: rollNumber,
        course: "",
        semester: "",
        session: ""
      },
      subjects: [],
      status: "",
    });
    setIsEditing(false);
    setCurrentRollNumber("");
  };

  const onSubmit = async (data) => {
    // Validate data before submission
    if (!data.studentInfo.fullName.trim()) {
      setError("Full name is required");
      return;
    }
    if (!data.studentInfo.rollNumber.trim()) {
      setError("Roll number is required");
      return;
    }
    if (!data.studentInfo.course.trim()) {
      setError("Course is required");
      return;
    }
    if (!data.studentInfo.semester.trim()) {
      setError("Semester is required");
      return;
    }
    if (!data.studentInfo.session.trim()) {
      setError("Session is required");
      return;
    }
    if (!data.subjects || data.subjects.length === 0) {
      setError("At least one subject is required");
      return;
    }
    if (!data.status) {
      setError("Result status is required");
      return;
    }

    // Validate subjects
    for (let i = 0; i < data.subjects.length; i++) {
      const subject = data.subjects[i];
      if (!subject.code.trim() || !subject.name.trim()) {
        setError(`Subject ${i + 1}: Code and name are required`);
        return;
      }
    }

    setLoading(true);
    setError("");

    try {
      let response;
      
      if (isEditing) {
        // Update existing result
        response = await updateResult(currentRollNumber, data);
      } else {
        // Create new result
        response = await createResult(data);
      }

      if (response.success) {
        alert(`Result ${isEditing ? 'updated' : 'saved'} successfully!`);
        setIsEditing(true);
        setCurrentRollNumber(data.studentInfo.rollNumber);
        
        // Refresh the form with updated data
        if (response.data) {
          reset(response.data);
        }
      } else {
        setError(response.message || `Failed to ${isEditing ? 'update' : 'save'} result`);
      }
    } catch (error) {
      console.error("Submit error:", error);
      setError(error.message || `Failed to ${isEditing ? 'update' : 'save'} result`);
    } finally {
      setLoading(false);
    }
  };

  const clearForm = () => {
    resetToNewEntry();
    setSearchRoll("");
    setError("");
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleSearch();
    }
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
            onChange={(e) => setSearchRoll(e.target.value.toUpperCase())}
            onKeyPress={handleKeyPress}
            className="flex-1 border border-blue-200 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            disabled={loading}
          />
          <button
            type="button"
            onClick={() => handleSearch()}
            disabled={loading || !searchRoll.trim()}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "Searching..." : "Search"}
          </button>
          <button
            type="button"
            onClick={clearForm}
            disabled={loading}
            className="bg-gray-600 text-white px-4 py-2 rounded-lg disabled:opacity-50"
          >
            Clear
          </button>
        </div>
      )}

      {error && (
        <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-red-600">{error}</p>
        </div>
      )}

      {loading && (
        <div className="mb-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
          <p className="text-blue-600">Loading...</p>
        </div>
      )}

      {/* Status indicator */}
      {role === "admin" && (
        <div className="mb-4 p-2 bg-white border border-blue-200 rounded-lg">
          <p className="text-sm text-gray-600">
            Status: <span className="font-medium">
              {isEditing ? `Editing result for ${currentRollNumber}` : "Creating new result"}
            </span>
          </p>
        </div>
      )}

      {/* Student/Admin Form */}
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Student Info */}
        <div className="grid grid-cols-2 gap-6 bg-white p-4 rounded-lg border border-blue-100">
          <h3 className="col-span-2 text-lg font-semibold mb-2">Student Information</h3>
          {[
            { label: "Full Name", name: "fullName", key: "fullName" },
            { label: "Roll Number", name: "rollNumber", key: "rollNumber" },
            { label: "Course", name: "course", key: "course" },
            { label: "Semester", name: "semester", key: "semester" },
            { label: "Session", name: "session", key: "session" },
          ].map((field) => (
            <div key={field.name} className="flex flex-col">
              <label className="mb-1 font-medium">{field.label}</label>
              {role === "admin" ? (
                <input
                  type="text"
                  {...register(`studentInfo.${field.name}`, { required: true })}
                  disabled={field.name === "rollNumber" && isEditing}
                  className={`border border-blue-200 rounded-lg p-2 bg-white focus:outline-none focus:ring-2 focus:ring-blue-400 ${
                    field.name === "rollNumber" && isEditing ? 'bg-gray-100 cursor-not-allowed' : ''
                  }`}
                />
              ) : (
                <p className="border border-blue-200 rounded-lg p-2 bg-gray-50">
                  {watchedValues?.studentInfo?.[field.key] || "-"}
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
                  append({ code: "", name: "", maxMarks: 100, obtainedMarks: 0, grade: "" })
                }
                disabled={loading}
                className="bg-green-600 text-white px-3 py-1 rounded-lg text-sm disabled:opacity-50"
              >
                + Add Subject
              </button>
            )}
          </div>
          
          {fields.length === 0 ? (
            <p className="text-gray-500 text-center py-4">
              {role === "admin" ? "No subjects added yet. Click 'Add Subject' to start." : "No subjects available"}
            </p>
          ) : (
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
                            col === "grade" ? (
                              <select
                                {...register(`subjects.${index}.${col}`)}
                                className="w-full border border-blue-200 rounded-lg p-1 focus:outline-none focus:ring-1 focus:ring-blue-400"
                              >
                                <option value="">Select</option>
                                <option value="A+">A+</option>
                                <option value="A">A</option>
                                <option value="B+">B+</option>
                                <option value="B">B</option>
                                <option value="C+">C+</option>
                                <option value="C">C</option>
                                <option value="D">D</option>
                                <option value="F">F</option>
                              </select>
                            ) : (
                              <input
                                type={col === "maxMarks" || col === "obtainedMarks" ? "number" : "text"}
                                {...register(`subjects.${index}.${col}`)}
                                min={col === "maxMarks" || col === "obtainedMarks" ? "0" : undefined}
                                className="w-full border border-blue-200 rounded-lg p-1 focus:outline-none focus:ring-1 focus:ring-blue-400"
                              />
                            )
                          ) : (
                            <p className="px-1">{watchedValues?.subjects?.[index]?.[col] || "-"}</p>
                          )}
                        </td>
                      ))}
                      {role === "admin" && (
                        <td className="p-2 border border-blue-200 text-center">
                          <button
                            type="button"
                            onClick={() => remove(index)}
                            disabled={loading}
                            className="text-red-600 text-sm hover:text-red-800 disabled:opacity-50"
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
          )}
        </div>

        {/* Result Status */}
        <div className="bg-white p-4 rounded-lg border border-blue-100">
          <label className="mb-1 font-medium block">Result Status (Pass/Fail)</label>
          {role === "admin" ? (
            <select
              {...register("status", { required: true })}
              className="border border-blue-200 rounded-lg p-2 bg-white focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
              <option value="">Select Status</option>
              <option value="Pass">Pass</option>
              <option value="Fail">Fail</option>
            </select>
          ) : (
            <p className="border border-blue-200 rounded-lg p-2 bg-gray-50">
              {watchedValues?.status || "-"}
            </p>
          )}
        </div>

        {/* Summary for students */}
        {role !== "admin" && watchedValues?.subjects?.length > 0 && (
          <div className="bg-white p-4 rounded-lg border border-blue-100">
            <h3 className="text-lg font-semibold mb-2">Result Summary</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
              <div>
                <span className="font-medium">Total Subjects:</span>
                <p>{watchedValues.subjects.length}</p>
              </div>
              <div>
                <span className="font-medium">Total Marks:</span>
                <p>{watchedValues.subjects.reduce((sum, subject) => sum + Number(subject.maxMarks || 0), 0)}</p>
              </div>
              <div>
                <span className="font-medium">Obtained Marks:</span>
                <p>{watchedValues.subjects.reduce((sum, subject) => sum + Number(subject.obtainedMarks || 0), 0)}</p>
              </div>
              <div>
                <span className="font-medium">Percentage:</span>
                <p>
                  {(() => {
                    const totalMarks = watchedValues.subjects.reduce((sum, subject) => sum + Number(subject.maxMarks || 0), 0);
                    const obtainedMarks = watchedValues.subjects.reduce((sum, subject) => sum + Number(subject.obtainedMarks || 0), 0);
                    return totalMarks > 0 ? ((obtainedMarks / totalMarks) * 100).toFixed(2) + "%" : "0%";
                  })()}
                </p>
              </div>
            </div>
          </div>
        )}

        {role === "admin" && (
          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={clearForm}
              disabled={loading}
              className="bg-gray-600 text-white px-6 py-2 rounded-lg disabled:opacity-50"
            >
              Clear Form
            </button>
            <button
              type="submit"
              disabled={loading || fields.length === 0}
              className="bg-green-600 text-white px-6 py-2 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "Saving..." : (isEditing ? "Update Result" : "Save Result")}
            </button>
          </div>
        )}
      </form>
    </div>
  );
};

export default Result;