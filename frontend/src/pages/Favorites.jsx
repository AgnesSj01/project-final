//Sparade recept (kräver inloggning)
import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../contexts/AuthContext.jsx";
import { api } from "../utils/api";
import RecipeCard from "../components/RecipeCard.jsx";

export const Favorites = () => {
  const [favorites, setFavorites] = useState([]);
  const { accessToken } = useContext(AuthContext);

  useEffect(() => {
    api
      .get("/favourites", {
        headers: { Authorization: accessToken },
      })
      .then((res) => setFavorites(res.data))
      .catch((err) => console.error(err));
  }, [accessToken]);

  const handleDelete = async (recipeId) => {
    try {
      await api.delete(`/favourites/${recipeId}`, {
        headers: { Authorization: accessToken },
      });

      // Ta bort från listan direkt i UI:
      setFavorites((prev) =>
        prev.filter((fav) => fav.recipeId?._id !== recipeId),
      );
    } catch (err) {
      alert(err.response?.data?.error || "Could not delete recipe");
    }
  };

  return (
    <div>
      <h2 className="Favorites-title">Here are your saved favorites!</h2>
      <div className="recipe-list">
        {favorites.filter((fav) => fav.recipeId).map((fav) => (
          <RecipeCard
            key={fav._id}
            recipe={fav.recipeId}
            showDelete
            onDelete={handleDelete}
          />
        ))}
      </div>
    </div>
  );
};
