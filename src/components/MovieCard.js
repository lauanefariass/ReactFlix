import { Link } from "react-router-dom";

const MovieCard = ({ movie, onClick }) => {
  return (
    <Link to={`/movie/${movie.id}`} onClick={() => onClick(movie)}>
      <div className="movie-card">
        <img
          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
          alt={movie.title}
        />
        <h2>{movie.title}</h2>
      </div>
    </Link>
  );
};

export default MovieCard;
