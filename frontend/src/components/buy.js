import React, { useEffect, useState } from "react";
import { useLocation, Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import { FiArrowLeft } from "react-icons/fi";
import styles from "../styles/Username.module.css";
import axios from "axios";
import { getUserById } from "../helper/helper.js";

export default function ProductBuy() {
  const location = useLocation();
  const { product } = location.state || {};
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const [userDetails, setUserDetails] = useState(null);

  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };

  useEffect(() => {
    const fetchUserDetails = async () => {
      if (product?.posted_by) {
        try {
          const user = await getUserById(product.posted_by);
          setUserDetails(user);
        } catch (error) {
          console.error("Failed to fetch user details:", error);
        }
      }
    };

    fetchUserDetails();
  }, [product?.posted_by]);

  const handlePayment = async (amount, userId, productId) => {
    try {
      const response = await axios.post(
        "http://localhost:8080/api/products/create-payment",
        {
          amount: amount,
          userId: userId,
          productId: productId,
        },
        {
          headers,
        }
      );

      window.location.href = response.data.url;
    } catch (error) {
      console.error("Failed to initiate payment:", error);
      alert("Payment initiation failed. Please try again.");
    }
  };

  const formik = useFormik({
    initialValues: {
      quantity: "",
      phoneNumber: "",
    },
    onSubmit: async (values, { setSubmitting }) => {
      setSubmitting(false);
    },
  });

  if (!product) {
    return <div>Product not found.</div>;
  }

  return (
    <div className="container mx-auto">
      <div className="flex justify-center items-center min-h-screen">
        <div
          className={`${styles.glass} md:w-4/5 lg:w-3/5 xl:w-2/5`}
          style={{ paddingTop: "3em" }}
        >
          <div className="title flex flex-col items-center">
            <h4 className="text-5xl font-bold">{product.name}</h4>
          </div>

          <div className="px-6 py-4">
            <img
              className="w-full mb-4"
              src={product.product_images[0]}
              alt={product.name}
            />

            <p className="text-gray-700 text-base mb-4">
              {product.description}
            </p>
            <p className="text-gray-700 text-base mb-4">
              <b>Price:</b> Rs {product.price}
            </p>
            <p className="text-gray-700 text-base mb-4">
              <b>Available Quantity:</b> {product.quantity_available}
            </p>
            <p className="text-gray-700 text-base mb-4">
              <b>Category:</b> {product.categories}
            </p>
            <div className="text-gray-700 text-base mb-4 flex items-center">
              <b className="mr-2">Posted by:</b>
              {userDetails ? (
                <div className="flex items-center">
                  <img
                    src={userDetails.profile}
                    alt={userDetails.username}
                    className="w-12 h-12 rounded-full mr-2"
                  />
                  <Link
                    to={`/profileshow/${userDetails.username}`}
                    className="text-blue-500 hover:underline"
                  >
                    {userDetails.username}
                  </Link>
                </div>
              ) : (
                <span>Loading user details...</span>
              )}
            </div>
          </div>

          <form className="py-1" onSubmit={formik.handleSubmit}>
            <div className="textbox flex flex-col items-center gap-6">
              <input
                {...formik.getFieldProps("quantity")}
                className={styles.textbox}
                type="number"
                placeholder="Quantity*"
              />
              <input
                {...formik.getFieldProps("phoneNumber")}
                className={styles.textbox}
                type="tel"
                placeholder="Phone Number*"
              />
              <button
                className={styles.btn}
                onClick={() => {
                  handlePayment(product.price, product.posted_by, product._id);
                }}
              >
                Continue
              </button>
            </div>
          </form>

          <Link to="/dashboard" className={styles.backBtn}>
            <FiArrowLeft size={24} />
          </Link>
        </div>
      </div>
    </div>
  );
}
