import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  fetchMovie,
  fetchMovieCast,
  fetchSimilarMovies,
  fetchPersonDetails,
  fetchMovieTrailer,
} from "./API/apiCalls";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css"; // Estilos para o carrossel

function Movie() {
  const { id } = useParams();
  const [movie, setMovie] = useState({});
  const [cast, setCast] = useState([]);
  const [similarMovies, setSimilarMovies] = useState([]);
  const [personDetails, setPersonDetails] = useState(null);
  const [trailerUrl, setTrailerUrl] = useState(""); // URL do trailer
  const [isPlaying, setIsPlaying] = useState(false); // Controle para exibir o trailer ou pôster

  useEffect(() => {
    fetchMovie(id, setMovie);
    fetchMovieCast(id, setCast);
    fetchSimilarMovies(id, setSimilarMovies);
  }, [id]);

  useEffect(() => {
    if (cast.length > 0) {
      fetchPersonDetails(cast[0].id, setPersonDetails);
    }
  }, [cast]);

  useEffect(() => {
    const fetchTrailer = async () => {
      const trailer = await fetchMovieTrailer(id);
      if (trailer) {
        setTrailerUrl(`https://www.youtube.com/embed/${trailer.key}`);
      }
    };

    fetchTrailer();
  }, [id]);

  const responsive = {
    superLargeDesktop: { breakpoint: { max: 4000, min: 3000 }, items: 6 },
    desktop: { breakpoint: { max: 3000, min: 1024 }, items: 3 },
    tablet: { breakpoint: { max: 1024, min: 464 }, items: 2 },
    mobile: { breakpoint: { max: 464, min: 0 }, items: 1 },
  };

  const handlePlay = () => setIsPlaying(true);
  const handleStop = () => setIsPlaying(false);

  return (
    <div className="movie-page">
      <div className="hero">
        {isPlaying ? (
          <iframe
            width="560"
            height="315"
            src={trailerUrl}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            title="movie trailer"
          ></iframe>
        ) : (
          <img
            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
            alt={movie.title}
          />
        )}

        <h2>{movie.title}</h2>
        <p>{movie.overview}</p>

        {/* Botões para Play e Stop */}
        {!isPlaying && trailerUrl && (
          <button onClick={handlePlay}>Play Trailer</button>
        )}
        {isPlaying && <button onClick={handleStop}>Stop Trailer</button>}
      </div>

      {cast.length > 0 && (
        <div className="movie-cast">
          <h3>Cast</h3>
          <Carousel responsive={responsive}>
            {cast.slice(0, 10).map((actor) => (
              <div key={actor.id} className="cast-member">
                <img
                  src={`https://image.tmdb.org/t/p/w500${actor.profile_path}`}
                  alt={actor.name}
                />
                <p>{actor.name}</p>
                <p>{actor.character}</p>
              </div>
            ))}
          </Carousel>
        </div>
      )}

      {personDetails && (
        <div className="person-details">
          <h3>Featured Actor: {personDetails.name}</h3>
          <div className="details-content">
            <img
              src={`https://image.tmdb.org/t/p/w500${personDetails.profile_path}`}
              alt={personDetails.name}
            />
            <p>{personDetails.biography}</p>
          </div>
        </div>
      )}

      {similarMovies.length > 0 && (
        <div className="similar-movies">
          <h3>Similar Movies</h3>
          <Carousel responsive={responsive}>
            {similarMovies.map((movie) => (
              <div key={movie.id} className="movie-card">
                <img
                  src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                  alt={movie.title}
                />
                <h4>{movie.title}</h4>
              </div>
            ))}
          </Carousel>
        </div>
      )}
    </div>
  );
}

export default Movie;
