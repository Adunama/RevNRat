from . import views
from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('fillcity',views.FillCity.as_view(), name = "fillcity"),
    path('fill', views.fill_restaurant.as_view(), name = "fill_restaurant_by_city"),   
    # path('<str:city>/get/',views.get_restaurant.as_view(),name="get"),
    path('search',views.search_Restaurants.as_view(),name="search"),
    path('filter', views.filter_Restaurants.as_view(), name="filter"),
    path('suggestions', views.HomeSuggestions.as_view(), name = "suggestions"),
    path('<str:restaurantid>',views.GetReviews.as_view(),name='getreviews'),
    path("<str:restaurantid>/add",views.AddReview.as_view(),name="addreview"),
    path("<str:restaurantid>/update",views.UpdateReview.as_view(),name="updatereview")
    
    ]