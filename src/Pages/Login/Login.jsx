import { useState } from "react";
import '../Login/Login.module.css'
import axios from "axios";
import { useNavigate } from 'react-router-dom'
import { decodeToken } from "../../utils/decodeToken";

const database = [
  {
    username: "user1",
    password: "pass1",
  },
  {
    username: "user2",
    password: "pass2",
  },
];

const errors = {
  uname: "invalid username",
  pass: "invalid password",
};

export default function LoginForm() {
  
  const [errorMessages, setErrorMessages] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [userData, setUserData] = useState({})
  const [logged, setLogged] = useState(false)
  const navigate = useNavigate()

  const renderErrorMessage = (name) =>
    name === errorMessages.name && (
      <div className="error">{errorMessages.message}</div>
    );
  
  const handleData = (e) => {
    e.preventDefault()
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  const handleSubmit = (e) => {
    
    e.preventDefault();
    
    const config = {
      headers: {
        'Content-Type': 'application/json'
      },
    }

    axios.post('url', userData, config)
      .then(response => { 

        if (response.token) {
          localStorage.setItem('token', response.token)
          setLogged(true)
        } else {
          setLogged(false)
        }

        console.log((decodeToken(response.token)))
          
      })
      .catch(error => console.error('Error:', error))

    let { username, password } = document.forms[0];

    // Find user login info
    const dataValidation = database.find((user) => user.username === username.value);

    // Compare user info
    if (dataValidation) {
      if (dataValidation.password !== password.value) {
        // Invalid password
        setErrorMessages({ name: "password", message: errors.pass });
      } else {
        setIsSubmitted(true);
        setLogged(true)
      }
    } else {
      // Username not found
      setErrorMessages({ name: "username", message: errors.uname });
    }
  };

  const renderForm = (
    <div className="login-form">
      <form onSubmit={handleSubmit}>
        <div className="input-container">
          <label>Username</label>
          <input onChange={handleData} type="text" name="username" />
          {renderErrorMessage("username")}
        </div>
        <div className="input-container">
          <label>Password </label>
          <input onChange={handleData} type="password" name="password" />
          {renderErrorMessage("password")}
        </div>
        <div className="button-container">
          <button onClick={handleSubmit}>Login</button>
        </div>
      </form>
    </div>
  )

  if (isSubmitted && logged) {
    navigate("/home")
  }

  return (
      <div className="login-form">
        <div className="title">Sign In</div>
        {isSubmitted ? <div>User is successfully logged in</div> : renderForm}
      </div>
  );
}
