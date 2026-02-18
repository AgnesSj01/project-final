import { useState, useEffect, useContext, useMemo, useRef } from "react";
import { api } from "../utils/api";
import RecipeCard from "../components/RecipeCard";
import { AuthContext } from "../contexts/AuthContext.jsx";

export const RecipeList = () => {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);

  const [selectedSeason, setSelectedSeason] = useState("all");
  const [selectedDiet, setSelectedDiet] = useState("all");
  const [selectedAllergy, setSelectedAllergy] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("default");
  const [ratingsMap, setRatingsMap] = useState({});

  const [savedSet, setSavedSet] = useState(new Set());

  const { isLoggedIn, accessToken } = useContext(AuthContext);

  const searchRef = useRef(null);

  // Auto-fokusera sökfältet när sidan laddas
  useEffect(() => {
    searchRef.current?.focus();
  }, []);

  // Hämta recipes
  useEffect(() => {
    setLoading(true);
    const url =
      selectedSeason === "all"
        ? "/recipes"
        : `/recipes?season=${selectedSeason}`;

    api
      .get(url)
      .then((res) => setRecipes(res.data))
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, [selectedSeason]);

  // Hämta favourites när man är inloggad
  useEffect(() => {
    if (!isLoggedIn || !accessToken) {
      setSavedSet(new Set());
      return;
    }

    api
      .get("/favourites", { headers: { Authorization: accessToken } }) // ev: Bearer
      .then((res) => {
        // res.data antas vara [{ _id, recipeId: { _id, ... } }, ...]
        const ids = res.data.map((fav) => fav.recipeId?._id).filter(Boolean);

        setSavedSet(new Set(ids));
      })
      .catch((err) => console.error(err));
  }, [isLoggedIn, accessToken]);

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

  // Filtrering
  const filteredRecipes = useMemo(() => {
    const filteredByDiet =
      selectedDiet === "all"
        ? recipes
        : recipes.filter((r) => r.diet && r.diet.includes(selectedDiet));

    const filteredByAllergy =
      selectedAllergy === "all"
        ? filteredByDiet
        : filteredByDiet.filter(
            (r) => r.allergies && !r.allergies.includes(selectedAllergy),
          );
    const searched = filteredByAllergy.filter((r) =>
      r.title.toLowerCase().includes(searchQuery.toLowerCase()),
    );

    if (sortBy === "popular") {
      searched.sort(
        (a, b) => (ratingsMap[b._id] || 0) - (ratingsMap[a._id] || 0),
      );
    } else if (sortBy === "least") {
      searched.sort(
        (a, b) => (ratingsMap[a._id] || 0) - (ratingsMap[b._id] || 0),
      );
    }

    return searched;
  }, [recipes, selectedDiet, selectedAllergy, searchQuery, sortBy, ratingsMap]);

  return (
    <div>
      <div className="search-bar">
        <input
          ref={searchRef}
          className="search-input"
          type="text"
          placeholder="Search recipes..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      <div className="filters">
        <select
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
          className="filter-button"
          aria-label="Filter by allergy"
          value={selectedAllergy}
          onChange={(e) => setSelectedAllergy(e.target.value)}
        >
          <option value="all">No allergy filter</option>
          <option value="lactose">Lactose-free</option>
          <option value="gluten">Gluten-free</option>
        </select>
        <select
          className="filter-button"
          aria-label="Sort recipes"
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
        >
          <option value="default">Sort by</option>
          <option value="popular">Most popular</option>
          <option value="least">Least popular</option>
        </select>
      </div>

      {loading && <p>Loading recipes...</p>}

      <div className="recipe-list">
        {filteredRecipes.map((recipe) => (
          <RecipeCard
            key={recipe._id}
            recipe={recipe}
            isInitiallySaved={savedSet.has(recipe._id)}
          />
        ))}
      </div>
    </div>
  );
};
