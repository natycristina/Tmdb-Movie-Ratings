from flask import Flask
from flask_cors import CORS
from routes.movies import movies_bp
from routes.ratings import ratings_bp
from database import init_db

#Criação do servidor
app = Flask(__name__)

#LIBERA O FRONTEND
CORS(app)

#Liga as rotas ao servidor.
app.register_blueprint(movies_bp, url_prefix="/api")
app.register_blueprint(ratings_bp, url_prefix="/api")

init_db() # cria banco se não existir

if __name__ == "__main__":
    #Inicia o servidor
    app.run(debug=True)