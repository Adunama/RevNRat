from rest_framework import serializers
from .models import Restaurant
from user.serializers import ReviewSerializer

class RestaurantSerializer(serializers.ModelSerializer):
    cityname = serializers.ReadOnlyField()
    class Meta : 
        model = Restaurant
        fields = ('id', 'name', 'address', 'phone', 'website', 'email','cityname', 'timing', 'cuisinetype','aggrating')


class RestaurantSerializer2(serializers.ModelSerializer):
    reviewlist = ReviewSerializer(source = 'review_set',many = True)
    cityname = serializers.ReadOnlyField()
    class Meta:
        model = Restaurant
        fields = ('id', 'name', 'address', 'phone', 'website', 'email','cityname', 'timing', 'cuisinetype','aggrating','reviewlist')

