from django.db import models
from django.core.validators import MaxValueValidator, MinValueValidator
from django.dispatch import receiver #add this
from django.db.models.signals import post_save #add this

class Movie(models.Model):
    id = models.CharField(primary_key=True,max_length=9,validators = [MinValueValidator(9)]) #string
    aggrating = models.DecimalField(default=0.0,decimal_places=1,max_digits=3) 
    title = models.CharField(max_length=50,null=True,blank=True)  #string 
    cast = models.CharField(max_length=500,null=True,blank=True) #list of size 5
    directors = models.CharField(max_length=50,null=True,blank=True) #list of size 3
    genre = models.CharField(max_length=500,null=True,blank=True) #list
    runningtime = models.IntegerField(null=True,blank=True) #integer
    year = models.IntegerField(null=True,blank=True) #integer
    plotline = models.TextField(max_length=1000,null=True,blank=True) #string
    imgurl = models.CharField(max_length=300,null=True,blank=True)
    def nomoviesfound(self):
        return False

    def ratingstr(self):
        if(self.aggrating ==0):
            return "-"
        return str(self.aggrating)

    def caststr(self): 
        print(self.cast)
        print(type(self.cast))
        return self.cast
        # self.cast = self.cast.replace('\n',' ' )
        castlist = eval(self.cast)
        if len(castlist) == 0:
            return "-"
        out = castlist[0]
        for x in castlist[1:]:
            out = out + ", " + x    
        return out
    
    def directorstr(self) : 
        return self.directors
        dirlist = eval(self.directors)

        if len(dirlist)==0:
            return "-"
        out = dirlist[0]
        for x in dirlist[1:]:
            out = out + ", " + x
        return out

    def genrestr(self) : 
        return self.genre
        dirlist = eval(self.genre)
        if len(dirlist)==0:
            return "-"
        out = dirlist[0]
        for x in dirlist[1:]:
            out = out + ", " + x
        return out

    def __str__(self):
        return self.title 