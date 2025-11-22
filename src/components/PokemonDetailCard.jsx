// src/components/PokemonDetailCard.jsx
import { useState } from "react";
import { id3, fmtKg, fmtMeters } from "../utils/formatters";
import { translateTypeName } from "../utils/pokemonTypes";
import { getArtwork, getArtworkShiny } from "../utils/getArtwork";

export default function PokemonDetailCard({
  data,
  description,
  speciesLoading,
  speciesError,
}) {
  const id = id3(data.id);

  const normalArtwork = getArtwork(data);
  const shinyArtwork = getArtworkShiny(data);
  const hasShiny = !!shinyArtwork;

  const [view, setView] = useState("normal");

  const imageSrc =
    view === "shiny" && hasShiny ? shinyArtwork : normalArtwork;

  const handleToggle = () => {
    setView((prev) => (prev === "normal" ? "shiny" : "normal"));
  };

  const isShiny = view === "shiny";

  return (
    <div className="pokemon">
      <div className="pokemon-target">
        {/* Número grande de fondo */}
        <div className="pokemon-id-back">#{id}</div>

        {/* Imagen conmutada Normal / Shiny */}
        <div className="pokemon-image">
          <img
            src={imageSrc || ""}
            alt={isShiny ? `${data.name} shiny` : data.name}
            className="pokemon-img"
          />
        </div>

        <div className="pokemon-info">
          <div className="pokemon-identity">
            <p className="pokemon-id">#{id}</p>
            <h2 className="pokemon-name">{data.name}</h2>
          </div>

          {/* 🔁 Switch deslizable Normal / Shiny */}
          {hasShiny && (
            <div className="toggle-switch">
              <span className="toggle-label">
                Normal
              </span>

              <button
                type="button"
                className="toggle-track"
                onClick={handleToggle}
                role="switch"
                aria-checked={isShiny}
              >
                <span
                  className={`toggle-thumb ${
                    isShiny ? "toggle-thumb-right" : "toggle-thumb-left"
                  }`}
                />
              </button>

              <span className="toggle-label">
                Shiny
              </span>
            </div>
          )}

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

          <div className="pokemon-stats">
            <p className="stat">Altura: {fmtMeters(data.height)} m</p>
            <p className="stat">Peso: {fmtKg(data.weight)} kg</p>
          </div>

          {!speciesLoading && !speciesError && description && (
            <div className="pokemon-description">
              {description}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
