import { useState, useEffect, Suspense } from "react";
import axios from "axios";
import validation from "../../helpers/validation";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Loading from "../../assets/Loading.gif";
import { useDarkMode } from "../../DarkModeContext/DarkModeContext";
import swal from "sweetalert";
import { useTranslation } from "react-i18next";
import styles from "./UpdateForm.module.css";

const UpdateForm = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { darkMode } = useDarkMode();
  const { t } = useTranslation();

  const countries = useSelector((state) => state.countries);

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
        const response = await axios.get(
          `${import.meta.env.VITE_BACK_URL}/hotels/detail/${id}`
        );
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
    const validationErrors = validation(hotelData, t);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      try {
        setLoading(true);

        let imageUpdate = hotelData.image;

        if (hotelData.image && hotelData.image.startsWith("blob:")) {
          const formData = new FormData();
          formData.append(
            "file",
            e.target.querySelector('input[type="file"]').files[0]
          );
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
            console.error(
              "Error: No 'secure_url' found in Cloudinary response"
            );
          }
        }

        const updatedData = {
          ...hotelData,
          image: imageUpdate,
        };

        const responseBackend = await axios.put(
          `${import.meta.env.VITE_BACK_URL}/hotels/${id}`,
          updatedData
        );

        if (responseBackend.data.name) {
          swal({
            title: "¡Hotel succesfully updated!",
            text: "The hotel has been updated and it's ready to start booking",
            icon: "success",
            button: null,
          });
          navigate(`/detail/${id}`);
        } else {
          console.error("Error updating hotel:", responseBackend.data.message);
        }

        setLoading(false);
      } catch (error) {
        swal({
          title: "Error updating Hotel",
          text: "An error occurred while updating the Hotel. Check the information and try again",
          icon: "error",
          button: null,
        });
        console.error("Error:", error);
        setLoading(false);
      }
    } else {
      setErrors(validationErrors);
    }
  };

  const fieldLabels = {
    name: t("UpdateForm.name"),
    address: t("UpdateForm.address"),
    address_url: t("UpdateForm.addressURL"),
    price: t("UpdateForm.price"),
    email: "Email ",
  };

  return (
    <div
      className={`${styles.formContainer} ${darkMode ? styles.darkMode : ""}`}
    >
      <h1>{t("UpdateForm.title")}</h1>
      <form onSubmit={handleSubmit}>
        {Object.keys(fieldLabels).map((field) => (
          <div key={field} className={styles.fieldContainer}>
            <label>
              {fieldLabels[field]}
              <input
                type="text"
                name={field}
                placeholder={fieldLabels[field]}
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
            {t("UpdateForm.stars")}
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
            {t("UpdateForm.country")}
            <select
              className={styles.countrySelect}
              name="countryId"
              value={hotelData.countryId}
              onChange={handleChange}
            >
              <option value={hotelData.country}>
                {`${t("UpdateForm.current")} ${hotelData.country.name}`}
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
            {t("UpdateForm.upload")}
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className={`${styles.input} ${errors.image && styles.error}`}
            />
            {errors.image && (
              <span className={styles.errors}>{errors.image}</span>
            )}
          </label>
          {hotelData.image && (
            <>
              <img
                src={hotelData.image}
                alt="Preview"
                className={styles.imagePreview}
              />
              <button
                type="button"
                onClick={handleImageRemove}
                className={styles.removeButton}
              >
                {t("UpdateForm.remove")}
              </button>
            </>
          )}
        </div>

        <div className={styles.sendContainer}>
          <button className={styles.formButton} type="submit">
            {t("UpdateForm.post")}
          </button>
          {loading && (
            <img src={Loading} alt="Loading" className={styles.loading} />
          )}
        </div>
      </form>
    </div>
  );
};

export default function WrappedApp() {
  return (
    <Suspense>
      <UpdateForm />
    </Suspense>
  );
}
