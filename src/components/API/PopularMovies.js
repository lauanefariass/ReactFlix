import { useEffect, useState } from "react";
import MovieCard from "../MovieCard";

const PopularMovies = ({ onSelectMovie }) => {
  const [movies, setMovies] = useState([]);
  const API_URL =
    "https://api.themoviedb.org/3/movie/popular?api_key=01947fdc028668cbba608f3d08618bef&language=en-US&page=1";

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await fetch(API_URL);
        const data = await response.json();
        const filteredMovies = data.results.slice(4);
        setMovies(filteredMovies);
        if (filteredMovies.length > 0) onSelectMovie(filteredMovies[0]);
      } catch (error) {
        console.error("Error fetching popular movies:", error);
      }
    };
    fetchMovies();
  }, [onSelectMovie]);

  return (
    <div className="movie-category">
      <h2>Popular Movies</h2>
      <div className="movie-list">
        {movies.length > 0 ? (
          movies.map((movie) => (
            <MovieCard
              key={movie.id}
              movie={movie}
              onClick={() => onSelectMovie(movie)}
            />
          ))
        ) : (
          <p>Loading movies...</p>
        )}
      </div>
    </div>
  );
};

export default PopularMovies;
