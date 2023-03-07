import mongoose from "mongoose";

const connectDatabase = async () => {
  try {
    const conn = await mongoose.connect(
      "mongodb+srv://admin:admin@foodrecipe.km3skkb.mongodb.net/foodrecipe?retryWrites=true&w=majority",
      {
        useUnifiedTopology: true,
        useNewUrlParser: true,
      }
    );

    console.log(`MongoDB Connected`);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

export default connectDatabase;
