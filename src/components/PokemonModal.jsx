import PokemonDetailCard from "./PokemonDetailCard";
import { usePokemonSpecies } from "../hooks/usePokemonSpecies";
import { extractDescription } from "../utils/extractDescription";

export default function PokemonModal({ isOpen, pokemon, onClose }) {
  const pokemonId = pokemon?.id ?? null;

  const {
    species,
    loading: speciesLoading,
    error: speciesError,
  } = usePokemonSpecies(pokemonId);

  // descripción limpia aquí:
  const description = extractDescription(species);

  if (!isOpen || !pokemon) return null;

  const handleOverlayClick = () => onClose?.();
  const handleContentClick = (e) => e.stopPropagation();

  return (
    <div className="modal-overlay" onClick={handleOverlayClick}>
      <div className="modal-card" onClick={handleContentClick} role="dialog" aria-modal="true">
        <button type="button" className="modal-close" onClick={onClose}>X</button>

        <PokemonDetailCard
          data={pokemon}
          description={description}
          speciesLoading={speciesLoading}
          speciesError={speciesError}
        />
      </div>
    </div>
  );
}
