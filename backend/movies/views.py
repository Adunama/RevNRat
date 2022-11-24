from django.shortcuts import render
from itertools import chain
from .serializers import Movieserializer1
from rest_framework.views import APIView
from rest_framework.response import Response

# Create your views here.
from .models import Movie

from imdb import Cinemagoer


def getdetailsimdb(id):
    # create an instance of the Cinemagoer class
    ia = Cinemagoer()
    # get a movie
    while True : 
        try : 
            movie = ia.get_movie(id)
            break
        except :
            continue
    identified_movie = Movie(id = id, title = movie['title'], cast = str(movie['cast'][0:5]), directors = str(movie['directors'][0:3]), genre = str(movie['genre']), runningtime = eval(movie['runtimes'][0]), year = movie['year']) 
    identified_movie.save()
    return 



num_movies_to_be_searched_for = 10

class MoviesView(APIView):
    def post(request):
        searchword = request.data['searchword']
        # create an instance of the Cinemagoer class
        ia = Cinemagoer()
        # get a movie
        while True : 
            try : 
                movies = ia.search_movie(searchword)
                break
            except :
                continue
        id_list = []
        for i in movies[0:num_movies_to_be_searched_for]:
            id_list.append(int(i.movieID))

        for id in id_list:
            if not Movie.objects.filter(id = id).exists():
                getdetailsimdb(id)


        #sorting id_list by rating
        id_list.sort(reverse = True, key = lambda x : Movie.objects.get(id=x).aggrating)
        qs = Movie.objects.filter(id=id_list[0])
        for x in id_list[1:]:
            tempqs = Movie.objects.filter(id=x)
            qs = qs | tempqs
        serialiser = Movieserializer1(qs)
        return Response(serialiser.data)


        #TODO
        
        #return appropriate jsonrespone containing movies' details

def filter_ids(request):
    ids = request.data['id_list']   #error code : 
    genre = request.data['genre']   #error code : []
    rating = request.data['rating']    #error code : 0
    maxruntime = request.data['maxruntime']  #error code : 0
    # permitted_movie = []

    if not len(genre) == 0:
        for id in ids :
            mov = Movie.objects.get(id = id)
            mov_gen = eval(mov.genre)
            #checking if the two genre lists have anything in common
            if set(genre).isdisjoint(set(mov_gen)):
                ids.remove(id)
            #checking if rating is above the rating
            mov_rat = mov.aggrating
            if mov_rat < rating:
                ids.remove(id)
            #checking if runtime of movie is smaller than maxruntime
            mov_runtime = mov.runningtime
            if mov_runtime > maxruntime:
                ids.remove(id)
    #TODO
    #return json response of returning list of IDs  : 'ids'




