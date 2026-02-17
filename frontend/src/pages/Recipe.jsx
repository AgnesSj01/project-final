import { useParams } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import { api } from "../utils/api";
import { AuthContext } from "../contexts/AuthContext";

//Enskilt recept med ingredienser, instruktioner, reviews
export const Recipe = () => {
  const { isLoggedIn, accessToken } = useContext(AuthContext);
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);
  const [isSaved, setIsSaved] = useState(false);

  useEffect(() => {
    api
      .get(`/recipes/${id}`)
      .then((res) => setRecipe(res.data))
      .catch((err) => console.error(err));
  }, [id]);

  const toggleSave = async () => {
    const next = !isSaved;
    setIsSaved(next);

    try {
      if (next) {
        await api.post(`/favourites/${id}`, null, {
          headers: { Authorization: accessToken },
        });
      } else {
        await api.delete(`/favourites/${id}`, {
          headers: { Authorization: accessToken },
        });
      }
    } catch (err) {
      console.error(err);
      setIsSaved(!next);
    }
  };

  if (!recipe) return <p>Loading...</p>;
  return (
    <div className="recipe-page">
      <img
        className="recipe-page-img"
        src={recipe.imageUrl || "/images/food.png"}
        alt={recipe.title}
        onError={(e) => {
          e.target.src = "/images/food.png";
        }}
      />

      <div className="recipe-page-content">
        <h1>{recipe.title}</h1>
        <p className="recipe-page-season">{recipe.season}</p>
        <p className="recipe-page-description">{recipe.description}</p>

        <h3>Ingredients</h3>
        <ul className="recipe-page-ingredients">
          {recipe.ingredients.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>

        <h3>Instructions</h3>
        <p className="recipe-page-instructions">{recipe.instructions}</p>

        {isLoggedIn && (
          <button
            className={`savebutton ${isSaved ? "saved" : ""}`}
            onClick={toggleSave}
          >
            {isSaved ? "Saved" : "Save"}
          </button>
        )}
      </div>
    </div>
  );
};
