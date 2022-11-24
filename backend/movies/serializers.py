from rest_framework import serializers
from .models import Movie

class Movieserializer1(serializers.ModelSerializer):
    # genrelist = serializers.SerializerMethodField()

    # def get_genrelist(self,Movie):
    #     return eval(Movie.genre)
    # def get_castlist(self,Movie):
    #     return eval(Movie.cast)
    # def get_directorslist(self,Movie):
    #     return eval(Movie.directors)
    # nomoviefound = serializers.SerializerMethodField('true')
    # def true(self, jkl):
    #     return False    
    nomoviesfound = serializers.ReadOnlyField()
    
    class Meta:
        model = Movie
        fields = ('id','aggrating','title','cast','directors','genre','runningtime','year', 'nomoviesfound')
        # fields = ('title')