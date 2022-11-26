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

    def placetype(self):
        if(not self.hotel == None):
            return "hotel"
        if(not self.restaurant == None):
            return "restaurant"
        if(not self.movie == None):
            return "movie"
        
    def placeid(self):
        if(not self.hotel == None):
            return self.hotel.id
        if(not self.restaurant == None):
            return self.restaurant.id
        if(not self.movie == None):
            return self.movie.id

    def placename(self):
        if(not self.hotel == None):
            return self.hotel.name
        if(not self.restaurant == None):
            return self.restaurant.name
        if(not self.movie == None):
            return self.movie.title




    # def save(self, *args, **kwargs):
    #     new_user = self.author
    #     if not (self.hotel == None): #check this
    #         if not (new_user.review_set.objects.get(hotel = self.hotel) == None):
    #             return
    #     if not (self.movie == None): #check this
    #         if new_user.review_set.filter(movie = self.movie).exists() :
    #             print(new_user.review_set.filter(movie = self.movie))
    #             return
    #     if not (self.restaurant== None): #check this
    #         if(new_user.review_set.objects.get(restaurant = self.restaurant).exists()):
    #             return

    # #     return super().save(*args, **kwargs)
    # def validate_unique(self,*args, **kwargs) -> None:
    #     qs = Review.objects.filter(
    #         user = self.user,
    #         hotel = self.hotel,
    #         movie = self.movie,
    #         restaurant = self.restaurant
    #     ).exists
    #     if qs:
    #       raise ValidationError('Review already exists')
    #     return super().validate_unique(*args,**kwargs)


    



