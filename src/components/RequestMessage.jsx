// RequestMessage.jsx
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { sendRequest } from "../store/Slice/requestSlice";
import { motion } from "framer-motion";

const RequestMessage = ({ book, onClose }) => {
  const dispatch = useDispatch();
  const [message, setMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!message) return alert("Message is required!");

    dispatch(sendRequest({ message, book: book._id }));
    setMessage("");
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-md">
      <motion.div
        initial={{ scale: 0.8, opacity: 0, y: 50 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.8, opacity: 0, y: 50 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="relative bg-white/10 backdrop-blur-2xl border border-white/20 shadow-2xl rounded-2xl w-full max-w-md p-8 text-white"
        style={{
          boxShadow:
            "0 8px 32px rgba(0,0,0,0.4), inset 0 0 20px rgba(99,102,241,0.3)",
        }}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-300 hover:text-white text-xl"
        >
          ✖
        </button>

        <h2 className="text-2xl font-extrabold mb-6 text-center">
          📖 Request Book
        </h2>
        <p className="text-center text-indigo-300 font-semibold mb-4">
          {book.title}
        </p>

        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          <textarea
            className="w-full p-4 rounded-xl bg-white/10 text-white placeholder-gray-300 border border-white/20 focus:ring-2 focus:ring-indigo-500 focus:outline-none resize-none shadow-inner"
            rows={4}
            placeholder="Write your message..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />

          <div className="flex justify-between gap-4">
            <motion.button
              type="button"
              onClick={onClose}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex-1 py-3 rounded-xl bg-gradient-to-r from-gray-600 to-gray-800 text-white font-semibold shadow-lg hover:shadow-gray-500/40 transition"
            >
              Cancel
            </motion.button>

            <motion.button
              type="submit"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex-1 py-3 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-bold shadow-lg hover:shadow-indigo-500/40 transition"
            >
              🚀 Send
            </motion.button>
          </div>
        </form>
      </motion.div>
    </div>
  );
};

export default RequestMessage;