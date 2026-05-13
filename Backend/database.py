import sqlite3

def get_connection():
    conn = sqlite3.connect("movies.db")
    conn.row_factory = sqlite3.Row
    return conn

def init_db():
    conn = get_connection()
    cursor = conn.cursor()

    cursor.execute("""
    CREATE TABLE IF NOT EXISTS ratings (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        movie_id INTEGER UNIQUE,
        title TEXT,
        poster_path TEXT,
        rating INTEGER
    )
    """)

    conn.commit()
    conn.close()

