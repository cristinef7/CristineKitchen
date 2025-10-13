import { Link } from "react-router-dom";

interface Recipe {
  id: string;
  title: string;
  image: string;
  description?: string;
}

interface RecipeCardProps {
  recipe: Recipe;
  onAddToFavorites: (recipe: Recipe) => void;
  addingFavorite: string | null;
}

const RecipeCard: React.FC<RecipeCardProps> = ({
  recipe,
  onAddToFavorites,
  addingFavorite,
}) => {
  return (
    <div className="bg-white shadow-md rounded-3xl overflow-hidden hover:shadow-lg hover:bg-[#fadeed] transition flex flex-col">
      {/* 🖼 Clickable Image and Title */}
      <Link to={`/recipe/${recipe.id}`} className="flex-1">
        <img
          src={recipe.image}
          // alt={recipe.title}
          className="w-full h-32 object-cover"
        />
        <div className="p-3">
          <h3 className="font-semibold text-lg">{recipe.title}</h3>
          <p className="text-sm text-gray-600">
            {/* {recipe.description || "No description"} */}
          </p>
        </div>
      </Link>

      {/* ❤️ Smaller Add to Favorites Button */}
      <div className="flex justify-end">
      <button
        onClick={() => onAddToFavorites(recipe)}
        disabled={addingFavorite === recipe.id}
        className="bg-pink-500 hover:bg-pink-600 text-white text-sm px-3 py-3 m-3 rounded-xl transition disabled:opacity-50 self-start"
      >
        {addingFavorite === recipe.id ? "Adding..." : "♡"}
      </button>
      </div>
    </div>
  );
};

export default RecipeCard;
