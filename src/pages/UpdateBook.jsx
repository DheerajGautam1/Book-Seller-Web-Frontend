import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { motion, AnimatePresence } from "framer-motion";
import { getUserBooks, updateBook } from "../store/Slice/bookSlice";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const UpdateBooks = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { books, loading, error } = useSelector((state) => state.books);

  const [editingBook, setEditingBook] = useState(null);
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [condition, setCondition] = useState("");
  const [prize, setPrize] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    dispatch(getUserBooks());
  }, [dispatch]);

  const handleFileChange = (e) => setImage(e.target.files[0]);

  const handleEdit = (book) => {
    if (!book) return;
    setEditingBook(book);
    setTitle(book.title || "");
    setAuthor(book.author || "");
    setCondition(book.condition || "");
    setPrize(book.Prize || "");
    setDescription(book.description || "");
    setShowForm(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title || !author || !condition || !prize || !description) {
      toast.error("Please fill all fields");
      return;
    }
    if (!editingBook?._id) return toast.error("No book selected for update");

    const formData = new FormData();
    formData.append("title", title);
    formData.append("author", author);
    formData.append("condition", condition);
    formData.append("Prize", prize);
    formData.append("description", description);
    if (image) formData.append("image", image);

    await dispatch(updateBook({ id: editingBook._id, formData }));
    setShowForm(false);
    setEditingBook(null);
    setTitle("");
    setAuthor("");
    setCondition("");
    setPrize("");
    setDescription("");
    setImage(null);
  };

  return (
    <div className="p-6 max-w-7xl mx-auto mt-24">
      <h1 className="text-4xl font-extrabold mb-10 text-center bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 bg-clip-text text-transparent drop-shadow-md">
        📚 Your Book Collection
      </h1>

      <div className="text-center mb-6">
        <button
          onClick={() => navigate("/")}
          className="px-6 py-2 bg-gray-100 text-gray-700 rounded-full shadow-md hover:bg-gray-200 transition"
        >
          &larr; Back to Home
        </button>
      </div>

      {loading && <p className="text-center text-blue-600 animate-pulse">Loading books...</p>}
      {error && <p className="text-center text-red-600">{error}</p>}
      {!loading && books.length === 0 && <p className="text-center text-gray-500">No books found.</p>}

      {/* Books Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {books.map((book) => (
          <motion.div
            key={book._id}
            whileHover={{ scale: 1.05, rotate: 1 }}
            className="relative bg-white/90 backdrop-blur-lg rounded-3xl shadow-2xl overflow-hidden border border-purple-200 hover:shadow-purple-500/40 transition-all duration-300"
          >
            {book.image?.url ? (
              <img src={book.image.url} alt={book.title} className="w-full h-56 object-cover" />
            ) : (
              <div className="w-full h-56 bg-gray-200 flex items-center justify-center text-gray-400">
                No Image
              </div>
            )}
            <div className="p-5 space-y-2">
              <h2 className="text-xl font-bold text-gray-900">{book.title}</h2>
              <p className="text-gray-600">✍ Author: {book.author}</p>
              <p className="text-gray-600">📖 Condition: {book.condition}</p>
              <p className="text-pink-600 font-semibold">💲 {book.Prize}</p>
              <p className="text-gray-700 line-clamp-2">{book.description}</p>
            </div>
            <button
              onClick={() => handleEdit(book)}
              className="absolute top-4 right-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white px-4 py-2 rounded-full shadow-lg hover:scale-105 transition"
            >
              ✏ Edit
            </button>
          </motion.div>
        ))}
      </div>

      {/* Edit Form Modal */}
      <AnimatePresence>
        {showForm && editingBook && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4"
          >
            <motion.div
              initial={{ y: -60, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -60, opacity: 0 }}
              transition={{ duration: 0.4 }}
              className="bg-white/95 rounded-3xl shadow-3xl w-full max-w-md p-8 relative"
            >
              <h2 className="text-3xl font-extrabold text-center mb-6 bg-gradient-to-r from-indigo-500 to-pink-500 bg-clip-text text-transparent">
                ✨ Update Book
              </h2>

              <form onSubmit={handleSubmit} className="space-y-5">
                <input type="text" placeholder="Book Title" value={title} onChange={(e) => setTitle(e.target.value)} className="w-full border border-gray-300 p-3 rounded-xl focus:ring-2 focus:ring-purple-500 outline-none shadow-sm" />
                <input type="text" placeholder="Author Name" value={author} onChange={(e) => setAuthor(e.target.value)} className="w-full border border-gray-300 p-3 rounded-xl focus:ring-2 focus:ring-purple-500 outline-none shadow-sm" />
                <input type="text" placeholder="Condition" value={condition} onChange={(e) => setCondition(e.target.value)} className="w-full border border-gray-300 p-3 rounded-xl focus:ring-2 focus:ring-purple-500 outline-none shadow-sm" />
                <input type="number" placeholder="Price" value={prize} onChange={(e) => setPrize(e.target.value)} className="w-full border border-gray-300 p-3 rounded-xl focus:ring-2 focus:ring-purple-500 outline-none shadow-sm" />
                <textarea placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} className="w-full border border-gray-300 p-3 rounded-xl focus:ring-2 focus:ring-purple-500 outline-none shadow-sm h-24 resize-none" />
                <input type="file" accept="image/*" onChange={handleFileChange} className="w-full border border-gray-300 p-2 rounded-xl" />

                <div className="flex flex-col sm:flex-row justify-between gap-3 mt-6">
                  <button type="submit" disabled={loading} className="flex-1 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl shadow-lg hover:scale-105 transition">
                    {loading ? "Updating..." : "Update"}
                  </button>
                  <button type="button" onClick={() => setShowForm(false)} className="flex-1 py-3 bg-gray-100 text-gray-700 rounded-xl shadow hover:bg-gray-200 transition">
                    Cancel
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default UpdateBooks;
