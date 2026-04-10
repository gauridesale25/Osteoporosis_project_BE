from django.shortcuts import render

# Create your views here.
from rest_framework.decorators import api_view
from django.contrib.auth.models import User
from rest_framework.response import Response

@api_view(['POST'])
def register(request):
    user = User.objects.create_user(
        first_name=request.data['first_name'],
        last_name=request.data['last_name'],
        username=request.data['username'],
        password=request.data['password'],


    )
    return Response({"message": "User created"})