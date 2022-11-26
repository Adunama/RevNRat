from rest_framework import serializers
from .models import Hotel
from user.serializers import ReviewSerializer

class HotelSerializer(serializers.ModelSerializer):
    class Meta:
        model = Hotel
        fields = ('id','aggrating','name','price','disttocc','is_free_cancellable','address','imgurl','city')

class HotelSerializer2(serializers.ModelSerializer):
    reviewlist = ReviewSerializer(source = 'review_set',many = True)

    class Meta:
        model = Hotel
        fields = ('id','aggrating','name','price','disttocc','is_free_cancellable','address','imgurl','city','reviewlist')

    