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
