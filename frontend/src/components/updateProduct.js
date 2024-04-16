import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import styles from "../styles/Username.module.css";
import { FiArrowLeft } from "react-icons/fi";
import avatar from "../assets/add.png";
import { updateProduct } from "../helper/producthelper.js";
import { updateProductValidation } from "../helper/validate.js";
import useFetchProductId from "../hooks/fetchProduct.hook.js";

export default function UpdateProduct() {
  const { productId } = useParams();
  // console.log("productId:", productId);
  const [updatedProductData, setUpdatedProductData] = useState({
    name: "",
    description: "",
    price: 0,
    quantity_available: 0,
    categories: [],
    images: [],
  });

  const [{ isLoading, apiData, serverError }] = useFetchProductId(productId);

  useEffect(() => {
    if (apiData) {
      setUpdatedProductData({
        name: apiData.name || "",
        description: apiData.description || "",
        price: apiData.price || 0,
        quantity_available: apiData.quantity_available || 0,
        categories: apiData.categories || [],
        images: apiData.images || [],
      });
    }
  }, [apiData, productId]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUpdatedProductData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    // Implement file upload logic here
  };

  const handleUpdateProduct = async (e) => {
    e.preventDefault();

    try {
      const errors = await updateProductValidation(updatedProductData);
      if (Object.keys(errors).length !== 0) {
        toast.error("Please fill all required fields");
        return;
      }

      const updatedProduct = await updateProduct(productId, updatedProductData);

      toast.success("Product updated successfully");
    } catch (error) {
      toast.error("Failed to update product");
    }
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
            <h4 className="text-5xl font-bold">Update Product</h4>
          </div>

          <form className="py-1" onSubmit={handleUpdateProduct}>
            <div className="textbox flex flex-col items-center gap-6">
              <input
                className={styles.textbox}
                type="text"
                placeholder="Product Name*"
                name="name"
                value={updatedProductData.name}
                onChange={handleInputChange}
              />
              <textarea
                className={styles.textbox}
                placeholder="Add a description"
                name="description"
                value={updatedProductData.description}
                onChange={handleInputChange}
              />
              <input
                className={styles.textbox}
                type="number"
                placeholder="Price*"
                name="price"
                value={updatedProductData.price}
                onChange={handleInputChange}
              />
              <input
                className={styles.textbox}
                type="number"
                placeholder="Quantity*"
                name="quantity_available"
                value={updatedProductData.quantity_available}
                onChange={handleInputChange}
              />

              <select
                name="categories"
                id="categories"
                className={` ${styles.select}`}
                value={updatedProductData.categories}
                onChange={handleInputChange}
              >
                <option disabled value="">
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
                  <img src={avatar} alt="image1" className={styles.image_img} />
                  <input
                    type="file"
                    id="image1"
                    name="images"
                    style={{ display: "none" }}
                    onChange={handleFileChange}
                  />
                </label>
              </div>
              <button className={styles.btn} type="submit">
                Update
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
