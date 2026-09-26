const express = require("express");
const router = express.Router();
const protect = require("../middleware/authMiddleware");
const {
  createRecipe,
  getRecipes,
  getRecipeById,
  updateRecipe,
  deleteRecipe,
} = require("../controllers/recipeController");

router.post("/", protect, createRecipe);
router.get("/", getRecipes);
router.get("/:id", getRecipeById);
router.put("/:id", protect, updateRecipe);
router.delete("/:id", protect, deleteRecipe);

module.exports = router;
