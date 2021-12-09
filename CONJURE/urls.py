from django.urls import path
from . import views

urlpatterns = [
    path("", views.index, name="index"),
    path("statblock/<str:data>", views.create_card, name="statblock")
]