import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { FiArrowLeft } from "react-icons/fi";
import styles from "../styles/Username.module.css";
import { getReviewsByProductId } from "../helper/producthelper";
import { getUserById } from "../helper/helper.js";

export default function ShowReview() {
  const { productid } = useParams();
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const allReviews = await getReviewsByProductId(productid);
        const reviewsWithUserInfo = await Promise.all(
          allReviews.map(async (review) => {
            const user = await getUserById(review.userId);
            return { ...review, user };
          })
        );
        setReviews(reviewsWithUserInfo);
      } catch (error) {
        console.error("Error fetching reviews:", error);
      }
    };

    fetchReviews();
  }, [productid]);

  return (
    <div className="container mx-auto">
      <div className="flex justify-center items-center min-h-screen">
        <div className={`${styles.glass} md:w-4/5 lg:w-3/5 xl:w-2/5`}>
          <div className="mb-4">
            <h4 className="text-5xl font-bold text-center">Product Reviews</h4>
          </div>
          {reviews.map((review) => (
            <div
              key={review._id}
              className="bg-white shadow-md rounded-md p-4 mb-4"
            >
              <div className="flex items-center mb-4">
                <img
                  src={review.user.profile}
                  alt={review.user.username}
                  className="w-12 h-12 rounded-full mr-4"
                />
                <span className="font-bold text-lg">
                  {review.user.username}
                </span>
              </div>
              <p className="text-gray-700 mb-4">{review.review}</p>
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
