import { Link, useLocation } from "react-router-dom";

const Sidebar = () => {
  const location = useLocation();

  return (
    <div className="sticky top-0 h-screen flex items-start mt-6 ml-4">
      <div
        className="sticky top-6 h-[90vh] w-64 bg-[#d13289]/40 backdrop-blur-xl text-white 
                   p-6 flex flex-col rounded-3xl shadow-2xl border border-white/20
                   transition-all duration-300 hover:scale-[1.01]"
      >
        <h2 className="text-2xl font-bold mb-6 text-center">Menu</h2>

        {/* Always highlighted Add Recipe */}
        <Link
          to="/add-recipe"
          className="px-4 py-2 rounded-lg mb-2 bg-pink-700 shadow-md font-semibold"
        >
          Add Recipe
        </Link>

        {/* Home — never highlighted */}
        <Link
          to="/"
          className="px-4 py-2 rounded-lg mb-2 hover:bg-pink-700/70 transition"
          
        >
          Home
        </Link>

        {/* Favorites — only highlighted when active */}
        <Link
          to="/categories"
          className={`px-4 py-2 rounded-lg mb-2 transition ${
            location.pathname === "/categories"
              ? "bg-pink-700 shadow-md font-semibold"
              : "hover:bg-pink-700/70"
          }`}
        >
          Categories
        </Link>

        <Link
          to="/favorites"
          className={`px-4 py-2 rounded-lg mb-2 transition ${
            location.pathname === "/favorites"
              ? "bg-pink-700 shadow-md font-semibold"
              : "hover:bg-pink-700/70"
          }`}
        >
          Favorites
        </Link>
      </div>
    </div>
  );
};

export default Sidebar;
