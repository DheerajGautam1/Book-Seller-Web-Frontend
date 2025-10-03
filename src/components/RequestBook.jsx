import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Loader2, ArrowLeft } from "lucide-react";
import { getAllRequests } from "../store/Slice/requestSlice";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const RequestBook = () => {
  const dispatch = useDispatch();
  const { loading, requests = [] } = useSelector(
    (state) => state.requests || {}
  );

  useEffect(() => {
    dispatch(getAllRequests());
  }, [dispatch]);

  if (loading) {
    return (
      <div className="min-h-[50vh] flex items-center justify-center">
        <Loader2 className="animate-spin h-10 w-10 text-indigo-500" />
      </div>
    );
  }

  return (
    <div className="px-4 py-8 max-w-6xl mx-auto mt-24">
      {/* Back to Home */}
      <div className="mb-4">
        <Link
          to="/"
          className="flex items-center gap-2 text-indigo-400 hover:text-indigo-600 font-medium transition"
        >
          <ArrowLeft className="h-5 w-5" />
          Back to Home
        </Link>
      </div>

      {/* Heading */}
      <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold mb-10 text-center bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-pink-500 to-red-400 drop-shadow-lg">
        📩 All Book Requests
      </h1>

      {/* Empty State */}
      {requests.length === 0 ? (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center text-gray-400 text-base sm:text-lg italic"
        >
          No requests found 🚫
        </motion.p>
      ) : (
        <div className="space-y-4 sm:space-y-5">
          {requests.map((req, index) => {
            const book = req.book;

            return (
              <motion.div
                key={req._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.4 }}
                className="relative bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl shadow-2xl p-4 sm:p-5 hover:scale-[1.02] transition-transform"
              >
                {/* Left Decorative Border */}
                <div className="absolute left-0 top-0 h-full w-1 rounded-l-2xl bg-gradient-to-b from-purple-500 via-pink-500 to-red-500"></div>

                {/* Book Details */}
                {book ? (
                  <div className="mb-3">
                    <h2 className="text-lg sm:text-xl font-bold text-white mb-1">
                      📚 {book.title}
                    </h2>
                    <p className="text-gray-300 text-sm">
                      ✍️ Author: <span className="text-white">{book.author}</span>
                    </p>
                    <p className="text-gray-300 text-sm">
                      💰 Price:{" "}
                      <span className="text-green-400 font-semibold">
                        ₹{book.price ?? book.Prize}
                      </span>
                    </p>
                  </div>
                ) : (
                  <p className="text-sm text-gray-400 italic">
                    Book details not found ❌
                  </p>
                )}

                {/* Request Message */}
                <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white p-3 sm:p-4 rounded-xl shadow-inner">
                  <p className="text-sm sm:text-base font-medium">💬 {req.message}</p>
                </div>

                {/* Date */}
                <p className="text-xs sm:text-sm text-gray-400 mt-2 text-right">
                  🕒 {new Date(req.createdAt).toLocaleString()}
                </p>
              </motion.div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default RequestBook;
