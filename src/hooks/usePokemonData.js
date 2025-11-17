// src/hooks/usePokemonData.js
import { useEffect, useState } from "react";
import { fetchAllPokemon } from "../services/pokeapi";
import { DEFAULT_POKEMON_LIMIT } from "../utils/constants";

export function usePokemonData(limit = DEFAULT_POKEMON_LIMIT) {
  const [pokemon, setPokemon] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function load() {
      try {
        const results = await fetchAllPokemon(limit);
        setPokemon(results);
      } catch (e) {
        setError(e);
      } finally {
        setLoading(false);
      }
    }

    load();
  }, [limit]);

  return { pokemon, loading, error };
}
