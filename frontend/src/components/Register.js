import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import avatar from "../assets/profile.jpg";
import styles from "../styles/Username.module.css";
import toast, { Toaster } from "react-hot-toast";
import { useFormik } from "formik";
import { registerValidation } from "../helper/validate.js";
import convertToBase64 from "../helper/convert.js";
import { registerUser } from "../helper/helper.js";

export default function Register() {
  const navigate = useNavigate();
  const [file, setFile] = useState();
  const formik = useFormik({
    initialValues: {
      email: "",
      username: "",
      password: "",
    },
    validate: registerValidation,
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit: async (values) => {
      try {
        const loadingToastId = toast.loading("Creating...");
        values.profile = file || "";

        await registerUser(values);
        toast.dismiss(loadingToastId);

        toast.success(<b>Registered Successfully...!</b>);

        navigate("/");
      } catch (error) {
        toast.error(<b>Could not Register.</b>);
      }
    },
  });

  //file upload
  const onUpload = async (e) => {
    const base64 = await convertToBase64(e.target.files[0]);
    setFile(base64);
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
            <h4 className="text-5xl font-bold">Register</h4>
            <span className="py-4 text-xl w-2/3 text-center text-gray-600">
              Happy to join you!
            </span>
          </div>

          <form className="py-1" onSubmit={formik.handleSubmit}>
            <div className="profile flex justify-center py-4">
              <label htmlFor="profile">
                <img
                  src={file || avatar}
                  className={styles.profile_img}
                  alt="avatar"
                ></img>
              </label>
              <input
                onChange={onUpload}
                type="file"
                id="profile"
                name="profile"
              ></input>
            </div>

            <div className="textbox flex flex-col items-center gap-6">
              <input
                {...formik.getFieldProps("email")}
                className={styles.textbox}
                type="text"
                placeholder="Email*"
              ></input>
              <input
                {...formik.getFieldProps("username")}
                className={styles.textbox}
                type="text"
                placeholder="Username*"
              ></input>
              <input
                {...formik.getFieldProps("password")}
                className={styles.textbox}
                type="password"
                placeholder="Password*"
              ></input>
              <button className={styles.btn} type="submit">
                Register
              </button>
            </div>

            <div className="text-center py-4">
              <span className="text-gray-500">
                Already Registered?
                <Link className="text-purple-600" to="/username">
                  Login Now
                </Link>
              </span>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
