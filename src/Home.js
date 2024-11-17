import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchMoviesByCategory,
  fetchTopRatedMovies,
  fetchNowPlayingMovies,
  fetchUpcomingMovies,
} from "./redux/features/moviesSlice";
import MovieCard from "./components/MovieCard";
import "./App.css";

const Home = () => {
  const [searchTerm, setSearchTerm] = useState(""); 
  const [searchResults, setSearchResults] = useState([]); 
  const [loadingSearch, setLoadingSearch] = useState(false); 
  const [errorSearch, setErrorSearch] = useState(null); 

  const dispatch = useDispatch();
  const {
    popularMovies,
    topRatedMovies,
    nowPlayingMovies,
    upcomingMovies,
    status,
    error,
  } = useSelector((state) => state.movies);

  
  useEffect(() => {
    dispatch(fetchMoviesByCategory());
    dispatch(fetchTopRatedMovies());
    dispatch(fetchNowPlayingMovies());
    dispatch(fetchUpcomingMovies());
  }, [dispatch]);

  
  useEffect(() => {
    if (!searchTerm) {
      setSearchResults([]);
      setErrorSearch(null);
      return;
    }

    const fetchSearchResults = async () => {
      setLoadingSearch(true);
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/search/movie?api_key=01947fdc028668cbba608f3d08618bef&query=${encodeURIComponent(
            searchTerm
          )}`
        );

        if (!response.ok) {
          throw new Error(
            `API error: ${response.status} - ${response.statusText}`
          );
        }

        const data = await response.json();
        if (data.results.length === 0) {
          setErrorSearch("No movies found.");
        } else {
          setSearchResults(data.results);
        }
      } catch (err) {
        setErrorSearch(err.message || "Error fetching search results.");
      } finally {
        setLoadingSearch(false);
      }
    };

    fetchSearchResults();
  }, [searchTerm]);

  return (
    <div className="home">
      {/* Header Section */}
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
            onClick={() => searchTerm && setSearchTerm(searchTerm)}
            disabled={!searchTerm}
          >
            Search
          </button>
        </div>
      </div>

      {/* Search Results */}
      {loadingSearch && <p>Loading search results...</p>}
      {errorSearch && <p>{errorSearch}</p>}
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

      {/* Popular Movies */}
      <section>
        <h2>Popular Movies</h2>
        {status.popular === "loading" && <p>Loading popular movies...</p>}
        {status.popular === "failed" && <p>Error: {error.popular}</p>}
        {status.popular === "succeeded" && (
          <div className="movie-list">
            {popularMovies.map((movie) => (
              <MovieCard key={movie.id} movie={movie} />
            ))}
          </div>
        )}
      </section>

      {/* Top Rated Movies */}
      <section>
        <h2>Top Rated Movies</h2>
        {status.topRated === "loading" && <p>Loading top rated movies...</p>}
        {status.topRated === "failed" && <p>Error: {error.topRated}</p>}
        {status.topRated === "succeeded" && (
          <div className="movie-list">
            {topRatedMovies.map((movie) => (
              <MovieCard key={movie.id} movie={movie} />
            ))}
          </div>
        )}
      </section>

      {/* Now Playing Movies */}
      <section>
        <h2>Now Playing Movies</h2>
        {status.nowPlaying === "loading" && (
          <p>Loading now playing movies...</p>
        )}
        {status.nowPlaying === "failed" && <p>Error: {error.nowPlaying}</p>}
        {status.nowPlaying === "succeeded" && (
          <div className="movie-list">
            {nowPlayingMovies.map((movie) => (
              <MovieCard key={movie.id} movie={movie} />
            ))}
          </div>
        )}
      </section>

      {/* Upcoming Movies */}
      <section>
        <h2>Upcoming Movies</h2>
        {status.upcoming === "loading" && <p>Loading upcoming movies...</p>}
        {status.upcoming === "failed" && <p>Error: {error.upcoming}</p>}
        {status.upcoming === "succeeded" && (
          <div className="movie-list">
            {upcomingMovies.map((movie) => (
              <MovieCard key={movie.id} movie={movie} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
};

export default Home;
