import { useEffect, useState } from "react";
import { MovieCard } from "../components/MovieCard";
import { SearchBar } from "../components/SearchBar";
import { getPopularMovies, searchMovies } from "../services/api";
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
  const [page, setPage] = useState(1);
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);

  /* CARREGAR OS FILMES */
  async function loadMovies(pageNumber = 1, currentQuery = "") {
    if (loading) return;

    setLoading(true);

    try {
      const data = currentQuery
        ? await searchMovies(currentQuery, pageNumber)
        : await getPopularMovies(pageNumber);

      setMovies(prev =>
        pageNumber === 1
          ? data.results
          : [...prev, ...data.results]
      );

    } catch (error) {
      console.error(error);
    }

    setLoading(false);
  }

  useEffect(() => {
    loadMovies(1);
  }, []);

  /* NOVA BUSCA */
  function handleSearch(newQuery: string) {
    setQuery(newQuery);
    setMovies([]);
    setPage(1);
    loadMovies(1, newQuery);
  }

  /* SCROLL INFINITO */
  useEffect(() => {
    function handleScroll() {
      if (
        window.innerHeight + window.scrollY >=
        document.body.offsetHeight - 300
      ) {
        setPage(prev => prev + 1);
      }
    }

    window.addEventListener("scroll", handleScroll);

    return () =>
      window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (page === 1) return;

    loadMovies(page, query);
  }, [page]);

  return (
    <div className="home-container">
      <h1 className="home-title">🎬 Popular Movies</h1>

      <div className="search-container">
        <SearchBar onSearch={handleSearch} />
      </div>

      <div className="movies-grid">
        {movies.map(movie => (
          <MovieCard
            key={movie.id}
            title={movie.title}
            poster_path={movie.poster_path}
            onClick={() => navigate(`/movie/${movie.id}`)}
          />
        ))}
      </div>

      {loading && <p>Loading more movies...</p>}

      <button
        className="ratings-btn"
        onClick={() => navigate("/rated")}
      >
        ⭐ My Ratings
      </button>
    </div>
  );
}