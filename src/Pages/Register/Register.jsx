import React from "react";
import validate from "../../helpers/registerValidation";
import axios from "axios";

import style from "./Register.module.css";

function Register() {
  const [input, setInput] = React.useState({
    name: "",
    surname: "",
    username: "",
    email: "",
    password: "",
    confirmation: "",
  });

  const [error, setError] = React.useState({});

  /* const auth = useAuth();

  if (auth.isAuthenticated) {
    return <Navigate to="/home" />;
  } */

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInput({
      ...input,
      [name]: value,
    });
    setError(
      validate({
        ...input,
        [name]: value,
      })
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const url = "http://localhost:3001/signup";
    const data = { input };
    try {
      const response = await axios.post(url, data, {
        headers: { "Content-Type": "application/json" },
      });
      console.log("Respuesta del servidor:", response.data);
    } catch (error) {
      console.error("Error al realizar la solicitud:", error.message);
    }
  };

  return (
    <div /* className={style.container} */>
      <form onSubmit={handleSubmit}>
        <h1>Create Account</h1>

        <div /* className={style.name} */>
          <label>Name </label>
          <input
            name="name"
            type="name"
            placeholder="E.g. John"
            value={input.name}
            onChange={handleChange}
          />
          <span>{error.name}</span>
        </div>

        <div /* className={style.surname} */>
          <label>Surname </label>
          <input
            name="surname"
            type="surname"
            placeholder="E.g. Malkovich"
            value={input.surname}
            onChange={handleChange}
          />
          <span>{error.surname}</span>
        </div>

        <div /* className={style.username} */>
          <label>Username </label>
          <input
            name="username"
            type="username"
            placeholder="E.g. Johny22"
            value={input.username}
            onChange={handleChange}
          />
          <span>{error.username}</span>
        </div>

        <div /* className={style.email} */>
          <label>Email </label>
          <input
            name="email"
            type="email"
            placeholder="Email address"
            value={input.email}
            onChange={handleChange}
          />
          <span>{error.email}</span>
        </div>

        <div /* className={style.password} */>
          <label>Password </label>
          <input
            name="password"
            type="password"
            id="password"
            placeholder="Create password"
            value={input.password}
            onChange={handleChange}
          />
          <span>{error.password}</span>
        </div>

        <div /* className={style.confirmation} */>
          <label>Repeat your password </label>
          <input
            name="confirmation"
            type="password"
            id="confirmation"
            placeholder="Confirm your password"
            value={input.confirmation}
            onChange={handleChange}
          />
          <span>{error.confirmation}</span>
        </div>

        {Object.keys(error).length || !input.name.length ? (
          <>
            <br />
            <button className={style.BtnDisabled} disabled>
              Register
            </button>
          </>
        ) : (
          <>
            <br />
            <button /* className={style.registerButton} */>Register</button>
          </>
        )}
      </form>
    </div>
  );
}

export default Register;
