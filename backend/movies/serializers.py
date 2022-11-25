from rest_framework import serializers
from .models import Movie
from user.serializers import ReviewSerializer

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
    caststr = serializers.ReadOnlyField()
    directorstr = serializers.ReadOnlyField()
    genrestr = serializers.ReadOnlyField()
    ratingstr = serializers.ReadOnlyField()
    # directorlist = serializers.SerializerMethodField('list2text')
    # def list2text(self, mov)
    class Meta:
        model = Movie
        fields = ('id','aggrating','title','cast','directors','genre','runningtime','year', 'nomoviesfound', 'plotline', 'imgurl', 'caststr', 'directorstr', 'genrestr','ratingstr')

class MovieSerializer2(serializers.ModelSerializer):
    reviewlist = ReviewSerializer(source = 'review_set',many = True)

    class Meta:
        model = Movie
        fields = ('id','caststr','aggrating','title','runningtime','year', 'plotline', 'imgurl','directorstr', 'genrestr','reviewlist')