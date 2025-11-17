// src/components/PokemonList.jsx
import PokemonCard from "./PokemonCard";

export default function PokemonList({ data, onSelectPokemon }) {
  return (
    <div className="all-pokemon">
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
