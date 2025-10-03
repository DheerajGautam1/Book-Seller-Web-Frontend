import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Loader2, Mail, Lock, Link } from "lucide-react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../store/Slice/userSlice.js";

const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { isAuthenticated, loading, error } = useSelector((state) => state.user);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  // handle input
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // handle register
  const handleSubmit = (e) => {
    e.preventDefault();
    const { email, password } = formData;

    if (!email || !password) {
      toast.error("Please fill all fields");
      return;
    }

    dispatch(registerUser({ email, password }));
  };

  // redirect after register success
  useEffect(() => {
    if (isAuthenticated) {
      navigate("/");
    }
  }, [isAuthenticated, navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 px-4">
      <div className="relative bg-white/10 backdrop-blur-xl p-8 sm:p-10 rounded-3xl shadow-2xl w-full max-w-md border border-white/20">
        {/* Glow Effect */}
        <div className="absolute inset-0 -z-10 blur-3xl bg-gradient-to-r from-pink-500/30 via-purple-500/30 to-indigo-500/30 rounded-3xl"></div>

        <h1 className="text-4xl font-extrabold text-center bg-gradient-to-r from-pink-300 via-purple-200 to-indigo-300 text-transparent bg-clip-text drop-shadow-lg">
          Create Account 🚀
        </h1>
        <p className="text-center text-gray-200 mt-3 mb-6">
          Sign up to get started on <span className="font-semibold">Book Seller</span>
        </p>

        {/* Register Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Email */}
          <div className="flex items-center bg-white/20 p-3 rounded-xl focus-within:ring-2 focus-within:ring-indigo-400 transition">
            <Mail className="text-white mr-3 w-5 h-5" />
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
              className="w-full bg-transparent outline-none text-white placeholder-gray-300"
            />
          </div>

          {/* Password */}
          <div className="flex items-center bg-white/20 p-3 rounded-xl focus-within:ring-2 focus-within:ring-indigo-400 transition">
            <Lock className="text-white mr-3 w-5 h-5" />
            <input
              type="password"
              name="password"
              placeholder="Enter your password"
              value={formData.password}
              onChange={handleChange}
              className="w-full bg-transparent outline-none text-white placeholder-gray-300"
            />
          </div>

          {/* Error Message */}
          {error && (
            <p className="text-red-400 text-center text-sm">{error}</p>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full flex items-center justify-center bg-gradient-to-r from-indigo-500 to-pink-500 hover:from-indigo-600 hover:to-pink-600 text-white font-semibold py-3 rounded-xl shadow-lg hover:shadow-2xl transition duration-300 disabled:opacity-50"
          >
            {loading ? (
              <Loader2 className="animate-spin h-5 w-5" />
            ) : (
              "Register"
            )}
          </button>
        </form>

        {/* Login Redirect */}
        <p className="text-center text-gray-300 mt-6 text-sm">
          Already have an account?{" "}
          <Link to="/login" className="text-pink-300 font-semibold hover:underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
