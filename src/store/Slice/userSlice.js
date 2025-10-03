import { createSlice } from "@reduxjs/toolkit";
import { axiosInstance } from "../../lib/axios.js";
import { toast } from "react-toastify";

const authSlice = createSlice({
  name: "user",
  initialState: {
    loading: false,
    authUser: null,
    isAuthenticated: false,
    error: null,
    message: null,
  },
  reducers: {
    registerRequest(state) {
      state.loading = true;
      state.error = null;
    },
    registerSuccess(state, action) {
      state.loading = false;
      state.authUser = action.payload;
      state.isAuthenticated = true;
      state.error = null;
    },
    registerFailed(state, action) {
      state.loading = false;
      state.authUser = null;
      state.isAuthenticated = false;
      state.error = action.payload;
    },

    loginRequest(state) {
      state.loading = true;
      state.error = null;
    },
    loginSuccess(state, action) {
      state.loading = false;
      state.authUser = action.payload.user;
      state.isAuthenticated = true;
      state.error = null;
    },
    loginFailed(state, action) {
      state.loading = false;
      state.authUser = null;
      state.isAuthenticated = false;
      state.error = action.payload;
    },

    logoutSuccess(state, action) {
      state.loading = false;
      state.authUser = null;
      state.isAuthenticated = false;
      state.message = action.payload;
      state.error = null;
    },
    logoutFailed(state, action) {
      state.loading = false;
      state.error = action.payload;
    },

    loadUserRequest(state) {
      state.loading = true;
      state.error = null;
    },
    loadUserSuccess(state, action) {
      state.loading = false;
      state.authUser = action.payload;
      state.isAuthenticated = true;
      state.error = null;
    },
    loadUserFailed(state, action) {
      state.loading = false;
      state.authUser = null;
      state.isAuthenticated = false;
      state.error = action.payload;
    },

    clearAuthErrors(state) {
      state.error = null;
    },
  },
});

// ===================== Async Actions =====================

// Register
export const registerUser = (userData) => async (dispatch) => {
  dispatch(authSlice.actions.registerRequest());
  try {
    const { data } = await axiosInstance.post("/user/register", userData, {
      withCredentials: true,
    });
    toast.success(data.message || "Account created successfully");
    dispatch(authSlice.actions.registerSuccess(data.user));
    dispatch(authSlice.actions.clearAuthErrors());
  } catch (error) {
    toast.error(error.response?.data?.message || "Registration failed!");
    dispatch(
      authSlice.actions.registerFailed(error.response?.data?.message || "Registration failed!")
    );
  }
};

// Login
export const loginUser = (credentials) => async (dispatch) => {
  dispatch(authSlice.actions.loginRequest());
  try {
    const { data } = await axiosInstance.post("/user/login", credentials, {
      withCredentials: true,
    });
    toast.success(data.message || "Login successful");
    dispatch(authSlice.actions.loginSuccess(data.user));
    dispatch(authSlice.actions.clearAuthErrors());
  } catch (error) {
    toast.error(error.response?.data?.message || "Login failed!");
    dispatch(
      authSlice.actions.loginFailed(error.response?.data?.message || "Login failed!")
    );
  }
};

// Logout
export const logoutUser = () => async (dispatch) => {
  try {
    const { data } = await axiosInstance.get("/user/logout", {
      withCredentials: true,
    });
    toast.success(data.message || "Logout successful");
    dispatch(authSlice.actions.logoutSuccess(data.message));
    dispatch(authSlice.actions.clearAuthErrors());
  } catch (error) {
    toast.error(error.response?.data?.message || "Logout failed!");
    dispatch(
      authSlice.actions.logoutFailed(error.response?.data?.message || "Logout failed!")
    );
  }
};

// Get Current User
export const getCurrentUser = () => async (dispatch) => {
  dispatch(authSlice.actions.loadUserRequest());
  try {
    const { data } = await axiosInstance.get("/user/me");
    dispatch(authSlice.actions.loadUserSuccess(data.user));
    dispatch(authSlice.actions.clearAuthErrors());
  } catch (error) {
    dispatch(authSlice.actions.loadUserFailed(error.response?.data?.message || null));
  }
};

export const clearAllAuthErrors = () => (dispatch) => {
  dispatch(authSlice.actions.clearAuthErrors());
};

export default authSlice.reducer;
