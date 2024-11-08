
function MovieTrailer({ trailerKey }) {
  return (
    <div className="movie-trailer">
      <iframe
        width="560"
        height="315"
        src={`https://www.youtube.com/embed/${trailerKey}`}
        frameBorder="0"
        allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        title="Movie Trailer"
      ></iframe>
    </div>
  );
}

export default MovieTrailer;
