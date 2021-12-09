from django.http.response import JsonResponse
from django.shortcuts import render
from django.http import HttpResponse
from django.shortcuts import redirect, render
from .models import AnimalList
import requests
import json
# Create your views here.

def index(request):
    cr_list = [0, 0.125, 0.25, 0.5, 1, 2]
    cr_query = {}
    for cr in cr_list: 
        cr_query[f"cr{cr}"] = AnimalList.objects.filter(CR = cr)
        #print(f"cr{cr}: {cr_query[f'cr{cr}']}\n")
    return render(request, "conjure/index.html", {
        "cr_list": cr_query
    })

def create_card(data):
    statblock = json.loads(data)
    print(statblock)
    return JsonResponse(
        {"message": "Card Created!"}
    )