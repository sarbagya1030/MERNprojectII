import toast from "react-hot-toast";
import { authenticate } from "./helper.js";

//validate LoginPage username
export async function usernameValidate(values) {
  const errors = usernameVerify({}, values);
  if (values.username) {
    //check user existance
    const { status } = await authenticate(values.username);

    if (status !== 200) {
      errors.exist = toast.error("User doesnot exist...!");
    }
  }
  return errors;
}

//validate LoginPage password
export async function passwordValidate(values) {
  const errors = passwordVerify({}, values);
  return errors;
}

//validate LoginPage reset password
export async function resetPasswordValidation(values) {
  const errors = passwordVerify({}, values);

  if (values.password !== values.confirm_pwd) {
    errors.exist = toast.error("Password does not match...!");
  }
  return errors;
}

//validate register form
export async function registerValidation(values) {
  const errors = usernameVerify({}, values);
  passwordVerify(errors, values);
  emailVerify(errors, values);

  return errors;
}

//validate profile page
export async function profileValidation(values) {
  const errors = emailVerify({}, values);
  return errors;
}

//.........................................................

//validate password
function passwordVerify(error = {}, values) {
  const specialChars = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;

  if (!values.password) {
    error.password = toast.error("Password Required...!");
  } else if (/\s/.test(values.password)) {
    error.password = toast.error("Wrong Password...!");
  } else if (values.password.length < 8) {
    error.password = toast.error("Password must be more than 8 characters ");
  } else if (!specialChars.test(values.password)) {
    error.password = toast.error("Password must have special character");
  }

  return error;
}

// validate username
function usernameVerify(error = {}, values) {
  if (!values.username) {
    error.username = toast.error("Username Required...!");
  } else if (/\s/.test(values.username)) {
    error.username = toast.error("Invalid Username...!");
  }
  //   else if (values.username.includes("")) {
  //     error.username = toast.error("Invalid Username...!");
  //   }

  return error;
}

//validate email
function emailVerify(error = {}, values) {
  if (!values.email) {
    error.email = toast.error("Email Required...!");
  } else if (/\s/.test(values.email)) {
    error.email = toast.error("Wrong Email...!");
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    error.email = toast.error("Invalid email address...!");
  }

  return error;
}

// validate add product form
export async function productValidation(values) {
  const errors = {};

  // Product Name validation
  if (!values.name) {
    errors.name = toast.error("Product Name is required");
  }

  // Price validation
  if (!values.price) {
    errors.price = toast.error("Price is required");
  } else if (isNaN(values.price) || values.price <= 0) {
    errors.price = toast.error("Price must be a valid positive number");
  }

  // Quantity validation
  if (!values.quantity_available) {
    errors.quantity_available = toast.error("Quantity is required");
  } else if (
    isNaN(values.quantity_available) ||
    values.quantity_available <= 0
  ) {
    errors.quantity_available = toast.error(
      "Quantity must be a valid positive number"
    );
  }

  // Category validation
  if (!values.categories) {
    errors.categories = toast.error("Category is required");
  }

  return errors;
}

// Validate updated product form
export async function updateProductValidation(values) {
  const errors = {};

  // Price validation
  if (values.price && (isNaN(values.price) || values.price <= 0)) {
    errors.price = toast.error("Price must be a valid positive number");
  }

  // Quantity validation
  if (
    values.quantity_available &&
    (isNaN(values.quantity_available) || values.quantity_available <= 0)
  ) {
    errors.quantity_available = toast.error(
      "Quantity must be a valid positive number"
    );
  }

  return errors;
}
