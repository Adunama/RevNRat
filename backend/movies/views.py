from django.http import JsonResponse
from django.shortcuts import HttpResponse, render
from django.contrib.auth.decorators import login_required
from itertools import chain
from .serializers import Movieserializer1,MovieSerializer2
from user.serializers import ReviewSerializer2,ReviewSerializer
from user.models import Review
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_auth.models import TokenModel

# Create your views here.
from .models import Movie

from imdb import Cinemagoer


def getdetailsimdb(id):
    # create an instance of the Cinemagoer class
    ia = Cinemagoer()
    # get a movie
    attempts = 0
    while attempts < 2 : 
        try : 
            movie = ia.get_movie(id)
            if len(movie) == 0:
                attempts += 1
                continue
            break
        except :
            continue
    cast = ""
    directors = ""
    runtime = 0
    year =0 
    plotline = ""
    imgurl = ""
    if(movie.get('cast') == None) :
        cast = "[]"
    else :
        castlist = []
        for x in movie['cast'][0:5] : 
            castlist.append(x['name'])
        cast = str(castlist)
    if (movie.get('directors') == None):
        directors = "[]"
    else : 
        directorslist = []
        for x in movie['directors'] : 
            directorslist.append(x['name'])
        directors = str(directorslist)
    if(movie.get('runtimes') == None):
        runtime = 0
    else:
        runtime = eval(movie['runtimes'][0])
    if(movie.get('year') == None):
        year = 0
    else:
        year = movie['year']
    if(movie.get('plot outline') == None) : 
        plotline = ""
    else : 
        plotline = movie.get('plot outline')
    if movie.get('cover url') == None : 
        imgurl = ""
    else : 
        imgurl = movie.get('cover url')
    identified_movie = Movie(id = id, title = movie['title'], cast = cast, directors = directors, genre = str(movie['genre']), runningtime = runtime, year = year, imgurl = imgurl, plotline = plotline) 
    identified_movie.save()
    return 



num_movies_to_be_searched_for = 10

class MoviesView(APIView):

    # def get(self,request,*args,**kwargs):
    #     return HttpResponse("<h1>hello</h1>")

    def post(self,request):
        searchword = request.data.get('searchword')
        # create an instance of the Cinemagoer class
        ia = Cinemagoer()
        # get a movie
        attempts =0 
        while attempts < 2 : 
            try : 
                movies = ia.search_movie(searchword)
                if len(movies)==0:
                    attempts += 1
                    continue
                break
            except Exception as e:
                continue
        id_list = []
        for i in movies[0:num_movies_to_be_searched_for]:
            id_list.append(int(i.movieID))

        for id in id_list:
            if not Movie.objects.filter(id = id).exists():
                getdetailsimdb(id)
        id_list.sort(reverse = True, key = lambda x : Movie.objects.get(id=x).aggrating)
        if len(id_list)==0:
            return Response({'nomoviesfound' : True})
        qs = Movie.objects.filter(id=id_list[0])
        for x in id_list[1:]:
            tempqs = Movie.objects.filter(id=x)
            qs = qs | tempqs
        serialiser = Movieserializer1( qs, many=True)
        return Response(serialiser.data)

class FilterView(APIView) : 

    def post(self,request):
        ids = eval(request.data['id_list'])   #error code : 
        genre = eval(request.data['genre'])   #error code : []
        rating = request.data['rating']    #error code : 0
        maxruntime = request.data['maxruntime']  #error code : 0
        id_list = ids.copy()
        # if not len(genre) == 0:
        for id in id_list :
            mov = Movie.objects.get(id = id)
            mov_gen = eval(mov.genre)
            #checking if the two genre lists have anything in common
            if set(genre).isdisjoint(set(mov_gen)) and not len(genre) == 0:
                ids.remove(id)
                continue
            #checking if rating is above the rating
            mov_rat = mov.aggrating
            if mov_rat < int(rating):
                ids.remove(id)
                continue
            #checking if runtime of movie is smaller than maxruntime
            mov_runtime = mov.runningtime
            if mov_runtime > int(maxruntime):
         
                ids.remove(id)
                continue
        #TODO
        if not len(ids) == 0:
            qs = Movie.objects.filter(id=ids[0])
            for x in ids[1:]:
                tempqs = Movie.objects.filter(id=x)
                qs = qs | tempqs
            serialiser = Movieserializer1( qs, many=True)
            print(serialiser.data)
            return Response(serialiser.data)
        else:
            return Response({'nomoviefound' : True})

        #return json response of returning list of IDs  : 'ids'

class GetReviews(APIView):
    def get(self,request,*args,**kwargs):
        movieid = kwargs['movie_id']
        qs = Movie.objects.get(id = movieid)
        serializer = MovieSerializer2(qs)
        return Response(serializer.data)

class AddReview(APIView):
    def post(self,request,*args,**kwargs):
        current_user = TokenModel.objects.get(key=request.data['token']).user
        movieid = kwargs['movie_id']
        qs_movie = Movie.objects.get(id = movieid)
        review_serializer = ReviewSerializer2(data=request.data)
        if not review_serializer.is_valid():
            return Response(review_serializer.errors)
        if(current_user.is_authenticated):
            print("--------***********Current User authenticated*********--------")
        reviewscount = qs_movie.review_set.count()
        r = Review(author = current_user,description = request.data['description'],rating = request.data['rating'],movie = qs_movie)
        r.save()
        qs_movie.aggrating = (qs_movie.aggrating*reviewscount + int(r.rating))/(reviewscount + 1)
        qs_movie.save()
        serializer = MovieSerializer2(qs_movie)
        return Response(serializer.data)

class UpdateReview(APIView):
    def post(self,request,*args,**kwargs): 
        current_user = TokenModel.objects.get(key = request.data['token']).user
        movieid = kwargs['movie_id']
        qs_movie = Movie.objects.get(id = movieid)
        prevrating = Review.objects.get(author = current_user,movie = movieid).rating
        Review.objects.filter(author = current_user, movie = qs_movie).update(description = request.data["description"],rating = request.data["rating"])
        qs_review = Review.objects.get(author = current_user,movie = movieid)
        reviewscount = qs_movie.review_set.count()
        qs_movie.aggrating = (qs_movie.aggrating*reviewscount + qs_review.rating - int(prevrating))/(reviewscount)
        qs_movie.save()
        serializer = MovieSerializer2(qs_movie)
        return Response(serializer.data)

class HomeSuggestions(APIView):
    def get(self, request):
        movies = Movie.objects.all().order_by('-aggrating')
        l = []
        c=0
        for m in movies:
            if c==3 :
                break
            if(m.imgurl == None or  m.imgurl.isspace()): continue
            c+=1
            l.append({"id" : m.id, "name" : m.title, "imgurl" : m.imgurl})
        return JsonResponse({"result" : l})
        



