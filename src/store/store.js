import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./Slice/userSlice";
import bookReducer from "./Slice/bookSlice";
import requestReducer from "./Slice/requestSlice";

const store = configureStore({
    reducer: {
       user: userReducer,
       books: bookReducer,
       requests: requestReducer,
    }
});

export default store;