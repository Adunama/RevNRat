from rest_framework import serializers
from .models import Movie

class Movieserializer1(serializers.Serializer):
    genrelist = serializers.SerializerMethodField()

    def get_genrelist(self,Movie):
        return eval(Movie.genre)
    def get_castlist(self,Movie):
        return eval(Movie.cast)
    def get_directorslist(self,Movie):
        return eval(Movie.directors)

    class Meta:
        model = Movie
        fields = ('id','aggrating','title','castlist','directorslist','genrelist','runningtime','year')