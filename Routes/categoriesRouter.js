import express from "express";
import asyncHandler from "express-async-handler";
import { admin, protect, updater } from "../Middleware/AuthMiddleware.js";
import Categories from "../Models/categories.js";

const categoriesRouter = express.Router();

/**
 * Get all
 */
categoriesRouter.get(
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
    const count = await Categories.countDocuments({ ...keyword });
    const categoreis = await Categories.find({ ...keyword })
      .limit(pageSize)
      .skip(pageSize * (page - 1))
      .sort({ _id: 1 });
    res.json({ categoreis, count, page, pages: Math.ceil(count / pageSize) });
  })
);

/**
 * admin get all
 */
categoriesRouter.get(
  "/all",
  protect,
  admin,
  asyncHandler(async (req, res) => {
    const categories = await Categories.find({}).sort({ _id: -1 });
    res.json(categories);
  })
);

/**
 * get single
 */
categoriesRouter.get(
  "/:id",
  asyncHandler(async (req, res) => {
    const categories = await Categories.findById(req.params.id);
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
categoriesRouter.delete(
  "/:id",
  protect,
  admin,
  asyncHandler(async (req, res) => {
    const categories = await Categories.findById(req.params.id);
    if (categories) {
      await categories.remove();
      res.json({ message: "Categories deleted" });
    } else {
      res.status(404);
      throw new Error("Categries not Found");
    }
  })
);

/**
 * create
 */
categoriesRouter.post(
  "/",
  protect,
  admin,
  asyncHandler(async (req, res) => {
    const { name, description, image } = req.body;
    const categoryExist = await Categories.findOne({ name });
    if (categoryExist) {
      res.status(400);
      throw new Error("Categries name already exist");
    } else {
      const category = new Categories({
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
categoriesRouter.put(
  "/:id",
  protect,
  admin,
  asyncHandler(async (req, res) => {
    const { name, description, image } = req.body;
    const category = await Categories.findById(req.params.id);
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

export default categoriesRouter;
