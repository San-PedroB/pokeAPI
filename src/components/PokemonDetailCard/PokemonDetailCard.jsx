import { useState } from "react";
import { id3, fmtKg, fmtMeters } from "../../utils/formatters";
import { translateTypeName } from "../../utils/pokemonTypes";
import { getArtwork, getArtworkShiny } from "../../utils/getArtwork";
import "./PokemonDetailCard.css";

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
        <div className="detail-card-container">
            <div className="detail-card">
                <div className="detail-card__id-back">#{id}</div>
                <div className="detail-card__image">
                    <img
                        src={imageSrc || ""}
                        alt={isShiny ? `${data.name} shiny` : data.name}
                        className="pokemon-img"
                    />
                </div>

                <div className="detail-card__info">
                    <div className="detail-card__identity">
                        <p className="detail-card__id">#{id}</p>
                        <h2 className="detail-card__name">{data.name}</h2>
                    </div>

                    {hasShiny && (
                        <div className="detail-card__toggle">
                            <span className="detail-card__toggle-label">
                                Normal
                            </span>

                            <button
                                type="button"
                                className="detail-card__toggle-track"
                                onClick={handleToggle}
                                role="switch"
                                aria-checked={isShiny}
                            >
                                <span
                                    className={`detail-card__toggle-thumb ${isShiny ? "detail-card__toggle-thumb--right" : "detail-card__toggle-thumb--left"
                                        }`}
                                />
                            </button>

                            <span className="detail-card__toggle-label">
                                Shiny
                            </span>
                        </div>
                    )}

                    <div className="detail-card__types">
                        {data.types.map(({ type }) => (
                            <p
                                key={type.name}
                                className={`detail-card__type-badge ${type.name}`}
                            >
                                {translateTypeName(type.name)}
                            </p>
                        ))}
                    </div>

                    <div className="detail-card__stats">
                        <p className="detail-card__stat">Altura: {fmtMeters(data.height)} m</p>
                        <p className="detail-card__stat">Peso: {fmtKg(data.weight)} kg</p>
                    </div>

                    {!speciesLoading && !speciesError && description && (
                        <div className="detail-card__description">
                            {description}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
