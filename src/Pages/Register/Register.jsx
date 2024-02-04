import { useState } from "react";
import { register } from "../../Components/Auth/Auth";
import { useNavigate } from "react-router-dom";
import style from "../Register/Register.module.css";
import { useDispatch } from "react-redux";
import { showModal } from "../../redux/actions";
import registerValidation from "../../helpers/registerValidation";

function RegisterUser() {
  const [registerData, setRegisterData] = useState({
    name: "",
    last_name: "",
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const dispatch = useDispatch();

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
    <div>
      <form className={style.formContainer}>
        <h2>Register User</h2>
        <div className={style.inputContainer}>
          <input
            type="text"
            placeholder="Name"
            name="name"
            value={registerData.name}
            onChange={handleChange}
          />
          {errors.name && <p className={style.error}>{errors.name}</p>}
        </div>
  
        <div className={style.inputContainer}>
          <input
            type="text"
            placeholder="Last Name"
            name="last_name"
            value={registerData.last_name}
            onChange={handleChange}
          />
          {errors.last_name && <p className={style.error}>{errors.last_name}</p>}
        </div>
  
        <div className={style.inputContainer}>
          <input
            type="email"
            placeholder="Email"
            name="email"
            value={registerData.email}
            onChange={handleChange}
          />
          {errors.email && <p className={style.error}>{errors.email}</p>}
        </div>
  
        <div className={style.inputContainer}>
          <input
            type="password"
            placeholder="Password"
            name="password"
            value={registerData.password}
            onChange={handleChange}
          />
          {errors.password && <p className={style.error}>{errors.password}</p>}
        </div>
  
        <button type="button" onClick={() => handleRegister("register")}>
          Register
        </button>
      </form>
    </div>
  );
}
export default RegisterUser;
