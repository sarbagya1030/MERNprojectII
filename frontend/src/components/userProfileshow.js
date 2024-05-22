import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import avatar from "../assets/profile.jpg";
import { getUser } from "../helper/helper.js";
import { useNavigate, Link } from "react-router-dom";

import styles from "../styles/Username.module.css";
import { FiArrowLeft } from "react-icons/fi";

export default function ProfileShow() {
  const { username } = useParams();
  const [userDetails, setUserDetails] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const { data } = await getUser({ username });
        setUserDetails(data);
      } catch (error) {
        console.error("Failed to fetch user details:", error);
      }
    };

    fetchUserDetails();
  }, [username]);

  if (!userDetails) return <h1 className="text-2xl font-bold">Loading...</h1>;

  return (
    <div className="container mx-auto">
      <div className="flex justify-center items-center min-h-screen">
        <div
          className={`${styles.glass} w-full md:w-4/5 lg:w-3/5 xl:w-2/5`}
          style={{ paddingTop: "3em" }}
        >
          <div className="title flex flex-col items-center">
            <h4 className="text-5xl font-bold">
              {userDetails.firstName} {userDetails.lastName}
            </h4>
          </div>

          <div className="profile flex justify-center py-4">
            <img
              src={userDetails.profile || avatar}
              className={styles.profile_img}
              alt="avatar"
            />
          </div>

          <div className="textbox flex flex-col items-center gap-6">
            <div className="name flex flex-col md:flex-row w-full md:w-3/4 gap-10">
              <div className="text-center md:text-left">
                <p className="text-gray-500">
                  <strong>Email:</strong>Email: {userDetails.email}
                </p>
                <p className="text-gray-500">
                  <strong>Contact Number:</strong> {userDetails.mobile}
                </p>
                <p className="text-gray-500">
                  <strong>Location:</strong> {userDetails.address}
                </p>
              </div>
            </div>
          </div>

          <Link to="/dashboard" className={styles.backBtn}>
            <FiArrowLeft size={24} />
          </Link>
        </div>
      </div>
    </div>
  );
}
