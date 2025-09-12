import axiosInstance from "../../api/axiosInstance";

// authService.j
const login = async (userData) => {
  try {
    // Use the instance to make the POST request
    const response = await axiosInstance.post('/auth/login', userData);
    
    if (response.data) {
      localStorage.setItem('user', JSON.stringify(response.data.user));
      localStorage.setItem('token', response.data.accessToken);
    }
    
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Login failed");
  }
};

const register = async (userData) => {
  try {
    // Use the instance for the register endpoint
    const response = await axiosInstance.post('/auth/register', userData);
    
    if (response.data) {
      localStorage.setItem('user', JSON.stringify(response.data.user));
      localStorage.setItem('token', response.data.accessToken);
    }
    
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Registration failed");
  }
};

const getProfile = async (token) => {
  // In a real app, you would use the instance and add the token to the headers
  /*
  const response = await axiosInstance.get('profile', {
      headers: {
          Authorization: `Bearer ${token}`
      }
  });
  return response.data;
  */
  
  // Mock logic
  if (token === "mock-jwt-token-123456") {
    return { id: 1, name: "Test User", email: "test@test.com" };
  } else {
    throw new Error("Invalid token");
  }
};

const authService = { login, register, getProfile };
export default authService;