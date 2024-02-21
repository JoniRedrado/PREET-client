import { useState, Suspense } from "react";
import { register } from "../../Components/Auth/Auth";
import { useNavigate } from "react-router-dom";
import registerValidation from "../../helpers/registerValidation";
import { useDarkMode } from "../../DarkModeContext/DarkModeContext";
import { useTranslation } from "react-i18next";
import { Paper } from "@mui/material";
import Carousel from "react-material-ui-carousel";
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
      });
    const [errors, setErrors] = useState({});

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
            <h2>¡Descubre tu próximo destino con PREET!</h2>
            <p>Explora, reserva y vive experiencias únicas en hoteles de ensueño en toda Latino America. Regístrate ahora y comienza a crear recuerdos inolvidables. Tu próxima aventura está a solo un clic de distancia. ¡Únete a PREET hoy mismo!</p>
        </div>
      </div>
      <div className={styles.register}>
      <form className={styles.formContainer}>
        <div className={styles.formHeader}>
        <h2>¡Unete a PREET hoy mismo¡</h2>
        <p>Regístrate para comenzar a interactuar</p>
        </div>
        <div className={styles.inputContainer}>
          <input
            type="text"
            placeholder={t("Register.name")}
            name="name"
            value={registerData.name}
            onChange={handleChange}
          />
          {errors.name && <p className={styles.error}>{errors.name}</p>}
        </div>

        <div className={styles.inputContainer}>
          <input
            type="text"
            placeholder={t("Register.lastName")}
            name="last_name"
            value={registerData.last_name}
            onChange={handleChange}
          />
          {errors.last_name && (
            <p className={styles.error}>{errors.last_name}</p>
          )}
        </div>

        <div className={styles.inputContainer}>
          <input
            type="email"
            placeholder={t("Register.email")}
            name="email"
            value={registerData.email}
            onChange={handleChange}
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
          />
          {errors.password && <p className={styles.error}>{errors.password}</p>}
        </div>

        <button type="button" onClick={() => handleRegister("register")}>
          {t("Register.registerBtn")}
        </button>
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