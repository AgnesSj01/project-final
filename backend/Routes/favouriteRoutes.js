import express from "express";
import authenticateUser from "../middleware/auth.js";
import Favorite from "../models/favorite.js";

const router = express.Router();

// Get all favourites for the logged-in user
router.get("/favourites", authenticateUser, async (req, res) => {
  try {
    const favourites = await Favorite.find({ userId: req.user._id }).populate("recipeId");
    res.json(favourites);
  } catch (err) {
    res.status(500).json({ error: "Could not fetch favourites" });
  }
});

// Save a recipe as favourite
router.post("/favourites/:recipeId", authenticateUser, async (req, res) => {
  try {
    const existing = await Favorite.findOne({
      userId: req.user._id,
      recipeId: req.params.recipeId,
    });

    if (existing) {
      return res.status(409).json({ error: "Recipe already saved" });
    }

    const favourite = new Favorite({
      userId: req.user._id,
      recipeId: req.params.recipeId,
    });

    await favourite.save();
    res.status(201).json(favourite);
  } catch (err) {
    res.status(400).json({ error: "Could not save favourite" });
  }
});

// Remove a favourite
router.delete("/favourites/:recipeId", authenticateUser, async (req, res) => {
  try {
    const deleted = await Favorite.findOneAndDelete({
      userId: req.user._id,
      recipeId: req.params.recipeId,
    });

    if (!deleted) {
      return res.status(404).json({ error: "Favourite not found" });
    }

    res.json({ message: "Favourite removed" });
  } catch (err) {
    res.status(400).json({ error: "Could not remove favourite" });
  }
});

export default router;
