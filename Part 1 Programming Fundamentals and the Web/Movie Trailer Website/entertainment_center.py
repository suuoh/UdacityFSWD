import media
import fresh_tomatoes

toy_story = media.Movie("Toy Story",
                        "A story of a boy and his toys that come to life",
                        "http://upload.wikimedia.org/wikipedia/en/1/13/Toy_Story.jpg",
                        "https://www.youtube.com/watch?v=KYz2wyBy3kc")

finding_nemo = media.Movie("Finding Nemo",
                           "A fish gets separated from his parents in the ocean.",
                           "https://upload.wikimedia.org/wikipedia/en/2/29/Finding_Nemo.jpg",
                           "https://www.youtube.com/watch?v=wZdpNglLbt8")

interstellar = media.Movie("Interstellar",
                           "A team of explorers travel through a wormhole in space in an attempt to ensure humanity's survival.",
                           "https://upload.wikimedia.org/wikipedia/en/b/bc/Interstellar_film_poster.jpg",
                           "https://www.youtube.com/watch?v=0vxOhd4qlnA")

incredibles = media.Movie("The Incredibles",
                          "A family of undercover superheroes are forced into action to save the world.",
                          "https://upload.wikimedia.org/wikipedia/en/e/ec/The_Incredibles.jpg",
                          "https://www.youtube.com/watch?v=eZbzbC9285I")

hunger_games = media.Movie("Hunger Games",
                           "Survival of the fittest.",
                           "http://upload.wikimedia.org/wikipedia/en/4/42/HungerGamesPoster.jpg",
                           "https://www.youtube.com/watch?v=PbA63a7H0bo")

now_you_see_me = media.Movie("Now You See Me",
                             "A team of illusionists pull off bank heists during their performances.",
                             "http://t3.gstatic.com/images?q=tbn:ANd9GcSiVU-YMu-9iM1YT68QCa322Q_fSe8D9DmmCRahPfTY9evxLty2",
                             "https://www.youtube.com/watch?v=KzJNYYkkhzc")

avatar = media.Movie("Avatar",
                     "A marine on an alien planet.",
                     "http://upload.wikimedia.org/wikipedia/id/b/b0/Avatar-Teaser-Poster.jpg",
                     "http://www.youtube.com/watch?v=-9ceBgWV8io")

avengers = media.Movie("The Avengers",
                       "Earth's mightiest heroes must come together and learn to fight as a team.",
                       "http://t1.gstatic.com/images?q=tbn:ANd9GcTp0qlAoWcOOswIkL_qpjYzJqCCDmWXiBzCXiqbE43Obo8c0Z-s",
                       "https://www.youtube.com/watch?v=eOrNdBpGMv8")

ghost_shell = media.Movie("Ghost in the Shell",
                          "A cyber-enhanced soldier must stop the world's most dangerous criminals.",
                          "http://t3.gstatic.com/images?q=tbn:ANd9GcRtT-lG0Kw1lfxJZBJ21dCXZoHRqZ63drxjC-E3ji-PEh7d4PuE",
                          "https://www.youtube.com/watch?v=G4VmJcZR0Yg")

movies = [toy_story,
          finding_nemo,
          interstellar,
          incredibles,
          hunger_games,
          now_you_see_me,
          avatar,
          avengers,
          ghost_shell]

fresh_tomatoes.open_movies_page(movies)
