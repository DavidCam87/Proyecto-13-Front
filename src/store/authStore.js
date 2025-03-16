import { create } from "zustand";
import { jwtDecode } from "jwt-decode";
import { login as apiLogin } from "../utils/api";

const token = localStorage.getItem("token");
const storeUser = localStorage.getItem("user");
let user = null;
let isAuthenticated = false;
let isAdmin = false;

if (token && storeUser) {
  try {
    const decoded = jwtDecode(token);
    if (decoded.exp * 1000 > Date.now()) {
      user = JSON.parse(storeUser);
      isAuthenticated = true;
      isAdmin = decoded.role === "admin";
    } else {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
    }
  } catch (error) {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
  }
}

const useAuthStore = create((set) => ({
  user,
  isAuthenticated,
  isAdmin,
  isLoading: false,
  error: null,

  login: async (credentials) => {
    set({ isLoading: true, error: null });
    try {
      const { token, user } = await apiLogin(credentials);
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));

      const decoded = jwtDecode(token);
      set({
        user,
        isAdmin: decoded.role === "admin",
        isAuthenticated: true,
        isLoading: false,
      });
    } catch (error) {
      set({
        error: error.response?.data?.message || "Login failed",
        isLoading: false,
        isAuthenticated: false,
        user: null,
      });
    }
  },

  logout: () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    set({
      user: null,
      isAuthenticated: false,
      isAdmin: false,
      error: null,
    });
  },
}));

export default useAuthStore;