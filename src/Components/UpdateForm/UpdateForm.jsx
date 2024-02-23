import axios from "axios";
// import Loading from "../../assets/Loading.gif";
// import validation from "../../helpers/validation";
import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect, Suspense  } from "react"
import { useSelector } from "react-redux"
import { useTranslation } from "react-i18next";
import { useDarkMode } from "../../DarkModeContext/DarkModeContext";
import styles from "./UpdateForm.module.css";
import swal from "sweetalert";


const UpdateForm = () => {

  const { id } = useParams();
  const { t } = useTranslation();
  const countries = useSelector((state) => state.countries)
  const { darkMode } = useDarkMode();
  const [loading, setLoading] = useState(false);


  const navigate = useNavigate();

  const [updateHotel, setUpdateHotel] = useState({
    name:"",
    address:"",
    address_url:"",
    email:"",
    country:"",
    countryId:"",
    stars:1,
    image:null,
    imagePreview:null
  })


  useEffect(() => {
    const fecthUpdateData = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BACK_URL}/hotels/detail/${id}`,
          updateHotel
        );
        // console.log(response.data);
        setUpdateHotel(response.data);
      } catch (error) {
        console.error("Error fetching Hotels data:", error);
      }
    };
    fecthUpdateData();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUpdateHotel((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  
  const handleImageChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      try {
        const imagePreviewURL = URL.createObjectURL(file);

        setUpdateHotel((prevData) => ({
          ...prevData,
          // image: file,
          imagePreview: imagePreviewURL,
        }));
      } catch (error) {
        console.error("Error creating object URL for image:", error);
      }
    }
  };

  const handleImageRemove = () => {
    setUpdateHotel(prevData => ({
      ...prevData,
      // image: null,
      imagePreview: null,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    let imageUpdate = updateHotel.image;
  
    if (updateHotel.imagePreview && updateHotel.imagePreview.startsWith('blob:')) {
       const formData = new FormData();
      formData.append(
        "file",
        e.target.querySelector('input[type="file"]').files[0]
      );
      formData.append("upload_preset", "PREET2024");
  
      try {
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
      } catch (error) {
        console.error("Error uploading image to Cloudinary:", error);
      }
    }
  
    const updatedData = {
      ...updateHotel,
      image: imageUpdate,
    };
    
    try {
      await axios.put(
        `${import.meta.env.VITE_BACK_URL}/hotels/${id}`,
        updatedData
      );
      navigate("/dashboard");
      swal("Success!", "Hotel created successfully", "success");
    } catch (error) {
      console.error("Error updating room:", error);
    }
  };
  
  return(
    <div className={`${styles.formContainer} ${darkMode ? styles.darkMode : ""}`}>
      <h1>{t("UpdateForm.title")}</h1>
      <form onSubmit={handleSubmit} >
      <div  className={styles.fieldContainer}>
        <div className={styles.inputContainer}>
        <input 
        type="text" 
        name="name" 
        placeholder="Enter name" 
        value={updateHotel.name} 
        onChange={handleChange}
        className={styles.input}
        />
        </div>
        <div className={styles.inputContainer}>
        <input 
        type="text" 
        name="address" 
        placeholder="Enter address" 
        value={updateHotel.address} 
        onChange={handleChange} 
        className={styles.input} 
        />
        </div>
        <div className={styles.inputContainer}>
        <input 
        type="text" 
        name="address_url" 
        placeholder="Enter address URL" 
        value={updateHotel.address_url} 
        onChange={handleChange} 
        className={styles.input}
        />
       
        </div>
        <div className={styles.inputContainer}>
        <input 
        type="text" 
        name="email" 
        placeholder="Enter email" 
        value={updateHotel.email} 
        onChange={handleChange} 
        className={styles.input}
        />
        </div>
        
        <div className={styles.inputContainer}>
        <select 
          className={styles.starsSelect}
          name="stars"
         value={updateHotel.stars} 
         onChange={handleChange}>
          <option value="" disabled>Stars</option>
          {[1, 2, 3, 4, 5].map((star) => (
            <option key={star} value={star}>
              {star}
            </option>
          ))}
        </select>
        </div>
        <div className={styles.inputContainer}>
          <select
            className={styles.countrySelect}
            name="countryId" 
            value={updateHotel.countryId} 
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
         </div>
         </div>
         <div className={styles.imageContainer}> 
         {updateHotel.imagePreview && (
            <div>
              <h3>{t("UpdateRooms.crntImage")}</h3>
              <img src={updateHotel.imagePreview} alt="Preview" />
              <button onClick={handleImageRemove}>{t("Remove Image")}</button>
            </div>
          )}
          <label>{t("UpdateRooms.newImage")}</label>
          <input type="file" accept="image/*" onChange={handleImageChange} />
        </div>
        <button type="submit">{t("UpdateRooms.update")}</button>
     
        
      </form>
    </div>
  )

}

export default function WrappedApp() {
  return (
    <Suspense>
      <UpdateForm />
    </Suspense>
  );
}