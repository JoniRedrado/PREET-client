import { useState } from "react";
import { register } from "../../Components/Auth/Auth";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/authContext";
import style from "../Register/Register.module.css";
import { useDispatch } from "react-redux";
import { showModal } from "../../redux/actions";
import registerValidation from "../../helpers/registerValidation";

function RegisterUser() {
  const [name, setName] = useState("");
  const [last_name, setLast_name] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();
  const auth = useAuth();
  const dispatch = useDispatch();

  const handleRegister = async (option) => {
    if (registerValidation(name, last_name, email, password, setError)) {
      try {
        const data = await register(name, last_name, email, password);
        navigate("/", data);
        dispatch(showModal(option, false));
      } catch (error) {
        setError(error.message);
      }
    }
  };

  const handleGoogleRegister = async () => {
      try {
        await auth.loginWithGoogle();
        navigate("/")
        dispatch(showModal(option, false))
      } catch (error) {
        setError("Error signing in with Google")
      }
  }

  return (
    <div>
      <form className={style.formContainer}>
        <h2>Register User</h2>
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="text"
          placeholder="Last Name"
          value={last_name}
          onChange={(e) => setLast_name(e.target.value)}
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="button" onClick={() => handleRegister("register")}>
          Register
        </button>
        <button type="button" onClick={handleGoogleRegister}>Register with Google</button>
      </form>
      {error && <p>{error}</p>}
    </div>
  );
}

export default RegisterUser;
