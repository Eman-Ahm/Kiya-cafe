const db = require('../db');

// ── Create recipe (auth required) ────────────────────────
const createRecipe = async (req, res) => {
  try {
    const { title, image, ingredients, steps, cookingTime, category } = req.body;

    if (!title || !ingredients || !steps) {
      return res.status(400).json({ message: 'Title, ingredients and steps are required.' });
    }

    // ingredients/steps stored as JSON strings
    const ingredientsStr = Array.isArray(ingredients)
      ? JSON.stringify(ingredients)
      : JSON.stringify(ingredients.split(',').map((i) => i.trim()));

    const stepsStr = Array.isArray(steps)
      ? JSON.stringify(steps)
      : JSON.stringify(steps.split(',').map((s) => s.trim()));

    const [result] = await db.query(
      `INSERT INTO recipes (title, image, ingredients, steps, cooking_time, category, user_id)
       VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [title, image || null, ingredientsStr, stepsStr, cookingTime || null, category || null, req.userId]
    );

    const [rows] = await db.query('SELECT * FROM recipes WHERE id = ?', [result.insertId]);
    res.status(201).json(parseRecipe(rows[0]));
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ── Get all recipes ───────────────────────────────────────
const getRecipes = async (req, res) => {
  try {
    const [rows] = await db.query(
      `SELECT r.*, u.name AS user_name
       FROM recipes r
       LEFT JOIN users u ON r.user_id = u.id
       ORDER BY r.created_at DESC`
    );
    res.status(200).json(rows.map(parseRecipe));
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ── Get single recipe ─────────────────────────────────────
const getRecipeById = async (req, res) => {
  try {
    const [rows] = await db.query(
      `SELECT r.*, u.name AS user_name
       FROM recipes r
       LEFT JOIN users u ON r.user_id = u.id
       WHERE r.id = ?`,
      [req.params.id]
    );
    if (rows.length === 0) {
      return res.status(404).json({ message: 'Recipe not found.' });
    }
    res.status(200).json(parseRecipe(rows[0]));
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ── Update recipe ─────────────────────────────────────────
const updateRecipe = async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM recipes WHERE id = ?', [req.params.id]);
    if (rows.length === 0) return res.status(404).json({ message: 'Recipe not found.' });
    if (rows[0].user_id !== req.userId) return res.status(403).json({ message: 'Not authorized.' });

    const { title, image, ingredients, steps, cookingTime, category } = req.body;

    const ingredientsStr = ingredients
      ? (Array.isArray(ingredients) ? JSON.stringify(ingredients) : JSON.stringify(ingredients.split(',').map((i) => i.trim())))
      : rows[0].ingredients;

    const stepsStr = steps
      ? (Array.isArray(steps) ? JSON.stringify(steps) : JSON.stringify(steps.split(',').map((s) => s.trim())))
      : rows[0].steps;

    await db.query(
      `UPDATE recipes
       SET title=?, image=?, ingredients=?, steps=?, cooking_time=?, category=?
       WHERE id=?`,
      [
        title || rows[0].title,
        image !== undefined ? image : rows[0].image,
        ingredientsStr,
        stepsStr,
        cookingTime !== undefined ? cookingTime : rows[0].cooking_time,
        category !== undefined ? category : rows[0].category,
        req.params.id,
      ]
    );

    const [updated] = await db.query('SELECT * FROM recipes WHERE id = ?', [req.params.id]);
    res.status(200).json(parseRecipe(updated[0]));
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ── Delete recipe ─────────────────────────────────────────
const deleteRecipe = async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM recipes WHERE id = ?', [req.params.id]);
    if (rows.length === 0) return res.status(404).json({ message: 'Recipe not found.' });
    if (rows[0].user_id !== req.userId) return res.status(403).json({ message: 'Not authorized.' });

    await db.query('DELETE FROM recipes WHERE id = ?', [req.params.id]);
    res.status(200).json({ message: 'Recipe deleted.' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ── Helper: parse JSON fields ─────────────────────────────
function parseRecipe(row) {
  if (!row) return row;
  return {
    ...row,
    ingredients: tryParse(row.ingredients, []),
    steps:       tryParse(row.steps, []),
    user:        row.user_name ? { id: row.user_id, name: row.user_name } : null,
  };
}

function tryParse(val, fallback) {
  try { return JSON.parse(val); }
  catch { return fallback; }
}

module.exports = { createRecipe, getRecipes, getRecipeById, updateRecipe, deleteRecipe };
