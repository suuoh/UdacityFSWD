import turtle

def draw_shapes():
    window = turtle.Screen()
    window.bgcolor("blue")

    joe = turtle.Turtle()
    joe.shape("triangle")
    joe.color("white")
    joe.speed("fastest")

    for i in range(0,36):
        for i in range(0,4):
            joe.forward(200)
            joe.right(90)
        joe.right(10)
    
##  wendy = turtle.Turtle()
##  wendy.shape("circle")
##  wendy.color("red")
##  wendy.speed(7)
##  wendy.circle(100)
##
##  andy = turtle.Turtle()
##  andy.shape("turtle")
##  andy.color("yellow")
##  andy.speed(8)
##  
##  for i in range(0,3):
##    andy.forward(150)
##    andy.left(120)
    
    window.exitonclick()
    
draw_shapes()
