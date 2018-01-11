#!/usr/bin/env python2.7
# 
# Reporting tool on news database

import psycopg2

db = psycopg2.connect("dbname=news")
c = db.cursor()

# 1. Top 3 articles by views sorted in descending order
c.execute("SELECT title, count(*) as pageviews FROM articles, log WHERE log.path LIKE '%' || articles.slug GROUP BY title ORDER BY pageviews DESC LIMIT 3;")
for result in c:
    print result
print

# 2. Top authors by article views sorted in descending order
c.execute("SELECT authors.name, count(*) as totalviews FROM articles, log, authors WHERE log.path LIKE '%' || articles.slug and authors.id = articles.author GROUP BY name ORDER BY totalviews DESC;")
for result in c:
    print result
print

# 3. Days with more than 1% request errors
c.execute("SELECT day, to_char(cast(access.error as decimal) / (access.error + access.ok) * 100, '999D99%') as errorrate FROM (SELECT date(log.time) as day, sum(CASE WHEN log.status LIKE '2%' THEN 1 ELSE 0 END) as ok, sum(CASE WHEN log.status LIKE '4%' THEN 1 ELSE 0 END) as error FROM log GROUP BY day ORDER BY day) as access;")
for result in c:
    print result
print

db.close()