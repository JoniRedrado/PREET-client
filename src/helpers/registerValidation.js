const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
const passRegex = /^(?=.*[0-9])(?=.*[^a-zA-Z0-9]).{6,14}$/;

const registerValidation = (data) => {
  const errors = {};

  const requiredFields = ["name", "last_name", "email", "password", "nationality"];

  requiredFields.forEach((field) => {
    const value = data[field];

    if (!value) {
      const formattedFieldName = field.replace('_', ' ').charAt(0).toUpperCase() + field.replace('_', ' ').slice(1);
      errors[field] = `${formattedFieldName} is required.`;
    }
  });

  if (data.name && (data.name.length > 50 || !/^[a-zA-Z]+$/.test(data.name))) {
    errors.name = "Name should be a maximum of 50 characters and contain only letters.";
  }

  if (data.last_name && (data.last_name.length > 50 || !/^[a-zA-Z]+$/.test(data.last_name))) {
    const formattedFieldName = "Last name";
    errors.last_name = `${formattedFieldName} should be a maximum of 50 characters and contain only letters.`;
  }

  if (data.email && !emailRegex.test(data.email)) {
    errors.email = "Invalid email address.";
  }

  if (data.password && !passRegex.test(data.password)) {
    errors.password = "Password should have 6 to 14 characters and include at least one number and one special character.";
  }

  return errors;
};

export default registerValidation;