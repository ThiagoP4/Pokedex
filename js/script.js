const pokemonName = document.querySelector('.pokemon_name');
const pokemonNumber = document.querySelector('.pokemon_number');
const pokemonImage = document.querySelector('.pokemon_img');

const form = document.querySelector('.form');
const input = document.querySelector('.input_search');
const btnPrev = document.querySelector('.btn-prev');
const btnNext = document.querySelector('.btn-next');

let searchPokemon = 1;

const fetchPokemon = async (pokemon) => {
  const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon.toLowerCase()}`);

  if (response.status === 200) {
    const data = await response.json();
    return data;
  }
};

const renderPokemon = async (pokemon) => {
  pokemonName.innerHTML = 'Loading...';
  pokemonNumber.innerHTML = '';

  const data = await fetchPokemon(pokemon);

  if (data) {
    pokemonName.innerHTML = data.name;
    pokemonNumber.innerHTML = data.id;
    pokemonImage.src = data.sprites.front_default;
    pokemonImage.style.display = 'block';
    searchPokemon = data.id;
  } else {
    pokemonName.innerHTML = 'Not found';
    pokemonNumber.innerHTML = '';
    pokemonImage.style.display = 'none';
  }
};

form.addEventListener('submit', (event) => {
  event.preventDefault();
  renderPokemon(input.value);
  input.value = '';
});

btnPrev.addEventListener('click', () => {
  if (searchPokemon > 1) {
    searchPokemon -= 1;
    renderPokemon(searchPokemon.toString());
  }
});

btnNext.addEventListener('click', () => {
  searchPokemon += 1;
  renderPokemon(searchPokemon.toString());
});

renderPokemon(searchPokemon.toString()); // Inicializa com o primeiro Pokémon
