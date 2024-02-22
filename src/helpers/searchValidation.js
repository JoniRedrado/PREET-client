const searchValidation = (startDate, endDate, t) => {
  const errors = {};

  if (startDate === undefined) {
    errors.startDate = t("searchValidation.start_date");
  }

  if (endDate === undefined) {
    errors.endDate = t("searchValidation.end_date");
  }

  if (startDate && endDate && startDate >= endDate) {
    errors.endDate = t("searchValidation.order_date");
  }

  return errors;
};

export default searchValidation;
