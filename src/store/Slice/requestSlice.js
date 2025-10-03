import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { axiosInstance } from "../../lib/axios.js";
import { toast } from "react-toastify";

// ===================== Async Thunks =====================

// Send a message request
export const sendRequest = createAsyncThunk(
  "requests/requests",
  async ({ message, book }, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.post("/request/requests", { message, book });
      return data.request;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Failed to send request");
    }
  }
);

// Get all requests
export const getAllRequests = createAsyncThunk(
  "requests/getAllRequests",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.get("/request/getAllRequests");
      return data.requests;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Failed to fetch requests");
    }
  }
);

// ===================== Slice =====================
const requestSlice = createSlice({
  name: "requests",
  initialState: {
    loading: false,
    requests: [],
    error: null,
  },
  reducers: {
    clearRequestErrors(state) {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    // sendRequest
    builder
      .addCase(sendRequest.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(sendRequest.fulfilled, (state, action) => {
        state.loading = false;
        state.requests.unshift(action.payload); // latest message top pe dikhana
        toast.success("Message sent successfully");
      })
      .addCase(sendRequest.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        toast.error(action.payload);
      });

    // getAllRequests
    builder
      .addCase(getAllRequests.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllRequests.fulfilled, (state, action) => {
        state.loading = false;
        state.requests = action.payload;
      })
      .addCase(getAllRequests.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        toast.error(action.payload);
      });
  },
});

export const { clearRequestErrors } = requestSlice.actions;
export default requestSlice.reducer;
