export const getArtwork = (data) =>
  data?.sprites?.other?.["official-artwork"]?.front_default || null;

export const getArtworkShiny = (data) =>
  data?.sprites?.other?.["official-artwork"]?.front_shiny || null;