const API_KEY = '288717f6';  
const BASE_URL = 'http://www.omdbapi.com/';

const moviesContainer = document.getElementById('moviesContainer');
const searchInput = document.getElementById('searchInput');






searchInput.addEventListener('keyup', (event) => {
  const query = event.target.value.trim();
  if (query) {
    searchMovies(query);
  } else {
    moviesContainer.innerHTML = '<p>Still typing to search for a movie.....</p>';
  }
});


async function searchMovies(query) {
  try {
    const response = await fetch(`${BASE_URL}?apikey=${API_KEY}&s=${query}`);
    const data = await response.json();
    console.log(data);
    if (data.Response === 'True') {
      displayMovies(data.Search);
    } else {
      moviesContainer.innerHTML = `<p>${data.Error}</p>`;
    }
  } catch (error) {
    console.error('Error fetching movies:', error);
  }
}




function displayMovies(movies) {
  moviesContainer.innerHTML = '';
  movies.forEach(movie => {
    const movieCard = document.createElement('div');
    movieCard.classList.add('movie-card');

    movieCard.innerHTML = `
      <img src="${movie.Poster !== 'N/A' ? movie.Poster : 'placeholder.jpg'}" alt="${movie.Title}">
      <h2>${movie.Title}</h2>
      <p>Year: ${movie.Year}</p>
    `;
    moviesContainer.appendChild(movieCard);
  }
);
}