from . import views
from django.urls import path, include

urlpatterns = [
    path('fill', views.fill_hotel.as_view(), name = "fill_hotel_by_city"),   
    # path('<str:city>/get/',views.get_hotel.as_view(),name="get"),
    path('search',views.search_hotels.as_view(),name="search"),
    path('filter', views.filter_hotels.as_view(), name="filter"),
    path('suggestions', views.HomeSuggestions.as_view(), name = "suggestions"),
    path('<str:hotelid>',views.GetReviews.as_view(),name='getreviews'),
    path("<str:hotelid>/add",views.AddReview.as_view(),name="addreview"),
    path("<str:hotelid>/update",views.UpdateReview.as_view(),name="updatereview")
]
