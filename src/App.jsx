import React, { useEffect } from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch } from "react-redux";

// Pages
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import AddBooks from "./pages/AddBooks";

// Redux Actions
import { getCurrentUser } from "./store/Slice/userSlice.js";
import Navbar from "./components/Navbar";
import UpdateBooks from "./pages/UpdateBook.jsx";
import RequestBook from "./components/RequestBook.jsx";
import Books from "./components/Books.jsx";
import Footer from "./components/Footer.jsx";

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCurrentUser()); 
  }, [dispatch]);

  return (
    <div>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/add-books" element={<AddBooks />} />
          <Route path="/update-books" element={<UpdateBooks />} />
          <Route path="/request-book" element={<RequestBook />} />
          <Route path="/books" element={<Books />} />
        </Routes>
        <Footer />
        <ToastContainer position="bottom-right" theme="dark" />
      </Router>
    </div>
  );
};

export default App;
