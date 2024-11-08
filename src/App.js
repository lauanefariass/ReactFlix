import "./App.css";
import { useEffect, useState } from "react";
import MovieCard from "./components/MovieCard/MovieCard";
import MovieTrailer from "./components/MovieTrailer/MovieTrailer";

function App() {
  const API_URL = "https://api.themoviedb.org/3";
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [searchKey, setSearchKey] = useState("");
  const [showTrailer, setShowTrailer] = useState(false);
  const [selectedMovieIndex, setSelectedMovieIndex] = useState(0);

  const fetchMovies = async (query = "") => {
    try {
      const url = query
        ? `${API_URL}/search/movie?api_key=01947fdc028668cbba608f3d08618bef&query=${query}`
        : `${API_URL}/discover/movie?api_key=01947fdc028668cbba608f3d08618bef`;
      const response = await fetch(url);
      const { results } = await response.json();
      setMovies(results);
      setSelectedMovie(results[0] || null);
    } catch (error) {
      console.error("Erro ao buscar filmes:", error);
    }
  };

  const fetchTrailer = async (movieId) => {
    try {
      const trailerResponse = await fetch(
        `${API_URL}/movie/${movieId}/videos?api_key=01947fdc028668cbba608f3d08618bef`
      );
      const trailer = (await trailerResponse.json()).results.find(
        (video) => video.type === "Trailer"
      );
      if (trailer) {
        setSelectedMovie((prevState) => ({
          ...prevState,
          trailer: trailer.key,
        }));
      }
    } catch (error) {
      console.error("Erro ao buscar trailer:", error);
    }
  };

  useEffect(() => {
    fetchMovies();
  }, []);

  const handleSearchInputChange = (e) => {
    const query = e.target.value;
    setSearchKey(query);
    fetchMovies(query);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    fetchMovies(searchKey);
  };

  const handlePlayTrailer = () => {
    if (selectedMovie && !selectedMovie.trailer) fetchTrailer(selectedMovie.id);
    setShowTrailer(true);
  };

  const handleStopTrailer = () => setShowTrailer(false);

  const handleNextMovie = () => {
    const nextIndex = (selectedMovieIndex + 1) % movies.length;
    setSelectedMovieIndex(nextIndex);
    setSelectedMovie(movies[nextIndex]);
    setShowTrailer(false);
  };

  const handlePrevMovie = () => {
    const prevIndex = (selectedMovieIndex - 1 + movies.length) % movies.length;
    setSelectedMovieIndex(prevIndex);
    setSelectedMovie(movies[prevIndex]);
    setShowTrailer(false);
  };

  return (
    <div className="App">
      <header className="header">
        <div className="header-content max-center">
          <span>ReactFlix</span>
          <form onSubmit={handleSearchSubmit}>
            <input
              type="text"
              placeholder="Search for a movie"
              value={searchKey}
              onChange={handleSearchInputChange}
            />
            <button type="submit">Search!</button>
          </form>
        </div>
      </header>

      <div className="hero">
        <div className="hero-content max-center">
          {selectedMovie ? (
            <>
              <h1>{selectedMovie.title}</h1>
              <p className="hero-overview">
                {selectedMovie.overview || "No description available"}
              </p>
              {!showTrailer ? (
                <>
                  <img
                    className="movie-poster"
                    src={`https://image.tmdb.org/t/p/w500${selectedMovie.poster_path}`}
                    alt={selectedMovie.title}
                  />
                  <button className="button" onClick={handlePlayTrailer}>
                    Play Trailer
                  </button>
                </>
              ) : (
                <>
                  <MovieTrailer trailerKey={selectedMovie.trailer} />
                  <button
                    className="button stop-button"
                    onClick={handleStopTrailer}
                  >
                    Stop Trailer
                  </button>
                </>
              )}

              <div className="navigation-buttons">
                <button
                  className="nav-button prev-button"
                  onClick={handlePrevMovie}
                >
                  &lt;
                </button>
                <button
                  className="nav-button next-button"
                  onClick={handleNextMovie}
                >
                  &gt;
                </button>
              </div>
            </>
          ) : (
            <h1>Select a Movie</h1>
          )}
        </div>
      </div>

      <div className="container">
        {movies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
    </div>
  );
}

export default App;
