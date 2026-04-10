from django.urls import path
from .views import predict_view, history_view

urlpatterns = [
    path('predict/', predict_view),
    path('history/', history_view),
]