import mongoose from "mongoose";

const foodSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  categories_id: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "FoodCategories",
  },
  calories: {
    type: String,
    required: true,
  },
  nutrition: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
});

const Food = mongoose.model("Food", foodSchema);
export default Food;
