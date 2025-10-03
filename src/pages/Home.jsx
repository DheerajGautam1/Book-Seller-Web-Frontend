import React from "react";
import { useSelector } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";

const Home = () => {
  const { isAuthenticated, authUser } = useSelector((state) => state.user);
  const navigate = useNavigate();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  const gotoBooks = () => {
    navigate("/books");
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-tr from-indigo-900 via-purple-800 to-pink-700 text-white px-4">
      {/* Hero Section */}
      <div className="relative text-center py-12 px-8 w-full max-w-4xl bg-white/10 backdrop-blur-lg rounded-3xl shadow-2xl border border-white/20 transform hover:scale-105 transition duration-500">
        {/* Glow Effect */}
        <div className="absolute inset-0 rounded-3xl bg-gradient-to-tr from-pink-500/20 via-purple-500/20 to-indigo-500/20 blur-3xl -z-10"></div>

        {/* Title */}
        <h1 className="text-5xl sm:text-6xl font-extrabold bg-gradient-to-r from-pink-400 via-purple-300 to-indigo-400 text-transparent bg-clip-text drop-shadow-lg animate-pulse">
          📚 Book Seller
        </h1>

        {/* Subtitle */}
        <p className="mt-6 text-lg sm:text-xl text-indigo-200">
          Swap, Sell & Discover your favorite books with{" "}
          <span className="font-bold text-pink-300">a 3D touch</span>.
        </p>

        {/* Welcome Message */}
        <p className="mt-8 text-base sm:text-lg text-gray-200 italic">
          Welcome back, <span className="font-semibold text-white">{authUser?.email || "Book Lover"}</span>!
        </p>

        {/* Call to Action Button */}
        <div className="mt-10">
          <button className="px-8 py-3 bg-gradient-to-r from-indigo-500 to-pink-500 rounded-full text-lg font-semibold shadow-lg hover:shadow-2xl hover:scale-105 transition duration-300"
          onClick={gotoBooks}>
            Start Exploring
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;
