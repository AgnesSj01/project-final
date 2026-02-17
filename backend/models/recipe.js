import mongoose from "mongoose";

const recipeSchema = new mongoose.Schema({
  title: {
    type: String,
  },
  description: {
    type: String,
  },
  ingredients: {
    type: [String],
  },
  instructions: {
    type: String,
  },
  season: {
    type: String,
  },
  imageUrl: {
    type: String,
  },
  hearts: {
    type: Number,
    default: 0,
  },
  createdAt: {
    type: Date,
    default: () => new Date(),
  },
  diet: {
    type: String,
    default: "none",
  },
  allergies: {
    type: [String], // En array, t.ex. ["lactose", "gluten"]
    default: [],
  },
});

const Recipe = mongoose.model("Recipe", recipeSchema);

export default Recipe;
