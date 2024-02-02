const emailRegex =
  /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
const passRegex = /^(?=.*[0-9])(?=.*[^a-zA-Z0-9]).{6,14}$/;

function registerValidation(name, last_name, email, password, setError) {
  let error = "";

  if (!name) {
    error = "User name required";
  } else if (name.length > 50) {
    error = "50 characters max";
  } else if (!/^[a-zA-Z]+$/.test(name)) {
    error = "Numbers or special characters are not allowed";
  }

  if (!last_name) {
    error = "User last name required";
  } else if (last_name.length > 50) {
    error = "50 characters max";
  } else if (!/^[a-zA-Z]+$/.test(last_name)) {
    error = "Numbers or special characters are not allowed";
  }

  if (!email) {
    error = "An email is required";
  } else if (!emailRegex.test(email)) {
    error = "Please enter a valid email address";
  }

  if (!password) {
    error = "A password is required";
  } else if (!passRegex.test(password)) {
    error =
      "Password should have 6 to 14 characters and at least one number and special character";
  }

  setError(error);
  return !error;
}

export default registerValidation;
