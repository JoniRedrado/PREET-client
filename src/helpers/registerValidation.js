const emailRegex =
  /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
const passRegex = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,10}$/;

function registerValidation(input) {
  let errors = {};

  if (!input.name) {
    errors.name = "User name required";
  } else if (input.name.length > 50) {
    errors.name = "50 characters max";
  } else if (!/^[a-zA-Z]+$/.test(input.name)) {
    errors.name = "Numbers or special characters are not allowed";
  } else {
    errors.name = "";
  }

  if (!input.surname) {
    errors.surname = "User surname required";
  } else if (input.surname.length > 50) {
    errors.surname = "50 characters max";
  } else if (!/^[a-zA-Z]+$/.test(input.surname)) {
    errors.surname = "Numbers or special characters are not allowed";
  } else {
    errors.surname = "";
  }

  if (!input.username) {
    errors.username = "Username is required";
  } else if (input.username.length > 22) {
    errors.username = "22 characters max";
  } else if (input.username.length < 5) {
    errors.username = "5 characters minimum";
  } else {
    errors.username = "";
  }

  if (!input.email) {
    errors.email = "An email is required";
  } else if (!emailRegex.test(input.email)) {
    errors.email = "Please enter a valid email address";
  } else {
    errors.email = "";
  }

  if (!input.password) {
    errors.password = "A password is required";
  } else if (!passRegex.test(input.password)) {
    errors.password =
      "Password should have 6 to 14 characters and at least one number and special character";
  } else {
    errors.password = "";
  }

  if (!input.confirmation) {
    errors.confirmation = "You need to confirm your password";
  } else if (input.confirmation !== input.password) {
    errors.confirmation = "The password confirmation does not match";
  } else {
    errors.confirmation = "";
  }

  return errors;
}

export default registerValidation;
