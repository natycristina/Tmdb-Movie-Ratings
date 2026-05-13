import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getMovieDetails, getRating, saveRating, deleteRating } from "../services/api";
import "./MovieDetails.css";

export default function MovieDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [movie, setMovie] = useState<any>(null);
  const [cast, setCast] = useState<any[]>([]);
  const [rating, setRating] = useState<number>(0);

  useEffect(() => {
    async function loadMovie() {
      const data = await getMovieDetails(id!);

      setMovie(data.details);
      setCast(data.credits.cast.slice(0, 10));
    }

    loadMovie();
  }, [id]);

  useEffect(() => {
    async function loadRating() {
      const data = await getRating(id!);
      setRating(data.rating || 0);
    }

    loadRating();
  }, [id]);

  async function handleRating(value: number) {
    setRating(value);

    if (!movie) return;

    await saveRating({
        movie_id: id!,
        title: movie.title,
        poster_path: movie.poster_path,
        rating: value
    });
    }

  async function handleDeleteRating() {
    setRating(0);
    await deleteRating(id!);
  }

  if (!movie) return <p>Loading...</p>;

  return (
    <div className="movie-container">

      <div className="movie-header">
        <button className="back-btn" onClick={() => navigate(-1)}>
        ⬅ Back
        </button>
    </div>

      <div className="movie-content">

        {/* POSTER */}
        <div className="movie-poster">
          <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} />
        </div>

        {/* INFO */}
        <div className="movie-info">
          <h1>{movie.title}</h1>
          <p>{movie.overview}</p>
          <p><b>Release date:</b> {movie.release_date}</p>

          <h3>Rating</h3>

          <div className="rating-buttons">
            {[1,2,3,4,5].map(n => (
              <button key={n} onClick={() => handleRating(n)}>
                ⭐ {n}
              </button>
            ))}
          </div>

          <p>Your rating for this movie: {rating}</p>

          {rating > 0 && (
            <button className="delete-btn" onClick={handleDeleteRating}>
              Remove Rating
            </button>
          )}
        </div>
      </div>

      {/* ELENCO */}
      <h2>Cast</h2>

      <div className="cast-grid">
        {cast.map(actor => (
          <div key={actor.id} className="cast-card">
            <img src={`https://image.tmdb.org/t/p/w200${actor.profile_path}`} />
            <p>{actor.name}</p>
            <small>{actor.character}</small>
          </div>
        ))}
      </div>

    </div>
  );
}