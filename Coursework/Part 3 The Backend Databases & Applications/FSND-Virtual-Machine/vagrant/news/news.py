#!/usr/bin/env python2.7
# 
# Reporting tool on news database

import psycopg2

db = psycopg2.connect("dbname=news")
c = db.cursor()

# 1. Top 3 articles by views sorted in descending order
c.execute("SELECT title, views FROM articles, (SELECT path, count(*) as views FROM articles, log WHERE path LIKE '%' || slug GROUP BY path ORDER BY views DESC) as articleviews WHERE path LIKE '%' || slug LIMIT 3;")
for result in c:
    print result
print

# 2. Top authors by article views sorted in descending order
c.execute("SELECT name, totalviews FROM authors LEFT JOIN (SELECT author, SUM(views) as totalviews FROM articles, (SELECT path, count(*) as views FROM articles, log WHERE path LIKE '%' || slug GROUP BY path) as articleviews WHERE path LIKE '%' || slug GROUP BY author) as authorviews ON authors.id = authorviews.author ORDER BY totalviews DESC;")
for result in c:
    print result
print
c.execute("SELECT authors.name, count(*) as totalviews FROM articles, log, authors WHERE log.path LIKE '%' || articles.slug and authors.id = articles.author GROUP BY name ORDER BY totalviews DESC;")
for result in c:
    print result
print

# 3. Days with more than 1% request errors
#c.execute()
#print c.fetchall()

db.close()