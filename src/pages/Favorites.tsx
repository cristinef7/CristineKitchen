import { useEffect, useState } from "react";
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";
import { db } from "../firebase";
import { Link } from "react-router-dom";

interface FavoriteRecipe {
  id: string;
  title: string;
  image: string;
  description?: string;
}

const Favorites = () => {
  const [favorites, setFavorites] = useState<FavoriteRecipe[]>([]);
  const [loading, setLoading] = useState(true);
  const [removing, setRemoving] = useState<string | null>(null);

  const fetchFavorites = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "favorites"));
      const favData = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as FavoriteRecipe[];
      setFavorites(favData);
    } catch (error) {
      console.error("Error fetching favorites:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFavorites();
  }, []);

  const handleRemoveFavorite = async (id: string) => {
    try {
      setRemoving(id);
      await deleteDoc(doc(db, "favorites", id));
      setFavorites((prev) => prev.filter((fav) => fav.id !== id));
      alert("❌ Removed from Favorites");
    } catch (error) {
      console.error("Error removing favorite:", error);
    } finally {
      setRemoving(null);
    }
  };

  if (loading) return <div className="p-6">Loading favorites...</div>;

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">❤️ Favorites</h1>

        <Link
          to="/"
          className="bg-gray-300 hover:bg-gray-400 text-gray-800 px-4 py-2 rounded-md"
        >
          Back to Home
        </Link>
      </div>

      {favorites.length === 0 ? (
        <p>No favorites yet!</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {favorites.map((fav) => (
            <div
              key={fav.id}
              className="bg-white shadow-md rounded-lg overflow-hidden hover:shadow-lg transition flex flex-col"
            >
              <Link to={`/recipe/${fav.id}`} className="flex-1">
                <img
                  src={fav.image}
                  alt={fav.title}
                  className="w-full h-48 object-cover"
                />
                <div className="p-4">
                  <h3 className="font-semibold text-lg">{fav.title}</h3>
                  <p className="text-sm text-gray-600">
                    {fav.description || "No description"}
                  </p>
                </div>
              </Link>

              <button
                onClick={() => handleRemoveFavorite(fav.id)}
                disabled={removing === fav.id}
                className="bg-red-500 hover:bg-red-600 text-white py-2 w-full transition disabled:opacity-50"
              >
                {removing === fav.id ? "Removing..." : "Remove from Favorites"}
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Favorites;
