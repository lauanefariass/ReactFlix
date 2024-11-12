import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchMovie } from "./API/apiCalls";

function Movie() {
  const { id } = useParams();
  const [movie, setMovie] = useState({});
  useEffect(() => {
    fetchMovie(id, setMovie);
  });
  console.log(movie, "single movie");
  return (
    <div>
      {/* <img
          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
          alt={movie.title}
        />
        <h2>{movie.title}</h2> */}
    </div>
  );
}
export default Movie;
