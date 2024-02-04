import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Settings = () => {
  const [userInfo, setUserInfo] = useState({
    name: '',
    last_name: '',
    email: '',
  });

  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem("token");

  useEffect(() => {
    // Hacer una solicitud a la API para obtener la información del usuario al cargar el componente
    axios.get('http://localhost:3001/users/profile', {
      headers: {
        Authorization: `Bearer ${token}` 
      }
    })
    .then(response => {
      setUserInfo(response.data);
      setLoading(false);
    })
    .catch(error => {
      console.error(error);
      setLoading(false);
    });
  }, [token]);

  const handleChange = (e) => {
    setUserInfo({
      ...userInfo,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Hacer una solicitud a la API para actualizar la información del usuario
    axios.put('http://localhost:3001/users/profile', userInfo, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    .then(response => {
      console.log('User information updated successfully');
    })
    .catch(error => {
      console.error('Error updating user information', error);
    });
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>Settings</h2>
      <form onSubmit={handleSubmit}>
        <label>Name:</label>
        <input type="text" name="name" value={userInfo.name} onChange={handleChange} />

        <label>Last Name:</label>
        <input type="text" name="last_name" value={userInfo.last_name} onChange={handleChange} />

        <label>Email:</label>
        <input type="email" name="email" value={userInfo.email} onChange={handleChange} />

        {/* Otros campos que puedas tener en tu modelo de usuario */}
        
        <button type="submit">Save Changes</button>
      </form>
    </div>
  );
};

export default Settings;