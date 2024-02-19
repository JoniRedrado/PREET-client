import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./redux/store.js";
import { AuthProvider } from "./context/authContext.jsx";
import Modal from "react-modal";
import { DarkModeProvider } from "./DarkModeContext/DarkModeContext.jsx";
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
