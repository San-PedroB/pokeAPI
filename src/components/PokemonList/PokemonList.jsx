import PokemonCard from "../PokemonCard/PokemonCard";
import "./PokemonList.css";

export default function PokemonList({ data, onSelectPokemon }) {
    return (
        <div className="pokemon-list">
            {data.map((p) => (
                <PokemonCard
                    key={p.id}
                    data={p}
                    onSelect={onSelectPokemon}
                />
            ))}
        </div>
    );
}
