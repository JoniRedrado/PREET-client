import { createContext, useContext, useState } from 'react';

// Creamos el contexto
const DarkModeContext = createContext();

// Creamos un componente proveedor que envuelve nuestra aplicación
export const DarkModeProvider = ({ children }) => {
  const [darkMode, setDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setDarkMode((prevMode) => !prevMode);
  };

  console.log(darkMode);
  return (
    <DarkModeContext.Provider value={{ darkMode, toggleDarkMode }}>
      {children}
    </DarkModeContext.Provider>
  );
};

// Creamos un hook para consumir el contexto en los componentes
export const useDarkMode = () => {
  return useContext(DarkModeContext);
};