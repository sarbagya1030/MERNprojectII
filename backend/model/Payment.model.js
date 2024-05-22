import mongoose from "mongoose";

export const paymentSchema = new mongoose.Schema(
  {
    status: {
      type: Boolean,
      default: false,
    },
    amount: {
      type: Number,
      required: true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    productId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Product",
    },
  },
  { timestamps: true }
);

export default mongoose.model.Payment ||
  mongoose.model("Payment", paymentSchema);
