from django.db import models
from django.core.validators import MaxValueValidator, MinValueValidator
from django.contrib.auth.models import User
from django.dispatch import receiver #add this
from django.db.models.signals import post_save #add this


# Create your models here.
class Profile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name="profile")
    fullname = models.CharField(max_length=50,null=True,blank=True)
    bio = models.TextField(max_length=500, blank=True, null=True)
    # age = models.PositiveIntegerField(blank = True,null=True)
    dob = models.CharField(max_length = 20, null=True,blank=True)
    sex = models.CharField(max_length = 20, null=True,blank=True)
    contact = models.CharField(max_length=12, blank=True, null=True)

    @receiver(post_save, sender=User) #add this
    def create_user_profile(sender, instance, created, **kwargs):
        if created:
            Profile.objects.create(user=instance)


    @receiver(post_save, sender=User) #add this
    def save_user_profile(sender, instance, **kwargs):
        instance.profile.save()

    def __str__(self):
        return self.user.username

class Review(models.Model):
    author = models.ForeignKey(User,on_delete=models.CASCADE)
    description = models.TextField(max_length=500, blank=True, null=True)
    rating = models.IntegerField(validators=[MaxValueValidator(5),MinValueValidator(1)])
    hotel = models.ForeignKey("hotels.Hotel",on_delete=models.CASCADE,null=True,blank=True)
    restaurant = models.ForeignKey("restaurants.Restaurant",on_delete=models.CASCADE,null=True,blank=True)
    movie = models.ForeignKey("movies.Movie",on_delete=models.CASCADE,null=True,blank=True)



