import mongoose from "mongoose";
import dotenv from "dotenv";
import axios from "axios";
import { readFileSync } from "fs";
import Recipe from "./models/recipe.js";

dotenv.config();

const mongoUrl = process.env.MONGO_URL || "mongodb://localhost/final-project";
const API_KEY = process.env.SPOONACULAR_API_KEY;

const seasonIngredients = {
  spring: "asparagus,rhubarb,radish,spinach,peas",
  summer: "strawberry,zucchini,tomato,cucumber,dill",
  autumn: "mushroom,apple,pumpkin,plum,squash",
  winter: "cabbage,kale,parsnip,beetroot,turnip",
};

const fetchRecipesForSeason = async (season, ingredients) => {
  const searchRes = await axios.get(
    "https://api.spoonacular.com/recipes/complexSearch",
    {
      params: {
        apiKey: API_KEY,
        query: ingredients.split(",")[0],
        number: 5,
      },
    },
  );
  console.log(`${season} results:`, searchRes.data.totalResults, "found");
  console.log(searchRes.data.results.map((r) => r.title));

  const recipes = [];
  for (const result of searchRes.data.results) {
    const detailRes = await axios.get(
      `https://api.spoonacular.com/recipes/${result.id}/information`,
      {
        params: { apiKey: API_KEY },
      },
    );

    const r = detailRes.data;

    recipes.push({
      title: r.title,
      description: (r.summary || "").replace(/<[^>]*>/g, "").slice(0, 200),
      ingredients: r.extendedIngredients
        ? r.extendedIngredients.map((i) => i.original)
        : [],
      instructions:
        r.analyzedInstructions?.[0]?.steps?.map((s) => s.step).join(" ") ||
        "No instructions available",
      season: season,
      imageUrl: r.image || "",
      diet: (r.diets && r.diets[0]) || "none",
      allergies: [
        ...(r.dairyFree ? [] : ["lactose"]),
        ...(r.glutenFree ? [] : ["gluten"]),
      ],
    });
  }
  return recipes;
};

const seedDatabase = async () => {
  try {
    await mongoose.connect(mongoUrl);
    console.log("Connected to MongoDB");

    await Recipe.deleteMany();
    console.log("Cleared old recipes");

    let allRecipes = [];

    try {
      // Try fetching from Spoonacular API
      for (const [season, ingredients] of Object.entries(seasonIngredients)) {
        console.log(`Fetching ${season} recipes...`);
        const recipes = await fetchRecipesForSeason(season, ingredients);
        allRecipes = allRecipes.concat(recipes);
      }
    } catch (apiError) {
      // If API fails (e.g. rate limit), use local data as fallback
      console.log("API failed, using local recipe data instead:", apiError.message);
      allRecipes = JSON.parse(
        readFileSync(new URL("./data/recipes.json", import.meta.url), "utf-8")
      );
    }

    const created = await Recipe.insertMany(allRecipes);
    console.log(`Seeded ${created.length} recipes`);

    await mongoose.connection.close();
  } catch (err) {
    console.log("Seed failed:", err);
  }
};

seedDatabase();
