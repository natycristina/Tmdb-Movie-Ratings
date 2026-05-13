from flask import Blueprint, jsonify, request
from services.tmdb_service import get_popular_movies, search_movies
from services.tmdb_service import get_movie_details, get_movie_credits
# Permite executar tarefas ao mesmo tempo (concorrência)
# Usaremos para buscar detalhes + elenco simultaneamente
from concurrent.futures import ThreadPoolExecutor

movies_bp = Blueprint("movies", __name__)

#API
@movies_bp.route("/movies/popular")
def popular():
    try:
        # chama serviço que busca filmes populares no TMDB
        data = get_popular_movies()
        # retorna resposta em JSON para o frontend
        return jsonify(data)
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@movies_bp.route("/movies/search")
def search():
    query = request.args.get("query")
    # envia o texto digitado pelo usuário para busca no TMDB
    data = search_movies(query)
    # devolve os resultados ao frontend
    return jsonify(data)

@movies_bp.route("/movie/<int:movie_id>")
def movie_details(movie_id):

    with ThreadPoolExecutor() as executor:
        # inicia requisição dos detalhes do filme
        details_future = executor.submit(get_movie_details, movie_id)
        # inicia requisição do elenco
        credits_future = executor.submit(get_movie_credits, movie_id)

        # espera resultados terminarem
        details = details_future.result()
        credits = credits_future.result()
        
    # junta tudo em uma única resposta JSON
    return jsonify({
        "details": details,
        "credits": credits
    })