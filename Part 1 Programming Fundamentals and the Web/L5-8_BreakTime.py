import webbrowser
import time

count = 0

print("started on " + time.ctime())
while (count < 3):
    time.sleep(10)
    webbrowser.open("http://google.ca")
    count = count + 1
