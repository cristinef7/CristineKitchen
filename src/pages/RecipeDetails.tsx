import { useParams, useNavigate, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { doc, getDoc, deleteDoc } from "firebase/firestore";
import { db } from "../firebase";
import Sidebar from "../components/Sidebar";

interface Recipe {
  id: string;
  title: string;
  image: string;
  description?: string;
  ingredients?: string;
  instructions?: string;
}

const RecipeDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [recipe, setRecipe] = useState<Recipe | null>(null);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const fetchRecipe = async () => {
      if (!id) return;
      try {
        const docRef = doc(db, "recipes", id);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setRecipe({ id: docSnap.id, ...docSnap.data() } as Recipe);
        } else {
          console.log("Recipe not found!");
        }
      } catch (error) {
        console.error("Error fetching recipe:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchRecipe();
  }, [id]);

  const handleDelete = async () => {
    if (!id) return;

    const confirmDelete = window.confirm("Are you sure you want to delete this recipe?");
    if (!confirmDelete) return;

    try {
      setDeleting(true);
      await deleteDoc(doc(db, "recipes", id));
      alert("✅ Recipe deleted successfully!");
      navigate("/");
    } catch (error) {
      console.error("Error deleting recipe:", error);
      alert("❌ Failed to delete recipe.");
    } finally {
      setDeleting(false);
    }
  };

  if (loading) return <div className="p-6">Loading...</div>;
  if (!recipe) return <div className="p-6">Recipe not found.</div>;

  return (
    <div className="min-h-screen flex bg-[#fae8f1]">
      {/* 🌸 Sidebar */}
      <Sidebar />

      {/* 🍰 Main Content */}
      <div className="flex-1 p-8 overflow-y-auto">
        {/* 🔝 Top Navigation Bar */}
        <div className="relative flex items-center justify-between mb-8">
          {/* Back Button */}
          <button
            onClick={() => navigate("/")}
            className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-2 px-4 rounded-md z-10"
          >
            ← Back
          </button>

          {/* Centered Title */}
          <h1 className="absolute left-1/2 transform -translate-x-1/2 text-3xl font-bold text-[#d13289]">
            {recipe.title}
          </h1>

          {/* Edit & Delete Buttons */}
          <div className="flex gap-3 z-10">
            <Link
              to={`/edit-recipe/${recipe.id}`}
              className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md"
            >
              Edit
            </Link>

            <button
              onClick={handleDelete}
              disabled={deleting}
              className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md disabled:opacity-50"
            >
              {deleting ? "Deleting..." : "Delete"}
            </button>
          </div>
        </div>

        {/* 🖼️ Centered Recipe Image */}
        {recipe.image && (
          <div className="flex justify-center mb-6">
            <img
              src={recipe.image}
              alt={recipe.title}
              className="w-full max-w-2xl rounded-xl shadow-lg"
            />
          </div>
        )}

        {/* 📝 Description */}
        {recipe.description && (
          <p className="text-gray-700 mb-6 text-lg text-center">{recipe.description}</p>
        )}

        {/* 🧂 Ingredients */}
        {recipe.ingredients && (
          <div className="mb-6">
            <h2 className="text-2xl font-semibold text-[#d13289] mb-2">Ingredients</h2>
            <p className="text-gray-800">{recipe.ingredients}</p>
          </div>
        )}

        {/* 👩‍🍳 Instructions */}
        {recipe.instructions && (
          <div>
            <h2 className="text-2xl font-semibold text-[#d13289] mb-2">Instructions</h2>
            <p className="text-gray-800 whitespace-pre-line">{recipe.instructions}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default RecipeDetails;
