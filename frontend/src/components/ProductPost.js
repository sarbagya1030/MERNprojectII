import React, { useState } from "react";
import { createProduct } from "../helper/producthelper.js";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import toast, { Toaster } from "react-hot-toast";
import styles from "../styles/Username.module.css";
import { FiArrowLeft } from "react-icons/fi";
import avatar from "../assets/add.png";
import convertToBase64 from "../helper/convert.js";
import { productValidation } from "../helper/validate.js";

export default function ProductPost() {
  const navigate = useNavigate();
  const [file1, setFile1] = useState();
  const [file2, setFile2] = useState();
  const [file3, setFile3] = useState();
  const formik = useFormik({
    initialValues: {
      name: "",
      price: "",
      quantity_available: "",
      categories: "",
    },
    validate: productValidation,
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit: async (values) => {
      try {
        const loadingToastId = toast.loading("Adding...");

        const base64Images = [];
        if (file1) base64Images.push(await convertToBase64(file1));
        if (file2) base64Images.push(await convertToBase64(file2));
        if (file3) base64Images.push(await convertToBase64(file3));

        values.images = base64Images;

        await createProduct(values);
        toast.dismiss(loadingToastId);

        toast.success(<b>Product added Successfully...!</b>);

        // navigate("/dashboard");
      } catch (error) {
        toast.error(<b>Could not add the product.</b>);
      }
    },
  });

  //file upload
  const handleUpload = async (e, setFile) => {
    setFile(e.target.files[0]);
  };

  return (
    <div className="container mx-auto">
      <Toaster position="top-center" reverseOrder={false}></Toaster>

      <div className="flex justify-center items-center min-h-screen">
        <div
          className={`${styles.glass} md:w-4/5 lg:w-3/5 xl:w-2/5`}
          style={{ paddingTop: "3em" }}
        >
          <div className="title flex flex-col items-center">
            <h4 className="text-5xl font-bold">Add a Product</h4>
          </div>

          <form className="py-1" onSubmit={formik.handleSubmit}>
            <div className="textbox flex flex-col items-center gap-6">
              <input
                {...formik.getFieldProps("name")}
                className={styles.textbox}
                type="text"
                placeholder="Product Name*"
              />
              <textarea
                {...formik.getFieldProps("description")}
                className={styles.textbox}
                placeholder="Add a description"
              />
              <input
                {...formik.getFieldProps("price")}
                className={styles.textbox}
                type="number"
                placeholder="Price*"
              />
              <input
                {...formik.getFieldProps("quantity_available")}
                className={styles.textbox}
                type="number"
                placeholder="Quantity*"
              />

              <select
                {...formik.getFieldProps("categories")}
                name="categories"
                id="categories"
                className={` ${styles.select}`}
              >
                <option disabled selected value="">
                  Category
                </option>
                <option value="bracelet">Bracelet</option>
                <option value="necklace">Necklace</option>
                <option value="earrings">Earrings</option>
                <option value="rings">Rings</option>
                <option value="hats">Hats</option>
                <option value="hair">Hair Accessory</option>
                <option value="others">Others</option>
              </select>

              <div className="flex justify-center gap-4">
                <label htmlFor="image1" className={styles.image_upload}>
                  <img
                    src={file1 || avatar}
                    alt="image1"
                    className={styles.image_img}
                  />
                  <input
                    onChange={(e) => handleUpload(e, setFile1)}
                    type="file"
                    id="image1"
                    name="images"
                    style={{ display: "none" }}
                  />
                </label>

                <label htmlFor="image2" className={styles.image_upload}>
                  <img
                    src={file2 || avatar}
                    className={styles.image_img}
                    alt="image2"
                  />
                  <input
                    onChange={(e) => handleUpload(e, setFile2)}
                    type="file"
                    id="image2"
                    name="images"
                  />
                </label>

                <label htmlFor="image3" className={styles.image_upload}>
                  <img
                    src={file3 || avatar}
                    className={styles.image_img}
                    alt="image3"
                  />
                  <input
                    onChange={(e) => handleUpload(e, setFile3)}
                    type="file"
                    id="image3"
                    name="images"
                  />
                </label>
              </div>
              <button className={styles.btn} type="submit">
                Add
              </button>
            </div>
          </form>
          <div className="flex justify-center mt-4 mb-5">
            <Link to="/view" className={styles.backBtn}>
              View Your Products
            </Link>
          </div>

          <Link to="/dashboard" className={styles.backBtn}>
            <FiArrowLeft size={24} />
          </Link>
        </div>
      </div>
    </div>
  );
}
