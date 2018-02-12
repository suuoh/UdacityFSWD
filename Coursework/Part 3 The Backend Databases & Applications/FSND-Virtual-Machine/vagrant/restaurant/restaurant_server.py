# Import web server
from BaseHTTPServer import BaseHTTPRequestHandler, HTTPServer
import cgi

# Import CRUD
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from database_setup import Base, Restaurant, MenuItem

# Create session and connect to databse
engine = create_engine('sqlite:///restaurantMenu.db')
Base.metadata.bind = engine
DBSession = sessionmaker(bind=engine)
session = DBSession()


class webServerHandler(BaseHTTPRequestHandler):
    def do_GET(self):
        try:
            if self.path.endswith("/restaurant"):
                restaurants = session.query(Restaurant).all()
                self.send_response(200)
                self.send_header("Content-type", "text/html")
                self.end_headers()

                output = ""
                output += "<html><body>"
                output += "<a href='/restaurant/new'>Make a New Restaurant</a>"

                for restaurant in restaurants:
                    output += "<p>" + restaurant.name + "<br />"
                    output += "<a href='/restaurant/%s/edit'>Edit</a><br />" % restaurant.id
                    output += "<a href='/restaurant/%s/delete'>Delete</a><br />" % restaurant.id

                output += "</body></html>"
                self.wfile.write(output)

            if self.path.endswith("/restaurant/new"):
                self.send_response(200)
                self.send_header("Content-type", "text/html")
                self.end_headers()

                output = ""
                output += "<html><body>"
                output += "<h1>Make a New Restaurant</h1>"
                output += "<form method='POST' enctype='multipart/form-data' action='/restaurant/new'>"
                output += "<input name='restaurantname' type='text' placeholder='New Restaurant Name'>"
                output += "<input type='submit' value='Create'></form>"
                output += "</body></html>"
                self.wfile.write(output)

            if self.path.endswith("/edit"):
                restaurantId = self.path.split("/")[2]
                currentRestaurant = session.query(Restaurant).filter_by(id=restaurantId).one()

                if currentRestaurant:
                    self.send_response(200)
                    self.send_header("Content-type", "text/html")
                    self.end_headers()

                    output = ""
                    output += "<html><body>"
                    output += "<h1>" + currentRestaurant.name + "</h1>"
                    output += "<form method='POST' enctype='multipart/form-data' action='/restaurant/%s/edit'>" % restaurantId
                    output += "<input name='restaurantname' type='text' placeholder='New Restaurant Name'>"
                    output += "<input type='submit' value='Rename'></form>"
                    output += "</body></html>"
                    self.wfile.write(output)

            if self.path.endswith("/delete"):
                restaurantId = self.path.split("/")[2]
                currentRestaurant = session.query(Restaurant).filter_by(id=restaurantId).one()

                if currentRestaurant:
                    self.send_response(200)
                    self.send_header("Content-type", "text/html")
                    self.end_headers()

                    output = ""
                    output += "<html><body>"
                    output += "<h1>Are you sure you want to delete %s?</h1>" % currentRestaurant.name
                    output += "<form method='POST' enctype='multipart/form-data' action='/restaurant/%s/delete'>" % restaurantId
                    output += "<input type='submit' value='Delete'></form>"
                    output += "</body></html>"
                    self.wfile.write(output)
            return

        except IOError:
            self.send_error(404, "File Not Found %s" % self.path)

    def do_POST(self):
        try:
            if self.path.endswith("/restaurant/new"):
                ctype, pdict = cgi.parse_header(self.headers.getheader("content-type"))
                if ctype == "multipart/form-data":
                    fields = cgi.parse_multipart(self.rfile, pdict)
                    inputtext = fields.get("restaurantname")
                    newRestaurant = Restaurant(name=inputtext[0])
                    session.add(newRestaurant)
                    session.commit()

                    self.send_response(301)
                    self.send_header("Content-type", "text/html")
                    self.send_header("Location", "/restaurant")
                    self.end_headers()

            if self.path.endswith("/edit"):
                ctype, pdict = cgi.parse_header(self.headers.getheader("content-type"))
                if ctype == "multipart/form-data":
                    fields = cgi.parse_multipart(self.rfile, pdict)
                    inputtext = fields.get("restaurantname")
                    restaurantId = self.path.split("/")[2]
                    currentRestaurant = session.query(Restaurant).filter_by(id=restaurantId).one()
                    if currentRestaurant:
                        currentRestaurant.name = inputtext[0]
                        session.add(currentRestaurant)
                        session.commit()
                        self.send_response(301)
                        self.send_header("Content-type", "text/html")
                        self.send_header("Location", "/restaurant")
                        self.send_headers()

            if self.path.endswith("/delete"):
                restaurantId = self.path.split("/")[2]
                currentRestaurant = session.query(Restaurant).filter_by(id=restaurantId).one()
                if currentRestaurant:
                    session.delete(currentRestaurant)
                    session.commit()
                    self.send_response(301)
                    self.send_header("Content-type", "text/html")
                    self.send_header("Location", "/restaurant")
                    self.send_headers()
            return

        except:
            pass


def main():
    try:
        port = 8080
        server = HTTPServer(("", port), webServerHandler)
        print "Web server running on port %s" % port
        server.serve_forever()

    except KeyboardInterrupt:
        print "^C entered, stopping web server..."
        server.socket.close()

if __name__ == "__main__":
    main()
