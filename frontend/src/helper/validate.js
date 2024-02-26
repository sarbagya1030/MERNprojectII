import toast from "react-hot-toast";

//validate LoginPage username
export async function usernameValidate(values) {
  const errors = usernameVerify({}, values);
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

//validate username
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
