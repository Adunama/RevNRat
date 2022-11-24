from django.db import models
from django.core.validators import MaxValueValidator, MinValueValidator
from django.dispatch import receiver #add this
from django.db.models.signals import post_save #add this

class Movie(models.Model):
    id = models.CharField(primary_key=True,max_length=9,validators = [MinValueValidator(9)]) #string
    aggrating = models.DecimalField(default=0.0,decimal_places=1,max_digits=3) 
    title = models.CharField(max_length=50,null=True,blank=True)  #string 
    # description = models.TextField(max_length=500,null=True,blank=True)
    cast = models.CharField(max_length=500,null=True,blank=True) #list of size 5
    directors = models.CharField(max_length=50,null=True,blank=True) #list of size 3
    genre = models.CharField(max_length=500,null=True,blank=True) #list
    runningtime = models.IntegerField(null=True,blank=True) #integer
    year = models.IntegerField(null=True,blank=True) #integer

    def nomoviesfound(self):
        return False

    def __str__(self):
        return self.title 