import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5000/api",
});

export async function getPopularMovies(page = 1) {
  const response = await api.get(`/movies/popular?page=${page}`);
  return response.data;
}

export async function searchMovies(query: string, page = 1) {
  const response = await api.get(
    `/movies/search?query=${query}&page=${page}`
  );
  return response.data;
}

export async function getMovieDetails(id: string) {
  const res = await api.get(`/movie/${id}`);
  return res.data;
}

export async function getRating(id: string) {
  const res = await api.get(`/ratings/${id}`);
  return res.data;
}

export async function saveRating(data: {
  movie_id: string;
  title: string;
  poster_path: string;
  rating: number;
}) {
  const response = await fetch("http://localhost:5000/api/ratings", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data)
  });

  return response.json();
}

export async function deleteRating(id: string) {
  const res = await api.delete(`/ratings/${id}`);
  return res.data;
}

export async function getRatedMovies() {
  const res = await api.get("/ratings");
  return res.data;
}