import multer from "multer";
import path from "path";

// Middleware for handling file uploads
export const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "images/product/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

export const imageFilter = (req, file, cb) => {
  if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
    cb(new Error("Only Image Files"), false);
  } else {
    cb(null, true);
  }
};

export const uploadProduct = multer({
  storage: storage,
  fileFilter: imageFilter,
  limits: { fileSize: 10 * 1024 * 1024 },
});
