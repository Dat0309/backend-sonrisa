import mongoose from "mongoose";

const reviewSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    rating: {
      type: Number,
      required: true,
    },
    comment: {
      type: String,
      required: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);

const ingredientSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  food_id: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "Food",
  },
  measurement: {
    type: Number,
    required: true,
  },
  measure_unit: {
    type: String,
    required: true,
  },
  note: {
    type: String,
  },
});

const recipeSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    prep_time: {
      type: Number,
      required: true,
    },
    prep_time_unit: {
      type: String,
      required: true,
    },
    cook_time: {
      type: Number,
      required: true,
    },
    cook_time_unit: {
      type: String,
      required: true,
    },
    yields: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    rating: {
      type: Number,
      default: 0,
    },
    categories_id: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Categories",
    },
    calories: {
      type: String,
      required: true,
    },
    reviews: [reviewSchema],
    num_revies: {
      type: Number,
      default: 0,
    },
    instruction: {
      type: String,
      required: true,
    },
    processing: {
      type: String,
      required: true,
    },
    difficulty: {
      type: Number,
      required: true,
    },
    allergies: {
      type: String,
      required: true,
    },
    ingredients: [ingredientSchema],
    source: {
      name: {
        type: String,
        required: true,
      },
      uid: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User",
      },
      image: {
        type: String,
        required: true,
      },
    },
  },
  {
    timestamps: true,
  }
);

const Recipe = mongoose.model("Recipe", recipeSchema);
export default Recipe;
