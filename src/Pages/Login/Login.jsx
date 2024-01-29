// import { useState } from "react";
// import '../Login/Login.module.css'
// import axios from "axios";
// import { useNavigate } from 'react-router-dom'
// import { decodeToken } from "../../utils/decodeToken";
 
// export default function LoginForm() {
  
//   const [errorMessages, setErrorMessages] = useState({});
//   const [isSubmitted, setIsSubmitted] = useState(false);
//   const [userData, setUserData] = useState({})
//   const [logged, setLogged] = useState(false)
//   const navigate = useNavigate()

//   const renderErrorMessage = (name) =>
//     name === errorMessages.name && (
//       <div className="error">{errorMessages.message}</div>
//     );
  
//   const handleData = (e) => {
//     e.preventDefault()
//     const { name, value } = e.target;
//     setUserData({ ...userData, [name]: value });
//   };

//   const handleSubmit = (e) => {
    
//     e.preventDefault();
    
//     const config = {
//       headers: {
//         'Content-Type': 'application/json'
//       },
//     }
//     const userDataToSend = {
//       email: userData.username,
//       password: userData.password
//     };
//     axios.post('http://localhost:3001/auth/login', userDataToSend, config)
//       .then(response => { 
//         console.log('Respuesta del servidor:', response)
//         if (response.data.token) {
//           localStorage.setItem('token', response.data.token)
//           setLogged(true)
//           console.log(decodeToken(response.data.token))
//         } else {
//           setLogged(false)
//         }

//         console.log((decodeToken(response.data.token)))
          
//       })
//       .catch(error => console.error('Error:', error))
//     }
//   const renderForm = (
//     <div className="login-form">
//       <form onSubmit={handleSubmit}>
//         <div className="input-container">
//           <label>Email</label>
//           <input onChange={handleData} type="text" name="username" />
//           {renderErrorMessage("username")}
//         </div>
//         <div className="input-container">
//           <label>Password </label>
//           <input onChange={handleData} type="password" name="password" />
//           {renderErrorMessage("password")}
//         </div>
//         <div className="button-container">
//           <button onClick={handleSubmit}>Login</button>
//         </div>
//       </form>
//     </div>
//   )

//   if (isSubmitted && logged) {
//     navigate("/home")
//   }

//   return (
//       <div className="login-form">
//         <div className="title">Sign In</div>
//         {isSubmitted ? <div>User is successfully logged in</div> : renderForm}
//       </div>
//   );
// }

import { useState } from 'react';
import { login } from '../../Components/Auth/Auth';
import { useNavigate } from 'react-router-dom';

function LoginForm() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleLogin = async () => {
        try {
            const data = await login(email, password);
            navigate('/home',data)
        } catch (error) {
            setError(error.message); 
        }
    };

    return (
        <div>
            <h2>Login</h2>
            <form>
                <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
                <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
                <button type="button" onClick={handleLogin}>Login</button>
            </form>
            {error && <p>{error}</p>}
        </div>
    );
}

export default LoginForm;