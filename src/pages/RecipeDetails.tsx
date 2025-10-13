import { useParams, useNavigate, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { doc, getDoc, deleteDoc } from "firebase/firestore";
import { db } from "../firebase";

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
    <div className="p-6 min-w-fit mx-5 ">
      {/* Back Button */}
      <button
        onClick={() => navigate("/")}
        className="mb-4 bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-2 px-4 rounded-md"
      >
        ← Back
      </button>

      <div className="flex justify-between items-center mb-4">
        <h1 className="text-3xl font-bold">{recipe.title}</h1>
        <div className="flex gap-3">
          <Link
            to={`/edit-recipe/${recipe.id}`}
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md"
          >
            Edit Recipe
          </Link>

          <button
            onClick={handleDelete}
            disabled={deleting}
            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md disabled:opacity-50"
          >
            {deleting ? "Deleting..." : "Delete Recipe"}
          </button>
        </div>
      </div>

      {recipe.image && (
        <img
          src={recipe.image}
          alt={recipe.title}
          className="w-full max-w-xl rounded-md shadow-md mb-4"
        />
      )}
      <p className="text-gray-700 mb-4">{recipe.description}</p>

      {recipe.ingredients && (
        <div className="mb-4">
          <h2 className="text-xl font-semibold">Ingredients:</h2>
          <p>{recipe.ingredients}</p>
        </div>
      )}

      {recipe.instructions && (
        <div>
          <h2 className="text-xl font-semibold">Instructions:</h2>
          <p>{recipe.instructions}</p>
        </div>
      )}
    </div>
  );
};

export default RecipeDetails;
