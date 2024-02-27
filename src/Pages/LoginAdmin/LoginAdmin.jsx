import { showModal, setToken } from "../../redux/actions";
import { useAuth } from "../../context/authContext";
import { login } from "../../Components/Auth/Auth";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import styles from "./LoginAdmin.module.css";
import { useState, Suspense } from "react";
import { useDispatch } from "react-redux";

const LoginAdmin = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async () => {
    try {
      const data = await login(email, password);
      if (data.message) {
        setError("Invalid Email or Password");
      } else {
        if (data.rol === "admin") {
          dispatch(setToken(true));
          navigate("/dashboard");
        } else {
          window.alert("tu usuario no es admin");
        }
        dispatch(showModal("login", false));
      }
    } catch (error) {
      setError("Invalid Email or Password");
    }
  };

  return (
    <>
      <form className={styles.form}>
        <h2>{t("LoginAdmin.title")}</h2>
        <input
          type="email"
          placeholder={t("LoginAdmin.email")}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder={t("LoginAdmin.password")}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="button" onClick={handleLogin}>
          {t("LoginAdmin.title")}
        </button>
      </form>
      {/* {error && (
                <span >{error}</span>
              )} */}
    </>
  );
};

export default function WrappedApp() {
  return (
    <Suspense>
      <LoginAdmin />
    </Suspense>
  );
}
