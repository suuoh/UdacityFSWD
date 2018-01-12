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
for row in c:
    print "\"" + row[0] + "\" - " + str(row[1]) + " views"
print

# 2. Top authors by article views sorted in descending order
c.execute("SELECT authors.name, count(*) AS totalviews "
            "FROM articles, log, authors "
            "WHERE log.path LIKE '%' || articles.slug "
                "AND authors.id = articles.author "
            "GROUP BY name "
            "ORDER BY totalviews DESC;")
for row in c:
    print row[0] + " - " + str(row[1]) + " views"
print

# 3. Days with more than 1% request errors
c.execute("SELECT * FROM "
            "(SELECT errors.day, "
                "(cast(errors.visits AS decimal) / "
                    "(errors.visits + successes.visits) * 100) AS errorrate "
            "FROM (SELECT date(time) AS day, count(*) AS visits "
                "FROM log WHERE status LIKE '4%' "
                "GROUP BY day) AS errors "
            "LEFT JOIN (SELECT date(time) AS day, count(*) AS visits "
                "FROM log WHERE status LIKE '2%' "
                "GROUP BY day) AS successes "
            "ON errors.day = successes.day) AS errortable "
            "WHERE errorrate > 1;")
for row in c:
    print str(row[0]) + " - " + str(round(row[1], 2)) + "% errors"
print

db.close()
