import { useState, useEffect } from "react";
import MovieCard from "./components/MovieCard";
import PopularMovies from "./components/API/PopularMovies";
import TopRatedMovies from "./components/API/TopRatedMovies";
import UpcomingMovies from "./components/API/UpcomingMovies";
import NowPlayingMovies from "./components/API/NowPlayingMovies";
import "./App.css";

const Home = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (searchTerm === "") {
      setSearchResults([]);
      setError(null);
      return;
    }

    const fetchMovies = async () => {
      setLoading(true);
      setError(null);
      const url = `https://api.themoviedb.org/3/search/movie?api_key=01947fdc028668cbba608f3d08618bef&language=en-US&query=${searchTerm}&page=1&include_adult=false`;

      try {
        const response = await fetch(url);
        const data = await response.json();

        if (data.results.length === 0) {
          setError("No movies found.");
        } else {
          setSearchResults(data.results);
        }
      } catch (error) {
        setError("An error occurred while fetching the data.");
        console.error("Error fetching search results:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, [searchTerm]);

  return (
    <div className="home">
      <div className="header">
        <h1>ReactFlix</h1>
        <div className="search-bar">
          <input
            type="text"
            placeholder="Search for movies..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button
            onClick={() => {
              if (searchTerm) {
                setSearchTerm(searchTerm); // Aciona a busca quando o botão é clicado
              }
            }}
          >
            Search
          </button>
        </div>
      </div>

      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}
      {searchResults.length > 0 && (
        <div className="search-results">
          <h2>Search Results</h2>
          <div className="movie-list">
            {searchResults.map((movie) => (
              <MovieCard key={movie.id} movie={movie} />
            ))}
          </div>
        </div>
      )}
      {searchTerm && searchResults.length === 0 && !loading && !error && (
        <p>No movies found.</p>
      )}
      {!searchTerm && (
        <>
          <PopularMovies />
          <TopRatedMovies />
          <UpcomingMovies />
          <NowPlayingMovies />
        </>
      )}
    </div>
  );
};

export default Home;
