import { useState } from 'react';
import { login } from '../../Components/Auth/Auth';
import { useNavigate } from 'react-router-dom';
import style from "../Login/Login.module.css"

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
            setError(data.message);
          }
        } catch (error) {
            setError(error.message); 
        }
    };

    return (
        <div>
          <form className={style.loginContainer}>
            <h2>Login</h2>
            <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
            <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
            <button type="button" onClick={handleLogin}>Login</button>
          </form>
          {error && <p>{error}</p>}
        </div>
    );
}

export default LoginForm;