
import mongoose from "mongoose";

const foodSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  image: { type: String, required: false },
  category: { type: String, required: true },
  quantity: { type: String, default: "250g" },
  protein: { type: String },
  carb: { type: String },
  cal: { type: String }
});

const foodModel = mongoose.models.food || mongoose.model("food", foodSchema);
export default foodModel;