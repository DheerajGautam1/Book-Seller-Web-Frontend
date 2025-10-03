import React, { useState } from "react";
import {
  LogOut,
  BookAIcon,
  Book,
  Edit3,
  MessageCircle,
  Menu,
  X,
  Home,
} from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { logoutUser } from "../store/Slice/userSlice.js";

const Navbar = () => {
  const { isAuthenticated } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {
    dispatch(logoutUser());
    setMenuOpen(false);
  };

  return (
    <header className="fixed top-0 w-full z-50 bg-white/80 backdrop-blur-lg border-b border-gray-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link
          to={"/"}
          className="flex items-center gap-2 hover:opacity-80 transition"
          onClick={() => setMenuOpen(false)}
        >
          <div className="w-8 h-8 rounded-lg bg-pink-100 flex items-center justify-center">
            <BookAIcon className="w-4 h-4 text-pink-600" />
          </div>
          <h1 className="text-md font-bold text-gray-800">
            Book Seller.com
          </h1>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-2">
          {isAuthenticated ? (
            <>
              <Link
                to="/add-books"
                className="flex items-center gap-1 px-3 py-1 rounded-md text-sm font-medium text-green-700 hover:bg-green-100 transition"
              >
                <Book className="w-4 h-4" /> Add Book
              </Link>
              <Link
                to="/books"
                className="flex items-center gap-1 px-3 py-1 rounded-md text-sm font-medium text-green-700 hover:bg-green-100 transition"
              >
                <BookAIcon className="w-4 h-4" /> Books
              </Link>
              <Link
                to="/update-books"
                className="flex items-center gap-1 px-3 py-1 rounded-md text-sm font-medium text-blue-700 hover:bg-blue-100 transition"
              >
                <Edit3 className="w-4 h-4" /> Update
              </Link>
              <Link
                to="/request-book"
                className="flex items-center gap-1 px-3 py-1 rounded-md text-sm font-medium text-purple-700 hover:bg-purple-100 transition"
              >
                <MessageCircle className="w-4 h-4" /> Requests
              </Link>
              <Link
                to="/"
                className="flex items-center gap-1 px-3 py-1 rounded-md text-sm font-medium text-purple-700 hover:bg-purple-100 transition"
              >
                <Home className="w-4 h-4" /> Home
              </Link>
              <button
                onClick={handleLogout}
                className="flex items-center gap-1 px-3 py-1 rounded-md text-sm font-medium text-red-700 hover:bg-red-100 transition"
              >
                <LogOut className="w-4 h-4" /> Logout
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="px-3 py-1 rounded-md text-sm font-medium text-blue-700 hover:bg-blue-100 transition"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="px-3 py-1 rounded-md text-sm font-medium text-purple-700 hover:bg-purple-100 transition"
              >
                Register
              </Link>
            </>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden flex items-center justify-center p-2 rounded-md hover:bg-gray-200 transition"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Dropdown Menu */}
      {menuOpen && (
        <div className="md:hidden fixed top-16 right-0 w-56 bg-white/70 backdrop-blur-md border border-gray-200 rounded-l-xl shadow-lg z-50 animate-slideRight">
          <div className="flex flex-col gap-2 p-3">
            {isAuthenticated ? (
              <>
                <Link
                  to="/add-books"
                  className="flex items-center gap-2 text-green-700 hover:bg-green-50 px-2 py-1 rounded-md text-sm"
                  onClick={() => setMenuOpen(false)}
                >
                  <Book className="w-4 h-4" /> Add Book
                </Link>

                <Link
                  to="/books"
                  className="flex items-center gap-2 text-green-700 hover:bg-green-50 px-2 py-1 rounded-md text-sm"
                  onClick={() => setMenuOpen(false)}
                >
                  <Book className="w-4 h-4" /> Books
                </Link>

                <Link
                  to="/update-books"
                  className="flex items-center gap-2 text-blue-700 hover:bg-blue-50 px-2 py-1 rounded-md text-sm"
                  onClick={() => setMenuOpen(false)}
                >
                  <Edit3 className="w-4 h-4" /> Update
                </Link>
                <Link
                  to="/request-book"
                  className="flex items-center gap-2 text-purple-700 hover:bg-purple-50 px-2 py-1 rounded-md text-sm"
                  onClick={() => setMenuOpen(false)}
                >
                  <MessageCircle className="w-4 h-4" /> Requests
                </Link>
                <Link
                  to="/"
                  className="flex items-center gap-2 text-purple-700 hover:bg-purple-50 px-2 py-1 rounded-md text-sm"
                  onClick={() => setMenuOpen(false)}
                >
                  <Home className="w-4 h-4" /> Home
                </Link>
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-2 text-red-700 hover:bg-red-50 px-2 py-1 rounded-md text-sm"
                >
                  <LogOut className="w-4 h-4" /> Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="text-blue-700 hover:bg-blue-50 px-2 py-1 rounded-md text-sm"
                  onClick={() => setMenuOpen(false)}
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="text-purple-700 hover:bg-purple-50 px-2 py-1 rounded-md text-sm"
                  onClick={() => setMenuOpen(false)}
                >
                  Register
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
