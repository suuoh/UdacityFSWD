import webbrowser


class Movie(object):
    """This class provides a way to store movie related information

    Args:
        movie_title: String of title of a movie
        movie_storyline: String of storyline or plot
        movie_poster:  String of URL to movie poster
        movie_trailer: String of URL to movie trailer on YouTube
    """

    # Constructor
    def __init__(self, movie_title, movie_storyline,
                 movie_poster, movie_trailer):
        self.title = movie_title
        self.storyline = movie_storyline
        self.poster_image_url = movie_poster
        self.trailer_youtube_url = movie_trailer

    # Open browser with movie trailer URL
    def show_trailer(self):
        webbrowser.open(self.trailer_youtube_url)
