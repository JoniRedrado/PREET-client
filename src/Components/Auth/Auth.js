import axios from "axios"

// Función para iniciar sesión
export  async function login(email, password) {
    try {
        const response = await axios.post('http://localhost:3001/auth/login', { email, password });
        if (response.status === 200 && response.data.token) {
            // Almacenar el token JWT en el almacenamiento local
            localStorage.setItem('token', response.data.token);

            return {token: response.data.token};
        } else if (response.status === 200 && response.data.message) {
            return {message: response.data.message};
        }
         else {
            throw new Error(response.data.message || 'Error de inicio de sesión');
        }
    } catch (error) {
        console.error('Error de inicio de sesión:', error);
        throw error;
    }
}

//Función para registrar un usuario
export  async function register({name, last_name, email, password}) {
    try {
        const response = await axios.post('http://localhost:3001/auth/register', { name, last_name, email, password });
      if (response.status === 200) {
          window.alert("Usuario creado con éxito")
          return response.data.token;
        } else {
            throw new Error(response.data.error || 'Error al registrar usuario');
        }
    } catch (error) {
        console.error('Error al registrar usuario:', error);
        throw error;
    }
}

// Función para cerrar sesión
// function logout() {
//     localStorage.removeItem('token');
// }

// Interceptar las solicitudes salientes y adjuntar el token JWT en el encabezado de autorización
axios.interceptors.request.use(config => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
}, error => {
    return Promise.reject(error);
});

// Manejar errores de autenticación, como credenciales incorrectas o tokens inválidos
axios.interceptors.response.use(response => {
    return response;
}, error => {
    if (error.response && error.response.status === 403) {
        // Manejar el token inválido aquí
        console.error('Token inválido:', error.response.data.error);
    }
    return Promise.reject(error);
});
