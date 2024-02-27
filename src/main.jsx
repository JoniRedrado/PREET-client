import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./redux/store.js";
import { AuthProvider } from "./context/authContext.jsx";
import Modal from "react-modal";
import { DarkModeProvider } from "./DarkModeContext/DarkModeContext.jsx";
import { setToken } from "./redux/actions.js";
import swal from "sweetalert";
import axios from "axios";
import "./i18n.js";
import "./index.css";

Modal.setAppElement("#root");

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <AuthProvider>
      <DarkModeProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </DarkModeProvider>
    </AuthProvider>
  </Provider>
);

axios.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response && error.response.status === 403) {
      // Manejar el token inválido aquí
      const token = localStorage.getItem('token');
      if(token) swal("Alerta", "Tu sesión espirado. Vuelve inicar sesion .", "warning");

      localStorage.removeItem('expirationDate'); 
      localStorage.removeItem('token');
      localStorage.removeItem('rol');

      store.dispatch(setToken(false));
    }
    return Promise.reject(error);
  }
);
