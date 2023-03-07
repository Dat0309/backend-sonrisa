import mongoose from "mongoose";

const foodCategoriesSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
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

const FoodCategories = mongoose.model("FoodCategories", foodCategoriesSchema);
export default FoodCategories;
