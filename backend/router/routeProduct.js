import { Router } from "express";
import {
  createProduct,
  getProducts,
  getProduct,
  updateProduct,
  deleteProduct,
  getProductsByUserId,
  addReview,
  getReviewsByProductId,
} from "../controllers/userController.js";
import { uploadProduct } from "../middleware/upload.js";
import { createPayment } from "../controllers/paymentController.js";
import Auth from "../middleware/auth.js";

const router = Router();

router
  .route("/createProduct")
  .post(Auth, uploadProduct.any("product_images"), createProduct);

router.route("/getProducts").get(getProducts);

router.route("/getProduct/:id").get(getProduct);

router.route("/updateProduct/:id").put(updateProduct);

router.route("/deleteProduct/:id").delete(deleteProduct);

router.route("/getProductsByUserId/:userId").get(getProductsByUserId);

router.post("/create-payment", Auth, createPayment);

router.route("/addReview/:id").post(Auth, addReview);

router.route("/getReviewsByProductId/:id").get(getReviewsByProductId);

export default router;
