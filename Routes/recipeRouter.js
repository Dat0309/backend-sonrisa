import express from "express";
import asyncHandler from "express-async-handler";
import { admin, protect, updater } from "../Middleware/AuthMiddleware.js";
import Recipe from "../Models/recipe.js";

const recipeRouter = express.Router();

//get all
recipeRouter.get(
  "/",
  asyncHandler(async (req, res) => {
    const pageSize = 12;
    const page = Number(req.query.pageNumber) || 1;
    const keyword = req.query.keyword
      ? {
          title: {
            $regex: req.query.keyword,
            $options: "i",
          },
        }
      : {};
    const count = await Recipe.countDocuments({ ...keyword });
    const recipes = await Recipe.find({ ...keyword })
      .limit(pageSize)
      .skip(pageSize * (page - 1))
      .sort({ _id: -1 });

    res.json({ recipes, count, page, pages: Math.ceil(count / pageSize) });
  })
);

//admin get all
recipeRouter.get(
  "/all",
  protect,
  admin,
  asyncHandler(async (req, res) => {
    const recipes = await Recipe.find({}).sort({ _id: 1 });
    res.json(recipes);
  })
);

//get recomment
recipeRouter.get(
  "/recomment",
  asyncHandler(async (req, res) => {
    const pageSize = 6;
    const page = Number(req.query.pageNumber) || 1;
    const keyword = req.query.keyword
      ? {
          title: {
            $regex: req.query.keyword,
            $options: "i",
          },
        }
      : {};
    const count = await Recipe.countDocuments({ ...keyword });
    const recipes = await Recipe.find({ ...keyword })
      .limit(pageSize)
      .skip(pageSize * (page - 1))
      .sort({ _id: -1 });

    res.json({ recipes, count, page, pages: Math.ceil(count / pageSize) });
  })
);

// get single
recipeRouter.get(
  "/:id",
  asyncHandler(async (req, res) => {
    const recipe = await Recipe.findById(req.params.id);
    if (recipe) {
      res.json(recipe);
    } else {
      res.status(404);
      throw new Error("Không tìn thấy");
    }
  })
);

// get all by categories
recipeRouter.get(
  "/category-id/:categoryId",
  asyncHandler(async (req, res) => {
    const pageSize = 12;
    const page = Number(req.query.pageNumber) || 1;
    const categoryId = req.params.categoryId;
    const keyword = req.query.keyword
      ? {
          title: {
            $regex: req.query.keyword,
            $options: "i",
          },
        }
      : {};
    const count = await Recipe.countDocuments({ ...keyword });
    const recipes = await Recipe.find({ categories_id: categoryId })
      .limit(pageSize)
      .skip(pageSize * (page - 1))
      .sort({ _id: -1 });
    res.json({ recipes, page, pages: Math.ceil(count / pageSize) });
  })
);

// get by insredient
recipeRouter.get(
  "/ingredient/name",
  asyncHandler(async (req, res) => {
    const pageSize = 12;
    const page = Number(req.query.pageNumber) || 1;
    const keyword = req.query.keyword
      ? {
          title: {
            $regex: req.query.keyword,
            $options: "i",
          },
        }
      : {};
    const ingredients = req.query.ingr;

    const ingredient_names = ingredients.split(',');

    const count = await Recipe.countDocuments({ ...keyword });
    const recipes = await Recipe.find({
      ingredients: { $elemMatch: { name: {$in: ingredient_names} } },
    })
      .limit(pageSize)
      .skip(pageSize * (page - 1))
      .sort({ _id: -1 });

    res.json({ recipes, page, pages: Math.ceil(count / pageSize) });
  })
);

//review
recipeRouter.post(
  "/:id/review",
  protect,
  asyncHandler(async (req, res) => {
    const { rating, comment } = req.body;
    const recipe = await Recipe.findById(req.params.id);

    if (recipe) {
      const alreadyReviewed = recipe.reviews.find(
        (r) => r.user.toString() === req.user._id.toString()
      );
      if (alreadyReviewed) {
        res.status(400);
        throw new Error("Bạn đã review công thức này");
      }
      const review = {
        name: req.user.name,
        rating: Number(rating),
        comment,
        user: req.user._id,
      };

      recipe.reviews.push(review);
      recipe.numReviews = recipe.reviews.length;
      recipe.rating =
        recipe.reviews.reduce((acc, item) => item.rating + acc, 0) /
        recipe.reviews.length;

      await recipe.save();
      res.status(201).json({ message: "Đã thêm review" });
    } else {
      res.status(404);
      throw new Error("Không tìm thấy");
    }
  })
);

//delete
recipeRouter.delete(
  "/:id",
  protect,
  admin,
  asyncHandler(async (req, res) => {
    const recipe = await Recipe.findById(req.params.id);
    if (recipe) {
      await recipe.remove();
      res.json({ message: "Đã xoá" });
    } else {
      res.status(404);
      throw new Error("Không tìm thấy");
    }
  })
);

//create
recipeRouter.post(
  "/",
  protect,
  admin,
  asyncHandler(async (req, res) => {
    const {
      title,
      description,
      prep_time,
      prep_time_unit,
      cook_time,
      cook_time_unit,
      yields,
      image,
      thumb,
      rating,
      categories_id,
      calories,
      instruction,
      difficulty,
      allergies,
      ingredients,
    } = req.body;

    const source = {
      name: req.user.first_name + req.user.last_name,
      uid: req.user._id,
      image: req.user.avatar,
    };

    const recipe = new Recipe({
      title,
      description,
      prep_time,
      prep_time_unit,
      cook_time,
      cook_time_unit,
      yields,
      image,
      thumb,
      rating,
      categories_id,
      calories,
      instruction,
      difficulty,
      allergies,
      ingredients,
      source: source,
    });

    const createRecipe = await recipe.save();
    res.status(201).json(createRecipe);
  })
);

//update
recipeRouter.put(
  "/:id",
  protect,
  updater,
  asyncHandler(async (req, res) => {
    const {
      title,
      description,
      prep_time,
      prep_time_unit,
      cook_time,
      cook_time_unit,
      yields,
      image,
      thumb,
      rating,
      categories_id,
      calories,
      instruction,
      difficulty,
      allergies,
      ingredients,
    } = req.body;
    const recipe = await Recipe.findById(req.params.id);

    if (recipe) {
      recipe.title = title || recipe.title;
      recipe.description = description || recipe.description;
      recipe.prep_time = prep_time || recipe.prep_time;
      recipe.prep_time_unit = prep_time_unit || recipe.prep_time_unit;
      recipe.cook_time = cook_time || recipe.cook_time;
      recipe.cook_time_unit = cook_time_unit || recipe.cook_time_unit;
      recipe.yields = yields || recipe.yields;
      recipe.image = image || recipe.image;
      recipe.thumb = thumb || recipe.thumb;
      recipe.rating = rating || recipe.rating;
      recipe.categories_id = categories_id || recipe.categories_id;
      recipe.calories = calories || recipe.calories;
      recipe.difficulty = difficulty || recipe.difficulty;
      recipe.instruction = instruction || recipe.instruction;
      recipe.allergies = allergies || recipe.allergies;
      recipe.ingredients = ingredients || recipe.ingredients;

      const updatedRecipe = await recipe.save();
      res.json(updatedRecipe);
    } else {
      res.status(404);
      throw new Error("Không tìm thấy");
    }
  })
);

export default recipeRouter;
