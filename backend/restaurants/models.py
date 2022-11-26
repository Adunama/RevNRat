from django.db import models
from django.core.validators import MaxValueValidator, MinValueValidator
from django.contrib.auth.models import User
from django.dispatch import receiver #add this
from django.db.models.signals import post_save #add this

# Create your models here.
class City(models.Model) :
    state = models.CharField(max_length = 3, default = "")
    name = models.CharField(max_length= 20, default="")

class Restaurant(models.Model):
    id = models.CharField(primary_key=True, max_length=10)
    name = models.CharField(max_length=100, default="")
    address = models.TextField(max_length=200, default="-")
    phone = models.CharField(max_length=20, null=True, blank=True)
    website = models.CharField(max_length=300, default = "-")
    email = models.CharField(max_length=50, default="")
    city = models.ForeignKey("City", on_delete=models.CASCADE, null = True, blank = True)
    timing = models.CharField(max_length=80, default="-")
    cuisinetype = models.CharField(max_length=50, default="")
    aggrating = models.DecimalField(max_digits=3, decimal_places=1, default=0)
    def cityname(self):
        return self.city.name