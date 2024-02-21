const validation = (data) => {
    console.log(data)
    const errors = {};

    const requiredFields = ["name", "address", "address_url", "email", "stars", "countryId", "image"];

    requiredFields.forEach((field) => {
        const value = data[field];

        if (!value ) {
            errors[field] = `${field.charAt(0).toUpperCase() + field.slice(1)} is required.`;
        }
    });

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (data.email && !emailRegex.test(data.email)) {
        errors.email = "Invalid email address.";
    }

    return errors;
};

export default validation;