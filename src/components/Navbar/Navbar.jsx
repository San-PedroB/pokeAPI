import { useTheme } from "../../context/ThemeContext";
import solrock from "../../assets/solrock.png";
import lunatone from "../../assets/lunatone.png";
import MusicPlayer from "../MusicPlayer/MusicPlayer";
import pokedex from "../../assets/pokedex.png";
import "./Navbar.css";

export default function Navbar() {
    const { isDark, toggleTheme } = useTheme();

    return (
        <header className="navbar">
            <div className="navbar__logo">
                <img src={pokedex} alt="Pokedex" />
            </div>
            <div className="navbar__actions">
                <MusicPlayer />
                <div className="navbar__toggle">
                    <button
                        type="button"
                        className="navbar__toggle-track"
                        onClick={toggleTheme}
                        role="switch"
                        aria-checked={isDark}
                        aria-label={isDark ? "Cambiar a modo claro" : "Cambiar a modo oscuro"}
                    >
                        <span
                            className={`navbar__toggle-thumb ${isDark ? "navbar__toggle-thumb--right" : "navbar__toggle-thumb--left"
                                }`}
                        >
                            <img
                                src={isDark ? lunatone : solrock}
                                alt={isDark ? "Lunatone" : "Solrock"}
                                className="navbar__toggle-icon"
                            />
                        </span>
                    </button>
                </div >
            </div>
        </header>
    );
}
