from django.db import models
from django.core.validators import MaxValueValidator, MinValueValidator
from django.dispatch import receiver #add this
from django.db.models.signals import post_save #add this

# Create your models here.

class Hotel(models.Model):
    id = models.CharField(max_length=15,primary_key=True)
    price = models.DecimalField(max_digits=10, decimal_places=2, default=-1) 
    aggrating = models.DecimalField(default=0.0,decimal_places=1,max_digits=3) 
    name = models.CharField(max_length=50,null=True,blank=True)  #string 
    disttocc = models.DecimalField(default=0.0,decimal_places=1,max_digits=3)
    address = models.TextField(max_length=200, default="")
    is_free_cancellable = models.IntegerField( default = 0, validators = [MaxValueValidator(1),MinValueValidator(0)] )
    imgurl = models.CharField(max_length=500, null = True, blank = True)
    city = models.CharField(max_length=50,default="")

    def __str__(self):
        return self.name

