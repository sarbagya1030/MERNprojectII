import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { FiArrowLeft } from "react-icons/fi";
import styles from "../styles/Username.module.css";
import { postReview } from "../helper/producthelper";
import toast, { Toaster } from "react-hot-toast";

export default function AddReview() {
  const { productId } = useParams();
  const [userId, setUserId] = useState(null);
  const token = localStorage.getItem("token");
  const [reviewContent, setReviewContent] = useState("");

  useEffect(() => {
    if (token) {
      const base64Url = token.split(".")[1];
      const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
      const decodedToken = JSON.parse(atob(base64));
      setUserId(decodedToken.userId);
    }
  }, [token]);

  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const authToken = localStorage.getItem("token");
      const config = {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      };

      const response = await postReview(
        productId,
        userId,
        reviewContent,
        config
      );
      console.log("Review added successfully:", response);

      setReviewContent("");

      toast.success("Review added successfully!");
    } catch (error) {
      console.error("Error adding review:", error);
      toast.error("Failed to add review. Please try again later.");
    }
  };

  return (
    <div className="container mx-auto">
      <Toaster position="top-center" reverseOrder={false}></Toaster>

      <div className="flex justify-center items-center min-h-screen">
        <div className={`${styles.glass} md:w-4/5 lg:w-3/5 xl:w-2/5`}>
          <div className="mb-4">
            <h4 className="text-5xl font-bold text-center">Add a Review</h4>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="mb-6">
              <textarea
                className="w-full h-40 px-3 py-2 text-base leading-normal resize-none border rounded-md focus:outline-none focus:border-blue-500"
                placeholder="Write your review here..."
                value={reviewContent}
                onChange={(e) => setReviewContent(e.target.value)}
              />
            </div>

            <div className="flex justify-center">
              <button className={styles.btn} type="submit">
                Add Review
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
