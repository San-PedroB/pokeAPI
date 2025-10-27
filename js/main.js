// ==========================
// 1) Config & constants
// ==========================
const apiUrl = "https://pokeapi.co/api/v2/pokemon/";
const pokemonList = document.querySelector("#pokemon-list");
const limit = 150; 

const typeTranslations = {
  normal: "Normal", fire: "Fuego", water: "Agua", electric: "Eléctrico",
  grass: "Planta", ice: "Hielo", fighting: "Lucha", poison: "Veneno",
  ground: "Tierra", flying: "Volador", psychic: "Psíquico", bug: "Bicho",
  rock: "Roca", ghost: "Fantasma", dragon: "Dragón", dark: "Siniestro",
  steel: "Acero", fairy: "Hada", unknown: "Desconocido"
};

const mapping = {
  "view-all-button": "all", "normal-button": "normal", "fire-button": "fire",
  "water-button": "water", "grass-button": "grass", "electric-button": "electric",
  "ice-button": "ice", "fighting-button": "fighting", "poison-button": "poison",
  "ground-button": "ground", "flying-button": "flying", "psychic-button": "psychic",
  "bug-button": "bug", "rock-button": "rock", "ghost-button": "ghost",
  "dragon-button": "dragon", "dark-button": "dark", "steel-button": "steel",
  "fairy-button": "fairy",
};

let allPokemon = [];

// ==========================
// 2) Helpers 
// ==========================
const id3 = (n) => String(n).padStart(3, "0");
const fmtMeters = (decimeters) => (decimeters / 10).toString().replace(".", ",");
const fmtKg = (hectograms) => (hectograms / 10).toString().replace(".", ",");

function clearPokemonList() {
  pokemonList.innerHTML = "";
};

function renderPokemonList(list) {
  clearPokemonList();
  list.forEach(displayPokemon);
};

function getArtwork(data) {
  return data?.sprites?.other?.["official-artwork"]?.front_default;
};

function translateTypes(types) {
  return types.map((t) => {
    const typeName = t.type.name;
    const translated = typeTranslations[typeName] || typeTranslations.unknown;
    return `<p class="pokemon-type-badge ${typeName}">${translated}</p>`;
  }).join("");
};

// ==========================
// 3) Data layer (fetch)
// ==========================
function buildRequests(limit) {
  const reqs = [];
  for (let i = 1; i <= limit; i++) {
    reqs.push(fetch(apiUrl + i).then((response) => response.json()));
  }
  return reqs;
};

async function fetchAllPokemon(limit) {
  const reqs = buildRequests(limit);
  const results = await Promise.all(reqs);
  return results; // Array de objetos Pokémon
};

// ==========================
// 4) UI (render)
// ==========================
// Recibe los datos de un Pokemon desde loadPokemon() & los muestra en el DOM
function displayPokemon(pokeData) {
  const div = document.createElement("div");
  div.classList.add("pokemon");

  const id = id3(pokeData.id);
  const typesHtml = translateTypes(pokeData.types);
  const img = getArtwork(pokeData);

  div.innerHTML = `
    <div class="pokemon-target">
      <div class="pokemon-id-back">#${id}</div>
      <div class="pokemon-image">
        <img src="${img}" alt="${pokeData.name}" class="pokemon-img">
      </div>
      <div class="pokemon-info">
        <div class="pokemon-identity">
          <p class="pokemon-id">#${id}</p>
          <h2 class="pokemon-name">${pokeData.name}</h2>
        </div>
        <div class="pokemon-types-container">
          ${typesHtml}
        </div>
      </div>
      <div class="pokemon-stats">
        <p class="stat">${fmtMeters(pokeData.height)} m</p>
        <p class="stat">${fmtKg(pokeData.weight)} kg</p>
      </div>
    </div>
  `;

  pokemonList.appendChild(div);
}

// ==========================
// 4b) UI Controllers (events & filters)
// ==========================
function filterByType(type) {
  if (!type || type === "all") {
    return renderPokemonList(allPokemon);
  }
  const filtered = allPokemon.filter(p =>
    p.types.some(t => t.type.name === type)
  );
  renderPokemonList(filtered);
}

function setupTypeFilters() {
  //desestructurar mapping y recorrerlo
  Object.entries(mapping).forEach(([buttonId, type]) => {
    const btn = document.getElementById(buttonId);
    if (!btn) return;
    console.log(`Setting up filter for type: ${type}`);
    btn.addEventListener("click", () => filterByType(type));
  });
}


// ==========================
// 5) Boot (arranque)
// ==========================
async function loadPokemon(limit) {
  try {
    const results = await fetchAllPokemon(limit);
    allPokemon = results; // guardar todos los pokemon para filtros
    // Recorre el array de resultados & envía cada Pokémon a displayPokemon() para mostrarlo en el DOM
    results.forEach((pokeData) => displayPokemon(pokeData));
    // 
  } catch (err) {
    console.error("Error cargando Pokémon:", err);
  }
}

// ==========================
// 5) Boot (arranque)
// ==========================
async function startApp() {
  await loadPokemon(limit); // 1️⃣ Carga los Pokémon
  setupTypeFilters();       // 2️⃣ Activa los botones de filtro
}

startApp(); 
