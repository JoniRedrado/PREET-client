const emailRegex =
  /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
const passRegex = /^(?=.*[0-9])(?=.*[^a-zA-Z0-9]).{6,14}$/;

const registerValidation = (data, t) => {
  const errors = {};


  if (data.name && (data.name.length > 50 || !/^[a-zA-Z]+$/.test(data.name))) {
    errors.name = t("registerValidation.messageName");
  }

  if (!data.last_Name) {
    errors.last_Name = `${t("registerValidation.lastName")} ${t(
      "registerValidation.required"
    )}`;
  }

  if (
    data.last_name &&
    (data.last_name.length > 50 || !/^[a-zA-Z]+$/.test(data.last_name))
  ) {
    const formattedFieldName = t("registerValidation.lastName");
    errors.last_name = `${formattedFieldName} ${t(
      "registerValidation.messageLastName"
    )}`;
  }

  if (!data.last_name) {
    errors.last_name = `${t("registerValidation.lastName")} ${t(
      "registerValidation.required"
    )}`;
  }

  if (!data.email) {
    errors.email = "Email" + t("registerValidation.required");
  }

  if (data.email && !emailRegex.test(data.email)) {
    errors.email = t("registerValidation.messageEmail");
  }

  if (!data.password) {
    errors.password = `${t("registerValidation.password")} ${t(
      "validation.isRequiredF"
    )}`;
  }

  if (data.password && !passRegex.test(data.password)) {
    errors.password = t("registerValidation.messagePassword");
  }

  return errors;
};

export default registerValidation;
