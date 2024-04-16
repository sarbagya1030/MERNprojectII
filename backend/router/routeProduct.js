import { Router } from "express";
import {
  createProduct,
  getProducts,
  getProduct,
  updateProduct,
  deleteProduct,
  getProductsByUserId,
} from "../controllers/userController.js";
import { uploadProduct } from "../middleware/upload.js";
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

export default router;
