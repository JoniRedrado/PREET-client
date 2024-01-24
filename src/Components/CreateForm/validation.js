const validation = (data) => {
    const errors = {};

    const requiredFields = ["name", "address", "address_url", "price", "email", "country"];

    requiredFields.forEach((field) => {
        const value = data[field];

        if (!value || value.trim() === "") {
            errors[field] = `${field.charAt(0).toUpperCase() + field.slice(1)} is required.`;
        }
    });

    // Validación de email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (data.email && !emailRegex.test(data.email)) {
        errors.email = "Invalid email address.";
    }

    // Validación de precio (asumiendo que es un número)
    if (isNaN(parseFloat(data.price)) || !isFinite(data.price) || data.price <= 0) {
        errors.price = "Price must be a valid positive number.";
    }

    return errors;
};

export default validation;