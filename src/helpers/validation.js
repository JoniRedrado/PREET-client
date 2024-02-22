const validation = (data, t) => {
  const errors = {};

  if (!data.name) {
    errors.name = `${t("registerValidation.name")} ${t(
      "registerValidation.required"
    )}`;
  }
  if (!data.address) {
    errors.address = `${t("CreateForm.address")} ${t(
      "validation.isRequiredF"
    )}`;
  }
  if (!data.address_url) {
    errors.address_url = `${t("CreateForm.addressURL")} ${t(
      "validation.isRequiredF"
    )}`;
  }
  if (!data.email) {
    errors.email = "Email" + t("registerValidation.required");
  }
  if (!data.stars) {
    errors.stars = `${t("CreateForm.stars")} ${t("validation.areRequired")}`;
  }
  if (!data.countryId) {
    errors.countryId = `${t("CreateForm.country")} ${t(
      "registerValidation.required"
    )}`;
  }
  if (!data.image) {
    errors.image = `${t("validation.image")} ${t(
      "registerValidation.required"
    )}`;
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (data.email && !emailRegex.test(data.email)) {
    errors.email = t("registerValidation.messageEmail");
  }

  return errors;
};

export default validation;
