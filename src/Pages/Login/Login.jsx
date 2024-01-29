import { useState } from 'react';
import { login } from '../../Components/Auth/Auth';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

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
            <Link to="/register">
              <button>Register User</button>
            </Link>
        </div>
    );
}

export default LoginForm;