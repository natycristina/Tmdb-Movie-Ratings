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
def get_popular_movies():
    global popular_cache

    if popular_cache is not None:
        return popular_cache

    #URL da API
    url = f"https://api.themoviedb.org/3/movie/popular?api_key={API_KEY}"
    #Faz uma requisição HTTP
    response = requests.get(url, timeout=10)

    popular_cache = response.json()
    #Retorna um JSON
    return popular_cache

#Pede para o TMDB mandar um determiado filme
def search_movies(query):
    global search_cache

    if query in search_cache:
        return search_cache[query]

    url = f"https://api.themoviedb.org/3/search/movie?api_key={API_KEY}&query={query}"
    response = requests.get(url, timeout=10)

    search_cache[query] = response.json()
    return search_cache[query]


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