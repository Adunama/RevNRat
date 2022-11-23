from django.http import JsonResponse
from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.views import APIView
from .serializers import ProfileSerializer
from .models import Profile
from rest_auth.models import TokenModel

# class GetDetails(APIView):
#     def get(self, request, *args, **kwargs)
#         qs = Profile.objects.get()

def details(request,token):
    print("reading this")
    print("reached 1")
    user1 = TokenModel.objects.get(key=token).user
    print("reached 2")
    qs = user1.profile
    print("reached 3")
    serialiser = ProfileSerializer(qs)
    print("reached 4")
    data = {
        "username":user1.username,
        "firstname":user1.first_name,
        "lastname":user1.last_name,
        "email":user1.email
    }
    return JsonResponse(data)
        
