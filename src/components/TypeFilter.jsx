import { POKEMON_TYPES, translateTypeName } from "../utils/pokemonTypes";
import pokedexLogo from "../assets/pokedex-logo-grande.webp";

export default function TypeFilter({ selectedType, onChange, onClear }) {
  return (
    <nav className="nav">
      <div className="poke-logo">
        <img src={pokedexLogo} alt="logo" />
      </div>

      <ul className="nav-list">
        <li className="nav-item">
          <button className="btn btn-header" onClick={onClear}>
            Ver todos
          </button>
        </li>

        {POKEMON_TYPES.map((t) => (
          <li key={t} className="nav-item">
            <button
              className={`btn btn-header ${t}`}
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
