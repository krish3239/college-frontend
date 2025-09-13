import React, { useState } from 'react';
import { ChevronDown, User, Phone, BookOpen, Send } from 'lucide-react';
import axiosInstance from '@/api/axiosInstance';
import { toast } from 'react-toastify';

const EnquiryForm= () => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    courseType: '',
    course: ''
  });

  const courseOptions = {
    diploma: [
      'Diploma in Dental Technician & Hygiene',
      'Diploma in Dialysis Technician',
      'Diploma in ECG Technician',
      'Diploma in Health Care & Services',
      'Diploma in Health Information Technology',
      'Diploma in Medical Lab Technology (MLT)',
      'Diploma in Medical Record Technology',
      'Diploma in Multipurpose Health Worker',
      'Diploma in Naturopathy & Yogic Sciences',
      'Diploma in Nutrition & Dietics',
      'Diploma in Operation Theatre Technology (OTT)',
      'Diploma in Opthalmic Technician',
      'Diploma in Optometry',
      'Diploma in Radiology & Imaging Technology',
      'Diploma in Refraction Optometry',
      'Diploma in Ultra Sound Technology (UST)',
      'Diploma in Veterinary Pharmacy',
      'Diploma in X-Ray Technician',
      'Diploma in Blood Transfusion Technology',
      'Diploma in Cardiology Technician',
      'Diploma in CT Scan Technician',
      'Diploma in Pharma Sales',
      'Diploma in CMs & ED',
      'Diploma in Emergency Medical Services Technician'
    ],
    bsc: [
      'B.Sc. in Medical Lab Technology (BMLT)',
      'B.Sc. in Radio-Imaging Technology (BRTT)',
      'B.Sc. in Anesthesia Technology',
      'B.Sc. in Biological Sciences',
      'B.Sc. in Dialysis Technician',
      'B.Sc. in Dietetics and Applied Nutrition',
      'B.Sc. in Homeopathic Pharmacy',
      'B.Sc. in Hospital Management',
      'B.Sc. in C.S.S.D.',
      'B.Sc. in Emergency Medical Services (EMT)'
    ],
    pharmacy: [
      'D-Pharmacy',
      'B-Pharmacy',
      'M-Pharmacy',
      'Ayurveda Pharmacy',
      'Veterinary Pharmacy'
    ]
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value,
      ...(field === 'courseType' && { course: '' })
    }));
  };

const handleSubmit = async () => {
    console.log("button Clicked")
    if (formData.name && formData.phone && formData.courseType && formData.course) {
      
      try {
        const response = await axiosInstance.post('/enquiry', formData);
        if (response.data?.success) {
          toast.success("Enquiry submitted successfully! We will contact you soon. ✅");
          // Optionally reset the form after successful submission
          setFormData({
            name: '',
            phone: '',
            courseType: '',
            course: ''
          });
        } else {
          toast.error("Failed to submit enquiry. Please try again. 😟");
        }
      } catch (error) {
        console.error("Submission error:", error);
        toast.error("An error occurred. Please check your network and try again. 😞");
      } 
    } else {
      toast.error('Please fill out all fields. ✍️');
    }
  };

  const isFormValid = formData.name && formData.phone && formData.courseType && formData.course;

  return (
    <div className="bg-gradient-to-br from-indigo-100 via-purple-50 to-cyan-100 p-4">
      <div className="max-w-lg mx-auto py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full mb-4">
            <BookOpen className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Course Enrollment</h1>
          <p className="text-gray-600">Start your medical career journey today</p>
        </div>

        {/* Form Card */}
        <div className="bg-white rounded-3xl shadow-2xl p-8 border border-gray-100">
          <div className="space-y-6">
            
            {/* Name Input */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                <User className="inline w-4 h-4 mr-2" />
                Full Name
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
                placeholder="Enter your full name"
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none transition-colors duration-200"
              />
            </div>

            {/* Phone Input */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                <Phone className="inline w-4 h-4 mr-2" />
                Phone Number
              </label>
              <input
                type="tel"
                value={formData.phone}
                onChange={(e) => handleInputChange('phone', e.target.value)}
                placeholder="Enter your phone number"
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none transition-colors duration-200"
              />
            </div>

            {/* Course Type Dropdown */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Course Type
              </label>
              <div className="relative">
                <select
                  value={formData.courseType}
                  onChange={(e) => handleInputChange('courseType', e.target.value)}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none transition-colors duration-200 appearance-none bg-white cursor-pointer"
                >
                  <option value="">Select course type</option>
                  <option value="diploma">Diploma</option>
                  <option value="bsc">B.Sc Courses</option>
                  <option value="pharmacy">Pharmacy</option>
                </select>
                <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
              </div>
            </div>

            {/* Course Selection */}
            {formData.courseType && (
              <div className="animate-in slide-in-from-top-4 duration-300">
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Select Course
                </label>
                <div className="relative">
                  <select
                    value={formData.course}
                    onChange={(e) => handleInputChange('course', e.target.value)}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none transition-colors duration-200 appearance-none bg-white cursor-pointer"
                  >
                    <option value="">Choose your course</option>
                    {courseOptions[formData.courseType]?.map((course, index) => (
                      <option key={index} value={course}>
                        {course}
                      </option>
                    ))}
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
                </div>
              </div>
            )}

            {/* Submit Button */}
            <button
              onClick={handleSubmit}
              disabled={!isFormValid}
              className={`w-full py-4 px-6 rounded-xl font-semibold text-white transition-all duration-200 flex items-center justify-center space-x-2 ${
                isFormValid 
                  ? 'bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 shadow-lg hover:shadow-xl' 
                  : 'bg-gray-300 cursor-not-allowed'
              }`}
            >
              <Send className="w-5 h-5" />
              <span>Submit Enrollment</span>
            </button>
          </div>
        </div>

        {/* Course Preview */}
        {formData.course && (
          <div className="mt-6 bg-blue-50 border-2 border-blue-200 rounded-2xl p-6 animate-in slide-in-from-bottom-4 duration-300">
            <div className="text-center">
              <h3 className="text-lg font-bold text-blue-900 mb-2">Selected Course</h3>
              <p className="text-blue-800 font-medium">{formData.course}</p>
              {formData.name && (
                <p className="text-blue-600 text-sm mt-2">Student: {formData.name}</p>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default EnquiryForm;