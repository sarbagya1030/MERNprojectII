import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FiArrowLeft } from "react-icons/fi";
import styles from "../styles/Username.module.css";
import { getReviewsByProductId } from "../helper/producthelper";
import axios from "axios";

export default function ShowReview() {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const productId = "your_product_id"; // Replace "your_product_id" with the actual product id
        const reviews = await getReviewsByProductId(productId);
        setReviews(reviews);
      } catch (error) {
        console.error("Error fetching reviews:", error);
      }
    };

    fetchReviews();
  }, []);

  return (
    <div className="container mx-auto">
      <div className="flex justify-center items-center min-h-screen">
        <div className={`${styles.glass} md:w-4/5 lg:w-3/5 xl:w-2/5`}>
          <div className="mb-4">
            <h4 className="text-5xl font-bold text-center">Product Reviews</h4>
          </div>
          {reviews.map((review) => (
            <div
              key={review._id} // Assuming MongoDB assigns the id to _id
              className="bg-white shadow-md rounded-md p-4 mb-4"
            >
              <div className="flex items-center mb-2">
                <img
                  src={review.userPicture}
                  alt={review.userName}
                  className="w-12 h-12 rounded-full mr-2"
                />
                <span className="font-bold">{review.userName}</span>
              </div>
              <p>{review.reviewContent}</p>
            </div>
          ))}

          <Link to="/dashboard" className={styles.backBtn}>
            <FiArrowLeft size={24} />
          </Link>
        </div>
      </div>
    </div>
  );
}
