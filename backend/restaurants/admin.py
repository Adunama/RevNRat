from django.contrib import admin

# Register your models here.
from .models import City, Restaurant

admin.site.register(Restaurant)
admin.site.register(City)