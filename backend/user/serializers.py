from rest_framework import serializers
from django.contrib.auth.models import User
from .models import Profile
from drf_writable_nested import WritableNestedModelSerializer


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('username','email')


class ProfileSerializer(serializers.ModelSerializer):

    user = UserSerializer(required = True)

    class Meta:
        model = Profile
        fields = ('user','fullname','bio','contact','dob','sex')

# class UserSerializer2(serializers.ModelSerializer):
#     class Meta:
#         model = User
#         fields = ('first_name','last_name','email')

class ProfileSerializer2(serializers.ModelSerializer):

    # user = UserSerializer2(required = True)
    class Meta:
        model = Profile
        fields = ('fullname','bio','contact','dob','sex')