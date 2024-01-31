import React, { useEffect, useState } from "react";
import axios from "axios";
import styles from "./CreateForm.module.css";
import validation from "../../helpers/validation";
import { useNavigate } from "react-router-dom";

const CreateForm = () => {

  const navigate = useNavigate()
  const [hotelData, setHotelData] = useState({
    name: "",
    address: "",
    address_url: "",
    price: "",
    email: "",
    image: null, 
    countryId: "",
    stars: 1,
  });

  const [errors, setErrors] = useState({});
  const [countries, setCountries] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await axios.get("http://localhost:3001/countries");
        setCountries(response.data);
        setHotelData({ ...hotelData, countryId: response.data[0] });
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

  const handleImageChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      try {
        // Crear una URL de objeto para la previsualización
        const imagePreviewURL = URL.createObjectURL(file);

        setHotelData((prevData) => ({
          ...prevData,
          image: imagePreviewURL,
        }));
      } catch (error) {
        console.error("Error creating object URL for image:", error);
      }
    }
  };

  const handleImageRemove = () => {
    // Eliminar la previsualización de la imagen
    setHotelData((prevData) => ({
      ...prevData,
      image: null,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validation(hotelData);
    setErrors(validationErrors);
  
    if (Object.keys(validationErrors).length === 0) {
      try {
        if (hotelData.image && hotelData.image.startsWith("blob:")) {
          setLoading(true);
          const formData = new FormData();
          formData.append("file", e.target.querySelector('input[type="file"]').files[0]);
          formData.append("upload_preset", "PREET2024");
  
          const responseCloudinary = await fetch(
            "https://api.cloudinary.com/v1_1/drntvj4ut/image/upload",
            {
              method: "POST",
              body: formData,
            }
          );
  
          const cloudinaryData = await responseCloudinary.json();
  
          if (cloudinaryData.secure_url) {
            const updatedData = {
              ...hotelData,
              image: cloudinaryData.secure_url,
            };
  
            const responseBackend = await axios.post(
              "http://localhost:3001/hotels",
              updatedData
            );
  
            if (responseBackend.data.name) {
              window.alert("¡Hotel successfully posted!");
              const createdHotelId = responseBackend.data.id;
              navigate(`/detail/${createdHotelId}`);
              setHotelData({
                name: "",
                address: "",
                address_url: "",
                price: "",
                email: "",
                image: null,
                countryId: "",
                stars: 1,
              });
            } else {
              console.error("Error Posting Hotel:", responseBackend.data.message);
            }
          } else {
            console.error("Error: No 'secure_url' found in Cloudinary response");
          }
  
          setLoading(false);
        }
      } catch (error) {
        console.error("Error:", error);
        setLoading(false);
      }
    } else {
      setErrors(validationErrors);
    }
  };
const fieldLabels = {
  name: "Name",
  address: "Address",
  address_url: "Address URL",
  price: "Price",
  email: "Email"
}

  return (
    <div className={styles.formContainer}>
      <form onSubmit={handleSubmit}>
        {Object.keys(fieldLabels).map((field) => (
          <div key={field} className={styles.fieldContainer}>
            <label> 
              {fieldLabels[field]}
              <input
                type="text"
                name={field}
                placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
                value={hotelData[field] || ""}
                onChange={handleChange}
                className={`${styles.input} ${errors[field] && styles.error}`}
              />
              {errors[field] && (
                <span className={styles.errors}>{errors[field]}</span>
              )}
            </label>
          </div>
        ))}

        <div className={styles.fieldContainer}>
          <label>Stars
            <select
              className={styles.starsSelect}
              name="stars"
              value={hotelData.stars}
              onChange={handleChange}
            >
              {[1, 2, 3, 4, 5].map((star) => (
                <option key={star} value={star}>
                {star}
                </option>
              ))}
            </select>
          </label>
        </div>

        <div className={styles.fieldContainer}>
          <label> Country
            <select
              className={styles.countrySelect}
              name="countryId"
              value={hotelData.countryId}
              onChange={handleChange}
            >
              <option value="" disabled>
                Country
              </option>
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

        <div className={styles.imageContainer}>
          <label>
            Upload Image
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className={styles.input}
            />
          </label>
          {loading && <p>Loading...</p>}
          {hotelData.image && (
            <>
              <img src={hotelData.image} alt="Preview" className={styles.imagePreview} />
              <button type="button" onClick={handleImageRemove}>
                Remove
              </button>
            </>
          )}
        </div>

        <button className={styles.formButton} type="submit">
          POST
        </button>
      </form>
    </div>
  );
};

export default CreateForm;