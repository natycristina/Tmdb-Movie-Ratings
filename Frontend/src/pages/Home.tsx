import { useEffect, useState } from "react";
import { MovieCard } from "../components/MovieCard";
import { SearchBar } from "../components/SearchBar";
import { getPopularMovies } from "../services/api";
import { searchMovies } from "../services/api";
import { useNavigate } from "react-router-dom";
import "./Home.css";

type Movie = {
  id: number;
  title: string;
  poster_path: string;
};

export default function Home() {
  const navigate = useNavigate();
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadMovies();
  }, []);

  async function loadMovies() {
    setLoading(true);

    try {
      const data = await getPopularMovies();
      setMovies(data.results);
    } catch (error) {
      console.error(error);
    }

    setLoading(false);
  }

  async function handleSearch(query: string) {
  //  se estiver vazio, volta para os populares
  if (!query.trim()) {
    loadMovies();
    return;
  }

  setLoading(true);

  try {
    const data = await searchMovies(query);
    setMovies(data.results);
  } catch (error) {
    console.error(error);
  }

  setLoading(false);
  }

  return (
    <div className="home-container">
      <h1 className="home-title">🎬 Popular Movies</h1>

      <div className="search-container">
        <SearchBar onSearch={handleSearch} />
      </div>

      {loading && <p>Loading...</p>}

      {!loading && movies.length === 0 && (
        <p>No Movies Found.</p>
      )}

      <div className="movies-grid">
        {movies.map((movie) => (
          <MovieCard
            key={movie.id}
            title={movie.title}
            poster_path={movie.poster_path}
            onClick={() => navigate(`/movie/${movie.id}`)}
          />
        ))}
      </div>
      <button className="ratings-btn" onClick={() => navigate("/rated")}>
  ⭐ My Ratings
</button>
    </div>
  );
}