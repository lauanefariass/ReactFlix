import { useEffect, useState } from "react";
import MovieCard from "../MovieCard";
import Carousel from "react-multi-carousel";

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
  const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 3000 },
      items: 6,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
    },
  };

  return (
    <div className="movie-category">
      <h2>Popular Movies</h2>
      <Carousel responsive={responsive}>
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
      </Carousel>
      <div className="movie-list">;</div>
    </div>
  );
};

export default PopularMovies;
