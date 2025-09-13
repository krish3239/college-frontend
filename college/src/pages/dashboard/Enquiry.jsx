import React, { useState, useEffect, useMemo } from 'react';
import { ChevronLeft, ChevronRight, Search, Loader2, AlertCircle } from 'lucide-react';
import axiosInstance from '@/api/axiosInstance';
import { toast } from 'react-toastify';

const EnquiryTable = () => {
  const [allEnquiries, setAllEnquiries] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [limit] = useState(10); // Items per page
  const user=JSON.parse(localStorage.getItem("user"))
  const role=user.role

  // Fetch all enquiries from the backend in a single request
  const fetchAllEnquiries = async () => {
    setLoading(true);
    setError(null);
    try {
      // The API call is made without any pagination or search parameters
      const response = await axiosInstance.get(`/enquiry`);
      
      if (response.data?.success) {
        setAllEnquiries(response.data.data);
        toast.success("Enquiries loaded successfully! ✅");
      } else {
        setError("Failed to fetch enquiries");
        toast.error("Failed to fetch enquiries. 😞");
      }
    } catch (error) {
      console.error("Fetch error:", error);
      setError("An error occurred while fetching data. Please try again.");
      toast.error("An error occurred. 😞");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // Only fetch data once when the component mounts
    fetchAllEnquiries();
  }, []);

  // Use a useMemo hook to handle filtering and pagination on the client side
  const filteredAndPaginatedData = useMemo(() => {
    if (!allEnquiries) return { data: [], totalRecords: 0, totalPages: 1 };

    // Step 1: Filter data based on the search term
    const filteredData = allEnquiries.filter(enquiry =>
      enquiry.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      enquiry.phone.toLowerCase().includes(searchTerm.toLowerCase()) ||
      enquiry.courseType.toLowerCase().includes(searchTerm.toLowerCase()) ||
      enquiry.course.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Step 2: Calculate pagination details from the filtered data
    const totalRecords = filteredData.length;
    const totalPages = Math.ceil(totalRecords / limit);

    // Ensure the current page is valid after filtering
    if (currentPage > totalPages && totalPages > 0) {
      setCurrentPage(totalPages);
    } else if (currentPage === 0 && totalPages > 0) {
      setCurrentPage(1);
    }

    // Step 3: Slice the filtered data for the current page
    const startIndex = (currentPage - 1) * limit;
    const paginatedData = filteredData.slice(startIndex, startIndex + limit);

    return {
      data: paginatedData,
      totalRecords,
      totalPages,
    };
  }, [allEnquiries, searchTerm, currentPage, limit]);

  const { data, totalRecords, totalPages } = filteredAndPaginatedData;

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1); // Reset to first page when searching
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-IN', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getPageNumbers = () => {
    const pages = [];
    const maxVisible = 5;
    let start = Math.max(1, currentPage - Math.floor(maxVisible / 2));
    let end = Math.min(totalPages, start + maxVisible - 1);
    
    if (end - start + 1 < maxVisible) {
      start = Math.max(1, end - maxVisible + 1);
    }
    
    for (let i = start; i <= end; i++) {
      pages.push(i);
    }
    return pages;
  };

  return (
    <>
 {
     role==="admin"?(
           <div className="w-full max-w-6xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Enquiry Management</h2>
        
        {/* Search Bar */}
        <div className="relative mb-4">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <input
            type="text"
            placeholder="Search by name, phone, course type, or course..."
            value={searchTerm}
            onChange={handleSearch}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        {/* Records Info */}
        <div className="text-sm text-gray-600 mb-4">
          Showing {data.length > 0 ? ((currentPage - 1) * limit) + 1 : 0} to {Math.min(currentPage * limit, totalRecords)} of {totalRecords} entries
        </div>
      </div>

      {/* Error State */}
      {error && (
        <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg flex items-center">
          <AlertCircle className="w-5 h-5 text-red-500 mr-2" />
          <span className="text-red-700">{error}</span>
        </div>
      )}

      {/* Table */}
      <div className="overflow-x-auto border border-gray-200 rounded-lg">
        <table className="min-w-full bg-white">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Phone
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Course Type
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Course
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Submitted At
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {loading ? (
              <tr>
                <td colSpan="5" className="px-6 py-12 text-center">
                  <div className="flex items-center justify-center">
                    <Loader2 className="w-6 h-6 animate-spin text-blue-500 mr-2" />
                    <span className="text-gray-600">Loading enquiries...</span>
                  </div>
                </td>
              </tr>
            ) : data.length === 0 ? (
              <tr>
                <td colSpan="5" className="px-6 py-12 text-center text-gray-500">
                  No enquiries found. Try adjusting your search criteria.
                </td>
              </tr>
            ) : (
              data.map((enquiry, index) => (
                <tr key={enquiry._id} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{enquiry.name}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{enquiry.phone}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                      enquiry.courseType === 'diploma' ? 'bg-indigo-100 text-indigo-800' :
                      enquiry.courseType === 'bsc' ? 'bg-blue-100 text-blue-800' :
                      'bg-purple-100 text-purple-800'
                    }`}>
                      {enquiry.courseType}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{enquiry.course}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-500">{formatDate(enquiry.createdAt)}</div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="mt-6 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1 || loading}
              className="px-3 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
            >
              <ChevronLeft className="w-4 h-4 mr-1" />
              Previous
            </button>
            
            <div className="flex space-x-1">
              {getPageNumbers().map((pageNum) => (
                <button
                  key={pageNum}
                  onClick={() => handlePageChange(pageNum)}
                  disabled={loading}
                  className={`px-3 py-2 text-sm font-medium rounded-md ${
                    pageNum === currentPage
                      ? 'bg-blue-600 text-white'
                      : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
                  } disabled:opacity-50 disabled:cursor-not-allowed`}
                >
                  {pageNum}
                </button>
              ))}
            </div>
            
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages || loading}
              className="px-3 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
            >
              Next
              <ChevronRight className="w-4 h-4 ml-1" />
            </button>
          </div>
          
          <div className="text-sm text-gray-600">
            Page {currentPage} of {totalPages}
          </div>
        </div>
      )}
    </div>
     ): <p>Access Denied!!!!</p>
    }
    </>
  );
};

export default EnquiryTable;