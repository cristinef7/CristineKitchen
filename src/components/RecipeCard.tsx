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
    <div className="bg-white shadow-md rounded-lg overflow-hidden hover:shadow-lg transition flex flex-col">
      {/* 🖼 Clickable Image and Title */}
      <Link to={`/recipe/${recipe.id}`} className="flex-1">
        <img
          src={recipe.image}
          alt={recipe.title}
          className="w-full h-48 object-cover"
        />
        <div className="p-4">
          <h3 className="font-semibold text-lg">{recipe.title}</h3>
          <p className="text-sm text-gray-600">
            {recipe.description || "No description"}
          </p>
        </div>
      </Link>

      {/* ❤️ Smaller Add to Favorites Button */}
      <button
        onClick={() => onAddToFavorites(recipe)}
        disabled={addingFavorite === recipe.id}
        className="bg-pink-500 hover:bg-pink-600 text-white text-sm px-3 py-1 m-3 rounded-md transition disabled:opacity-50 self-start"
      >
        {addingFavorite === recipe.id ? "Adding..." : "❤️ Favorite"}
      </button>
    </div>
  );
};

export default RecipeCard;
