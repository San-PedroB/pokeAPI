import { POKEMON_TYPES, translateTypeName } from "../../utils/pokemonTypes";
import pokedexLogo from "../../assets/pokedex-logo-grande.webp";
import "./TypeFilter.css";

export default function TypeFilter({ selectedType, onChange, onClear }) {
    return (
        <nav className="type-filter">
            <div className="type-filter__logo">
                <img src={pokedexLogo} alt="logo" />
            </div>

            <ul className="type-filter__list">
                <li className="type-filter__item">
                    <button className="type-filter__btn" onClick={onClear}>
                        Ver todos
                    </button>
                </li>

                {POKEMON_TYPES.map((t) => (
                    <li key={t} className="type-filter__item">
                        <button
                            className={`type-filter__btn ${t}`}
                            onClick={() => onChange(t)}
                            aria-pressed={selectedType === t}
                        >
                            {translateTypeName(t)}
                        </button>
                    </li>
                ))}
            </ul>
        </nav>
    );
}
