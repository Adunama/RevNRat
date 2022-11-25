from django.shortcuts import render
from rest_framework.views import APIView
from .models import City, Restaurant
from django.http import JsonResponse
from rest_framework.response import Response
from .serializer import RestaurantSerializer,RestaurantSerializer2
from .models import Restaurant
from rest_auth.models import TokenModel
from user.serializers import ReviewSerializer2,ReviewSerializer
from user.models import Review
import requests
import json


# Create your views here.
class FillCity(APIView) : 
    def post(self, request): 
        new_city = request.data['city']
        state = request.data['state']
        city = City(state = state, name = new_city)
        city.save()

import requests
import json
class fill_restaurant(APIView) : 
    def post(self, request) :
        cityname = request.data['city']
        if not City.objects.filter(name = cityname).exists() : 
            return
        statename = City.objects.get(name = cityname).state
        #now we have state and cityname
        cityname = cityname.replace(" ", "%20")
        url = "https://restaurants-near-me-usa.p.rapidapi.com/restaurants/location/state/"+statename +"/city/"+cityname + "/0"

        headers = {
            "X-RapidAPI-Key": "666f6875b0msh6ed2473433be5d5p1b9fa0jsnf78fa350174c",
            "X-RapidAPI-Host": "restaurants-near-me-usa.p.rapidapi.com"
        }

        response = requests.request("GET", url, headers=headers)

        dict = response.json()
        
        for r in dict["restaurants"] : 
            new_res = Restaurant(   
                                    id = str(r['id']),
                                    name = r['restaurantName'],
                                    address = r['address'],
                                    phone = r['phone'], 
                                    website = r['website'], 
                                    email = r['email'],
                                    city = City.objects.get(name = r['cityName']),
                                    timing  = r['hoursInterval'],
                                    cuisinetype = r['cuisineType']                        
                                )
            new_res.save()
        return JsonResponse({"message" : "Successfully Added Restaurants to DataBase"})

import difflib

def best_match(city_list,searchword):
    tolerance = 1
    l = []
    while(tolerance > 0.2):
        print("hi2")
        l = difflib.get_close_matches(searchword,city_list,3,tolerance)
        if(len(l) > 0) :
            return l[0]
        tolerance -= 0.02
    print("empty return")
    return 

class search_Restaurants(APIView):
    def post(self,request,*args,**kwargs):
        searchword = request.data['searchword']
        cities_list = City.objects.order_by('name').distinct()
        city_list = []
        for i in cities_list:
            # print("iter",i)
            # for elem in i:
            #     getattr(i,elem)
            city_list.append(i.name)

        city = best_match(city_list,searchword)
        if(city == None) :
            print("JSON Response")
            return JsonResponse({"noRestaurantsfound" : True})
        print("siisis")
        qs_city = City.objects.get(name = city)
        qs = qs_city.restaurant_set
        print("yo") # Remove this
        serializer = RestaurantSerializer(qs,many=True)
        return Response(serializer.data)

class filter_Restaurants(APIView):
    def post(self,request,*args,**kwargs):
        city = request.data['city']
        rating = request.data["rating"]
        qs_city = City.objects.get(name = city)
        qs = qs_city.restaurant_set
        qs = qs.filter(aggrating__gte=rating)
        if(len(qs) == 0) :
            return JsonResponse({"noRestaurantsfound" : True})
        serializer = RestaurantSerializer(qs, many=True)
        return Response(serializer.data)

class GetReviews(APIView):
    def get(self,request,*args,**kwargs):
        Restaurantid = kwargs['restaurantid']
        qs = Restaurant.objects.get(id = Restaurantid)
        serializer = RestaurantSerializer2(qs)
        return Response(serializer.data)

class AddReview(APIView):
    def post(self,request,*args,**kwargs):
        current_user = TokenModel.objects.get(key=request.data['token']).user
        Restaurantid = kwargs['restaurantid']
        qs_Restaurant = Restaurant.objects.get(id = Restaurantid)
        review_serializer = ReviewSerializer2(data=request.data)
        reviewscount = qs_Restaurant.review_set.count()
        # print(type(reviewscount))
        if not review_serializer.is_valid():
            return Response(review_serializer.errors)
        if(current_user.is_authenticated):
            print("--------***********Current User authenticated*********--------")
        r = Review(author = current_user,description = request.data['description'],rating = request.data['rating'],restaurant = qs_Restaurant)
        r.save()
        qs_Restaurant.aggrating = (qs_Restaurant.aggrating*reviewscount + int(r.rating))/(reviewscount + 1)
        qs_Restaurant.save()
        serializer = RestaurantSerializer2(qs_Restaurant)
        return Response(serializer.data)

class UpdateReview(APIView):
    def post(self,request,*args,**kwargs): 
        current_user = TokenModel.objects.get(key = request.data['token']).user
        Restaurantid = kwargs['restaurantid']
        qs_Restaurant = Restaurant.objects.get(id = Restaurantid)
        prevrating = Review.objects.get(author = current_user,restaurant = Restaurantid).rating
        Review.objects.filter(author = current_user, restaurant = qs_Restaurant).update(description = request.data["description"],rating = request.data["rating"])
        qs_review = Review.objects.get(author = current_user,restaurant = Restaurantid)
        reviewscount = qs_Restaurant.review_set.count()
        print(type(reviewscount))
        qs_Restaurant.aggrating = (qs_Restaurant.aggrating*reviewscount + qs_review.rating - int(prevrating))/(reviewscount)
        qs_Restaurant.save()
        serializer = RestaurantSerializer2(qs_Restaurant)
        return Response(serializer.data)



class HomeSuggestions(APIView):
    def get(self, request):
        restaurants = Restaurant.objects.all().order_by('-aggrating')[0:3]
        l = []
        for m in restaurants:
            l.append({"id" : m.id, "name" : m.name})
        return JsonResponse({"result" : l})