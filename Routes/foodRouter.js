import express from "express";
import asyncHandler from "express-async-handler";
import { admin, protect, updater } from "../Middleware/AuthMiddleware.js";
import Food from "../Models/food.js";

const foodRouter = express.Router();

// get all
foodRouter.get(
  "/",
  asyncHandler(async (req, res) => {
    const pageSize = 12;
    const page = Number(req.query.pageNumber) || 1;
    const keyword = req.query.keyword
      ? {
          name: {
            $regex: req.query.keyword,
            $options: "i",
          },
        }
      : {};
    const count = await Food.countDocuments({ ...keyword });
    const foods = await Food.find({ ...keyword })
      .limit(pageSize)
      .skip(pageSize * (page - 1))
      .sort({ _id: 1 });
    res.json({ foods, count, page, pages: Math.ceil(count / pageSize) });
  })
);

//admin get all
foodRouter.get(
  "/all",
  protect,
  admin,
  asyncHandler(async (req, res) => {
    const foods = await Food.find({}).sort({ _id: -1 });
    res.json(foods);
  })
);

//get single
foodRouter.get(
  "/:id",
  asyncHandler(async (req, res) => {
    const food = await Food.findById(req.params.id);
    if (food) {
      res.json(food);
    } else {
      res.status(404);
      throw new Error("Khong tim thay");
    }
  })
);

//get all by categories
foodRouter.get(
  "/category-id/:categoryId",
  asyncHandler(async (req, res) => {
    const pageSize = 12;
    const page = Number(req.query.pageNumber) || 1;
    const categoryId = req.params.categoryId;
    const keyword = req.query.keyword
      ? {
          name: {
            $regex: req.query.keyword,
            $options: "i",
          },
        }
      : {};
    const count = await Food.countDocuments({ ...keyword });
    const foods = await Food.find({ categories_id: categoryId })
      .limit(pageSize)
      .skip(pageSize * (page - 1))
      .sort({ _id: -1 });
    res.json({ foods, page, pages: Math.ceil(count / pageSize) });
  })
);

/**
 * delete
 */
foodRouter.delete(
  "/:id",
  protect,
  admin,
  asyncHandler(async (req, res) => {
    const food = await Food.findById(req.params.id);
    if (food) {
      await food.remove();
      res.json({ message: "deleted" });
    } else {
      res.status(404);
      throw new Error("not Found");
    }
  })
);

/**
 * create
 */
foodRouter.post(
  "/",
  protect,
  admin,
  asyncHandler(async (req, res) => {
    const { name, description, categories_id, calories, nutrition, image } =
      req.body;

    const food = new Food({
      name,
      description,
      categories_id,
      calories,
      nutrition,
      image,
    });

    if (food) {
      const createdFood = await food.save();
      res.status(201).json(createdFood);
    } else {
      res.status(400);
      throw new Error("Invalid data");
    }
  })
);

/**
 * update
 */
foodRouter.put(
  "/:id",
  protect,
  updater,
  asyncHandler(async (req, res) => {
    const { name, description, categories_id, calories, nutrition, image } =
      req.body;
    const food = await Food.findById(req.params.id);
    if (food) {
      food.name = name || food.name;
      food.description = description || food.description;
      food.categories_id = categories_id || food.categories_id;
      food.calories = calories || food.calories;
      food.nutrition = nutrition || food.nutrition;
      food.image = image || food.image;

      const updatedFood = await food.save();
      res.json(updatedFood);
    } else {
      res.status(404);
      throw new Error("not found");
    }
  })
);

export default foodRouter;
