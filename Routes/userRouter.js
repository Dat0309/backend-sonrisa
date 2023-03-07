import express from "express";
import asyncHandler from "express-async-handler";
import { protect, admin } from "../Middleware/AuthMiddleware.js";
import User from "../Models/user.js";
import generateToken from "../utils/generateToken.js";

const userRouter = express.Router();

/**
 * login
 */
userRouter.post(
  "/login",
  asyncHandler(async (req, res) => {
    const { username, password } = req.body;
    const user = await User.findOne({ username });

    if (user && (await user.matchPassword(password))) {
      res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        token: generateToken(user._id),
        createdAt: user.createdAt,
      });
    } else {
      res.status(401);
      throw new Error("Invalid Email or Password");
    }
  })
);

/**
 * register
 */
userRouter.post(
  "/",
  asyncHandler(async (req, res) => {
    const { first_name, last_name, email, username, password, avatar, role } =
      req.body;
    const userExists = await User.findOne({ username });

    if (userExists) {
      res.status(400);
      throw new Error("Người dùng đã tồn tại");
    }

    const user = await User.create({
      first_name,
      last_name,
      email,
      username,
      password,
      avatar,
      role,
    });

    if (user) {
      res.status(201).json({
        _id: user._id,
        first_name: user.first_name,
        last_name: user.last_name,
        email: user.email,
        username: user.username,
        password: user.password,
        avatar: user.avatar,
        role: user.role,
        status: user.status,
        token: generateToken(user._id),
      });
    } else {
      res.status(400);
      throw new Error("Invalid user Data");
    }
  })
);

/**
 * profile
 */
userRouter.get(
  "/profile",
  protect,
  asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id);
    if (user) {
      res.json({
        _id: user._id,
        first_name: user.first_name,
        last_name: user.last_name,
        email: user.email,
        password: user.password,
        avatar: user.avatar,
        role: user.role,
        status: user.status,
        createdAt: user.createdAt,
      });
    } else {
      res.status(404);
      throw new Error("User not found");
    }
  })
);

userRouter.get(
  "/:id",
  asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id);
    if (user) {
      res.json(user);
    } else {
      res.status(404);
      throw new Error("Khong tim thay");
    }
  })
);

/**
 * Update profile
 */
userRouter.put(
  "/profile",
  protect,
  asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id);

    if (user) {
      user.first_name = req.body.first_name || user.first_name;
      user.last_name = req.body.last_name || user.last_name;
      user.email = req.body.email || user.email;
      user.username = req.body.username || user.username;
      user.password = req.body.password || user.password;
      user.avatar = req.body.avatar || user.avatar;
      user.role = req.body.role || user.role;

      const updatedUser = await user.save();
      res.json({
        _id: updatedUser._id,
        first_name: updatedUser.first_name,
        last_name: updatedUser.last_name,
        email: updatedUser.email,
        username: updatedUser.username,
        password: updatedUser.password,
        avatar: updatedUser.avatar,
        role: updatedUser.role,
        createdAt: updatedUser.createdAt,
        token: generateToken(updatedUser._id),
      });
    } else {
      res.status(404);
      throw new Error("User not found");
    }
  })
);

export default userRouter;
