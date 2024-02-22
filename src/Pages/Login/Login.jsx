import { useState, Suspense } from "react";
import { login } from "../../Components/Auth/Auth";
import { useAuth } from "../../context/authContext";
import { showModal } from "../../redux/actions";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import styles from "../Login/Login.module.css";

function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const { t } = useTranslation();
  const dispatch = useDispatch();
  const auth = useAuth();
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const data = await login(email, password);
      if (data.message) {
        setError(t("Login.error"));
      } else {
        if (data.rol === "admin") {
          navigate("/dashboard");
        } else {
          navigate("/");
        }
        dispatch(showModal("login", false));
      }
    } catch (error) {
      setError(t("Login.error"));
    }
  };

  const handleGoogleLogin = async () => {
    try {
      await auth.loginWithGoogle();
      dispatch(showModal("login", false));
    } catch (error) {
      setError("Error signing in with Google");
    }
  };
  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleLogin();
    }
  };

  return (
    <div>
      <form className={styles.loginContainer}>
        <h2>{t("Login.title")}</h2>
        <input
          type="email"
          placeholder={t("Register.email")}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className={`${styles.input} ${error && styles.error}`}
        />
        <input
          type="password"
          placeholder={t("Register.password")}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          onKeyPress={handleKeyPress}
          className={`${styles.input} ${error && styles.error}`}
        />
        <button type="button" onClick={handleLogin}>
          {t("Login.logInBtn")}
        </button>
        <button type="button" onClick={handleGoogleLogin}>
          {t("Login.GlgLogInBtn")} <i className="bi bi-google"></i>{" "}
        </button>
      </form>
      {error && <span className={styles.error}>{error}</span>}
    </div>
  );
}

export default function WrappedApp() {
  return (
    <Suspense>
      <LoginForm />
    </Suspense>
  );
}
