import requests
import os
from dotenv import load_dotenv

load_dotenv()

#consumindo de API externa
API_KEY = os.getenv("TMDB_API_KEY")

# caches corretos
popular_cache = None
search_cache = {}
details_cache = {}

#Pede para o TMDB mandar os filmes populares
def get_popular_movies(page=1):
    global popular_cache

    # cache por página
    if popular_cache and page in popular_cache:
        return popular_cache[page]

    url = f"https://api.themoviedb.org/3/movie/popular?api_key={API_KEY}&page={page}"
    response = requests.get(url, timeout=10)

    data = response.json()

    if popular_cache is None:
        popular_cache = {}

    popular_cache[page] = data

    return data

#Pede para o TMDB mandar um determiado filme
def search_movies(query, page=1):
    global search_cache

    cache_key = f"{query}_{page}"

    if cache_key in search_cache:
        return search_cache[cache_key]

    url = f"https://api.themoviedb.org/3/search/movie?api_key={API_KEY}&query={query}&page={page}"
    response = requests.get(url, timeout=10)

    data = response.json()
    search_cache[cache_key] = data

    return data


def get_movie_details(movie_id):
    global details_cache

    if movie_id in details_cache:
        return details_cache[movie_id]

    url = f"https://api.themoviedb.org/3/movie/{movie_id}?api_key={API_KEY}"
    response = requests.get(url, timeout=10)

    details_cache[movie_id] = response.json()
    return details_cache[movie_id]

credits_cache = {}

def get_movie_credits(movie_id):
    if movie_id in credits_cache:
        return credits_cache[movie_id]

    url = f"https://api.themoviedb.org/3/movie/{movie_id}/credits?api_key={API_KEY}"
    response = requests.get(url, timeout=10)

    credits_cache[movie_id] = response.json()
    return credits_cache[movie_id]