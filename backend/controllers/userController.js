import asyncHandler from "express-async-handler";
import Product from "../model/Product.model.js";
import Review from "../model/Review.model.js";
import mongoose from "mongoose";
import fs from "fs";
// import Auth from "../middleware/auth.js";

//POST : http://localhost:8080/api/products/createProduct
export const createProduct = asyncHandler(async (req, res) => {
  const { name, description, price, quantity_available, categories, images } =
    req.body;

  // Extract user ID from req.user
  const { userId: posted_by } = req.user;

  // console.log("User ID (posted_by):", posted_by); // Print user ID

  try {
    // Create new product
    const product = await Product.create({
      name,
      description,
      price,
      quantity_available,
      categories,
      product_images: images,
      posted_by,
    });

    res.status(200).json({
      message: "Product added successfully",
      product,
      success: true,
    });
  } catch (error) {
    // Delete uploaded images if error occurs
    try {
      await Promise.all(
        images.map(async (filename) => {
          const imagePath = `images/products/${filename}`;
          if (await fs.promises.access(imagePath, fs.constants.F_OK)) {
            await fs.promises.unlink(imagePath);
          }
        })
      );
    } catch (unlinkError) {
      console.error("Error deleting uploaded images:", unlinkError);
    }
    res.status(400).json({
      message: "Error adding product",
      success: false,
      error: error.message,
    });
  }
});

//GET : http://localhost:8080/api/products/getProducts
export const getProducts = asyncHandler(async (req, res) => {
  const products = await Product.find({});
  if (products) {
    res.status(200).json(products);
  } else {
    res.status(400);
    throw new Error("Couldn't fetch data");
  }
});

//GET : http://localhost:8080/api/products/getProduct/id
export const getProduct = asyncHandler(async (req, res) => {
  const { id } = req.params;
  console.log(id);
  if (!mongoose.Types.ObjectId.isValid(id)) {
    res.status(400);
    throw new Error("Invalid Id");
  }

  const product = await Product.findById(id);
  if (product) {
    res.status(200).json(product);
  } else {
    res.status(400);
    throw new Error("Couldn't find the product");
  }
});

// GET: http://localhost:8080/api/products/getProductsByUserId/:userId
export const getProductsByUserId = asyncHandler(async (req, res) => {
  const { userId } = req.params;

  // Check if userId is valid
  if (!mongoose.Types.ObjectId.isValid(userId)) {
    res.status(400);
    throw new Error("Invalid user ID");
  }

  try {
    const products = await Product.find({ posted_by: userId });
    res.status(200).json(products);
  } catch (error) {
    console.error("Error fetching products by user ID:", error);
    res.status(500).json({ error: "Error fetching products by user ID" });
  }
});

//PUT : http://localhost:8080/api/products/updateProduct/id
export const updateProduct = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const { name, description, price, quantity_available, categories, images } =
    req.body;

  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      res.status(400);
      throw new Error("Invalid Product Id");
    }

    const product = await Product.findById(id);
    if (!product) {
      res.status(404);
      throw new Error("Product not found");
    }

    // Update the product fields
    product.name = name || product.name;
    product.description = description || product.description;
    product.price = price || product.price;
    product.quantity_available =
      quantity_available || product.quantity_available;
    product.categories = categories || product.categories;
    product.images = images || product.images;

    const updatedProduct = await product.save();
    res.status(200).json(updatedProduct);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

//DELETE : http://localhost:8080/api/products/deleteProduct/id
export const deleteProduct = asyncHandler(async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    res.status(400);
    throw new Error("Invalid Id");
  }

  const product = await Product.findById(id);
  if (!product) {
    res.status(400);
    throw new Error("Product not found");
  }

  await Product.findByIdAndDelete(id);
  res.status(200).json({ message: "Product deleted successfully" });
});

// POST: http://localhost:8080/api/products/addReview/:id
export const addReview = asyncHandler(async (req, res) => {
  const { id: productId } = req.params;
  const { userId, reviewContent } = req.body;

  try {
    if (!mongoose.Types.ObjectId.isValid(productId)) {
      res.status(400);
      throw new Error("Invalid product ID");
    }

    if (!mongoose.Types.ObjectId.isValid(userId)) {
      res.status(400);
      throw new Error("Invalid user ID");
    }

    const product = await Product.findById(productId);

    if (!product) {
      res.status(404);
      throw new Error("Product not found");
    }

    if (!product.reviews) {
      product.reviews = [];
    }

    const review = new Review({
      userId,
      productId,
      review: reviewContent,
    });

    await review.save();

    product.reviews.push(review._id);

    const updatedProduct = await product.save();

    res.status(200).json({
      message: "Review added successfully",
      product: updatedProduct,
      success: true,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// GET: http://localhost:8080/api/products/getReviewsByProductId/:id
export const getReviewsByProductId = asyncHandler(async (req, res) => {
  const { id: productId } = req.params;

  try {
    if (!mongoose.Types.ObjectId.isValid(productId)) {
      res.status(400);
      throw new Error("Invalid product ID");
    }

    const reviews = await Review.find({ productId });

    res.status(200).json(reviews);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
