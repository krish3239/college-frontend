// authService.js

const login = async (userData) => {
  if (userData.email === "test@test.com" && userData.password === "123456") {
    // return user + mock token
    return {
      user: { id: 1, name: "Test User", email: "test@test.com" },
      token: "mock-jwt-token-123456", // mock token
    };
  } else {
    throw new Error("Invalid credentials");
  }
};

const register = async (userData) => {
  return {
    user: { id: Date.now(), ...userData },
    token: "mock-jwt-token-123456", // mock token
  };
};

// Mock getProfile API
const getProfile = async (token) => {
  // In real scenario, server will validate the token
  if (token === "mock-jwt-token-123456") {
    return { id: 1, name: "Test User", email: "test@test.com" };
  } else {
    throw new Error("Invalid token");
  }
};

const authService = { login, register, getProfile };
export default authService;
