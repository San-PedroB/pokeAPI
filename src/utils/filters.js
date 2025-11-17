
export function filterByType(pokemon, type) {
  if (!type) return pokemon;
  return pokemon.filter((p) =>
    p.types.some((t) => t.type.name === type)
  );
}
