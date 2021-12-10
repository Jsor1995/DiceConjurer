from django.urls import path
from . import views

urlpatterns = [
    path("", views.index, name="index"),
    path("create_card/<str:animal>", views.create_card, name="create_card")
]
