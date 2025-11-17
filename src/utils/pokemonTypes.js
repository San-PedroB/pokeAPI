export const TYPE_TRANSLATIONS = {
  normal: "Normal", fire: "Fuego", water: "Agua", electric: "Eléctrico",
  grass: "Planta", ice: "Hielo", fighting: "Lucha", poison: "Veneno",
  ground: "Tierra", flying: "Volador", psychic: "Psíquico", bug: "Bicho",
  rock: "Roca", ghost: "Fantasma", dragon: "Dragón", dark: "Siniestro",
  steel: "Acero", fairy: "Hada", unknown: "Desconocido"
};

export const translateTypeName = (name) =>
  TYPE_TRANSLATIONS[name] || TYPE_TRANSLATIONS.unknown;

export const POKEMON_TYPES = [
  "normal","fire","water","grass","electric","ice","fighting","poison",
  "ground","flying","psychic","bug","rock","ghost","dark","dragon","steel","fairy"
];
