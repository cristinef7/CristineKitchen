import Sidebar from "../components/Sidebar";
import { Link } from "react-router-dom";

const categories = [
  { name: "Breakfast", color: "bg-pink-300" },
  { name: "Lunch", color: "bg-yellow-300" },
  { name: "Dinner", color: "bg-purple-300" },
  { name: "Dessert", color: "bg-green-300" },
  { name: "Drinks", color: "bg-blue-300" },
  { name: "Snacks", color: "bg-orange-300" },
  { name: "Vegan", color: "bg-rose-300" },
  { name: "Seafood", color: "bg-teal-300" },
];

const Categories = () => {
  return (
    <div className="min-h-screen flex bg-[#fae8f1]">
      {/* 🌸 Sidebar */}
      <Sidebar />

      {/* 🍰 Main Content */}
      <div className="flex-1 p-10 overflow-y-auto">
        {/* Page Title */}
        <h1 className="text-4xl font-bold text-center text-[#d13289] mb-10">
          Recipe Categories
        </h1>

        {/* Category Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {categories.map((category) => (
            <Link
              key={category.name}
              to={`/categories/${category.name.toLowerCase()}`}
              className={`flex items-center justify-center h-40 rounded-3xl shadow-xl 
                          text-2xl font-semibold text-white ${category.color} 
                          transition-transform duration-300 hover:scale-105 hover:shadow-2xl`}
            >
              {category.name}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Categories;
