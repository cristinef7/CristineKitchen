import { Link, useLocation } from "react-router-dom";

const Sidebar = () => {
  const location = useLocation();

  return (
    <div className="w-64 bg-[#d13289] text-white p-6 flex flex-col h-screen sticky top-0">
      <h2 className="text-2xl font-bold mb-6">Menu</h2>

      <Link 
        to="/add-recipe"
        className={`px-3 py-2 rounded-md transition ${
          location.pathname === "/add-recipe"
            ? "bg-pink-700"
            : "hover:bg-pink-700"
        }`}
      >
        Add Recipe
      </Link>

      <Link
        to="/"
        className={`px-3 py-2 rounded-md transition ${
          location.pathname === "/" ? "bg-pink-700" : "hover:bg-pink-700"
        }`}
      >
        Home
      </Link>

      <Link
        to="/favorites"
        className={`px-3 py-2 rounded-md transition ${
          location.pathname === "/favorites"
            ? "bg-pink-700"
            : "hover:bg-pink-700"
        }`}
      >
        Favorites
      </Link>

      <Link
        to="/add-recipe"
        className={`px-3 py-2 rounded-md transition ${
          location.pathname === "/add-recipe"
            ? "bg-pink-700"
            : "hover:bg-pink-700"
        }`}
      >
        Add Recipe
      </Link>
    </div>
  );
};

export default Sidebar;
