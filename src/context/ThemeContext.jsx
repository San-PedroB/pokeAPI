// === Importamos React ===
import { createContext, useContext, useState, useEffect } from "react";

// Creamos el contexto vacío
const ThemeContext = createContext();

// === Provider: envuelve a toda la app ===
export function ThemeProvider({ children }) {

  // Estado del tema: "light" o "dark"
  const [theme, setTheme] = useState("light");

  // Cada vez que 'theme' cambie, actualizamos el <body>
  useEffect(() => {
    // Quitamos clases antiguas
    document.body.classList.remove("light", "dark");

    // Agregamos la clase correcta
    document.body.classList.add(theme);
  }, [theme]); 
  // ← se ejecuta al inicio y cada vez que 'theme' cambie


  // Función para alternar entre light/dark
  const toggleTheme = () => {
    setTheme(prev => prev === "light" ? "dark" : "light");
  };

  // Todo lo que otros componentes pueden usar
  const value = {
    theme,        // "light" o "dark"
    isDark: theme === "dark",
    toggleTheme,  // función de alternar
  };

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export function useTheme() {
  return useContext(ThemeContext);
}

