import axios from "axios";
import { useState, useEffect, Suspense} from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useSelector, useDispatch } from "react-redux";
import { getAllCountries } from "../../redux/actions";
import validation from "../../helpers/validation";
import { useDarkMode } from "../../DarkModeContext/DarkModeContext";
import Loading from "../../assets/Loading.gif";
import swal from "sweetalert";
import styles from "./CreateForm.module.css";

const CreateForm = () => {
  const navigate = useNavigate();
  const { darkMode } = useDarkMode();
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const countries = useSelector((state) => state.countries);

  useEffect(() => {
    dispatch(getAllCountries());
  }, [dispatch]);

  const [formData, setFormData] = useState({
    name: "",
    address: "",
    address_url: "",
    email: "",
    image: null,
//  country: "",
    countryId: "",
    stars: "",
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    setErrors({...errors, [name]:""})
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setFormData({ ...formData, image: file });

    setErrors({...errors, image:"" })
  };

  const handleImageRemove = () =>{
    setFormData({ ...formData, image: null });
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
  
  
    const validationErrors = validation(formData, t);

  
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
  
    let imageUpload = formData.image;
  
    if (formData.image) {
      const formDataCloudinary = new FormData();
      formDataCloudinary.append("file", formData.image);
      formDataCloudinary.append("upload_preset", "PREET2024");
  
      try {
        console.log("Uploading image to Cloudinary...");
        const responseCloudinary = await fetch(
          "https://api.cloudinary.com/v1_1/drntvj4ut/image/upload",
          {
            method: "POST",
            body: formDataCloudinary,
          }
        );
  
        const cloudinaryData = await responseCloudinary.json();
  
        if (cloudinaryData.secure_url) {
          imageUpload = cloudinaryData.secure_url;
          console.log("Image uploaded successfully:", imageUpload);
        } else {
          console.error("Error: No 'secure_url' found in Cloudinary response");
        }
      } catch (error) {
        console.error("Error uploading image to Cloudinary:", error);
      }
    }
  
    const hotelData = {
      ...formData,
      image: imageUpload,
    };
  
    console.log("Sending hotel data to server:", hotelData);
  
    try {
      console.log("Sending request to create hotel...");
      await axios.post(`${import.meta.env.VITE_BACK_URL}/hotels`, hotelData);
      navigate("/createrooms")
      swal("Hotel created successfully!", {
        icon: "success",
      });

    } catch (error) {
      console.error("Error creating hotel:", error);
    }
  };

  return (
    <div
    className={`${styles.formContainer} ${darkMode ? styles.darkMode : ""}`}
    >
      <h1 className={styles.title}>{t("CreateForm.title")}</h1>
      <form onSubmit={handleSubmit}>
        <div  className={styles.fieldContainer}>
        <div className={styles.inputContainer}>
        <input 
        type="text" 
        name="name" 
        placeholder="Enter name" 
        value={formData.name} 
        onChange={handleChange}
        className={`${styles.input} ${
          errors.name && styles.error
        }`}
        />
        {errors.name && (
                <span className={styles.errors}>{errors.name}</span>
              )}
        </div>
        <div className={styles.inputContainer}>
        <input 
        type="text" 
        name="address" 
        placeholder="Enter address" 
        value={formData.address} 
        onChange={handleChange} 
        className={`${styles.input} ${
          errors.address && styles.error
        }`}
        />
        {errors.address && (
                <span className={styles.errors}>{errors.address}</span>
              )}
        </div>
        <div className={styles.inputContainer}>
        <input 
        type="text" 
        name="address_url" 
        placeholder="Enter address URL" 
        value={formData.address_url} 
        onChange={handleChange} 
        className={`${styles.input} ${
          errors.address_url && styles.error
        }`}
        />
        {errors.address_url && (
                <span className={styles.errors}>{errors.address_url}</span>
              )}
        </div>
        <div className={styles.inputContainer}>
        <input 
        type="text" 
        name="email" 
        placeholder="Enter email" 
        value={formData.email} 
        onChange={handleChange} 
        className={`${styles.input} ${
          errors.email && styles.error
        }`}
        />
        {errors.email && (
                <span className={styles.errors}>{errors.email}</span>
              )}
        </div>
        
        <div className={styles.inputContainer}>
        <select 
          className={`${styles.starsSelect} ${
            errors.stars && styles.error
          }`}
          name="stars"
         value={formData.stars} 
         onChange={handleChange}>
          <option value="" disabled>Stars</option>
          {[1, 2, 3, 4, 5].map((star) => (
            <option key={star} value={star}>
              {star}
            </option>
          ))}
        </select>
        {errors.stars && (
              <span className={styles.errors}>{errors.stars}</span>
            )}
        </div>
        <div className={styles.inputContainer}>
          <select
            className={`${styles.countrySelect} ${
              errors.countryId && styles.error
            }`}
            name="countryId" 
            value={formData.countryId} 
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
           {errors.countryId && (
              <span className={styles.errors}>{errors.countryId}</span>
            )}
         </div>
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
        {formData.image && (
          <>
            <img
              src={URL.createObjectURL(formData.image)}
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
        <button  className={styles.formButton} type="submit">
          {t("CreateForm.post")}
        </button>
        {loading && (
            <img src={Loading} alt="Loading"  className={styles.loading} />
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
