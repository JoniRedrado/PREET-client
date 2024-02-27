import { useTranslation } from "react-i18next";
import { t } from "i18next";
import axios from "axios";


/*export async function login(email, password) {
  const { t } = useTranslation();
  try {
    const response = await axios.post(
      `${import.meta.env.VITE_BACK_URL}/users/login`,
      { email, password }
    );
    if (
      response.status === 200 &&
      response.data.token &&
      response.data.user &&
      response.data.user.rol
    ) {
      const expirationDate = new Date();
      expirationDate.setSeconds(expirationDate.getSeconds() + 7200); // 2 horas de expiración
      localStorage.setItem(`token`, response.data.token);
      localStorage.setItem(`expirationDate`, expirationDate.getTime()); // Guardar la fecha de expiración en milisegundos

      localStorage.setItem(`rol`, response.data.user.rol);

      // Establecer temporizador para la alerta de expiración
      const alertTime = new Date(expirationDate.getTime() - 60000); // Mostrar alerta 1 minuto antes de la expiración
      setTimeout(() => {
        swal(t("Auth.swalWarningTitle"), t("Auth.swalWarningText"), "warning");
      }, alertTime.getTime() - Date.now());

      return { token: response.data.token, rol: response.data.user.rol };
    } else if (response.status === 200 && response.data.message) {
      return { message: response.data.message };
    } else {
      throw new Error(response.data.message || `Error de inicio de sesión`);
    }
  } catch (error) {
    console.error(`Error de inicio de sesión:`, error);
    throw error;
  }
}*/
const saveTokenAndDataUser = (data) => {
  const expirationDate = new Date();
  expirationDate.setSeconds(expirationDate.getSeconds() + 7200); // 2 horas de expiración
  
  localStorage.setItem('expirationDate', expirationDate.getTime()); // Guardar la fecha de expiración en milisegundos
  localStorage.setItem('rol', data.user.rol);
  localStorage.setItem('token', data.token);

  // Establecer temporizador para la alerta de expiración
  const alertTime = new Date(expirationDate.getTime() - 60000); // Mostrar alerta 1 minuto antes de la expiración
  
  /*setTimeout(() => {
    swal("Alerta", "Tu sesión está a punto de expirar. Por favor, cierra sesión si has terminado.", "warning");
  }, alertTime.getTime() - Date.now());*/

  setTimeout(async () => {
    try{
      await axios.get(`${import.meta.env.VITE_BACK_URL}/verify`);
    }catch(error){
      console.log('token fail');
    }
  }, alertTime.getTime() - Date.now() + 60000);
}

export async function login(email, password) {
  try {
      const response = await axios.post(`${import.meta.env.VITE_BACK_URL}/users/login`, { email, password });
      if (response.status === 200 && response.data.token && response.data.user && response.data.user.rol) {
          saveTokenAndDataUser(response.data);
          return { token: response.data.token, rol: response.data.user.rol };
      } else if (response.status === 200 && response.data.message) {
          return {message: response.data.message};
      }else {
          throw new Error(response.data.message || 'Error de inicio de sesión');
      }
  } catch (error) {
      console.error('Error de inicio de sesión:', error);
      throw error;
  }
}

export async function loginFireBase({ email, firstName, lastName }) {
  try {
    const response = await axios.post(
      `${import.meta.env.VITE_BACK_URL}/users/login`,
      { email, fireBaseAuth: { email, name: firstName, last_name: lastName } }
    );

    if (response.status === 200 && response.data.token) {
      saveTokenAndDataUser(response.data);

      return { token: response.data.token };
    } else if (response.status === 200 && response.data.message) {
      return { message: response.data.message };
    } else {
      throw new Error(response.data.message || `Error de inicio de sesión`);
    }
  } catch (error) {
    console.error(`Error de inicio de sesión:`, error);
    throw error;
  }
}

//Función para registrar un usuario
export  async function register({name, last_name, email, password, nationality}) {
    try {
      const response = await axios.post(`${import.meta.env.VITE_BACK_URL}/users/register`, { name, last_name, email, password, nationality });

    if (response.status === 200) {
      swal({
        title: t("Auth.swalSuccessTitle"),
        text: t("Auth.swalSuccessText"),
        icon: "success",
        button: null,
      });
      return response.data.token;
    }
  } catch (error) {
    swal({
      title: t("Auth.swalErrorTitle"),
      text: t("Auth.swalErrorText"),
      icon: "warning",
      button: null,
    });
    throw error;
  }
}

// Función para cerrar sesión
// function logout() {
//     localStorage.removeItem(`token`);
// }

// Interceptar las solicitudes salientes y adjuntar el token JWT en el encabezado de autorización
export function axiosInterceptorRequest(){
  axios.interceptors.request.use(
    (config) => {
      const token = localStorage.getItem(`token`);
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  )
}