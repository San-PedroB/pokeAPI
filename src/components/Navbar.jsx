// src/components/Navbar.jsx
import { useTheme } from "../context/ThemeContext";

export default function Navbar() {
  const { isDark, toggleTheme } = useTheme();

  return (
    <header className="navbar">
      <h1>Pokédex</h1>

      {/* Botón simple Light / Dark */}
      <button 
        className="theme-btn"
        onClick={toggleTheme}
      >
        {isDark ? "🌙 Dark" : "🌞 Light"}
      </button>
    </header>
  );
}
