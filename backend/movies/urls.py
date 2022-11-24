from . import views
from django.contrib import admin
from django.urls import path, include
from . import views
from .views import *

urlpatterns = [
    path("",views.MoviesView.as_view(),name="getting movies"),
    path("keyword/",views.MoviesView.as_view(),name="getting movies")
]