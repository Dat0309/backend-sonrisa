import express from "express";
import asyncHandler from "express-async-handler";
import Menu from "../Models/menu.js";
import { admin, protect } from "./../Middleware/AuthMiddleware.js";

const menuRouter = express.Router();

/**
 * get all
 */
menuRouter.get(
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
    const count = await Menu.countDocuments({ ...keyword });
    const menues = await Menu.find({ ...keyword })
      .limit(pageSize)
      .skip(pageSize * (page - 1))
      .sort({ _id: -1 });
    res.json({ menues, count, page, pages: Math.ceil(count / pageSize) });
  })
);

/**
 * admin get all
 */
menuRouter.get(
  "/all",
  protect,
  admin,
  asyncHandler(async (req, res) => {
    const menu = await Menu.find({}).sort({ _id: -1 });
    res.json(menu);
  })
);

/**
 * Get single
 */
menuRouter.get(
  "/:id",
  asyncHandler(async (req, res) => {
    const menu = await Menu.findById(req.params.id);
    if (menu) {
      res.json(menu);
    } else {
      res.status(404);
      throw new Error("Menu not Found");
    }
  })
);

/**
 * delete
 */
menuRouter.delete(
  "/:id",
  protect,
  admin,
  asyncHandler(async (req, res) => {
    const menu = await Menu.findById(req.params.id);
    if (menu) {
      await menu.remove();
      res.json({ message: " Menu deleted" });
    } else {
      res.status(404);
      throw new Error("Menu not Found");
    }
  })
);

/**
 * create
 */
menuRouter.post(
  "/",
  protect,
  admin,
  asyncHandler(async (req, res) => {
    const { title, description, thumb, recipes } = req.body;
    if (recipes && recipes.length === 0) {
      res.status(400);
      throw new Error("No recipe items");
      return;
    } else {
      const menu = new Menu({
        title,
        description,
        thumb,
        recipes,
      });

      const createMenu = await menu.save();
      res.status(201).json(createMenu);
    }
  })
);

export default menuRouter;
