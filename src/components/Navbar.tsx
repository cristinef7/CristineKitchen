import React, { useState } from "react";
import { Menu, X } from "lucide-react";
import { Link } from "react-router-dom";

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-[#f54ca9] text-white shadow-md">
      <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold hover:text-[#e61276]">Cristine's Kitchen</h1>

        {/* Desktop Menu */}
        <ul className="hidden md:flex gap-6">
          <li><Link to="/" className="hover:text-[#e61276]">Home</Link></li>
          <li><Link to="/favorites" className="hover:text-[#e61276]">Favorites</Link></li>
          <li><Link to="/about" className="hover:text-[#e61276]">About</Link></li>
        </ul>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Dropdown */}
      {isOpen && (
        <div className="md:hidden bg-orange-600 px-6 pb-4 space-y-2">
          <Link to="/" className="block hover:text-orange-200" onClick={() => setIsOpen(false)}>Home</Link>
          <Link to="/favorites" className="block hover:text-orange-200" onClick={() => setIsOpen(false)}>Favorites</Link>
          <Link to="/about" className="block hover:text-orange-200" onClick={() => setIsOpen(false)}>About</Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
