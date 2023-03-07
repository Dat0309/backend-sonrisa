import express from "express";
import asyncHandler from "express-async-handler";
import categories from "./data/categoriesData.js";
import foodCategories from "./data/foodCategoriesData.js";
import foods from "./data/foodData.js";
import menues from "./data/menuData.js";
import recipes from "./data/recipeData.js";
import users from "./data/userData.js";
import Categories from "./Models/categories.js";
import Food from "./Models/food.js";
import FoodCategories from "./Models/foodCategories.js";
import Menu from "./Models/menu.js";
import Recipe from "./Models/recipe.js";
import User from "./Models/user.js";

const ImportData = express.Router();

ImportData.post(
  "/user",
  asyncHandler(async (req, res) => {
    await User.deleteMany({});
    const importUser = await User.insertMany(users);
    res.send({ importUser });
  })
);

ImportData.post(
  "/menu",
  asyncHandler(async (req, res) => {
    await Menu.deleteMany({});
    const importMenu = await Menu.insertMany(menues);
    res.send({importMenu});
  })
);

ImportData.post(
  "/categories",
  asyncHandler(async (req, res) => {
    await Categories.deleteMany({});
    const importCategories = await Categories.insertMany(categories);
    res.send({ importCategories });
  })
);

ImportData.post(
  "/foodCategories",
  asyncHandler(async (req, res) => {
    await FoodCategories.deleteMany({});
    const importFoodCategories = await FoodCategories.insertMany(
      foodCategories
    );
    res.send({ importFoodCategories });
  })
);

ImportData.post(
  "/food",
  asyncHandler(async (req, res) => {
    await Food.deleteMany({});
    const importFood = await Food.insertMany(foods);
    res.send({ importFood });
  })
);

ImportData.post(
  "/recipes",
  asyncHandler(async (req, res) => {
    await Recipe.deleteMany({});
    const importRecipe = await Recipe.insertMany(recipes);
    res.send({ importRecipe });
  })
);

export default ImportData;
