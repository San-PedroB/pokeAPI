// src/pages/Home.jsx
import { useMemo, useState } from "react";
import { usePokemonData } from "../hooks/usePokemonData";
import TypeFilter from "../components/TypeFilter";
import PokemonList from "../components/PokemonList";
import Loading from "../components/Loading";
import ErrorMessage from "../components/ErrorMessage";
import PokemonModal from "../components/PokemonModal";
import { DEFAULT_POKEMON_LIMIT } from "../utils/constants";
import { filterByType } from "../utils/filters";

export default function Home() {
  const { pokemon, loading, error } = usePokemonData(DEFAULT_POKEMON_LIMIT);
  const [selectedType, setSelectedType] = useState(null);
  const [selectedPokemon, setSelectedPokemon] = useState(null);

  const filtered = useMemo(
    () => filterByType(pokemon, selectedType),
    [pokemon, selectedType]
  );

  const handleSelectPokemon = (pokemon) => {
    setSelectedPokemon(pokemon);
  };

  const handleCloseModal = () => {
    setSelectedPokemon(null);
  };

  if (loading) return <Loading />;
  if (error) return <ErrorMessage />;

  return (
    <>
      <header>
        <TypeFilter
          selectedType={selectedType}
          onChange={setSelectedType}
          onClear={() => setSelectedType(null)}
        />
      </header>

      <main>
        <div className="all">
          <PokemonList
            data={filtered}
            onSelectPokemon={handleSelectPokemon}
          />
        </div>
      </main>

      <PokemonModal
        isOpen={!!selectedPokemon}
        pokemon={selectedPokemon}
        onClose={handleCloseModal}
      />
    </>
  );
}
