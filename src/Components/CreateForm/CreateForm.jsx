import { useState, useEffect, Suspense } from "react";
import axios from "axios";
import validation from "../../helpers/validation";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getAllCountries } from "../../redux/actions";
import Loading from "../../assets/Loading.gif";
import swal from "sweetalert";
import { useDarkMode } from "../../DarkModeContext/DarkModeContext";
import { useTranslation } from "react-i18next";
import styles from "./CreateForm.module.css";

const CreateForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { darkMode } = useDarkMode();
  const { t } = useTranslation();

  const [hotelData, setHotelData] = useState({
    name: "",
    address: "",
    addressURL: "",
    price: "",
    email: "",
    image: null,
    country: "",
    countryId: "",
    stars: "",
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    dispatch(getAllCountries());
  }, [dispatch]);
  const countries = useSelector((state) => state.countries);

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

        setErrors((prevErrors) => ({
          ...prevErrors,
          image: "",
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
            const updatedData = {
              ...hotelData,
              image: cloudinaryData.secure_url,
            };

            const responseBackend = await axios.post(
              `${import.meta.env.VITE_BACK_URL}/hotels`,
              updatedData
            );

            if (responseBackend.data.name) {
              swal({
                title: t("successTitle"),
                text: t("successText"),
                icon: "success",
                button: null,
              });

              const createdHotelId = responseBackend.data.id;
              navigate(`/detail/${createdHotelId}`);
              setHotelData({
                name: "",
                address: "",
                addressURL: "",
                price: "",
                email: "",
                image: null,
                country: "",
                countryId: null,
                stars: 1,
              });
            } else {
              console.error(
                "Error Posting Hotel:",
                responseBackend.data.message
              );
            }
          } else {
            console.error(
              "Error: No 'secure_url' found in Cloudinary response"
            );
          }

          setLoading(false);
        }
      } catch (error) {
        swal({
          title: t("CreateForm.errorTitle"),
          text: t("CreateForm.errorText"),
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
    name: t("CreateForm.name"),
    address: t("CreateForm.address"),
    addressURL: t("CreateForm.addressURL"),
    price: t("CreateForm.price"),
    email: t("CreateForm.email"),
  };

  return (
    <div
      className={`${styles.formContainer} ${darkMode ? styles.darkMode : ""}`}
    >
      <h1 className={styles.title}>{t("CreateForm.title")}</h1>
      <form onSubmit={handleSubmit}>
        {Object.keys(fieldLabels).map((field) => (
          <div key={field} className={styles.fieldContainer}>
            <label>
              {fieldLabels[field]}
              <input
                type="text"
                name={field}
                placeholder={t(`CreateForm.${field}`)}
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
            {t("CreateForm.stars")}
            <select
              className={`${styles.starsSelect} ${
                errors.stars && styles.error
              }`}
              name="stars"
              value={hotelData.stars}
              onChange={handleChange}
            >
              <option value="" disabled>
                {t("CreateForm.optionSt")}
              </option>
              {[1, 2, 3, 4, 5].map((star) => (
                <option key={star} value={star}>
                  {star}
                </option>
              ))}
            </select>
            {errors.stars && (
              <span className={styles.errors}>{errors.stars}</span>
            )}
          </label>
        </div>

        <div className={styles.fieldContainer}>
          <label>
            {t("CreateForm.country")}
            <select
              className={`${styles.countrySelect} ${
                errors.countryId && styles.error
              }`}
              name="countryId"
              value={hotelData.countryId}
              onChange={handleChange}
            >
              <option value="" disabled>
                {t("CreateForm.optionCt")}
              </option>
              {countries.map((country) => (
                <option key={country} value={country}>
                  {country}
                </option>
              ))}
            </select>
            {errors.countryId && (
              <span className={styles.errors}>{errors.countryId}</span>
            )}
          </label>
        </div>

        <div className={styles.imageContainer}>
          <label>
            {t("CreateForm.image")}
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
                {t("CreateForm.remove")}
              </button>
            </>
          )}
        </div>
        <div className={styles.sendContainer}>
          <button className={styles.formButton} type="submit">
            {t("CreateForm.post")}
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
      <CreateForm />
    </Suspense>
  );
}
