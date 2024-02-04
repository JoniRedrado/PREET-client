import { useState } from 'react';
import { login } from '../../Components/Auth/Auth';
import { useNavigate } from 'react-router-dom';
import styles from "../Login/Login.module.css"

function LoginForm() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleLogin = async () => {
        try {
          const data = await login(email, password);
          if (data.token) {
            navigate('/home', data.token)
          } else if (data.message) {
            setError("Invalid Email or Password");
          }
        } catch (error) {
            setError("Invalid Email or Password"); 
        }
    };

    return (
        <div>
          <form className={styles.loginContainer}>
            <h2>Login</h2>
            <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} className={`${styles.input} ${error && styles.error}`}/>
            <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} className={`${styles.input} ${error && styles.error}`}/>
            <button type="button" onClick={handleLogin}>Login</button>
            {error && (
                <span className={styles.error}>{error}</span>
              )}
          </form>
          
        </div>
    );
}

export default LoginForm;