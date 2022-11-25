from django.http import JsonResponse,HttpResponse
from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.views import APIView
from .serializers import ProfileSerializer,UserSerializer,ProfileSerializer2
from rest_framework.permissions import IsAuthenticated
from .models import Profile
from rest_auth.models import TokenModel

# class GetDetails(APIView):
#     def get(self, request, *args, **kwargs)
#         qs = Profile.objects.get()

# def details(request,token):


    
#     user1 = TokenModel.objects.get(key=token).user
    
#     qs = user1.profile
   
#     serialiser = ProfileSerializer(qs)
#     data = {
#         "username":user1.username,
#         "firstname":user1.first_name,
#         "lastname":user1.last_name,
#         "email":user1.email
#     }
#     return JsonResponse(data)

class ProfileView(APIView):

    # permission_classes = {IsAuthenticated, }

    def get(self,request,*args,**kwargs):
        # print(kwargs['token'] + "-----------------*********************")
        token = kwargs['token']
        if TokenModel.objects.filter(key=token).exists():
            user1 = TokenModel.objects.get(key=token).user
            profile1 = user1.profile
            # print(user1,"---------++++++++++++++++++++++++++****************-------------")
            # print("got here" + "------------------**************-----------")
            serialiser = ProfileSerializer(profile1)
            return Response(serialiser.data)

#username,firstname,lastname,email,bio,sex,dob,contact
#in post not username

    def post(self,request,*args,**kwargs):
        token = kwargs['token']
        if TokenModel.objects.filter(key=token).exists():
            user2 = TokenModel.objects.get(key=token).user
            profile2 = user2.profile
            serializer2 = ProfileSerializer2(data=request.data) #Change the serializer
            # if(serializer2.is_valid()):
                # serializer2.save()
            if not serializer2.is_valid():
                return Response(serializer2.errors)

           
            profile2.bio = request.data.get('bio')
            profile2.save()
            profile2.contact = request.data.get('contact')
            profile2.save()
            profile2.dob = request.data.get('dob')
            profile2.save()
            profile2.sex = request.data.get('sex')
            profile2.save()
            profile2.fullname = request.data.get('fullname')
            profile2.save()

            # return Response(serializer2.data)
            # return JsonResponse(request.data)
            return Response(ProfileSerializer(profile2).data)

    

        
