import axios from "axios";
import Loading from "../../assets/Loading.gif";
import validation from "../../helpers/validation";
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
    image:null,
    country:"",
    countryId:"",
    stars:1,
    imagePreview: null,
  })

  const [errors, setErrors] = useState({});

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
    setUpdateHotel({
      ...updateHotel,
      [name]: value
    });

    setErrors({
      ...errors,
      [name]: "",
    });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      try {
        const imagePreviewURL = URL.createObjectURL(file);

        setUpdateHotel((prevData) => ({
          ...prevData,
          image: file,
          imagePreview: imagePreviewURL,
        }));
      } catch (error) {
        console.error("Error creating object URL for image:", error);
      }
    }
  };

  const handleImageRemove = () => {
    setRoomsData((prevData) => ({
      ...prevData,
      image: null,
      // imagePreview: null,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validation(hotelData, t);
    setErrors(validationErrors);

    let imageUpdate = updateHotel.image;

    if (updateHotel.image && updateHotel.image.startsWith("blob:")) {
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
        value={updateHotel.address} 
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
        value={updateHotel.address_url} 
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
        value={updateHotel.email} 
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
         value={updateHotel.stars} 
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
          {updateHotel.image && (
          <>
            <img
              src={URL.createObjectURL(updateHotel.image)}
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
  )

}

export default function WrappedApp() {
  return (
    <Suspense>
      <UpdateForm />
    </Suspense>
  );
}


// import { useState, useEffect, Suspense } from "react";
// import axios from "axios";
// import validation from "../../helpers/validation";
// import { useParams, useNavigate } from "react-router-dom";
// import { useSelector } from "react-redux";
// import Loading from "../../assets/Loading.gif";
// import { useDarkMode } from "../../DarkModeContext/DarkModeContext";
// import swal from "sweetalert";
// import { useTranslation } from "react-i18next";
// import styles from "./UpdateForm.module.css";

// const UpdateForm = () => {
//   const navigate = useNavigate();
//   const { id } = useParams();
//   const { darkMode } = useDarkMode();
//   const { t } = useTranslation();

//   const countries = useSelector((state) => state.countries);

//   const [hotelData, setHotelData] = useState({
//     name: "",
//     address: "",
//     address_url: "",
//     price: "",
//     email: "",
//     image: null,
//     country: "",
//     countryId: null,
//     stars: 1,
//   });

//   const [errors, setErrors] = useState({});
//   const [loading, setLoading] = useState(false);

//   useEffect(() => {
//     const fetchHotelData = async () => {
//       try {
//         const response = await axios.get(
//           `${import.meta.env.VITE_BACK_URL}/hotels/detail/${id}`
//         );
//         setHotelData(response.data);
//       } catch (error) {
//         console.error("Error fetching hotel data:", error);
//       }
//     };

//     fetchHotelData();
//   }, [id]);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setHotelData((prevData) => ({
//       ...prevData,
//       [name]: value,
//     }));

//     setErrors((prevErrors) => ({
//       ...prevErrors,
//       [name]: "",
//     }));
//   };

//   const handleImageChange = (e) => {
//     const file = e.target.files[0];

//     if (file) {
//       try {
//         const imagePreviewURL = URL.createObjectURL(file);

//         setHotelData((prevData) => ({
//           ...prevData,
//           image: imagePreviewURL,
//         }));
//       } catch (error) {
//         console.error("Error creating object URL for image:", error);
//       }
//     }
//   };

//   const handleImageRemove = () => {
//     setHotelData((prevData) => ({
//       ...prevData,
//       image: null,
//     }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const validationErrors = validation(hotelData, t);
//     setErrors(validationErrors);

//     if (Object.keys(validationErrors).length === 0) {
//       try {
//         setLoading(true);

//         let imageUpdate = hotelData.image;

//         if (hotelData.image && hotelData.image.startsWith("blob:")) {
//           const updatedData = new FormData();
//           formData.append(
//             "file",
//             e.target.querySelector('input[type="file"]').files[0]
//           );
//           formData.append("upload_preset", "PREET2024");

//           const responseCloudinary = await fetch(
//             "https://api.cloudinary.com/v1_1/drntvj4ut/image/upload",
//             {
//               method: "POST",
//               body: formData,
//             }
//           );

//           const cloudinaryData = await responseCloudinary.json();

//           if (cloudinaryData.secure_url) {
//             imageUpdate = cloudinaryData.secure_url;
//           } else {
//             console.error(
//               "Error: No 'secure_url' found in Cloudinary response"
//             );
//           }
//         }

//         const updatedData = {
//           ...hotelData,
//           image: imageUpdate,
//         };

//         const responseBackend = await axios.put(
//           `${import.meta.env.VITE_BACK_URL}/hotels/${id}`,
//           updatedData
//         );

//         if (responseBackend.data.name) {
//           swal({
//             title: "¡Hotel succesfully updated!",
//             text: "The hotel has been updated and it's ready to start booking",
//             icon: "success",
//             button: null,
//           });
//           navigate(`/detail/${id}`);
//         } else {
//           console.error("Error updating hotel:", responseBackend.data.message);
//         }

//         setLoading(false);
//       } catch (error) {
//         swal({
//           title: "Error updating Hotel",
//           text: "An error occurred while updating the Hotel. Check the information and try again",
//           icon: "error",
//           button: null,
//         });
//         console.error("Error:", error);
//         setLoading(false);
//       }
//     } else {
//       setErrors(validationErrors);
//     }
//   };

//   const fieldLabels = {
//     name: t("UpdateForm.name"),
//     address: t("UpdateForm.address"),
//     address_url: t("UpdateForm.addressURL"),
//     price: t("UpdateForm.price"),
//     email: "Email ",
//   };

//   return (
//     <div
//       className={`${styles.formContainer} ${darkMode ? styles.darkMode : ""}`}
//     >
//       <h1>{t("UpdateForm.title")}</h1>
//       <form onSubmit={handleSubmit}>
//         {Object.keys(fieldLabels).map((field) => (
//           <div key={field} className={styles.fieldContainer}>
//             <label>
//               {fieldLabels[field]}
//               <input
//                 type="text"
//                 name={field}
//                 placeholder={fieldLabels[field]}
//                 value={hotelData[field] || ""}
//                 onChange={handleChange}
//                 className={`${styles.input} ${errors[field] && styles.error}`}
//               />
//               {errors[field] && (
//                 <span className={styles.errors}>{errors[field]}</span>
//               )}
//             </label>
//           </div>
//         ))}

//         <div className={styles.fieldContainer}>
//           <label>
//             {t("UpdateForm.stars")}
//             <select
//               className={styles.starsSelect}
//               name="stars"
//               value={hotelData.stars}
//               onChange={handleChange}
//             >
//               {[1, 2, 3, 4, 5].map((star) => (
//                 <option key={star} value={star}>
//                   {star}
//                 </option>
//               ))}
//             </select>
//           </label>
//         </div>

//         <div className={styles.fieldContainer}>
//           <label>
//             {t("UpdateForm.country")}
//             <select
//               className={styles.countrySelect}
//               name="countryId"
//               value={hotelData.countryId}
//               onChange={handleChange}
//             >
//               <option value={hotelData.country}>
//                 {`${t("UpdateForm.current")} ${hotelData.country.name}`}
//               </option>
//               {countries.map((country) => (
//                 <option key={country} value={country}>
//                   {country}
//                 </option>
//               ))}
//             </select>
//             {errors.country && (
//               <span className={styles.errors}>{errors.country}</span>
//             )}
//           </label>
//         </div>

//         <div className={styles.imageContainer}>
//           <label>
//             {t("UpdateForm.upload")}
//             <input
//               type="file"
//               accept="image/*"
//               onChange={handleImageChange}
//               className={`${styles.input} ${errors.image && styles.error}`}
//             />
//             {errors.image && (
//               <span className={styles.errors}>{errors.image}</span>
//             )}
//           </label>
//           {hotelData.image && (
//             <>
//               <img
//                 src={hotelData.image}
//                 alt="Preview"
//                 className={styles.imagePreview}
//               />
//               <button
//                 type="button"
//                 onClick={handleImageRemove}
//                 className={styles.removeButton}
//               >
//                 {t("UpdateForm.remove")}
//               </button>
//             </>
//           )}
//         </div>

//         <div className={styles.sendContainer}>
//           <button className={styles.formButton} type="submit">
//             {t("UpdateForm.post")}
//           </button>
//           {loading && (
//             <img src={Loading} alt="Loading" className={styles.loading} />
//           )}
//         </div>
//       </form>
//     </div>
//   );
// };

// export default function WrappedApp() {
//   return (
//     <Suspense>
//       <UpdateForm />
//     </Suspense>
//   );
// }
