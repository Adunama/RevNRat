from django.db import models
from django.core.validators import MaxValueValidator, MinValueValidator
from django.dispatch import receiver #add this
from django.db.models.signals import post_save #add this

# Create your models here.

class Hotel(models.Model):
    id = models.CharField(max_length=15,primary_key=True)
