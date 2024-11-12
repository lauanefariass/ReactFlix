export async function fetchMovies(category, callback) {
  const API_URL = `https://api.themoviedb.org/3/movie/${category}?api_key=01947fdc028668cbba608f3d08618bef&language=en-US&page=1`;

  try {
    const result = await fetch(API_URL);
    const data = await result.json();
    callback(data.results);
  } catch (error) {
    console.error(`Error fetching ${category} movies:`, error);
    callback([]);
  }
}

export async function fetchMovie(id, callback) {
  const url = `https://api.themoviedb.org/3/movie/${id}?api_key=01947fdc028668cbba608f3d08618bef`;

  try {
    const result = await fetch(url);
    const data = await result.json();
    callback(data);
  } catch (error) {
    console.error(`Error fetching movie with id ${id}:`, error);
    callback(null);
  }
}

export async function fetchMovieCast(id, callback) {
  const url = `https://api.themoviedb.org/3/movie/${id}/credits?api_key=01947fdc028668cbba608f3d08618bef&language=en-US&page=1`;

  try {
    const result = await fetch(url);
    const data = await result.json();
    callback(data.cast);
  } catch (error) {
    console.error(`Error fetching cast for movie with id ${id}:`, error);
    callback([]);
  }
}

export async function fetchSimilarMovies(id, callback) {
  const url = `https://api.themoviedb.org/3/movie/${id}/similar?api_key=01947fdc028668cbba608f3d08618bef&language=en-US&page=1`;

  try {
    const result = await fetch(url);
    const data = await result.json();
    callback(data.results);
  } catch (error) {
    console.error(
      `Error fetching similar movies for movie with id ${id}:`,
      error
    );
    callback([]);
  }
}
export async function fetchPersonDetails(personId, callback) {
  const url = `https://api.themoviedb.org/3/person/${personId}?api_key=01947fdc028668cbba608f3d08618bef&language=en-US&page=1`;

  try {
    const result = await fetch(url);
    const data = await result.json();
    callback(data);
  } catch (error) {
    console.error(
      `Error fetching person details for person with id ${personId}:`,
      error
    );
    callback(null);
  }
}
