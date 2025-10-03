import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Loader2, Mail, Lock, Link } from "lucide-react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../store/Slice/userSlice.js";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { isAuthenticated, loading, error } = useSelector((state) => state.user);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.email || !formData.password) {
      toast.error("Please fill all the fields");
      return;
    }
    dispatch(loginUser(formData));
  };

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/");
    }
  }, [isAuthenticated, navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-700 via-indigo-800 to-black relative overflow-hidden px-4 sm:px-6 lg:px-8">
      
      {/* Floating 3D circles */}
      <div className="absolute top-10 left-5 sm:left-10 w-28 sm:w-40 h-28 sm:h-40 bg-purple-500 rounded-full mix-blend-multiply filter blur-2xl opacity-30 animate-pulse"></div>
      <div className="absolute bottom-10 right-5 sm:right-20 w-40 sm:w-60 h-40 sm:h-60 bg-indigo-500 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-bounce"></div>
      
      {/* Card */}
      <div className="relative bg-white/10 backdrop-blur-xl p-6 sm:p-8 lg:p-10 rounded-2xl sm:rounded-3xl shadow-[0_8px_32px_rgba(0,0,0,0.6)] w-full max-w-sm sm:max-w-md lg:max-w-lg border border-white/20 transform hover:scale-[1.02] transition duration-500">
        
        {/* Neon border glow */}
        <div className="absolute inset-0 rounded-2xl sm:rounded-3xl border-2 border-transparent bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 opacity-30 blur-xl"></div>

        <h1 className="relative text-3xl sm:text-4xl lg:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-indigo-400 text-center mb-3 sm:mb-4 drop-shadow-lg">
          Welcome Back 👋
        </h1>
        <p className="text-center text-gray-200 mb-6 sm:mb-8 relative text-sm sm:text-base">
          Sign in to your account
        </p>

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6 relative z-10">
          
          {/* Email */}
          <div className="flex items-center bg-white/20 px-3 sm:px-4 py-2 sm:py-3 rounded-xl sm:rounded-2xl shadow-inner transition focus-within:ring-2 focus-within:ring-pink-400">
            <Mail className="text-pink-300 mr-2 sm:mr-3 h-4 w-4 sm:h-5 sm:w-5" />
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
              className="w-full bg-transparent outline-none text-white placeholder-gray-300 text-sm sm:text-base"
            />
          </div>

          {/* Password */}
          <div className="flex items-center bg-white/20 px-3 sm:px-4 py-2 sm:py-3 rounded-xl sm:rounded-2xl shadow-inner transition focus-within:ring-2 focus-within:ring-indigo-400">
            <Lock className="text-indigo-300 mr-2 sm:mr-3 h-4 w-4 sm:h-5 sm:w-5" />
            <input
              type="password"
              name="password"
              placeholder="Enter your password"
              value={formData.password}
              onChange={handleChange}
              className="w-full bg-transparent outline-none text-white placeholder-gray-300 text-sm sm:text-base"
            />
          </div>

          {/* Error */}
          {error && <p className="text-red-400 text-center text-xs sm:text-sm">{error}</p>}

          {/* Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full relative flex items-center justify-center bg-gradient-to-r from-pink-500 to-indigo-500 hover:from-pink-600 hover:to-indigo-600 text-white font-bold py-2 sm:py-3 rounded-xl sm:rounded-2xl shadow-lg hover:shadow-[0_0_15px_rgba(236,72,153,0.8)] transition duration-300 disabled:opacity-50 text-sm sm:text-base"
          >
            {loading ? (
              <Loader2 className="animate-spin h-4 w-4 sm:h-5 sm:w-5" />
            ) : (
              "Login"
            )}
          </button>
        </form>

        <p className="text-center text-gray-300 mt-6 sm:mt-8 text-xs sm:text-sm relative z-10">
          Don't have an account?{" "}
          <Link
            to="/register"
            className="text-pink-300 font-semibold hover:underline"
          >
            Register
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
