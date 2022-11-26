from . import views
from django.contrib import admin
from django.urls import path, include
from . import views
from .views import *

urlpatterns = [
    path("",views.MoviesView.as_view(),name="getting movies"),
    # path("keyword/",views.MoviesView.as_view(),name="getting movies")
    path("filter",views.FilterView.as_view(),name="filter"),
    path("suggestions", views.HomeSuggestions.as_view(), name = "suggestions"),
    path("<str:movie_id>",views.GetReviews.as_view(),name="getreviews"),
    path("<str:movie_id>/add",views.AddReview.as_view(),name="addreview"),
    path("<str:movie_id>/update",views.UpdateReview.as_view(),name="updatereview")
]