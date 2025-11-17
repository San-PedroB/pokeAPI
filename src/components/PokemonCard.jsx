// src/components/PokemonCard.jsx
import { id3, fmtKg, fmtMeters } from "../utils/formatters";
import { translateTypeName } from "../utils/pokemonTypes";
import { getArtwork } from "../utils/getArtwork";

export default function PokemonCard({ data, onSelect, isSelectable = true }) {
  const id = id3(data.id);
  const img = getArtwork(data);

  const isInteractive = isSelectable && !!onSelect;

  const handleClick = () => {
    if (isInteractive) onSelect(data);
  };

  const handleKeyDown = (event) => {
    if (!isInteractive) return;
    if (event.key === "Enter" || event.key === " ") {
      onSelect(data);
    }
  };

  return (
    <div className="pokemon">
      <div
        className="pokemon-target"
        onClick={isInteractive ? handleClick : undefined}
        role={isInteractive ? "button" : undefined}
        tabIndex={isInteractive ? 0 : undefined}
        onKeyDown={isInteractive ? handleKeyDown : undefined}
      >
        <div className="pokemon-id-back">#{id}</div>

        <div className="pokemon-image">
          <img src={img || ""} alt={data.name} className="pokemon-img" />
        </div>

        <div className="pokemon-info">
          <div className="pokemon-identity">
            <p className="pokemon-id">#{id}</p>
            <h2 className="pokemon-name">{data.name}</h2>
          </div>

          <div className="pokemon-types-container">
            {data.types.map(({ type }) => (
              <p
                key={type.name}
                className={`pokemon-type-badge ${type.name}`}
              >
                {translateTypeName(type.name)}
              </p>
            ))}
          </div>
        </div>

        <div className="pokemon-stats">
          <p className="stat">{fmtMeters(data.height)} m</p>
          <p className="stat">{fmtKg(data.weight)} kg</p>
        </div>
      </div>
    </div>
  );
}
