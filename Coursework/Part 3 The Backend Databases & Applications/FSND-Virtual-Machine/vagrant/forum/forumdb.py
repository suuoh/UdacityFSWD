# "Database code" for the DB Forum.

import datetime, psycopg2, bleach

DBNAME = "forum"

conn = psycopg2.connect(dbname=DBNAME)
c = conn.cursor()

def get_posts():
    conn = psycopg2.connect(dbname=DBNAME)
    c = conn.cursor()
    c.execute("SELECT content, time from posts ORDER BY time DESC")
    return c.fetchall()
    conn.close()

def add_post(content):
    """Add a post to the 'database' with the current timestamp."""
    conn = psycopg2.connect(dbname=DBNAME)
    c = conn.cursor()
    c.execute("INSERT INTO posts VALUES (%s)", (bleach.clean(content),))
    conn.commit()
    conn.close()