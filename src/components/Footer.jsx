import React from "react";
import { BookAIcon, Instagram, Twitter, Linkedin, Mail } from "lucide-react";

const Footer = () => {
  return (
    <footer className="w-full mt-12 bg-black/40 backdrop-blur-lg border-t border-white/20 shadow-inner">
      <div className="max-w-6xl mx-auto px-4 py-8 flex flex-col md:flex-row justify-between items-center gap-6">
        {/* Logo & Info */}
        <div className="flex flex-col items-center md:items-start gap-2">
          <div className="flex items-center gap-2 transform hover:scale-105 transition-transform duration-300">
            <div className="w-10 h-10 rounded-lg bg-pink-100 flex items-center justify-center shadow-lg">
              <BookAIcon className="w-5 h-5 text-pink-600" />
            </div>
            <h1 className="text-white font-bold text-lg">Book Seller.com</h1>
          </div>
          <p className="text-gray-300 text-sm text-center md:text-left">
            &copy; {new Date().getFullYear()} All rights reserved.
          </p>
        </div>

        {/* Quick Links */}
        <div className="flex flex-col items-center md:items-end gap-2">
          <h2 className="text-white font-semibold mb-1">Quick Links</h2>
          <div className="flex flex-col md:flex-row gap-3">
            <a
              href="/books"
              className="text-gray-300 text-sm hover:text-white transition hover:scale-105"
            >
              Books
            </a>
            <a
              href="/add-books"
              className="text-gray-300 text-sm hover:text-white transition hover:scale-105"
            >
              Add Book
            </a>
            <a
              href="/request-book"
              className="text-gray-300 text-sm hover:text-white transition hover:scale-105"
            >
              Requests
            </a>
          </div>
        </div>

        {/* Social Icons */}
        <div className="flex flex-col items-center md:items-end gap-2">
          <h2 className="text-white font-semibold mb-1">Follow Us</h2>
          <div className="flex gap-3">
            <a
              href="#"
              className="text-gray-300 hover:text-white transform hover:scale-110 transition-transform"
            >
              <Instagram className="w-5 h-5" />
            </a>
            <a
              href="#"
              className="text-gray-300 hover:text-white transform hover:scale-110 transition-transform"
            >
              <Twitter className="w-5 h-5" />
            </a>
            <a
              href="#"
              className="text-gray-300 hover:text-white transform hover:scale-110 transition-transform"
            >
              <Linkedin className="w-5 h-5" />
            </a>
            <a
              href="mailto:info@bookseller.com"
              className="text-gray-300 hover:text-white transform hover:scale-110 transition-transform"
            >
              <Mail className="w-5 h-5" />
            </a>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/20 mt-6 pt-4 text-center text-gray-400 text-xs">
        Made with ❤️ using React & TailwindCSS
      </div>
    </footer>
  );
};

export default Footer;
