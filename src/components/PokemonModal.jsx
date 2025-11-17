// src/components/PokemonModal.jsx
import PokemonCard from "./PokemonCard";

export default function PokemonModal({ isOpen, pokemon, onClose }) {
  if (!isOpen || !pokemon) return null;

  const handleOverlayClick = () => {
    onClose?.();
  };

  const handleContentClick = (event) => {
    event.stopPropagation();
  };

  return (
    <div className="modal-overlay" onClick={handleOverlayClick}>
      <div
        className="modal-card"
        onClick={handleContentClick}
        role="dialog"
        aria-modal="true"
      >
        <button
          type="button"
          className="modal-close"
          onClick={onClose}
          aria-label="Cerrar"
        >
          ×
        </button>

        <PokemonCard data={pokemon} isSelectable={false} />
      </div>
    </div>
  );
}
