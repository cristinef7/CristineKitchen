import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { db } from "../firebase";
import { collection, addDoc } from "firebase/firestore";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";

const AddRecipe: React.FC = () => {
  const [title, setTitle] = useState("");
  const [ingredients, setIngredients] = useState("");
  const [instructions, setInstructions] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const navigate = useNavigate();

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!image) {
      alert("❌ Please upload an image before submitting.");
      return;
    }
    

    try {
      setUploading(true);

      // 🔹 Step 1: Upload image to Firebase Storage
      const storage = getStorage();
      const storageRef = ref(storage, `recipe-images/${Date.now()}-${image.name}`);
      await uploadBytes(storageRef, image);

      // 🔹 Step 2: Get the download URL
      const imageUrl = await getDownloadURL(storageRef);

      // 🔹 Step 3: Save recipe data to Firestore
      await addDoc(collection(db, "recipes"), {
        title,
        ingredients,
        instructions,
        image: imageUrl,
        createdAt: new Date(),
      });

      alert("✅ Recipe added successfully!");
      setTitle("");
      setIngredients("");
      setInstructions("");
      setImage(null);
      navigate("/");
    } catch (error) {
      console.error("Error adding recipe:", error);
      alert("❌ Failed to add recipe. Please try again.");
    } finally {
      setUploading(false);
    }
  };

  const handleCancel = () => {
    const confirmCancel = window.confirm("Are you sure you want to cancel?");
    if (confirmCancel) {
      navigate("/");
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-xl shadow-md mt-10">
      <h1 className="text-2xl font-bold mb-4 text-center">Add New Recipe</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Recipe title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full p-2 border rounded"
          required
        />
        <textarea
          placeholder="Ingredients (comma separated)"
          value={ingredients}
          onChange={(e) => setIngredients(e.target.value)}
          className="w-full p-2 border rounded"
          required
        />
        <textarea
          placeholder="Instructions"
          value={instructions}
          onChange={(e) => setInstructions(e.target.value)}
          className="w-full p-2 border rounded"
          required
        />

        {/* 🔹 Image Upload Field */}
        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          className="w-full p-2 border rounded"
          required
        />

        <div className="flex gap-3">
          <button
            type="submit"
            disabled={uploading}
            className="flex-1 bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition disabled:opacity-50"
          >
            {uploading ? "Uploading..." : "Add Recipe"}
          </button>

          <button
            type="button"
            onClick={handleCancel}
            className="flex-1 bg-gray-300 text-gray-800 py-2 rounded hover:bg-gray-400 transition"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddRecipe;
