import { AuthContext } from "../contexts/AuthContext.jsx";
import { useContext, useEffect, useState } from "react";
import { api } from "../utils/api";
import { Link } from "react-router-dom";
import Rating from "./Rating";

const RecipeCard = ({
  recipe,
  showDelete = false,
  onDelete,
  isInitiallySaved = false,
  onSavedChange,
}) => {
  const { isLoggedIn, accessToken } = useContext(AuthContext);
  const [isSaved, setIsSaved] = useState(isInitiallySaved);

  useEffect(() => {
    setIsSaved(isInitiallySaved);
  }, [isInitiallySaved]);

  const toggleSave = async () => {
    // optimistic UI
    const next = !isSaved;
    setIsSaved(next);
    onSavedChange?.(recipe._id, next);

    try {
      if (next) {
        await api.post(`/favourites/${recipe._id}`, null, {
          headers: { Authorization: accessToken }, // ev: Bearer
        });
      } else {
        await api.delete(`/favourites/${recipe._id}`, {
          headers: { Authorization: accessToken }, // ev: Bearer
        });
      }
    } catch (err) {
      console.error(err);
      // backa om det failar
      setIsSaved(!next);
      onSavedChange?.(recipe._id, !next);
    }
  };

  return (
    <Link to={`/recipes/${recipe._id}`} className="recipe-card">
      <p>{recipe.season}</p>
      <img
        src={recipe.imageUrl || "/images/food.png"}
        alt={recipe.title}
        onError={(e) => {
          e.target.src = "/images/food.png";
        }}
      />
      <Rating recipeId={recipe._id} clickable={false} />
      <h3>{recipe.title}</h3>
      <p>{recipe.description}</p>

      {isLoggedIn && !showDelete && (
        <button
          className={`savebutton ${isSaved ? "saved" : ""}`}
          onClick={(e) => {
            e.preventDefault();
            toggleSave();
          }}
        >
          {isSaved ? "Saved" : "Save"}
        </button>
      )}

      {isLoggedIn && showDelete && (
        <button
          className="savebutton"
          onClick={(e) => {
            e.preventDefault();
            onDelete?.(recipe._id);
          }}
        >
          Delete
        </button>
      )}
    </Link>
  );
};

export default RecipeCard;
