export const getArtwork = (data) =>
  data?.sprites?.other?.["official-artwork"]?.front_default || null;
