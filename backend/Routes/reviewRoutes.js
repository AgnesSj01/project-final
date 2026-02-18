import express from "express";
import Review from "../models/review.js";

const router = express.Router();

// Get popular recipes sorted by average rating
router.get("/recipes/popular", async (req, res) => {
  try {
    const ratings = await Review.aggregate([
      { $group: { _id: "$recipeId", avgRating: { $avg: "$rating" } } },
      { $sort: { avgRating: -1 } },
    ]);
    res.json(ratings);
  } catch (err) {
    res.status(500).json({ error: "Could not fetch popular recipes" });
  }
});

// Get all reviews for a recipe
router.get("/recipes/:recipeId/reviews", async (req, res) => {
  try {
    const reviews = await Review.find({
      recipeId: req.params.recipeId,
    }).populate("userId", "name");
    res.json(reviews);
  } catch (err) {
    res.status(500).json({ error: "Could not fetch reviews" });
  }
});

// Add a review
router.post("/recipes/:recipeId/reviews", async (req, res) => {
  try {
    const review = new Review({
      recipeId: req.params.recipeId,
      rating: req.body.rating,
    });

    await review.save();
    res.status(201).json(review);
  } catch (err) {
    res.status(400).json({ error: "Could not create review" });
  }
});

export default router;
