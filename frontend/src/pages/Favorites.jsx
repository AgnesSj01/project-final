import { useState, useEffect, useContext, useMemo } from "react";
import { AuthContext } from "../contexts/AuthContext.jsx";
import { api } from "../utils/api";
import RecipeCard from "../components/RecipeCard.jsx";

// Shows the logged-in user's saved recipes with the same filters as RecipeList
export const Favorites = () => {
  const [favorites, setFavorites] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSeason, setSelectedSeason] = useState("all");
  const [selectedDiet, setSelectedDiet] = useState("all");
  const [selectedAllergy, setSelectedAllergy] = useState("all");
  const [sortBy, setSortBy] = useState("default");
  const [ratingsMap, setRatingsMap] = useState({});
  const { accessToken } = useContext(AuthContext);

  useEffect(() => {
    api
      .get("/favourites", {
        headers: { Authorization: accessToken },
      })
      .then((res) => setFavorites(res.data))
      .catch((err) => console.error(err));
  }, [accessToken]);

  useEffect(() => {
    api
      .get("/recipes/popular")
      .then((res) => {
        const map = {};
        res.data.forEach((r) => {
          map[r._id] = r.avgRating;
        });
        setRatingsMap(map);
      })
      .catch((err) => console.error(err));
  }, []);

  const handleDelete = async (recipeId) => {
    try {
      await api.delete(`/favourites/${recipeId}`, {
        headers: { Authorization: accessToken },
      });
      setFavorites((prev) =>
        prev.filter((fav) => fav.recipeId?._id !== recipeId),
      );
    } catch (err) {
      alert(err.response?.data?.error || "Could not delete recipe");
    }
  };

  const filteredFavorites = useMemo(() => {
    let result = favorites.filter((fav) => fav.recipeId);

    if (selectedSeason !== "all") {
      result = result.filter((fav) => fav.recipeId.season === selectedSeason);
    }
    if (selectedDiet !== "all") {
      result = result.filter(
        (fav) => fav.recipeId.diet && fav.recipeId.diet.includes(selectedDiet),
      );
    }
    if (selectedAllergy !== "all") {
      result = result.filter(
        (fav) =>
          fav.recipeId.allergies &&
          !fav.recipeId.allergies.includes(selectedAllergy),
      );
    }
    result = result.filter((fav) =>
      fav.recipeId.title.toLowerCase().includes(searchQuery.toLowerCase()),
    );

    return result;
  }, [
    favorites,
    searchQuery,
    selectedSeason,
    selectedDiet,
    selectedAllergy,
    sortBy,
    ratingsMap,
  ]);

  return (
    <div>
      <h1 className="Favorites-title">Here are your saved favorites!</h1>
      <div className="search-bar">
        <input
          className="search-input"
          type="text"
          name="search"
          aria-label="Search saved recipes"
          placeholder="Search saved recipes..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>
      <div className="filters">
        <select
          name="season"
          className="filter-button"
          aria-label="Filter by season"
          value={selectedSeason}
          onChange={(e) => setSelectedSeason(e.target.value)}
        >
          <option value="all">All seasons</option>
          <option value="spring">Spring</option>
          <option value="summer">Summer</option>
          <option value="autumn">Autumn</option>
          <option value="winter">Winter</option>
        </select>

        <select
          name="diet"
          className="filter-button"
          aria-label="Filter by diet"
          value={selectedDiet}
          onChange={(e) => setSelectedDiet(e.target.value)}
        >
          <option value="all">All diets</option>
          <option value="vegan">Vegan</option>
          <option value="vegetarian">Vegetarian</option>
        </select>

        <select
          name="allergy"
          className="filter-button"
          aria-label="Filter by allergy"
          value={selectedAllergy}
          onChange={(e) => setSelectedAllergy(e.target.value)}
        >
          <option value="all">No allergy filter</option>
          <option value="lactose">Lactose-free</option>
          <option value="gluten">Gluten-free</option>
        </select>
      </div>
      <div className="recipe-list">
        {filteredFavorites.map((fav) => (
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
