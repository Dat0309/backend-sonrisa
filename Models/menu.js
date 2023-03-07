import mongoose from "mongoose";

const recipe = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  recipe_id: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "Recipe",
  },
  description: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
});

const menuSchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  thumb: {
    type: String,
    required: true,
  },
  recipes: [recipe],
});

const Menu = mongoose.model("Menu", menuSchema);
export default Menu;
