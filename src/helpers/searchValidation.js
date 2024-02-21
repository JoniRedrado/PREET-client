
const searchValidation = (startDate, endDate) => {
  const errors = {};

  if (startDate === undefined) {
    errors.startDate = "Check-in date is required"
  }

  if (endDate === undefined) {
    errors.endDate = "Check-out date is required"
  }

  if (startDate && endDate && (startDate >= endDate )) {
    errors.endDate = "Check-out must be after check-in"
  }

  return errors;
};

export default searchValidation;