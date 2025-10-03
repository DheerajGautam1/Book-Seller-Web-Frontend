import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllBooks } from "../store/Slice/bookSlice";
import { Loader2, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import RequestMessage from "./RequestMessage";

const Books = () => {
  const dispatch = useDispatch();
  const { books, loading } = useSelector((state) => state.books);
  const [selectedBook, setSelectedBook] = useState(null);
  const [showPopup, setShowPopup] = useState(false);
  const [showRequestForm, setShowRequestForm] = useState(false);

  useEffect(() => {
    dispatch(getAllBooks());
  }, [dispatch]);

  const getImage = (book) => {
    if (!book) return "";
    if (book.image) {
      if (typeof book.image === "string") return book.image;
      if (book.image.url) return book.image.url;
    }
    return "";
  };

  const getPriceNumber = (book) => {
    const p = book?.Prize;
    const num = Number(p);
    return isNaN(num) ? 0 : num;
  };

  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <Loader2 className="animate-spin h-10 w-10 text-white" />
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-24 px-4 bg-gradient-to-b from-gray-900 via-black to-gray-900">
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {books && books.length ? (
          books.map((book) => (
            <motion.article
              key={book._id}
              whileHover={{
                scale: 1.05,
                rotateX: 6,
                rotateY: 6,
                boxShadow: "0 20px 40px rgba(0,0,0,0.5)",
              }}
              className="bg-white/10 backdrop-blur-md border border-white/10 rounded-2xl shadow-lg p-4 cursor-pointer transition-transform flex flex-col items-center"
            >
              <div className="w-32 h-44 bg-gray-200 rounded-xl overflow-hidden flex items-center justify-center">
                {getImage(book) ? (
                  <img
                    src={getImage(book)}
                    alt={book.title}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="text-gray-400 text-sm">No Image</div>
                )}
              </div>

              <h3 className="mt-3 text-lg font-semibold text-white text-center truncate w-full">
                {book.title}
              </h3>
              <p className="text-gray-300 text-xs text-center truncate w-full">
                by {book.author}
              </p>
              <p className="text-indigo-400 font-bold text-sm mt-1">
                ₹{getPriceNumber(book)}
              </p>

              <button
                onClick={() => {
                  setSelectedBook(book);
                  setShowPopup(true);
                }}
                className="mt-2 w-full bg-gradient-to-r from-purple-600 to-indigo-700 hover:from-purple-700 hover:to-indigo-800 text-white text-sm px-3 py-1.5 rounded-lg shadow-md transition-transform hover:scale-105"
              >
                👁 View
              </button>
            </motion.article>
          ))
        ) : (
          <div className="col-span-full text-center text-gray-300 py-20 text-sm">
            No books available.
          </div>
        )}
      </div>

      {/* Book Details Popup */}
      <AnimatePresence>
        {showPopup && selectedBook && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 flex items-center justify-center bg-black/70 z-50 p-4"
          >
            <motion.div
              initial={{ scale: 0.8, y: -20, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="bg-white/90 backdrop-blur-md rounded-2xl shadow-2xl p-6 max-w-xl w-full relative border border-gray-200"
            >
              {/* Close Button */}
              <button
                onClick={() => setShowPopup(false)}
                className="absolute top-3 right-3 text-gray-600 hover:text-red-500"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="flex flex-col md:flex-row gap-4">
                <div className="w-full md:w-1/3 h-40 md:h-48 bg-gray-200 rounded-xl overflow-hidden">
                  {getImage(selectedBook) ? (
                    <img
                      src={getImage(selectedBook)}
                      alt={selectedBook.title}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="text-gray-400 flex items-center justify-center h-full text-sm">
                      No Image
                    </div>
                  )}
                </div>

                <div className="flex-1 space-y-2">
                  <h2 className="text-xl md:text-2xl font-bold text-gray-800 truncate">
                    {selectedBook.title}
                  </h2>
                  <p className="text-gray-600 italic text-sm">
                    by {selectedBook.author}
                  </p>
                  <p className="text-indigo-600 font-bold text-base">
                    ₹{getPriceNumber(selectedBook)}
                  </p>
                  <p className="text-gray-700 text-sm leading-relaxed line-clamp-6">
                    {selectedBook.description || "No description provided."}
                  </p>

                  <button
                    onClick={() => {
                      setShowPopup(false);
                      setShowRequestForm(true);
                    }}
                    className="mt-3 px-4 py-2 rounded-lg bg-gradient-to-r from-green-500 to-emerald-600 text-white text-sm font-medium shadow hover:scale-105 transition-transform w-full md:w-auto"
                  >
                    📩 Request Book
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Request Message Form */}
      {showRequestForm && selectedBook && (
        <RequestMessage
          book={selectedBook}
          onClose={() => setShowRequestForm(false)}
        />
      )}
    </div>
  );
};

export default Books;
