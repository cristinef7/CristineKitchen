import { useEffect, useState } from "react";
import { collection, getDocs, addDoc } from "firebase/firestore";
import { db } from "../firebase";
import { Link } from "react-router-dom";
import RecipeCard from "../components/RecipeCard";

interface Recipe {
  id: string;
  title: string;
  image: string;
  description?: string;
}

const Home = () => {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState(true);
  const [addingFavorite, setAddingFavorite] = useState<string | null>(null);

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "recipes"));
        const recipeData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as Recipe[];
        setRecipes(recipeData);
      } catch (error) {
        console.error("Error fetching recipes:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchRecipes();
  }, []);

  const handleAddToFavorites = async (recipe: Recipe) => {
    try {
      setAddingFavorite(recipe.id);
      await addDoc(collection(db, "favorites"), recipe);
      alert(`❤️ "${recipe.title}" added to Favorites!`);
    } catch (error) {
      console.error("Error adding to favorites:", error);
      alert("❌ Failed to add to favorites.");
    } finally {
      setAddingFavorite(null);
    }
  };

  if (loading) return <div className="p-6">Loading recipes...</div>;

  return (
    <div className="p-6">
      {/* Header Section */}
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Recipes</h1>
        <Link
          to="/add-recipe"
          className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md"
        >
          Add Recipe
        </Link>
      </div>

      {/* Recipe Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {recipes.map((recipe) => (
          <RecipeCard
            key={recipe.id}
            recipe={recipe}
            onAddToFavorites={handleAddToFavorites}
            addingFavorite={addingFavorite}
          />
        ))}
      </div>
    </div>
  );
};

export default Home;
