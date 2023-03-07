import express from "express";
import asyncHandler from "express-async-handler";
import { admin, protect, updater } from "../Middleware/AuthMiddleware.js";
import FoodCategories from "../Models/foodCategories.js";

const foodCategoriesRouter = express.Router();

/**
 * Get all
 */
foodCategoriesRouter.get(
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
    const count = await FoodCategories.countDocuments({ ...keyword });
    const categoreis = await FoodCategories.find({ ...keyword })
      .limit(pageSize)
      .skip(pageSize * (page - 1))
      .sort({ _id: 1 });
    res.json({ categoreis, count, page, pages: Math.ceil(count / pageSize) });
  })
);

/**
 * admin get all
 */
foodCategoriesRouter.get(
  "/all",
  protect,
  admin,
  asyncHandler(async (req, res) => {
    const categories = await FoodCategories.find({}).sort({ _id: -1 });
    res.json(categories);
  })
);

/**
 * get single
 */
foodCategoriesRouter.get(
  "/:id",
  asyncHandler(async (req, res) => {
    const categories = await FoodCategories.findById(req.params.id);
    if (categories) {
      res.json(categories);
    } else {
      res.status(404);
      throw new Error("Categries not Found");
    }
  })
);

/**
 * delete
 */
foodCategoriesRouter.delete(
  "/:id",
  protect,
  admin,
  asyncHandler(async (req, res) => {
    const categories = await FoodCategories.findById(req.params.id);
    if (categories) {
      await categories.remove();
      res.json({ message: "FoodCategories deleted" });
    } else {
      res.status(404);
      throw new Error("Categries not Found");
    }
  })
);

/**
 * create
 */
foodCategoriesRouter.post(
  "/",
  protect,
  admin,
  asyncHandler(async (req, res) => {
    const { name, description, image } = req.body;
    const categoryExist = await FoodCategories.findOne({ name });
    if (categoryExist) {
      res.status(400);
      throw new Error("Categries name already exist");
    } else {
      const category = new FoodCategories({
        name,
        description,
        image,
        user: req.user._id,
      });
      if (category) {
        const createdcategory = await category.save();
        res.status(201).json(createdcategory);
      } else {
        res.status(400);
        throw new Error("Invalid category data");
      }
    }
  })
);

/**
 * update
 */
foodCategoriesRouter.put(
  "/:id",
  protect,
  admin,
  asyncHandler(async (req, res) => {
    const { name, description, image } = req.body;
    const category = await FoodCategories.findById(req.params.id);
    if (category) {
      category.name = name || category.name;
      category.image = image || product.image;
      category.description = description || category.description;

      const updatedCategory = await category.save();
      res.json(updatedCategory);
    } else {
      res.status(404);
      throw new Error("Category not found");
    }
  })
);

export default foodCategoriesRouter;
