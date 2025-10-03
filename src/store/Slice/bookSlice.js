import { createSlice } from "@reduxjs/toolkit";
import { axiosInstance } from "../../lib/axios.js";
import { toast } from "react-toastify";

const bookSlice = createSlice({
  name: "books",
  initialState: {
    books: [],
    loading: false,
    error: null,
    message: null,
  },
  reducers: {
    addBookRequest(state) { state.loading = true; state.error = null; },
    addBookSuccess(state, action) { state.loading = false; state.books = [action.payload, ...state.books]; state.message = "Book added successfully"; },
    addBookFailed(state, action) { state.loading = false; state.error = action.payload; },

    getBooksRequest(state) { state.loading = true; state.error = null; },
    getBooksSuccess(state, action) { state.loading = false; state.books = action.payload; },
    getBooksFailed(state, action) { state.loading = false; state.error = action.payload; },

    deleteBookRequest(state) { state.loading = true; state.error = null; },
    deleteBookSuccess(state, action) { state.loading = false; state.books = state.books.filter(b => b._id !== action.payload); state.message = "Book deleted successfully"; },
    deleteBookFailed(state, action) { state.loading = false; state.error = action.payload; },

    updateBookRequest(state) { state.loading = true; state.error = null; },
    updateBookSuccess(state, action) {
      state.loading = false;
      if (action.payload?._id) {
        const index = state.books.findIndex(b => b?._id === action.payload._id);
        if (index !== -1) state.books[index] = action.payload;
      }
      state.message = "Book updated successfully";
    },
    updateBookFailed(state, action) { state.loading = false; state.error = action.payload; },

    clearBookErrors(state) { state.error = null; },
  },
});

export const bookActions = bookSlice.actions;
export default bookSlice.reducer;

// ============ Async Thunks ============

// Add Book
export const addBook = (formData) => async dispatch => {
  dispatch(bookActions.addBookRequest());
  try {
    const { data } = await axiosInstance.post("/book/add", formData, {
      headers: { "Content-Type": "multipart/form-data" },
      withCredentials: true,
    });
    dispatch(bookActions.addBookSuccess(data.book));
    toast.success(data.message || "Book added successfully");
  } catch (error) {
    dispatch(bookActions.addBookFailed(error.response?.data?.message || "Failed to add book"));
    toast.error(error.response?.data?.message || "Failed to add book");
  }
};

// Get All Books (all users)
export const getAllBooks = () => async dispatch => {
  dispatch(bookActions.getBooksRequest());
  try {
    const { data } = await axiosInstance.get("/book/books");
    dispatch(bookActions.getBooksSuccess(data.books));
  } catch (error) {
    dispatch(bookActions.getBooksFailed(error.response?.data?.message || "Failed to fetch books"));
  }
};

// Get Books of Logged-in User Only
export const getUserBooks = () => async dispatch => {
  dispatch(bookActions.getBooksRequest());
  try {
    const { data } = await axiosInstance.get("/book/userbooks");
    dispatch(bookActions.getBooksSuccess(data.books));
  } catch (error) {
    dispatch(bookActions.getBooksFailed(error.response?.data?.message || "Failed to fetch user's books"));
  }
};

// Delete Book
export const deleteBook = (id) => async dispatch => {
  dispatch(bookActions.deleteBookRequest());
  try {
    const { data } = await axiosInstance.delete(`/book/delete/${id}`, { withCredentials: true });
    dispatch(bookActions.deleteBookSuccess(id));
    toast.success(data.message || "Book deleted successfully");
  } catch (error) {
    dispatch(bookActions.deleteBookFailed(error.response?.data?.message || "Failed to delete book"));
    toast.error(error.response?.data?.message || "Failed to delete book");
  }
};

// Update Book
export const updateBook = ({ id, formData }) => async dispatch => {
  dispatch(bookActions.updateBookRequest());
  try {
    const { data } = await axiosInstance.put(`/book/update/${id}`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
      withCredentials: true,
    });
    dispatch(bookActions.updateBookSuccess(data.book));
    toast.success(data.message || "Book updated successfully");
  } catch (error) {
    dispatch(bookActions.updateBookFailed(error.response?.data?.message || "Failed to update book"));
    toast.error(error.response?.data?.message || "Failed to update book");
  }
};
