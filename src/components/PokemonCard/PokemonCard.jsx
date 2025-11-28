import { id3, fmtKg, fmtMeters } from "../../utils/formatters";
import { translateTypeName } from "../../utils/pokemonTypes";
import { getArtwork } from "../../utils/getArtwork";
import "./PokemonCard.css";

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
                className="pokemon-card"
                onClick={isInteractive ? handleClick : undefined}
                role={isInteractive ? "button" : undefined}
                tabIndex={isInteractive ? 0 : undefined}
                onKeyDown={isInteractive ? handleKeyDown : undefined}
            >
                <div className="pokemon-card__id-back">#{id}</div>

                <div className="pokemon-card__image">
                    <img src={img || ""} alt={data.name} />
                </div>


                <div className="pokemon-card__info">
                    <div className="pokemon-card__identity">
                        <p className="pokemon-card__id">#{id}</p>
                        <h2 className="pokemon-card__name">{data.name}</h2>
                    </div>

                    <div className="pokemon-card__types">
                        {data.types.map(({ type }) => (
                            <p
                                key={type.name}
                                className={`pokemon-card__type-badge ${type.name}`}
                            >
                                {translateTypeName(type.name)}
                            </p>
                        ))}
                    </div>
                </div>

                <div className="pokemon-card__stats">
                    <p className="pokemon-card__stat">{fmtMeters(data.height)} m</p>
                    <p className="pokemon-card__stat">{fmtKg(data.weight)} kg</p>
                </div>
            </div>
        </div>
    );
}
