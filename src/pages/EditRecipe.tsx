import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect, type ChangeEvent } from "react";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../firebase";

interface Recipe {
  id: string;
  title: string;
  image?: string;
  description?: string;
  ingredients?: string;
  instructions?: string;
}

const EditRecipe = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [recipe, setRecipe] = useState<Recipe | null>(null);
  const [loading, setLoading] = useState(true);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [imageDeleted, setImageDeleted] = useState(false);

  useEffect(() => {
    const fetchRecipe = async () => {
      if (!id) return;
      try {
        const docRef = doc(db, "recipes", id);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const data = { id: docSnap.id, ...docSnap.data() } as Recipe;
          setRecipe(data);
          setPreviewImage(data.image ?? null);
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

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    if (!recipe) return;
    setRecipe({ ...recipe, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onloadend = () => setPreviewImage(reader.result as string);
      reader.readAsDataURL(file);
      setImageDeleted(false);
    }
  };

  const handleDeletePhoto = () => {
    setPreviewImage(null);
    setImageDeleted(true);
    alert("🗑️ The photo will be removed after saving changes.");
  };

  const handleUpdate = async () => {
    if (!recipe) return;
    try {
      const docRef = doc(db, "recipes", recipe.id);

      const updatedData: any = {
        title: recipe.title ?? "",
        description: recipe.description ?? "",
        ingredients: recipe.ingredients ?? "",
        instructions: recipe.instructions ?? "",
      };

      // Handle image logic
      if (imageDeleted) {
        updatedData.image = "";
      } else if (previewImage) {
        updatedData.image = previewImage;
      } else if (recipe.image) {
        updatedData.image = recipe.image;
      }

      await updateDoc(docRef, updatedData);

      alert("✅ Recipe updated successfully!");
      navigate(`/recipe/${recipe.id}`);
    } catch (error) {
      console.error("Error updating recipe:", error);
      alert("❌ Failed to update recipe.");
    }
  };

  if (loading) return <div className="p-6 text-gray-600">Loading...</div>;
  if (!recipe) return <div className="p-6 text-red-500">Recipe not found.</div>;

  return (
    <div className="p-6 max-w-2xl mx-auto">
      {/* Back Button */}
      <button
        onClick={() => navigate(-1)}
        className="mb-4 bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-2 px-4 rounded-md"
      >
        ← Back
      </button>

      <h1 className="text-3xl font-bold mb-4">Edit Recipe</h1>

      {/* Image Preview */}
      {previewImage && (
        <div className="relative mb-4">
          <img
            src={previewImage}
            alt="Recipe Preview"
            className="w-full rounded-lg shadow-md"
          />
          <button
            onClick={handleDeletePhoto}
            className="absolute top-2 right-2 bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-md text-sm"
          >
            Delete Photo
          </button>
        </div>
      )}

      {/* Image Upload */}
      <div className="mb-4">
        <label className="block font-medium mb-1">Change Image</label>
        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          className="block w-full text-sm text-gray-600"
        />
      </div>

      {/* Text Inputs */}
      {["title", "description", "ingredients", "instructions"].map((field) => (
        <div key={field} className="mb-4">
          <label className="block font-medium mb-1 capitalize">{field}</label>
          {field === "title" ? (
            <input
              type="text"
              name={field}
              value={recipe[field as keyof Recipe] || ""}
              onChange={handleChange}
              className="w-full border rounded-md p-2"
            />
          ) : (
            <textarea
              name={field}
              value={recipe[field as keyof Recipe] || ""}
              onChange={handleChange}
              className="w-full border rounded-md p-2"
            />
          )}
        </div>
      ))}

      {/* Action Buttons */}
      <div className="flex gap-3">
        <button
          onClick={handleUpdate}
          className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-md"
        >
          Update Recipe
        </button>

        <button
          onClick={() => navigate(`/recipe/${recipe.id}`)}
          className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-2 px-4 rounded-md"
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default EditRecipe;
