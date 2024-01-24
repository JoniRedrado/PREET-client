import axios from "axios";
import { useEffect, useState } from "react";
import styles from "./createForm.module.css";
import validation from "../../helpers/validation";

const CreateForm = () => {
    const [hotelData, setHotelData] = useState({
        name: "",
        address: "",
        address_url: "",
        price: "",
        email: "",
        image: "",
        countryId: "",
    });

    const [errors, setErrors] = useState({});
    const [countries, setCountries] = useState([]);

    useEffect(() => {
        const fetchCountries = async () => {
            try {
                const response = await axios.get("http://localhost:3001/countries");
                console.log(response.data);
                setCountries(response.data);
                setHotelData({...hotelData, countryId: response.data[0]})
            } catch (error) {
                console.error("Error fetching countries:", error);
            }
        };

        fetchCountries();
    }, []);

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
                console.log(hotelData);
                const response = await axios.post("http://localhost:3001/hotels", hotelData);

                if (response.data.name) {
                    window.alert("¡Hotel successfully posted!");
                    setHotelData({
                        name: "",
                        address: "",
                        address_url: "",
                        price: "",
                        email: "",
                        image: "",
                        countryId: "",
                    });
                } else {
                    console.error("Error Posting Hotel:", response.data.message);
                }
            } catch (error) {
                console.error("Error:", error);
            }
        } else {
            setErrors(validationErrors);
        }
    };

    return (
        <div className={styles.formContainer}>
            <form onSubmit={handleSubmit}>
                <h2>Post Your Hotel</h2>
                {["name", "address", "address_url", "price", "email", "image"].map((field) => (
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
                            value={hotelData.country}
                            onChange={handleChange}
                        >
                            {countries.map((country) => (
                                <option key={country} value={country}>
                                    {country}
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

export default CreateForm;