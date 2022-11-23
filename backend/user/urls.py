from . import views
from django.urls import path, include

urlpatterns = [
    path("<str:token>/",views.details,name="details")
]
