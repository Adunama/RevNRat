from django.contrib import admin

# Register your models here.
from .models import Profile, Review

admin.site.register(Profile)
admin.site.register(Review)