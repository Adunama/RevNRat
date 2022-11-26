from rest_framework import serializers
from django.contrib.auth.models import User
from .models import Profile,Review
from drf_writable_nested import WritableNestedModelSerializer


class UserSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = User
        fields = ('username','email')

class ProfileSerializer2(serializers.ModelSerializer):

    # user = UserSerializer2(required = True)
    class Meta:
        model = Profile
        fields = ('fullname','bio','contact','dob','sex')

class ReviewSerializer(serializers.ModelSerializer):

    owner = UserSerializer(source = 'author', many = False)

    class Meta:
        model = Review
        fields = ('owner','description','rating')

class ReviewSerializer2(serializers.ModelSerializer):
    class Meta:
        model = Review
        fields = ('description','rating')

class ReviewSerializer3(serializers.ModelSerializer):
    placeid = serializers.ReadOnlyField()
    placename = serializers.ReadOnlyField()
    placetype = serializers.ReadOnlyField()

    class Meta:
        model = Review
        fields = ('description','rating','placeid','placename','placetype')

class UserSerializer2(serializers.ModelSerializer):

    reviewlist = ReviewSerializer3(source = 'review_set',many = 'true')

    class Meta :
        model = User
        fields = ('username','email','reviewlist')


class ProfileSerializer(serializers.ModelSerializer):

    user = UserSerializer2(required = True)

    class Meta:
        model = Profile
        fields = ('user','fullname','bio','contact','dob','sex')