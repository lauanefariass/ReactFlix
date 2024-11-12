import { useEffect, useState } from "react";
import MovieCard from "../MovieCard";

const NowPlayingMovies = ({ onSelectMovie }) => {
  const [movies, setMovies] = useState([]);
  const API_URL =
    "https://api.themoviedb.org/3/movie/now_playing?api_key=01947fdc028668cbba608f3d08618bef&language=en-US&page=1";

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await fetch(API_URL);
        const data = await response.json();
        setMovies(data.results);
      } catch (error) {
        console.error("Error fetching now playing movies:", error);
      }
    };
    fetchMovies();
  }, []);

  return (
    <div className="movie-category">
      <h2>Now Playing Movies</h2>
      <div className="movie-list">
        {movies.map((movie) => (
          <MovieCard
            key={movie.id}
            movie={movie}
            onClick={() => onSelectMovie(movie)}
          />
        ))}
      </div>
    </div>
  );
};

export default NowPlayingMovies;
