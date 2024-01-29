import { useState } from 'react';
import { register } from '../../Components/Auth/Auth';
import { useNavigate } from 'react-router-dom';


function RegisterUser() {
    const [name, setName] = useState('');
    const [last_name, setLast_name] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleRegister = async () => {
        try {
            const data = await register(name, last_name, email, password);
            navigate('/',data)
        } catch (error) {
            setError(error.message);
        }
    };

    return (
        <div>
            <h2>Register User</h2>
            <form>
                <input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
                <input type="text" placeholder="Last Name" value={last_name} onChange={(e) => setLast_name(e.target.value)} />
                <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
                <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
                <button type="button" onClick={handleRegister}>Register</button>
            </form>
            {error && <p>{error}</p>}
        </div>
    );
}

export default RegisterUser;