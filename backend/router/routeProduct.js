import { Router } from "express";
import {
  createProduct,
  getProducts,
  getProduct,
  updateProduct,
  deleteProduct,
} from "../controllers/userController.js";
import { uploadProduct } from "../middleware/upload.js";

const router = Router();

router
  .route("/createProduct")
  .post(uploadProduct.any("product_images"), createProduct);

router.route("/getProducts").get(getProducts);

router.route("/getProduct/:id").get(getProduct);

router.route("/updateProduct/:id").put(updateProduct);

router.route("/deleteProduct/:id").delete(deleteProduct);

export default router;
