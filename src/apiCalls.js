export async function fetchMovies(category, callback) {
  const API_URL = `https://api.themoviedb.org/3/movie/${category}?api_key=01947fdc028668cbba608f3d08618bef&language=en-US&page=1`;

  try {
    const result = await fetch(API_URL);
    const data = await result.json();
    return data.results;
  } catch (error) {
    console.error(`Error fetching ${category} movies:`, error);
    return [];
  }
}
