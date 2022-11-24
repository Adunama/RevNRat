from django.http import JsonResponse
from django.shortcuts import HttpResponse, render
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
    if(movie.get('directors') == None):
        movie['directors'] = ""
    if(movie.get('runtimes') == None):
        runtime = 0
    else:
        runtime = eval(movie['runtimes'][0])
    # identified_movie = Movie(id = id, title = movie['title'], cast = str(movie['cast'][0:5]), genre = str(movie['genre']), year = movie['year']) 
    identified_movie = Movie(id = id, title = movie['title'], cast = str(movie['cast'][0:5]), directors = str(movie['directors']), genre = str(movie['genre']), runningtime = runtime, year = movie['year']) 
    identified_movie.save()
    return 



num_movies_to_be_searched_for = 10

class MoviesView(APIView):

    # def get(self,request,*args,**kwargs):
    #     return HttpResponse("<h1>hello</h1>")

    def post(self,request):
        print(request.data,"-------------------*******************")
        searchword = request.data.get('searchword')
        print("meeee : ", searchword)
        # create an instance of the Cinemagoer class
        ia = Cinemagoer()
        # get a movie
        while True : 
            try : 
                # print("at it ")
                # print(searchword)
                movies = ia.search_movie(searchword)
                # if len(movies)==0:
                #     continue
                break
            except Exception as e:
                continue
        id_list = []
        print("movies : ", movies)
        for i in movies[0:num_movies_to_be_searched_for]:

            id_list.append(int(i.movieID))

        for id in id_list:
            if not Movie.objects.filter(id = id).exists():
                getdetailsimdb(id)
        print("id_list : ", id_list)

        #sorting id_list by rating
        id_list.sort(reverse = True, key = lambda x : Movie.objects.get(id=x).aggrating)
        id_list = []
        if len(id_list)==0:
            return Response({'nomoviefound' : True})
        qs = Movie.objects.filter(id=id_list[0])
        for x in id_list[1:]:
            tempqs = Movie.objects.filter(id=x)
            qs = qs | tempqs
        print(qs)
        print(qs[0])
        serialiser = Movieserializer1( qs, many=True)
        # serialiser.is_valid()
        print(serialiser)
        # serialiser = Movieserializer1(qs, many=True)
        print(serialiser.data)
        return Response(serialiser.data)



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




