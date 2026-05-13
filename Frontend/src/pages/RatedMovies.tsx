import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getRatedMovies } from "../services/api";
import "./RatedMovies.css";


export default function RatedMovies() {
  const navigate = useNavigate();

  const [movies, setMovies] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadRatedMovies();
  }, []);

  async function loadRatedMovies() {
    setLoading(true);

    try {
      const ratings = await getRatedMovies();

      setMovies(ratings);
    } catch (err) {
      console.error(err);
    }

    setLoading(false);
  }

  return (
    <div className="rated-container">

    <div className="rated-header">
        <button className="back-btn" onClick={() => navigate("/")}>
        ⬅ Back to Home
        </button>

        <h1 className="rated-title">⭐ Rated Movies</h1>
    </div>

    {loading && <p>Loading...</p>}

    {!loading && movies.length === 0 && (
        <p>No rated movies yet.</p>
    )}

    <div className="movies-grid">
        {movies.map((movie) => (
        <div
            className="movie-card"
            key={movie.movie_id}
            onClick={() => navigate(`/movie/${movie.movie_id}`)}
        >
            <img src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`} />
            <h3>{movie.title}</h3>
            <p>⭐ {movie.rating}</p>
        </div>
        ))}
    </div>

    </div>
  );
}