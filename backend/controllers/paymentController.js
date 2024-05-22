import asyncHandler from "express-async-handler";
import Stripe from "stripe";
import Payment from "../model/Payment.model.js";
import Product from "../model/Product.model.js";

const stripe = new Stripe(
  "sk_test_51O79rnGfKaSVwu78tNwb4dpWyqIUFhkZiAeFyMe8E9CsusswOeFxCyFgZOSr7ALIgzdWyerfHYTiKPC6hEelX5OD00Y54cxh0U"
);

export const createPayment = asyncHandler(async (req, res) => {
  const { productId, userId, amount } = req.body;
  console.log(req.body);
  console.log(productId, userId);

  const product = await Product.findById(productId);
  if (!product) {
    return res.status(404).json({ error: "Product not found" });
  }

  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "npr",
            product_data: {
              name: product.name,
            },
            unit_amount: product.price * 100,
          },
          quantity: 2,
        },
      ],
      mode: "payment",
      success_url: `http://localhost:3000/success/${productId}`,
      cancel_url: "http://localhost:3000/fail",
    });

    const payment = new Payment({
      status: true,
      amount: amount,
      userId: userId,
      productId: productId,
    });
    await payment.save();
    res.json({ url: session.url });
  } catch (error) {
    console.error("Failed to create checkout session", error);
    res.status(500).json({ error: "Failed to create payment session" });
  }
});
