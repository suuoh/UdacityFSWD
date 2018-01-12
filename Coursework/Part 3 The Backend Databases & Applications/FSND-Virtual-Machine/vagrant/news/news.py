#!/usr/bin/env python2.7
# 
# Reporting tool on news database

import psycopg2

db = psycopg2.connect("dbname=news")
c = db.cursor()

# 1. Top 3 articles by views sorted in descending order
c.execute("SELECT title, count(*) AS pageviews "
            "FROM articles, log WHERE log.path LIKE '%' || articles.slug "
            "GROUP BY title "
            "ORDER BY pageviews DESC "
            "LIMIT 3;")
for result in c:
    print result
print

# 2. Top authors by article views sorted in descending order
c.execute("SELECT authors.name, count(*) AS totalviews "
            "FROM articles, log, authors "
            "WHERE log.path LIKE '%' || articles.slug AND authors.id = articles.author "
            "GROUP BY name "
            "ORDER BY totalviews DESC;")
for result in c:
    print result
print

# 3. Days with more than 1% request errors
c.execute("SELECT * FROM (SELECT errors.day, (cast(errors.visits as decimal) / (errors.visits + successes.visits) * 100) as errorrate FROM (SELECT date(time) as day, count(*) as visits FROM log WHERE status LIKE '4%' GROUP BY day) as errors LEFT JOIN (SELECT date(time) as day, count(*) as visits FROM log WHERE status LIKE '2%' GROUP BY day) as successes ON errors.day = successes.day) as errortable WHERE errorate > 1;")


for result in c:
    print result
print

db.close()