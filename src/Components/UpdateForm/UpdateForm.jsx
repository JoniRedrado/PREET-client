import axios from "axios";
import { useState, useEffect } from "react";
import validation from "../../helpers/validation";
import styles from "./UpdateForm.module.css"

const UpdateForm = ({ initialData, onSubmit, countries }) => {
    const [hotelData, setHotelData] = useState({});
    const [errors, setErrors] = useState({});

    useEffect(() => {
        setHotelData(initialData || {});
        setErrors({});
    }, [initialData]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setHotelData((prevData) => ({
            ...prevData,
            [name]: value,
        }));

        setErrors((prevErrors) => ({
            ...prevErrors,
            [name]: "",
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const validationErrors = validation(hotelData);
        setErrors(validationErrors);

        if (Object.keys(validationErrors).length === 0) {
            try {
                const response = await axios.put(`http://localhost:3001/hotels/${hotelData.id}`, hotelData);
                console.log("Hotel actualizado:", response.data);
                onSubmit(hotelData);
            } catch (error) {
                console.error("Error al actualizar el hotel:", error);
            }
        } else {
            setErrors(validationErrors);
        }
    };

    return (
        <div className={styles.formContainer}>
            <form onSubmit={handleSubmit}>
                {["name", "address", "address_url", "price", "email"].map((field) => (
                    <div key={field} className={styles.fieldContainer}>
                        <label>
                            <input
                                type="text"
                                name={field}
                                placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
                                value={hotelData[field] || ""} 
                                onChange={handleChange}
                                className={`${styles.input} ${errors[field] && styles.error}`}
                            />
                            {errors[field] && <span className={styles.errors}>{errors[field]}</span>}
                        </label>
                    </div>
                ))}

                <div className={styles.fieldContainer}>
                    <label>
                        <select
                            className={styles.countrySelect}
                            name="country"
                            value={hotelData.country || ""} 
                            onChange={handleChange}
                        >
                            <option value="" disabled>
                                Select a Country
                            </option>
                            {countries.map((country) => (
                                <option key={country.id} value={country.name}>
                                    {country.name}
                                </option>
                            ))}
                        </select>
                        {errors.country && (
                            <span className={styles.errors}>{errors.country}</span>
                        )}
                    </label>
                </div>

                <button className={styles.button} type="submit">
                    POST
                </button>
            </form>
        </div>
    );
};

export default UpdateForm;