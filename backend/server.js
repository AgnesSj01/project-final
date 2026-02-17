import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import authenticateUser from "./middleware/auth.js";
import Recipe from "./models/recipe.js";
import userRoutes from "./Routes/userRoutes.js";
import favouriteRoutes from "./Routes/favouriteRoutes.js";
import reviewRoutes from "./Routes/reviewRoutes.js";

import dotenv from "dotenv";
dotenv.config();

const mongoUrl = process.env.MONGO_URL || "mongodb://localhost/final-project";
mongoose.connect(mongoUrl);
mongoose.Promise = Promise;

const port = process.env.PORT || 8080;
const app = express();

app.use(cors());
app.use(express.json());
app.use(reviewRoutes);

// API documentation
app.get("/", (req, res) => {
  res.json({
    message: "Seasonal Recipes API",
    endpoints: [
      { method: "GET", path: "/", description: "API documentation" },
      {
        method: "GET",
        path: "/recipes",
        description: "Get all recipes. Query: ?season=spring&search=pasta",
      },
      {
        method: "GET",
        path: "/recipes/:id",
        description: "Get a specific recipe by ID",
      },
      {
        method: "PATCH",
        path: "/recipes/:id/heart",
        description: "Add a heart to a recipe (requires auth)",
      },
      { method: "POST", path: "/users", description: "Register a new user" },
      { method: "POST", path: "/sessions", description: "Login" },
      {
        method: "GET",
        path: "/favourites",
        description: "Get user's saved recipes (requires auth)",
      },
      {
        method: "POST",
        path: "/favourites/:recipeId",
        description: "Save a recipe (requires auth)",
      },
      {
        method: "DELETE",
        path: "/favourites/:recipeId",
        description: "Remove a saved recipe (requires auth)",
      },
    ],
  });
});

// Get all recipes – supports ?season=spring and ?search=pasta
app.get("/recipes", async (req, res) => {
  try {
    const filter = {};

    if (req.query.season) {
      filter.season = req.query.season;
    }

    if (req.query.search) {
      filter.title = { $regex: req.query.search, $options: "i" };
    }

    const results = await Recipe.find(filter);
    res.json(results);
  } catch (err) {
    res.status(500).json({ error: "Could not fetch recipes" });
  }
});

// Get a specific recipe by ID
app.get("/recipes/:id", async (req, res) => {
  try {
    const recipe = await Recipe.findById(req.params.id);
    if (recipe) {
      res.json(recipe);
    } else {
      res.status(404).json({ error: "Recipe not found" });
    }
  } catch (error) {
    res.status(400).json({ error: "Invalid recipe ID" });
  }
});

// Add a heart to a recipe – requires login
app.patch("/recipes/:id/heart", authenticateUser, async (req, res) => {
  try {
    const updatedRecipe = await Recipe.findByIdAndUpdate(
      req.params.id,
      { $inc: { hearts: 1 } },
      { new: true },
    );
    if (!updatedRecipe) {
      return res.status(404).json({ error: "Recipe not found" });
    }
    res.status(200).json(updatedRecipe);
  } catch {
    res.status(400).json({ error: "Unable to add heart to recipe" });
  }
});

app.use(userRoutes);
app.use(favouriteRoutes);

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
