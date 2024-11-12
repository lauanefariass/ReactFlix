import "./App.css";
import { useState } from "react";
import TopRatedMovies from "./components/API/TopRatedMovies";
import UpcomingMovies from "./components/API/UpcomingMovies";
import PopularMovies from "./components/API/PopularMovies";
import NowPlayingMovies from "./components/API/NowPlayingMovies";
import MovieTrailer from "./components/MovieTrailer";
import "react-multi-carousel/lib/styles.css";

function App() {
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [showTrailer, setShowTrailer] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredMovies, setFilteredMovies] = useState([]);

  const handlePlayTrailer = () => setShowTrailer(true);
  const handleStopTrailer = () => setShowTrailer(false);
  const onSelectMovie = (movie) => setSelectedMovie(movie);

  const handleSearch = async () => {
    if (searchQuery.trim() === "") return;
    const API_URL = `https://api.themoviedb.org/3/search/movie?api_key=01947fdc028668cbba608f3d08618bef&language=en-US&query=${searchQuery}`;
    try {
      const response = await fetch(API_URL);
      const data = await response.json();
      setFilteredMovies(data.results);
    } catch (error) {
      console.error("Error searching movies:", error);
    }
  };

  return (
    <div className="App">
      <header className="header">
        <h1>ReactFlix</h1>
        <div className="search-bar">
          <input
            type="text"
            placeholder="Search for a movie..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button onClick={handleSearch}>Search</button>
        </div>
      </header>

      <div className="movie-category-buttons">
        <TopRatedMovies onSelectMovie={onSelectMovie} />
        <UpcomingMovies onSelectMovie={onSelectMovie} />
        <PopularMovies onSelectMovie={onSelectMovie} />
        <NowPlayingMovies onSelectMovie={onSelectMovie} />
      </div>

      {filteredMovies.length > 0 ? (
        <div className="search-results">
          <h2>Search Results</h2>
          <div className="movie-list">
            {filteredMovies.map((movie) => (
              <div
                key={movie.id}
                className="movie-card"
                onClick={() => onSelectMovie(movie)}
              >
                <img
                  src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                  alt={movie.title}
                />
                <h3>{movie.title}</h3>
              </div>
            ))}
          </div>
        </div>
      ) : (
        selectedMovie && (
          <div className="hero">
            <h1>{selectedMovie.title}</h1>
            <p>{selectedMovie.overview}</p>
            {!showTrailer ? (
              <button onClick={handlePlayTrailer}>Play Trailer</button>
            ) : (
              <>
                <MovieTrailer trailerKey={selectedMovie.trailer} />
                <button onClick={handleStopTrailer}>Stop Trailer</button>
              </>
            )}
          </div>
        )
      )}
    </div>
  );
}

export default App;
