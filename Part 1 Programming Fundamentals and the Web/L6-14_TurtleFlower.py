import turtle

def draw_picture():
    window = turtle.Screen()
    window.bgcolor("black")

    pencil = turtle.Turtle()
    pencil.shape("triangle")
    pencil.speed(10)

    pencil.color("orange")
    for i in range(0,72):
        draw_triangle(pencil, 25)

    pencil.color("yellow")
    for i in range(0,36):
        draw_triangle(pencil, 35)

    pencil.color("white")
    for i in range(0,18):
        draw_triangle(pencil, 40)

    pencil.right(90)
    pencil.forward(600)
    
    window.exitonclick()

def draw_triangle(turtle, rotate):
    turtle.right(rotate)
    turtle.forward(200)
    turtle.right(120)
    turtle.forward(200)
    turtle.right(120)
    turtle.forward(200)
    turtle.right(150)

draw_picture()
