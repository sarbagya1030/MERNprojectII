import mongoose from "mongoose";

export const ProductSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Product name required"],
    },
    description: {
      type: String,
      required: false,
    },
    price: {
      type: Number,
      required: [true, "Product price required"],
    },
    quantity_available: {
      type: Number,
      required: [true, "Quantity available required"],
    },
    categories: {
      type: [String],
      required: [true, "Product categories required"],
    },
    product_images: {
      type: [String],
      required: false,
    },
    posted_by: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "Posted_by is mandatory"],
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model.Product ||
  mongoose.model("Product", ProductSchema);
