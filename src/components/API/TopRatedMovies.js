import { useEffect, useState } from "react";
import { fetchMovies } from "./apiCalls";
import MovieCard from "../MovieCard";
import Carousel from "react-multi-carousel";

const TopRatedMovies = ({ onSelectMovie }) => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    fetchMovies("top_rated", (data) => setMovies(data));
  }, []);

  const responsive = {
    superLargeDesktop: { breakpoint: { max: 4000, min: 3000 }, items: 6 },
    desktop: { breakpoint: { max: 3000, min: 1024 }, items: 3 },
    tablet: { breakpoint: { max: 1024, min: 464 }, items: 2 },
    mobile: { breakpoint: { max: 464, min: 0 }, items: 1 },
  };

  return (
    <div className="movie-category">
      <h2>Top Rated Movies</h2>
      <Carousel responsive={responsive}>
        {movies.map((movie) => (
          <MovieCard
            key={movie.id}
            movie={movie}
            onClick={() => onSelectMovie(movie)}
          />
        ))}
      </Carousel>
    </div>
  );
};

export default TopRatedMovies;
