import React from "react";
import validate from "../../helpers/registerValidation";

// import styles from "./Register.module.css";

function Register() {
  const [input, setInput] = React.useState({
    name: "",
    surname: "",
    alias: "",
    email: "",
    password: "",
    confirmation: "",
  });

  const [error, setError] = React.useState({});

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

  return (
    <div /* className={style.container} */>
      <form>
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

        <div /* className={style.alias} */>
          <label>Alias </label>
          <input
            name="alias"
            type="alias"
            placeholder="E.g. Johny22"
            value={input.alias}
            onChange={handleChange}
          />
          <span>{error.alias}</span>
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

        <button /* className={style.registerButton} */ /* onClick={handleSubmit} */
        >
          Register
        </button>
      </form>
    </div>
  );
}

export default Register;
