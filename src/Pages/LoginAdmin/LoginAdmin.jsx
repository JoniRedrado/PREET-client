import { useState } from "react";
import { useDispatch } from "react-redux";
import { showModal } from "../../redux/actions";
import {login} from "../../Components/Auth/Auth";
import styles from "./LoginAdmin.module.css";
import { useAuth } from "../../context/authContext";
import { useNavigate } from 'react-router-dom';


const LoginAdmin = () => {

    const dispatch = useDispatch();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    
    const handleLogin = async () => {
        try {
          const data = await login(email, password);
          if (data.message) {
            setError("Invalid Email or Password");
          }else{
            if(data.rol === "admin"){
                navigate('/dashboard')
              }else{
                window.alert("tu usuario no es admin")
              }
            dispatch(showModal("login", false))
          }
        } catch (error) {
            setError("Invalid Email or Password"); 
        }
    };

    return(
        <>
          <form className={styles.form}>
            <h2>Login</h2>
            <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)}/>
            <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)}/>
            <button type="button" onClick={handleLogin}>Login</button>
          </form>
          {/* {error && (
                <span >{error}</span>
              )} */}
        </>
    )

}

export default LoginAdmin;