import React, { useEffect, useState } from "react";
import axios from "axios";
import styles from "./updateForm.module.css"; 
import validation from "../../helpers/validation";
import { useParams, useNavigate } from "react-router-dom"
import { useSelector } from "react-redux";

const UpdateForm = () => {
  const navigate = useNavigate()
  const { id } = useParams();

  const countries = useSelector((state) => state.countries)

  const [hotelData, setHotelData] = useState({
    name: "",
    address: "",
    address_url: "",
    price: "",
    email: "",
    image: null,
    country: "",
    countryId: null,
    stars: 1,
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchHotelData = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/hotels/detail/${id}`);
        setHotelData(response.data);
      } catch (error) {
        console.error("Error fetching hotel data:", error);
      }
    };

    fetchHotelData();
  }, [id]);

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
        setLoading(true);
  
        let imageUpdate = hotelData.image;
  
        if (hotelData.image && hotelData.image.startsWith("blob:")) {
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
            imageUpdate = cloudinaryData.secure_url;
          } else {
            console.error("Error: No 'secure_url' found in Cloudinary response");
          }
        }
  
        const updatedData = {
          ...hotelData,
          image: imageUpdate,
        };
  
        const responseBackend = await axios.put(
          `http://localhost:3001/hotels/${id}`,
          updatedData
        );
  
        if (responseBackend.data.name) {
          window.alert("Hotel successfully updated!");
          navigate(`/detail/${id}`)
        } else {
          console.error("Error updating hotel:", responseBackend.data.message);
        }
  
        setLoading(false);
      } catch (error) {
        console.error("Error:", error);
        setLoading(false);
      }
    } else {
      setErrors(validationErrors);
    }
  };

  const fieldLabels = {
    name: "Name ",
    address: "Address ",
    address_url: "Address URL ",
    price: "Price ",
    email: "Email "
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
          <label>
            Stars 
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
          <label>
            Country 
            <select
              className={styles.countrySelect}
              name="countryId"
              value={hotelData.countryId}
              onChange={handleChange}
            >
              <option value={hotelData.country} >
                {`País actual: ${hotelData.country.name}`}
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
          UPDATE
        </button>
      </form>
    </div>
  );
};

export default UpdateForm;