import { useState, Suspense } from "react";
import { register } from "../../Components/Auth/Auth";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/authContext";
import { useDispatch } from "react-redux";
import { showModal } from "../../redux/actions";
import registerValidation from "../../helpers/registerValidation";
import { useDarkMode } from "../../DarkModeContext/DarkModeContext";
import { useTranslation } from "react-i18next";
import style from "../Register/Register.module.css";

function RegisterUser() {
  const { t } = useTranslation();

  const [registerData, setRegisterData] = useState({
    name: "",
    last_name: "",
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const auth = useAuth();
  const dispatch = useDispatch();
  const darkMode = useDarkMode();

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
        dispatch(showModal(option, false));
      } catch (error) {
        console.log(error.message);
      }
    } else {
      setErrors(validationErrors);
    }
  };

  return (
    <div className={`${style.register} ${darkMode ? style.darkMode : ""}`}>
      <form className={style.formContainer}>
        <h2>{t("Register.title")}</h2>
        <div className={style.inputContainer}>
          <input
            type="text"
            placeholder={t("Register.name")}
            name="name"
            value={registerData.name}
            onChange={handleChange}
          />
          {errors.name && <p className={style.error}>{errors.name}</p>}
        </div>

        <div className={style.inputContainer}>
          <input
            type="text"
            placeholder={t("Register.lastName")}
            name="last_name"
            value={registerData.last_name}
            onChange={handleChange}
          />
          {errors.last_name && (
            <p className={style.error}>{errors.last_name}</p>
          )}
        </div>

        <div className={style.inputContainer}>
          <input
            type="email"
            placeholder={t("Register.email")}
            name="email"
            value={registerData.email}
            onChange={handleChange}
          />
          {errors.email && <p className={style.error}>{errors.email}</p>}
        </div>

        <div className={style.inputContainer}>
          <input
            type="password"
            placeholder={t("Register.password")}
            name="password"
            value={registerData.password}
            onChange={handleChange}
          />
          {errors.password && <p className={style.error}>{errors.password}</p>}
        </div>

        <button type="button" onClick={() => handleRegister("register")}>
          {t("Register.registerBtn")}
        </button>
      </form>
    </div>
  );
}
export default function WrappedApp() {
  return (
    <Suspense>
      <RegisterUser />
    </Suspense>
  );
}
