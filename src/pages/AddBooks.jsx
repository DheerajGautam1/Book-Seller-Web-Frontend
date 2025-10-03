import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { motion, AnimatePresence } from "framer-motion";
import { addBook } from "../store/Slice/bookSlice";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AddBooks = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error } = useSelector((state) => state.books);

  const [showForm, setShowForm] = useState(true);
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [condition, setCondition] = useState("");
  const [prize, setPrize] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);

  const handleFileChange = (e) => setImage(e.target.files[0]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!title || !author || !condition || !prize || !description || !image) {
      toast.error("Please fill all fields including description and select an image.");
      return;
    }

    const formData = new FormData();
    formData.append("title", title);
    formData.append("author", author);
    formData.append("condition", condition);
    formData.append("Prize", prize);
    formData.append("description", description);
    formData.append("image", image);

    dispatch(addBook(formData));

    setTitle("");
    setAuthor("");
    setCondition("");
    setPrize("");
    setDescription("");
    setImage(null);
    setShowForm(false);
    navigate("/");
    toast.success("Book added successfully!");
  };

  const handleBack = () => {
    setShowForm(false);
    navigate("/");
  };

  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen px-4 py-6 bg-gradient-to-tr from-indigo-900 via-purple-800 to-pink-700">
      
      {/* Back Home Button */}
      <button
        onClick={handleBack}
        className="absolute top-20 left-4 px-3 py-1.5 text-sm rounded-lg bg-white/20 backdrop-blur-md text-white font-medium hover:bg-white/30 shadow-md transition z-50"
      >
        🔙 Back Home
      </button>

      <AnimatePresence>
        {showForm && (
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -15, scale: 0.95 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="relative w-full max-w-md bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-5 sm:p-6 shadow-[0_6px_20px_rgba(0,0,0,0.5)]"
          >
            {/* Glow Effect */}
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 opacity-20 blur-xl -z-10"></div>

            <h2 className="text-xl sm:text-2xl font-bold text-center text-transparent bg-clip-text bg-gradient-to-r from-pink-300 via-purple-200 to-indigo-300 mb-5">
              📚 Add a New Book
            </h2>

            <form onSubmit={handleSubmit} className="space-y-3 sm:space-y-4">
              <input
                type="text"
                placeholder="Book Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full p-2.5 text-sm rounded-lg bg-white/20 text-white placeholder-gray-300 focus:ring-2 focus:ring-pink-400 outline-none"
              />
              <input
                type="text"
                placeholder="Author Name"
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
                className="w-full p-2.5 text-sm rounded-lg bg-white/20 text-white placeholder-gray-300 focus:ring-2 focus:ring-indigo-400 outline-none"
              />

              {/* Condition Dropdown */}
              <select
                value={condition}
                onChange={(e) => setCondition(e.target.value)}
                className="w-full p-2.5 text-sm rounded-lg bg-white/20 text-white placeholder-gray-300 focus:ring-2 focus:ring-purple-400 outline-none"
              >
                <option value="" disabled>
                  Select Condition
                </option>
                <option value="new" className="text-black">New</option>
                <option value="good" className="text-black">Good</option>
                <option value="old" className="text-black">Old</option>
                <option value="damaged" className="text-black">Damaged</option>
              </select>

              <input
                type="number"
                placeholder="Price"
                value={prize}
                onChange={(e) => setPrize(e.target.value)}
                className="w-full p-2.5 text-sm rounded-lg bg-white/20 text-white placeholder-gray-300 focus:ring-2 focus:ring-green-400 outline-none"
              />
              <textarea
                placeholder="Write something about the book..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full p-2.5 text-sm rounded-lg bg-white/20 text-white placeholder-gray-300 focus:ring-2 focus:ring-pink-400 outline-none h-20 resize-none"
              />
              <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="w-full p-2.5 text-sm rounded-lg bg-white/20 text-white file:bg-pink-500 file:text-white file:rounded-md file:px-2 file:py-0.5 hover:file:bg-pink-600"
              />

              <button
                type="submit"
                disabled={loading}
                className="w-full py-2.5 text-sm rounded-lg bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-medium shadow-md hover:shadow-lg transition duration-300 transform hover:scale-105 disabled:opacity-50"
              >
                {loading ? "Adding..." : "Add Book"}
              </button>
            </form>

            {error && <p className="text-red-400 mt-3 text-center text-sm">{error}</p>}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AddBooks;
