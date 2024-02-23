import { useState, Suspense } from "react";
import { login } from "../../Components/Auth/Auth";
import { useAuth } from "../../context/authContext";
import { useNavigate, Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Paper } from "@mui/material";
import registerValidation from "../../helpers/registerValidation";
import Carousel from "react-material-ui-carousel";
import styles from "./NewLogin.module.css";
import Logo from "../../assets/logo.jpg";
import Logo2 from "../../assets/logo.jpg";
import image1 from "../../assets/slider1.jpg";
import image2 from "../../assets/slider2.jpg";
import image3 from "../../assets/slider3.jpg";
import image4 from "../../assets/slider4.jpg";
import google from "../../assets/google.png";

const images = [image1, image2, image3, image4];

const NewLogin = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const auth = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async () => {
    try {
      const data = await login(email, password);
      if (!data || data.error) {
        setError(t("Login.error"));
      } else {
        navigate(data.rol === "admin" ? "/dashboard" : "/");
      }
    } catch (error) {
      setError(t("Login.error"));
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "email") {
      setEmail(value);
    } else if (name === "password") {
      setPassword(value);
    }
    setError("");
  };

  const handleGoogleLogin = async () => {
    try {
      await auth.loginWithGoogle();
      navigate("/")
    } catch (error) {
      setError("Error signing in with Google");
      console.log("Error");
    }
  };

  return (
    <div className={styles.mainDiv}>
      <div className={styles.contentContainer}>
        <img src={Logo} alt="logo" className={styles.logo} />
        <div className={styles.carouselContainer}>
          <Carousel
            stopAutoPlayOnHover
            navButtonsAlwaysInvisible
            indicatorContainerProps={{
              style: {
                color: "red",
              },
            }}
          >
            {images.map((image, index) => (
              <Paper
                key={index}
                style={{
                  backgroundColor: "transparent",
                  boxShadow: "none",
                  height: "300px",
                }}
              >
                <img
                  src={image}
                  alt={`slide-${index}`}
                  className={styles.slideImage}
                  style={{
                    width: "100%",
                    height: "300px",
                    objectFit: "contain",
                  }}
                />
              </Paper>
            ))}
          </Carousel>
        </div>
        <div className={styles.textContainer}>
          <h2>{t("Login.sliderTitle")}</h2>
          <p>{t("Login.sliderText")}</p>
        </div>
      </div>
      <div className={styles.login}>
        <form className={styles.formContainer}>
          <div className={styles.formHeader}>
            <img src={Logo2} alt="logo2" className={styles.logo2} />
            <h2>{t("Login.title")}</h2>
            <p>{t("Login.subtitle")}</p>
          </div>
          <div className={styles.inputContainer}>
            <input
              type="email"
              placeholder="Email"
              name="email"
              value={email}
              onChange={handleChange}
              className={`${styles.input} ${error && styles.error}`}
            />
          </div>
          <div className={styles.inputContainer}>
            <input
              type="password"
              placeholder={t("Register.password")}
              name="password"
              value={password}
              onChange={handleChange}
              className={`${styles.input} ${error && styles.error}`}
            />
            {error && <span className={styles.error}>{error}</span>}
          </div>
          <div className={styles.buttonContainer}>
            <button
              type="button"
              onClick={handleLogin}
              className={styles.button1}
            >
              {t("Login.logInBtn")}
            </button>
            <button
              type="button"
              onClick={handleGoogleLogin}
              className={styles.button2}
            >
              <img src={google} alt="google" className={styles.google} />{" "}
              {t("Login.GlgLogInBtn")}
            </button>
          </div>
          <div className={styles.footer}>
            <p>{t("Login.question")}</p>
            <Link to="/register" className={styles.link}>
              <p>{t("Login.register")}</p>
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
      <NewLogin />
    </Suspense>
  );
}
