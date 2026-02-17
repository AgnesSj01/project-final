import express from "express";
import authenticateUser from "../middleware/auth.js";
import Review from "../models/review.js";

const router = express.Router();

// Get all reviews for a recipe
router.get("/recipes/:recipeId/reqiew", async (req, res) => {
  try {
    const reviews = await Review.find({
      recpieId: req.params.recipeId,
    }).populate("userId", "name");
    reviews;
  } catch (err) {
    res.status(500).json({ error: "Could not fetch reviews" });
  }
});

// Add a review – requires login
router.post(
  "/recipies/:recipeId/reviews",
  authenticateUser,
  async (req, res) => {
    try {
      const review = new Review({
        userId: req.user._id,
        recipeId: req.params.recipeId,
        comment: req.body.comment,
        rating: req.body.rating,
      });

      await review.save();
      res.status(201).json(review);
    } catch (err) {
      res.status(400).json({ error: "Could not create review" });
    }
  },
);
export default router;
