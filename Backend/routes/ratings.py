from flask import Blueprint, request, jsonify
# Função que cria conexão com o banco SQLite
from database import get_connection

# Cria grupo de rotas chamado "ratings"
ratings_bp = Blueprint("ratings", __name__)

# CREATE / UPDATE Rota chamada quando o usuário avalia um filme.
@ratings_bp.route("/ratings", methods=["POST"])
def save_rating():
    data = request.json

    #Extrai os dados do corpo da requisição.
    movie_id = data["movie_id"]
    title = data["title"]
    poster_path = data["poster_path"]
    rating = data["rating"]

    #Abre conexão com o banco de dados.
    conn = get_connection()
    cursor = conn.cursor()

    #Se nao existir no banco, insere uma nova avaliação, se não, apenas atualiza 
    cursor.execute("""
        INSERT INTO ratings (movie_id, title, poster_path, rating)
        VALUES (?, ?, ?, ?)
        ON CONFLICT(movie_id)
        DO UPDATE SET
            title=excluded.title,
            poster_path=excluded.poster_path,
            rating=excluded.rating
    """, (movie_id, title, poster_path, rating))

    #Salva alterações definitivamente e fecha a conexão
    conn.commit()
    conn.close()

    return jsonify({"message": "saved"})

# READ Buscar avaliação de UM filme
@ratings_bp.route("/ratings/<movie_id>")
def get_rating(movie_id):
    conn = get_connection()
    cursor = conn.cursor()

    cursor.execute(
        "SELECT rating FROM ratings WHERE movie_id=?",
        (movie_id,)
    )

    row = cursor.fetchone()
    conn.close()

    return jsonify({
        "movie_id": movie_id,
        "rating": row["rating"] if row else None
    })


# DELETE Remover avaliação
@ratings_bp.route("/ratings/<movie_id>", methods=["DELETE"])
def delete_rating(movie_id):
    conn = get_connection()
    cursor = conn.cursor()

    cursor.execute(
        "DELETE FROM ratings WHERE movie_id=?",
        (movie_id,)
    )

    conn.commit()
    conn.close()

    return jsonify({"message": "deleted"})

#READ ALL (Lista todos filmes avaliados)
@ratings_bp.route("/ratings", methods=["GET"])
def get_all_ratings():
    conn = get_connection()
    cursor = conn.cursor()

    cursor.execute("SELECT movie_id, title, poster_path, rating FROM ratings")
    rows = cursor.fetchall()
    conn.close()

    return jsonify([
        {
            "movie_id": row["movie_id"],
            "title": row["title"],
            "poster_path": row["poster_path"],
            "rating": row["rating"]
        }
        for row in rows
    ])