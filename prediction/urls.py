from django.urls import path
from .views import size_prediction

urlpatterns = [
    path('predict-size/', size_prediction, name='size_prediction'),
]