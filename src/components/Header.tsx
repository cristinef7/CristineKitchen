import React, { useState } from "react";
import { Menu, X } from "lucide-react";
import { Link } from "react-router-dom";

const Header: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-[#f54ca9] text-white shadow-md relative h-14">
      {/* Top Bar */}
      <div className="max-w-6xl mx-auto px-6 py-6 flex items-center justify-between relative">
        {/* Empty left space to help center the title */}
        <div className="w-8 md:w-12" />

        {/* Centered Title */}
        <h1 className="sm:text-2xl md:text-3xl lg:text-4xl font-bold absolute left-1/2 transform -translate-x-1/2 hover:text-[#ffd6ea]">
          Cristine's Kitchen
        </h1>

        {/* Mobile Menu Button (Right) */}
        <button
          className="md:hidden text-white hover:text-[#ffd6ea] z-20"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>

        {/* Desktop Menu
        <ul className="hidden md:flex gap-8 font-semibold">
          <li>
            <Link to="/" className="hover:text-[#ffd6ea]">Home</Link>
          </li>
          <li>
            <Link to="/favorites" className="hover:text-[#ffd6ea]">Favorites</Link>
          </li>
          <li>
            <Link to="/about" className="hover:text-[#ffd6ea]">About</Link>
          </li>
        </ul> */}
      </div>

      {/* Mobile Dropdown Menu */}
      {isOpen && (
        <div className="md:hidden bg-[#ff74b9] px-6 pb-4 space-y-2 text-center shadow-md">
          <Link
            to="/"
            className="block py-2 font-medium hover:text-[#fff3f9]"
            onClick={() => setIsOpen(false)}
          >
            Home
          </Link>
          <Link
            to="/favorites"
            className="block py-2 font-medium hover:text-[#fff3f9]"
            onClick={() => setIsOpen(false)}
          >
            Favorites
          </Link>
          <Link
            to="/about"
            className="block py-2 font-medium hover:text-[#fff3f9]"
            onClick={() => setIsOpen(false)}
          >
            About
          </Link>
        </div>
      )}
    </nav>
  );
};

export default Header;
