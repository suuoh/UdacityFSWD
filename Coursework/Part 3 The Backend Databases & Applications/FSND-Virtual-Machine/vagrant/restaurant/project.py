from flask import Flask
app = Flask(__name__)

# Import CRUD
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from database_setup import Base, Restaurant, MenuItem

# Create session and connect to databse
engine = create_engine('sqlite:///restaurantMenu.db')
Base.metadata.bind = engine
DBSession = sessionmaker(bind=engine)
session = DBSession()

@app.route('/')
@app.route('/restaurant/<int:restaurant_id>/')
def restaurantMenu(restaurant_id):
    restaurant = session.query(Restaurant).filter_by(id=restaurant_id).one()
    items = session.query(MenuItem).filter_by(restaurant_id=restaurant_id)
    output = ''
    for i in items:
        output += i.name + '<br />'
        output += i.price + '<br />'
        output += i.description + '<br /><br />'
    return output

# Create route for newMenuItem function here
@app.route('/restaurant/<int:restaurant_id>/new/')
def newMenuItem(restaurant_id):
    return "page to create a new menu item. Task 1 complete!"

# Create route for editMenuItem function here
@app.route('/restaurant/<int:restaurant_id>/<int:menu_id>/edit/')
def editMenuItem(restaurant_id, menu_id):
    return "page to edit a menu item. Task 2 complete!"

# Create a route for deleteMenuItem function here
@app.route('/restaurant/<int:restaurant_id>/<int:menu_id>/delete/')
def deleteMenuItem(restaurant_id, menu_id):
    return "page to delete a menu item. Task 3 complete!"

if __name__ == '__main__':
    app.debug = True
    app.run(host='0.0.0.0', port=5000)