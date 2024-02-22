import { useState, Suspense } from "react";
import { register } from "../../Components/Auth/Auth";
import { Link, useNavigate } from "react-router-dom";
import registerValidation from "../../helpers/registerValidation";
import { useDarkMode } from "../../DarkModeContext/DarkModeContext";
import { useTranslation } from "react-i18next";
import { Paper } from "@mui/material";
import Carousel from "react-material-ui-carousel";
import { countries } from "countries-list";
import styles from "./NewRegister.module.css";
import Logo from "../../assets/logo.jpg"
import image1 from "../../assets/slider1.jpg"
import image2 from "../../assets/slider2.jpg"
import image3 from "../../assets/slider3.jpg"
import image4 from "../../assets/slider4.jpg"

const images = [
    image1,
    image2,
    image3,
    image4
];

const NewRegister = () => {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const darkMode = useDarkMode();
    const [registerData, setRegisterData] = useState({
        name: "",
        last_name: "",
        email: "",
        password: "",
        nationality: "",
      });
    const [errors, setErrors] = useState({});

    const allCountries = Object.values(countries).map((country) => country.name);
    //Handle functions
    const handleChange = (e) => {
        const { name, value } = e.target;
        setRegisterData((prevData) => ({
          ...prevData,
          [name]: value,
        }));
        setErrors((prevErrors) => ({
          ...prevErrors,
          [name]: "",
        }));
      };
      const handleRegister = async (option) => {
        const validationErrors = registerValidation(registerData);
    
        if (Object.keys(validationErrors).length === 0) {
          try {
            const data = await register(registerData);
            navigate("/", data);
          } catch (error) {
            console.log(error.message);
          }
        } else {
          setErrors(validationErrors);
        }
      };
  return (
    <div className={styles.mainDiv}>
      <div className={styles.contentContainer}>
      <img src={Logo} alt="logo" className={styles.logo}/>
        <div className={styles.carouselContainer}>
        <Carousel
          style={{
            backgroundColor: "transparent", // Hace el fondo transparente
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
          stopAutoPlayOnHover
          navButtonsAlwaysInvisible
          indicatorContainerProps={{
            style: {
              color:"red"
            }
          }}
        >
          {images.map((image, index) => (
            <Paper 
            key={index}
            style={{
                backgroundColor:"transparent",
                boxShadow:"none",
                height:"300px"
            }}
            >
              <img
                src={image}
                alt={`slide-${index}`}
                className={styles.slideImage}
                style={{ width: "100%", height: "300px", objectFit: "contain" }} // Centra la imagen
              />
            </Paper>
          ))}
        </Carousel>
        </div>
        <div className={styles.textContainer}>
            <h2>Discover your next destination with PREET!</h2>
            <p>Explore, book, and live unique experiences in dreamy hotels throughout Latin America. Sign up now and start creating unforgettable memories.</p>
        </div>
      </div>
      <div className={styles.register}>
      <form className={styles.formContainer}>
        <div className={styles.formHeader}>
        <img src={Logo} alt="logo2" className={styles.logo2}/>
        <h2>Join PREET!</h2>
        <p>Sign up to start interacting.</p>
        </div>
        <div className={styles.fullNameContainer}>
            <div className={styles.nameContainer}>
            <input
            type="text"
            placeholder={t("Register.name")}
            name="name"
            value={registerData.name}
            onChange={handleChange}
            className={`${styles.inputName} ${errors.name && styles.inputError}`}
          />
          {errors.name && <p className={styles.error2}>{errors.name}</p>}
            </div>
            <div className={styles.nameContainer}>
            <input
            type="text"
            placeholder={t("Register.lastName")}
            name="last_name"
            value={registerData.last_name}
            onChange={handleChange}
            className={`${styles.inputLastName} ${errors.last_name && styles.inputError}`}
          />
          {errors.last_name && (
            <p className={styles.error2}>{errors.last_name}</p>
          )}
            </div>
        </div>
        <div className={styles.inputContainer}>
        <select
            name="nationality"
            value={registerData.nationality}
            onChange={handleChange}
            className={`${styles.select} ${errors.nationality && styles.inputError}`}
        >
            <option value="" disabled selected>
                Select your residency country
            </option>
            {allCountries.map((country, index) => (
                <option key={index} value={country}>
                {country}
                </option>
            ))}
        </select>
            {errors.nationality && (
                <p className={styles.error}>{errors.nationality}</p>
            )}
        </div>


        <div className={styles.inputContainer}>
          <input
            type="email"
            placeholder={t("Register.email")}
            name="email"
            value={registerData.email}
            onChange={handleChange}
            className={`${styles.input} ${errors.email && styles.inputError}`}
          />
          {errors.email && <p className={styles.error}>{errors.email}</p>}
        </div>

        <div className={styles.inputContainer}>
          <input
            type="password"
            placeholder={t("Register.password")}
            name="password"
            value={registerData.password}
            onChange={handleChange}
            className={`${styles.input} ${errors.password && styles.inputError}`}
          />
          {errors.password && <p className={styles.error}>{errors.password}</p>}
        </div>

        <button type="button" onClick={() => handleRegister("register")} className={styles.button}>
          {t("Register.registerBtn")}
        </button>
        <div className={styles.footer}>
            <p>Already have an account?</p>
            <Link to="/login" className={styles.link}>
                <p>Log in</p>
            </Link>
        </div>
      </form>
      </div>
    </div>
  );
};

export default function WrappedApp() {
    return (
      <Suspense>
        <NewRegister/>
      </Suspense>
    );
  }