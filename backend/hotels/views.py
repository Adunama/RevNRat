from django.shortcuts import render
from rest_framework.views import APIView
from django.http import JsonResponse
from .serializer import HotelSerializer,HotelSerializer2
from rest_framework.response import Response
from .models import Hotel
from rest_auth.models import TokenModel
from user.serializers import ReviewSerializer2,ReviewSerializer
from user.models import Review
import requests
import json

class fill_hotel(APIView):
    def post(self,request):
        keyword = request.data['searchword']

        url = "https://apidojo-booking-v1.p.rapidapi.com/locations/auto-complete"

        querystring = {"text":keyword,"languagecode":"en-us"}

        headers = {
            "X-RapidAPI-Key": "666f6875b0msh6ed2473433be5d5p1b9fa0jsnf78fa350174c",
            "X-RapidAPI-Host": "apidojo-booking-v1.p.rapidapi.com"
        }


        response = requests.request("GET", url, headers=headers, params=querystring)
        f = open("data.json", "w")
        f.write(response.text)
        f.close()
        city_name = ""
        with open("data.json") as file:
            dict = json.load(file)
            city_name = dict[0]['city_name']
            print(dict[0]["city_name"])
            dest_id = dict[0]["dest_id"]
            dest_type = dict[0]["dest_type"]
            print(dest_id)
            print(type(dest_id))
            print(dest_type)
            print(type(dest_type))


        querystring = {"offset":"0","arrival_date":"2022-12-10","departure_date":"2022-12-11","guest_qty":"1","dest_ids":dest_id,"room_qty":"1","search_type":dest_type,"children_qty":"2","children_age":"5,7","search_id":"none","price_filter_currencycode":"USD","order_by":"popularity","languagecode":"en-us","travel_purpose":"leisure"}

        headers = {
            "X-RapidAPI-Key": "666f6875b0msh6ed2473433be5d5p1b9fa0jsnf78fa350174c",
            "X-RapidAPI-Host": "apidojo-booking-v1.p.rapidapi.com"
        }

        url = "https://apidojo-booking-v1.p.rapidapi.com/properties/list"
        response = requests.request("GET", url, headers=headers, params=querystring)


        f = open("data.json", "w")
        f.write(response.text)
        f.close()
        with open("data.json") as file:
            dict = json.load(file)
            for result in dict["result"] :
                id = result['hotel_id']
                if ('min_total_price' in result) :
                    price = result['min_total_price']
                else:
                    price = 0
                name = result['hotel_name']
                if ('distance' in result) :
                    disttocc = result['distance']
                else:
                    disttocc = 0.0
                address = result['address']
                if ('is_free_cancellable' in result) : 
                    is_free_cancellable = result['is_free_cancellable']
                else:
                    is_free_cancellable = 0
                imgurl = result['main_photo_url']

                new_hotel = Hotel(id=id, price=price, name=name, disttocc = disttocc, address = address, is_free_cancellable = is_free_cancellable, imgurl = imgurl,city=city_name)
                new_hotel.save()
        return JsonResponse({ "hello" : "done"})
    

import difflib
def best_match(city_list,searchword):
    tolerance = 1
    l = []
    while(tolerance > 0.2):
        l = difflib.get_close_matches(searchword,city_list,3,tolerance)
        if(len(l) > 0) :
            return l[0]
        
        tolerance -= 0.02
    return 

class search_hotels(APIView):
    def post(self,request,*args,**kwargs):
        searchword = request.data['searchword']
        cities_list = Hotel.objects.order_by().values('city').distinct()
        city_list = []
        for i in cities_list:
            city_list.append(i['city'])

        city = best_match(city_list,searchword)
        if(city == None) :
            return JsonResponse({"nohotelsfound" : True})
        qs = Hotel.objects.filter(city = city)
        serializer = HotelSerializer(qs,many=True)
        return Response(serializer.data)

class filter_hotels(APIView):
    def post(self,request,*args,**kwargs):
        city = request.data["city"]
        price = request.data["price"]
        if price == "":
            price = 1000000000
        cancellable = request.data["cancellable"] 
        rating = request.data["rating"]
        if rating == "":
            rating =0
        qs = Hotel.objects.filter(city=city,price__lt=price, aggrating__gte=rating)
        if(cancellable == 1 and (not len(qs) == 0)):
            qs = qs.filter(is_free_cancellable = 1)
        if(len(qs) == 0) :
            return JsonResponse({"nohotelsfound" : True})
        serializer = HotelSerializer(qs, many=True)
        return Response(serializer.data)

class GetReviews(APIView):
    def get(self,request,*args,**kwargs):
        hotelid = kwargs['hotelid']
        qs = Hotel.objects.get(id = hotelid)
        serializer = HotelSerializer2(qs)
        return Response(serializer.data)

class AddReview(APIView):
    def post(self,request,*args,**kwargs):
        current_user = TokenModel.objects.get(key=request.data['token']).user
        hotelid = kwargs['hotelid']
        qs_hotel = Hotel.objects.get(id = hotelid)
        review_serializer = ReviewSerializer2(data=request.data)
        reviewscount = qs_hotel.review_set.count()
        if not review_serializer.is_valid():
            return Response(review_serializer.errors)
        r = Review(author = current_user,description = request.data['description'],rating = request.data['rating'],hotel = qs_hotel)
        r.save()
        qs_hotel.aggrating = (qs_hotel.aggrating*reviewscount + int(r.rating))/(reviewscount + 1)
        qs_hotel.save()
        serializer = HotelSerializer2(qs_hotel)
        return Response(serializer.data)

class UpdateReview(APIView):
    def post(self,request,*args,**kwargs): 
        current_user = TokenModel.objects.get(key = request.data['token']).user
        hotelid = kwargs['hotelid']
        qs_hotel = Hotel.objects.get(id = hotelid)
        prevrating = Review.objects.get(author = current_user,hotel = hotelid).rating
        Review.objects.filter(author = current_user, hotel = qs_hotel).update(description = request.data["description"],rating = request.data["rating"])
        qs_review = Review.objects.get(author = current_user,hotel = hotelid)
        reviewscount = qs_hotel.review_set.count()

        qs_hotel.aggrating = (qs_hotel.aggrating*reviewscount + qs_review.rating - int(prevrating))/(reviewscount)
        qs_hotel.save()
        serializer = HotelSerializer2(qs_hotel)
        return Response(serializer.data)

class HomeSuggestions(APIView):
    def get(self, request):
        hotels = Hotel.objects.all().order_by('-aggrating')[0:3]
        l = []
        for m in hotels:
            l.append({"id" : m.id, "name" : m.name, "imgurl" : m.imgurl})
        return JsonResponse({"result" : l})