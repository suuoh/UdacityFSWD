import urllib

def read_text():
    intext = open("D:\Documents\Udacity Full Stack Web Developer\movie_quotes.txt")
    contents = intext.read()
    #print(contents)
    intext.close()
    check_profanity(contents)

def check_profanity(intext):
    connection = urllib.urlopen("http://www.wdylike.appspot.com/?q=" + intext)
    output = connection.read()
    #print(output)
    connection.close()
    if "true" in output:
        print("Profanity Detected")
    elif "false" in output:
        print("No Profanity")
    else:
        print("Error")
read_text()
